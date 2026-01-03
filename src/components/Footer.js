import React from 'react'
import styled from 'styled-components'
import { theme, media } from '../styles/theme'

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
  background-color: ${theme.colors.backgroundAlt};
  border-top: 1px solid ${theme.colors.goldSubtle};
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
`

const Logo = styled.span`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textPrimary};
  letter-spacing: 0.1em;
`

const Divider = styled.div`
  width: 40px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${theme.colors.gold},
    transparent
  );
`

const Copyright = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.05em;
  text-align: center;
  margin: 0;

  ${media.sm} {
    font-size: 0.65rem;
  }
`

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <StyledFooter>
      <FooterContent>
        <Logo>EunGyeol</Logo>
        <Divider />
        <Copyright>
          Copyright {currentYear}. Lee, Mi Sun. All rights reserved.
        </Copyright>
      </FooterContent>
    </StyledFooter>
  )
}

export default Footer
