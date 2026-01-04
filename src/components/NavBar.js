import React, { useState, useEffect, useRef, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { theme, media } from '../styles/theme'
import { useLanguage } from '../contexts/LanguageContext'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.md} ${theme.spacing['2xl']};
  background-color: ${props =>
    props.scrolled
      ? 'rgba(247, 243, 236, 0.92)'
      : 'rgba(247, 243, 236, 0.75)'};
  backdrop-filter: blur(10px);
  transition: all ${theme.transitions.normal};
  border-bottom: 1px solid ${props =>
    props.scrolled
      ? theme.colors.goldSubtle
      : 'transparent'};

  ${media.md} {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
  }
`

const Logo = styled(NavLink)`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textPrimary};
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.gold};
  }

  ${media.md} {
    font-size: ${theme.fontSizes['2xl']};
  }
`

const SubLogo = styled.span`
  display: block;
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.05em;
  text-align: center;
  margin-top: ${theme.spacing.xs};

  ${media.md} {
    font-size: ${theme.fontSizes.base};
  }
`

const Nav = styled.nav`
  margin-top: ${theme.spacing.sm};

  ${media.md} {
    margin-top: ${theme.spacing.xs};
  }
`

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  list-style: none;
  padding: 0;
  margin: 0;

  ${media.sm} {
    gap: ${theme.spacing.lg};
  }
`

const NavItem = styled.li``

const StyledNavLink = styled(NavLink)`
  position: relative;
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.normal};
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: ${theme.spacing.sm} 0;
  transition: color ${theme.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: ${theme.colors.gold};
    transition: width ${theme.transitions.normal};
  }

  &:hover {
    color: ${theme.colors.textPrimary};

    &::after {
      width: 100%;
    }
  }

  &.active {
    color: ${theme.colors.gold};

    &::after {
      width: 100%;
    }
  }

  ${media.sm} {
    font-size: ${theme.fontSizes.xs};
    letter-spacing: 0.08em;
  }
`

const Divider = styled.span`
  width: 1px;
  height: 16px;
  background-color: ${theme.colors.goldMuted};
`

const LangButton = styled.button`
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.normal};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: none;
  border: none;
  padding: ${theme.spacing.sm} 0;
  cursor: pointer;
  transition: color ${theme.transitions.fast}, transform 0.2s ease;

  &:hover {
    color: ${theme.colors.gold};
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.gold};
    outline-offset: 4px;
  }

  ${media.sm} {
    font-size: ${theme.fontSizes.xs};
    letter-spacing: 0.08em;
  }
`

function NavBar() {
  const { lang, toggleLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const ticking = useRef(false)

  const updateScrolled = useCallback(() => {
    setScrolled(window.scrollY > 50)
    ticking.current = false
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrolled)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [updateScrolled])

  return (
    <Header scrolled={scrolled}>
      <Logo to="/">
        EunGyeol
        <SubLogo>은결 · 이미선</SubLogo>
      </Logo>

      <Nav aria-label="Main navigation">
        <NavList>
          <NavItem>
            <StyledNavLink to="/home">Home</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/arts">Gallery</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/about">About</StyledNavLink>
          </NavItem>
          <Divider />
          <NavItem>
            <LangButton
              onClick={toggleLang}
              aria-label={`Change language to ${lang === 'English' ? 'Korean' : 'English'}`}
            >
              {lang === 'English' ? 'KR' : 'EN'}
            </LangButton>
          </NavItem>
        </NavList>
      </Nav>
    </Header>
  )
}

export default NavBar
