import React, { useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme, media } from '../styles/theme'
import { fadeInUp, bounce } from '../styles/animations'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  cursor: pointer;
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing['2xl']};

  ${media.md} {
    padding: ${theme.spacing.xl};
  }
`

const LogoWrapper = styled.div`
  margin-bottom: ${theme.spacing.xl};
`

const Logo = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['6xl']};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textPrimary};
  letter-spacing: 0.15em;
  margin: 0;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out forwards;

  ${media.md} {
    font-size: ${theme.fontSizes['5xl']};
  }

  ${media.sm} {
    font-size: ${theme.fontSizes['4xl']};
  }
`

const SubLogo = styled.p`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textSecondary};
  letter-spacing: 0.1em;
  margin-top: ${theme.spacing.md};
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out 0.15s forwards;

  ${media.md} {
    font-size: ${theme.fontSizes.xl};
  }

  ${media.sm} {
    font-size: ${theme.fontSizes.lg};
  }
`

const Divider = styled.div`
  width: 60px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${theme.colors.gold},
    transparent
  );
  margin: ${theme.spacing.xl} 0;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out 0.3s forwards;
`

const Tagline = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out 0.4s forwards;

  ${media.sm} {
    font-size: ${theme.fontSizes.sm};
    letter-spacing: 0.15em;
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: ${theme.spacing['2xl']};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out 0.6s forwards;
`

const ScrollText = styled.span`
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.sm};
`

const ScrollArrow = styled.div`
  width: 18px;
  height: 18px;
  border-right: 1px solid ${theme.colors.gold};
  border-bottom: 1px solid ${theme.colors.gold};
  transform: rotate(45deg);
  animation: ${bounce} 1.5s ease-in-out infinite;
`

function Landing() {
  const navigate = useNavigate()
  const isNavigatingRef = useRef(false)

  const navigateToHome = useCallback(() => {
    if (!isNavigatingRef.current) {
      isNavigatingRef.current = true
      navigate('/home')
    }
  }, [navigate])

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 20) {
        navigateToHome()
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        navigateToHome()
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      const diff = touchStartY - e.changedTouches[0].clientY
      if (diff > 30) {
        navigateToHome()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [navigateToHome])

  return (
    <Container onClick={navigateToHome}>
      <ContentWrapper>
        <LogoWrapper>
          <Logo>EunGyeol</Logo>
          <SubLogo>은결 · 이미선</SubLogo>
        </LogoWrapper>

        <Divider />

        <Tagline>Korean Traditional Art</Tagline>
      </ContentWrapper>

      <ScrollIndicator>
        <ScrollText>Scroll</ScrollText>
        <ScrollArrow />
      </ScrollIndicator>
    </Container>
  )
}

export default Landing
