import React, { useState, useEffect, useCallback } from "react"
import Modal from "../components/Modal"
import MasonryGallery from "../components/MasonryGallery"
import ImageViewer from "../components/ImageViewer"
import { photos } from "../photos"
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { fadeIn, spin } from '../styles/animations'
import { PageTitle } from '../components/shared'
import { usePageTitle } from '../hooks/usePageTitle'

// 이미지 메타데이터 캐시 (컴포넌트 외부에 선언하여 재마운트 시에도 유지)
const imageMetaCache = new Map()

// 기본 이미지 크기 (로드 실패 시 사용)
const DEFAULT_IMAGE_SIZE = { width: 800, height: 600 }

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.8s ease-out;
`

const GalleryWrapper = styled.div`
  width: 100%;

  /* 갤러리 이미지 스타일 오버라이드 */
  img {
    transition: all ${theme.transitions.normal};
    cursor: pointer;

    &:hover {
      opacity: 0.9;
      transform: scale(1.02);
    }
  }
`

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid ${theme.colors.goldSubtle};
  border-top: 2px solid ${theme.colors.gold};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

const LoaderText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  margin-top: ${theme.spacing.md};
  letter-spacing: 0.1em;
`

const EndMessage = styled.p`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textMuted};
  text-align: center;
  padding: ${theme.spacing['2xl']} 0;
  letter-spacing: 0.05em;
`

const IntersectionTrigger = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['2xl']} 0;
`

function Arts() {
  const [images, setImages] = useState([])
  const [focus, setFocus] = useState(false)
  const [focusIdx, setFocusIdx] = useState(0)
  const [intersection, setIntersection] = useState(null)
  const [loadingIdx, setLoadingIdx] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  usePageTitle('Gallery')

  const handleTouchMove = useCallback((e) => {
    e.preventDefault()
  }, [])

  const rejectScroll = useCallback(() => {
    document.body.style.overflow = 'hidden'
    document.body.addEventListener('touchmove', handleTouchMove, {
      capture: false,
      once: false,
      passive: false
    })
  }, [handleTouchMove])

  const allowScroll = useCallback(() => {
    document.body.style.overflow = 'auto'
    document.body.removeEventListener('touchmove', handleTouchMove)
  }, [handleTouchMove])

  const focusHandler = useCallback((index) => {
    rejectScroll()
    setFocus(true)
    setFocusIdx(index)
  }, [rejectScroll])

  const getMeta = useCallback(async (url) => {
    // 캐시에서 먼저 확인
    if (imageMetaCache.has(url)) {
      return imageMetaCache.get(url)
    }

    const img = new Image()
    img.src = url

    try {
      await img.decode()
      const meta = {
        width: img.width || DEFAULT_IMAGE_SIZE.width,
        height: img.height || DEFAULT_IMAGE_SIZE.height,
        src: img.src,
        loaded: true
      }
      // 성공한 경우 캐시에 저장
      imageMetaCache.set(url, meta)
      return meta
    } catch (error) {
      console.warn('Image load error:', url, error)
      // 실패 시 기본 크기 반환 (레이아웃 깨짐 방지)
      const fallbackMeta = {
        width: DEFAULT_IMAGE_SIZE.width,
        height: DEFAULT_IMAGE_SIZE.height,
        src: url,
        loaded: false,
        error: true
      }
      // 실패한 경우에도 캐시에 저장 (반복 요청 방지)
      imageMetaCache.set(url, fallbackMeta)
      return fallbackMeta
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      const startIdx = loadingIdx - 10
      const endIdx = Math.min(loadingIdx, photos.length)

      if (startIdx >= photos.length || startIdx < 0) {
        return
      }

      setIsLoading(true)

      // 이미지를 순차적으로 로드하여 네트워크 부하 분산 (5개씩 병렬)
      const batchSize = 5
      const photosToLoad = photos.slice(startIdx, endIdx)
      const results = []

      for (let i = 0; i < photosToLoad.length; i += batchSize) {
        if (cancelled) break

        const batch = photosToLoad.slice(i, i + batchSize)
        const batchResults = await Promise.all(
          batch.map(async (elem, batchIdx) => {
            const globalIdx = startIdx + i + batchIdx
            const meta = await getMeta(elem['original'])
            return { ...elem, ...meta, id: `photo-${globalIdx}` }
          })
        )
        results.push(...batchResults)
      }

      if (!cancelled) {
        setImages(prev => {
          const existingIds = new Set(prev.map(img => img.id))
          const newImages = results.filter(img => !existingIds.has(img.id))
          return [...prev, ...newImages]
        })
        setIsLoading(false)
      }
    }
    fetchData()

    return () => { cancelled = true }
  }, [loadingIdx, getMeta])

  useEffect(() => {
    const onIntersect = ([entry]) => {
      if (entry.isIntersecting && !isLoading && loadingIdx <= photos.length) {
        setLoadingIdx(prevIdx => prevIdx + 10)
      }
    }

    let observer
    if (intersection) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.1 })
      observer.observe(intersection)
    }

    return () => observer && observer.disconnect()
  }, [intersection, isLoading, loadingIdx])

  const isAllLoaded = loadingIdx > photos.length

  return (
    <Container>
      <PageTitle>Gallery</PageTitle>

      <GalleryWrapper>
        {images.length > 0 && (
          <MasonryGallery photos={images} onClick={focusHandler} />
        )}
      </GalleryWrapper>

      {!isAllLoaded && (
        <IntersectionTrigger ref={setIntersection}>
          {isLoading && (
            <>
              <Loader />
              <LoaderText>Loading artworks...</LoaderText>
            </>
          )}
        </IntersectionTrigger>
      )}

      {isAllLoaded && (
        <EndMessage>All {photos.length} artworks loaded</EndMessage>
      )}

      {focus && (
        <Modal visible={focus} setFocus={setFocus} allowScroll={allowScroll}>
          <ImageViewer
            images={images}
            startIndex={focusIdx}
            onClose={() => {
              setFocus(false)
              allowScroll()
            }}
          />
        </Modal>
      )}
    </Container>
  )
}

export default Arts
