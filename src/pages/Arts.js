import React, { useState, useEffect, useCallback } from "react"
import Modal from "../components/Modal"
import Gallery from "react-photo-gallery"
import ImageGallery from "react-image-gallery"
import { photos } from "../photos"
import './Arts.css'
import styled, { keyframes } from 'styled-components'
import { theme, media } from '../styles/theme'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.8s ease-out;
`

const PageTitle = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textPrimary};
  text-align: center;
  letter-spacing: 0.1em;
  margin-bottom: ${theme.spacing['2xl']};

  ${media.md} {
    font-size: ${theme.fontSizes['2xl']};
    margin-bottom: ${theme.spacing.xl};
  }
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

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['4xl']} 0;
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

function Arts() {
  const [images, setImages] = useState([])
  const [focus, setFocus] = useState(false)
  const [focusIdx, setFocusIdx] = useState(0)
  const [intersection, setIntersection] = useState(null)
  const [loadingIdx, setLoadingIdx] = useState(10)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleTouchMove = useCallback((e) => {
    e.preventDefault()
  }, [])

  const rejectScroll = () => {
    document.body.style.overflow = 'hidden'
    document.body.addEventListener('touchmove', handleTouchMove, {
      capture: false,
      once: false,
      passive: false
    })
  }

  const allowScroll = () => {
    document.body.style.overflow = 'auto'
    document.body.removeEventListener('touchmove', handleTouchMove)
  }

  const focusHandler = (event, { index }) => {
    rejectScroll()
    setFocus(true)
    setFocusIdx(index)
  }

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
    async function fetchData() {
      const getImgs = async () => {
        return await Promise.all(
          photos.slice(loadingIdx - 10, loadingIdx).map(async (elem) => {
            const meta = await getMeta(elem['original'])
            return { ...elem, ...meta }
          })
        )
      }

      const _images = await getImgs()
      setImages(images => images.concat(_images))
      setIsLoaded(true)
    }
    fetchData()
  }, [loadingIdx])

  useEffect(() => {
    const onIntersect = ([entry]) => {
      if (entry.isIntersecting) {
        setIsLoaded(false)
        setLoadingIdx(prevIdx => prevIdx + 10)
      }
    }

    let observer
    if (intersection) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.1 })
      observer.observe(intersection)
    }

    return () => observer && observer.disconnect()
  }, [intersection])

  const isAllLoaded = loadingIdx > photos.length

  return (
    <Container>
      <PageTitle>Gallery</PageTitle>

      <GalleryWrapper>
        {images.length > 0 && (
          <Gallery photos={images} onClick={focusHandler} margin={4} />
        )}
      </GalleryWrapper>

      {isLoaded && !isAllLoaded && <div ref={setIntersection}></div>}

      {!isLoaded && (
        <LoaderWrapper>
          <Loader />
          <LoaderText>Loading artworks...</LoaderText>
        </LoaderWrapper>
      )}

      {isAllLoaded && (
        <EndMessage>All {photos.length} artworks loaded</EndMessage>
      )}

      {focus && (
        <Modal visible={focus} setFocus={setFocus} allowScroll={allowScroll}>
          <ImageGallery items={images} startIndex={focusIdx} />
        </Modal>
      )}
    </Container>
  )
}

export default Arts
