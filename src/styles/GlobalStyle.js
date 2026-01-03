import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyle = createGlobalStyle`
  /* Pretendard 폰트 */
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

  /* Cormorant Garamond - 우아한 세리프 */
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

  /* Noto Serif KR - 한글 세리프 */
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #root {
    min-height: 100vh;
  }

  body {
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fontWeights.normal};
    line-height: ${theme.lineHeights.normal};
    color: ${theme.colors.textSecondary};
    background-color: ${theme.colors.background};
  }

  /* 타이포그래피 기본 스타일 */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.display};
    font-weight: ${theme.fontWeights.normal};
    color: ${theme.colors.textPrimary};
    line-height: ${theme.lineHeights.tight};
  }

  h1 {
    font-size: ${theme.fontSizes['5xl']};
    letter-spacing: 0.02em;
  }

  h2 {
    font-size: ${theme.fontSizes['4xl']};
    letter-spacing: 0.02em;
  }

  h3 {
    font-size: ${theme.fontSizes['3xl']};
  }

  p {
    margin-bottom: ${theme.spacing.md};
    line-height: ${theme.lineHeights.relaxed};
  }

  a {
    color: ${theme.colors.gold};
    text-decoration: none;
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.goldDark};
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    background: none;
  }

  /* 포커스 스타일 (접근성) */
  :focus-visible {
    outline: 2px solid ${theme.colors.gold};
    outline-offset: 2px;
  }

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundAlt};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.goldMuted};
    border-radius: 4px;

    &:hover {
      background: ${theme.colors.gold};
    }
  }

  /* 선택 영역 스타일 */
  ::selection {
    background: ${theme.colors.goldMuted};
    color: ${theme.colors.textPrimary};
  }
`

export default GlobalStyle
