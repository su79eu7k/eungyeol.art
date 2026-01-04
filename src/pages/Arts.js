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

  const getMeta = async (url) => {
    const img = new Image()
    img.src = url
    try {
      await img.decode()
    } catch {
      console.log('Image load error:', img.src)
    }
    return { 'width': img.width, 'height': img.height, 'src': img.src }
  }

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      const startIdx = loadingIdx - 10
      const endIdx = Math.min(loadingIdx, photos.length)

      if (startIdx >= photos.length || startIdx < 0) {
        return
      }

      setIsLoading(true)

      const getImgs = async () => {
        return await Promise.all(
          photos.slice(startIdx, endIdx).map(async (elem, idx) => {
            const meta = await getMeta(elem['original'])
            return { ...elem, ...meta, id: `photo-${startIdx + idx}` }
          })
        )
      }

      const _images = await getImgs()
      if (!cancelled) {
        setImages(prev => {
          const existingIds = new Set(prev.map(img => img.id))
          const newImages = _images.filter(img => !existingIds.has(img.id))
          return [...prev, ...newImages]
        })
        setIsLoading(false)
      }
    }
    fetchData()

    return () => { cancelled = true }
  }, [loadingIdx])

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
