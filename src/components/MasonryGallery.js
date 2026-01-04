import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme, media } from '../styles/theme'

const shimmer = keyframes`
  0% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

const GalleryGrid = styled.div`
  column-count: 3;
  column-gap: ${theme.spacing.md};
  width: 100%;

  ${media.lg} {
    column-count: 2;
    column-gap: ${theme.spacing.sm};
  }

  ${media.sm} {
    column-count: 1;
    column-gap: 0;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  break-inside: avoid;
  margin-bottom: ${theme.spacing.md};
  overflow: hidden;
  background-color: ${theme.colors.backgroundAlt};
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease-out backwards;
  animation-delay: ${props => props.$delay}ms;

  ${media.lg} {
    margin-bottom: ${theme.spacing.sm};
  }

  ${media.sm} {
    margin-bottom: ${theme.spacing.xs};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 60%,
      rgba(0, 0, 0, 0.1) 100%
    );
    opacity: 0;
    transition: opacity ${theme.transitions.normal};
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover img {
    transform: scale(1.02);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.gold};
    outline-offset: 2px;
  }
`

// 비율 유지 컨테이너 - 이미지 로딩 전에도 공간 확보
const AspectRatioContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: ${props => props.$ratio ? `${props.$ratio * 100}%` : '75%'};
  background-color: ${theme.colors.backgroundAlt};
`

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${theme.colors.backgroundAlt} 0%,
    ${theme.colors.goldSubtle} 50%,
    ${theme.colors.backgroundAlt} 100%
  );
  background-size: 200% 200%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  opacity: ${props => (props.$loaded ? 0 : 1)};
  transition: opacity 0.4s ease-out;
  pointer-events: none;
  z-index: 1;
`

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${theme.transitions.normal}, opacity 0.4s ease-out;
  opacity: ${props => (props.$loaded ? 1 : 0)};
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
`

const GalleryItem = React.memo(({ photo, index, onClick }) => {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  // aspect ratio 계산 (height / width)
  const aspectRatio = (photo.width && photo.height)
    ? photo.height / photo.width
    : 0.75 // 기본값 4:3

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleClick = useCallback(() => {
    onClick(index)
  }, [onClick, index])

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  // Staggered animation delay
  const animationDelay = (index % 10) * 50

  return (
    <ImageWrapper
      ref={ref}
      onClick={handleClick}
      $delay={animationDelay}
      tabIndex={0}
      role="button"
      aria-label={`View artwork ${index + 1}`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <AspectRatioContainer $ratio={aspectRatio}>
        <Placeholder $loaded={loaded} />
        {inView && (
          <StyledImage
            src={photo.original || photo.src}
            alt={photo.alt || `Artwork ${index + 1}`}
            $loaded={loaded}
            onLoad={handleLoad}
            loading="lazy"
          />
        )}
      </AspectRatioContainer>
    </ImageWrapper>
  )
})

GalleryItem.displayName = 'GalleryItem'

function MasonryGallery({ photos, onClick }) {
  const handleItemClick = useCallback((index) => {
    if (onClick) {
      onClick(index)
    }
  }, [onClick])

  return (
    <GalleryGrid>
      {photos.map((photo, index) => (
        <GalleryItem
          key={photo.src || photo.original || index}
          photo={photo}
          index={index}
          onClick={handleItemClick}
        />
      ))}
    </GalleryGrid>
  )
}

export default MasonryGallery
