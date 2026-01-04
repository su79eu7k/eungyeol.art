import styled from 'styled-components'
import { theme, media } from '../../styles/theme'
import { fadeInUp } from '../../styles/animations'

// 공용 페이지 제목 컴포넌트
export const PageTitle = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textPrimary};
  text-align: center;
  letter-spacing: 0.1em;
  margin-bottom: ${theme.spacing['2xl']};
  animation: ${fadeInUp} 1s ease-out;

  ${media.md} {
    font-size: ${theme.fontSizes['2xl']};
    margin-bottom: ${theme.spacing.xl};
  }
`

// 공용 구분선 컴포넌트
export const Divider = styled.div`
  width: ${props => props.width || '60px'};
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${theme.colors.gold},
    transparent
  );
  margin: ${props => props.margin || `${theme.spacing['2xl']} 0`};
`

// 공용 페이지 컨테이너 (fadeIn 포함)
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${props => props.maxWidth || '1200px'};
  margin: 0 auto;
  padding: ${props => props.padding || `${theme.spacing['2xl']} 0`};
  animation: ${fadeInUp} 0.8s ease-out;
`

// 공용 섹션 래퍼
export const Section = styled.section`
  width: 100%;
  margin-bottom: ${theme.spacing['3xl']};

  ${media.md} {
    margin-bottom: ${theme.spacing['2xl']};
  }
`
