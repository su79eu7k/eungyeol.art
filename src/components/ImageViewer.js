import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { IconChevronLeft, IconChevronRight, IconExpandMore, IconExpandLess } from './Icons'
import { theme, media } from '../styles/theme'
import { fadeIn } from '../styles/animations'

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
`

const MainImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 0;
  padding: ${theme.spacing.xl};
  cursor: ${props => props.$zoomable ? 'zoom-in' : 'default'};

  ${media.md} {
    padding: ${theme.spacing.md};
    padding-bottom: ${props => props.$thumbnailsVisible ? theme.spacing.md : theme.spacing.xl};
  }
`

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
`

const MainImage = styled.img`
  max-width: 100%;
  max-height: 65vh;
  object-fit: contain;
  border-radius: ${theme.radii.md};
  animation: ${props => props.$loaded ? css`${fadeIn} 0.3s ease-out` : 'none'};
  opacity: ${props => props.$loaded ? 1 : 0};
  transform: scale(${props => props.$scale || 1});
  transform-origin: ${props => props.$transformOrigin || 'center center'};
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  cursor: ${props => props.$scale > 1 ? 'zoom-out' : 'zoom-in'};
  will-change: transform, opacity;

  ${media.md} {
    max-height: 60vh;
  }

  ${media.sm} {
    max-height: 55vh;
  }
`

const PreloadImage = styled.img`
  display: none;
`

const ImageLoader = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid ${theme.colors.goldSubtle};
  border-top-color: ${theme.colors.gold};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$direction === 'left' ? 'left: 8px;' : 'right: 8px;'}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${theme.colors.overlayLight};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: 50%;
  color: ${theme.colors.white};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  z-index: 10;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    background: ${theme.colors.overlayDark};
    border-color: ${theme.colors.gold};
    color: ${theme.colors.gold};
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
    &:hover {
      background: ${theme.colors.overlayLight};
      border-color: ${theme.colors.glassBorder};
      color: ${theme.colors.white};
    }
  }

  svg {
    width: 32px;
    height: 32px;
  }

  ${media.md} {
    width: 40px;
    height: 40px;
    opacity: 0.5;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  ${media.sm} {
    width: 36px;
    height: 36px;
    ${props => props.$direction === 'left' ? 'left: 4px;' : 'right: 4px;'}
  }
`

const Counter = styled.div`
  position: absolute;
  bottom: ${theme.spacing.md};
  left: 50%;
  transform: translateX(-50%);
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.glassText};
  background: ${theme.colors.overlayMedium};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.radii.full};
  letter-spacing: 0.1em;
`

const ThumbnailContainer = styled.div`
  background: ${theme.colors.overlayLight};
  transition: all ${theme.transitions.normal};

  ${media.sm} {
    position: relative;
  }
`

const ThumbnailToggle = styled.button`
  display: none;
  width: 100%;
  padding: ${theme.spacing.xs};
  background: transparent;
  border: none;
  color: ${theme.colors.glassTextMuted};
  cursor: pointer;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.gold};
  }

  svg {
    width: 24px;
    height: 24px;
  }

  ${media.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const ThumbnailStrip = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.md};
  overflow-x: auto;
  justify-content: center;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.goldMuted};
    border-radius: ${theme.radii.full};
  }

  ${media.sm} {
    padding: ${theme.spacing.sm};
    justify-content: flex-start;
    max-height: ${props => props.$visible ? '80px' : '0'};
    padding: ${props => props.$visible ? theme.spacing.sm : '0'};
    overflow: ${props => props.$visible ? 'auto' : 'hidden'};
    transition: all ${theme.transitions.normal};
  }
`

const Thumbnail = styled.button`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  padding: 0;
  border: 2px solid ${props => props.$active ? theme.colors.gold : 'transparent'};
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  opacity: ${props => props.$active ? 1 : 0.5};
  transition: all ${theme.transitions.fast};
  transform: scale(${props => props.$active ? 1.05 : 1});

  &:hover {
    opacity: 0.9;
    border-color: ${theme.colors.goldLight};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.sm} {
    width: 50px;
    height: 50px;
  }
`

const SwipeHint = styled.div`
  display: none;
  position: absolute;
  bottom: ${theme.spacing['2xl']};
  left: 50%;
  transform: translateX(-50%);
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.glassTextSubtle};
  animation: ${fadeIn} 1s ease-out;
  animation-delay: 1s;
  animation-fill-mode: backwards;

  ${media.sm} {
    display: block;
  }
`

