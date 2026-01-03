import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme, media } from '../styles/theme'
import ArtDecoBackground from '../components/ArtDecoBackground'

// 부드러운 페이드 인 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeInDelayed = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

// 스크롤 인디케이터 바운스
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-8px) translateX(-50%);
  }
  60% {
    transform: translateY(-4px) translateX(-50%);
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${theme.colors.background};
  overflow: hidden;
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing['2xl']};
  transform: translateY(${props => -props.offset * 0.3}px);
  transition: transform 0.1s ease-out;

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
  animation: ${fadeIn} 1.5s ease-out forwards;

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
  animation: ${fadeInDelayed} 1.5s ease-out 0.5s forwards;

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
  animation: ${fadeInDelayed} 1.5s ease-out 0.8s forwards;
`

const Tagline = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0;
  animation: ${fadeInDelayed} 1.5s ease-out 1s forwards;

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
  animation: ${fadeInDelayed} 1.5s ease-out 1.5s forwards;
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
  width: 20px;
  height: 20px;
  border-right: 1px solid ${theme.colors.gold};
  border-bottom: 1px solid ${theme.colors.gold};
  transform: rotate(45deg);
  animation: ${bounce} 2s ease-in-out infinite;
  animation-delay: 2s;
`

function Landing() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffset(window.pageYOffset)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Container>
      <ArtDecoBackground />

      <ContentWrapper offset={offset}>
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
