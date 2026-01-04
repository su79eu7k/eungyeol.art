import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { spin } from '../styles/animations'

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['4xl']} 0;
`

const Spinner = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
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

function Loader({ text, size }) {
  return (
    <LoaderWrapper>
      <Spinner size={size} />
      {text && <LoaderText>{text}</LoaderText>}
    </LoaderWrapper>
  )
}

export default Loader