function ImageViewer({ images, startIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [loaded, setLoaded] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [thumbnailsVisible, setThumbnailsVisible] = useState(true)
  const [scale, setScale] = useState(1)
  const [showHint, setShowHint] = useState(true)
  const thumbnailRef = useRef(null)
  const imageRef = useRef(null)

  const currentImage = images[currentIndex]

  // Preload adjacent images
  const preloadImages = useMemo(() => {
    const indices = []
    if (currentIndex > 0) indices.push(currentIndex - 1)
    if (currentIndex < images.length - 1) indices.push(currentIndex + 1)
    return indices.map(i => images[i]?.original || images[i]?.src)
  }, [currentIndex, images])

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setLoaded(false)
      setScale(1)
      setCurrentIndex(prev => prev - 1)
      setShowHint(false)
    }
  }, [currentIndex])

  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setLoaded(false)
      setScale(1)
      setCurrentIndex(prev => prev + 1)
      setShowHint(false)
    }
  }, [currentIndex, images.length])

  const goToIndex = useCallback((index) => {
    if (index !== currentIndex) {
      setLoaded(false)
      setScale(1)
      setCurrentIndex(index)
    }
  }, [currentIndex])

  const toggleZoom = useCallback((e) => {
    e.stopPropagation()
    setScale(prev => prev === 1 ? 2 : 1)
  }, [])

  const toggleThumbnails = useCallback(() => {
    setThumbnailsVisible(prev => !prev)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrev()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrev, goToNext])

  // Scroll thumbnail into view
  useEffect(() => {
    if (thumbnailRef.current) {
      const thumbnails = thumbnailRef.current.children
      if (thumbnails[currentIndex]) {
        thumbnails[currentIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [currentIndex])

  // Reset thumbnails visibility on mobile
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 640) {
        setThumbnailsVisible(false)
      } else {
        setThumbnailsVisible(true)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    if (scale > 1) return
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStart === null || scale > 1) return

    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrev()
      }
    }

    setTouchStart(null)
  }

  const handleImageLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  const handleContainerClick = useCallback((e) => {
    // Close if clicking on the container background (not on image or controls)
    if (e.target === e.currentTarget && onClose) {
      onClose()
    }
  }, [onClose])

  return (
    <ViewerContainer>
      <MainImageContainer
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleContainerClick}
        $thumbnailsVisible={thumbnailsVisible}
      >
        {!loaded && <ImageLoader />}

        {/* Preload adjacent images */}
        {preloadImages.map((src, i) => src && (
          <PreloadImage key={i} src={src} alt="" />
        ))}

        <ImageWrapper>
          <MainImage
            ref={imageRef}
            src={currentImage.original || currentImage.src}
            alt={currentImage.alt || `Image ${currentIndex + 1}`}
            $loaded={loaded}
            $scale={scale}
            onLoad={handleImageLoad}
            onClick={toggleZoom}
            draggable={false}
          />
        </ImageWrapper>

        <NavButton
          $direction="left"
          onClick={goToPrev}
          disabled={currentIndex === 0}
          aria-label="Previous image"
        >
          <IconChevronLeft />
        </NavButton>

        <NavButton
          $direction="right"
          onClick={goToNext}
          disabled={currentIndex === images.length - 1}
          aria-label="Next image"
        >
          <IconChevronRight />
        </NavButton>

        <Counter>
          {currentIndex + 1} / {images.length}
        </Counter>

        {showHint && <SwipeHint>Swipe to navigate</SwipeHint>}
      </MainImageContainer>

      <ThumbnailContainer>
        <ThumbnailToggle onClick={toggleThumbnails} aria-label="Toggle thumbnails">
          {thumbnailsVisible ? <IconExpandMore /> : <IconExpandLess />}
        </ThumbnailToggle>
        <ThumbnailStrip ref={thumbnailRef} $visible={thumbnailsVisible}>
          {images.map((image, index) => (
            <Thumbnail
              key={index}
              $active={index === currentIndex}
              onClick={() => goToIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            >
              <img
                src={image.thumbnail || image.src}
                alt=""
                loading="lazy"
                draggable={false}
              />
            </Thumbnail>
          ))}
        </ThumbnailStrip>
      </ThumbnailContainer>
    </ViewerContainer>
  )
}

export default ImageViewer
