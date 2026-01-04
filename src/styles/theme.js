// 디자인 시스템 - 웜 크림 + 초콜릿 브라운 테마
// 부드럽고 따뜻한 갤러리 분위기

export const theme = {
  // 컬러 팔레트
  colors: {
    // 기본 배경 - 따뜻한 크림/아이보리
    background: '#FFFCF7',      // 웜 크림 (더 밝고 따뜻하게)
    backgroundAlt: '#F7F3EC',   // 소프트 베이지

    // 골드/샴페인 계열 (아트데코)
    gold: '#C9A962',            // 메인 골드
    goldLight: '#D4B978',       // 밝은 골드
    goldDark: '#A68B4B',        // 어두운 골드
    goldMuted: 'rgba(201, 169, 98, 0.35)',  // 반투명 골드 (약간 진하게)
    goldSubtle: 'rgba(201, 169, 98, 0.18)', // 연한 골드

    // 텍스트 - 따뜻한 브라운 계열 (검정 대신 초콜릿 브라운)
    textPrimary: '#5D4E37',     // 리치 초콜릿 브라운 (제목)
    textSecondary: '#6B5D4D',   // 미디엄 웜 브라운 (본문)
    textMuted: '#8B7D6B',       // 라이트 토프 (캡션, 메타)

    // 액센트
    accent: '#8B7355',          // 따뜻한 브라운

    // 유틸리티
    white: '#FFFFFF',
    black: '#1A1816',
    overlay: 'rgba(45, 40, 35, 0.85)',  // 더 따뜻한 오버레이

    // 오버레이/글래스모피즘 (ImageViewer 등)
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    overlayMedium: 'rgba(0, 0, 0, 0.4)',
    overlayDark: 'rgba(0, 0, 0, 0.5)',
    glassBorder: 'rgba(255, 255, 255, 0.2)',
    glassText: 'rgba(255, 255, 255, 0.7)',
    glassTextMuted: 'rgba(255, 255, 255, 0.6)',
    glassTextSubtle: 'rgba(255, 255, 255, 0.4)',
  },

  // 타이포그래피
  fonts: {
    // 로고/제목용 세리프
    display: "'Cormorant Garamond', 'Noto Serif KR', serif",
    // 본문용 산세리프
    body: "'Pretendard', 'Noto Sans KR', -apple-system, sans-serif",
    // 영문 강조
    accent: "'Cormorant Garamond', serif",
  },

  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    '4xl': '2.5rem',  // 40px
    '5xl': '3rem',    // 48px
    '6xl': '4rem',    // 64px
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
    loose: 2,
  },

  // 간격
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },

  // 브레이크포인트
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  // 트랜지션
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    verySlow: '1s ease',
  },

  // 그림자
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },

  // 테두리
  borders: {
    thin: '1px solid',
    medium: '2px solid',
  },

  // 둥근 모서리
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
}

// 미디어 쿼리 헬퍼
export const media = {
  sm: `@media (max-width: ${theme.breakpoints.sm})`,
  md: `@media (max-width: ${theme.breakpoints.md})`,
  lg: `@media (max-width: ${theme.breakpoints.lg})`,
  xl: `@media (max-width: ${theme.breakpoints.xl})`,
}

export default theme
