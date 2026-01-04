import React, { memo } from 'react'
import styled, { keyframes } from 'styled-components'

// 웜 크림/베이지 색상 (새로운 팔레트와 조화)
const warmBeige = 'rgba(201, 169, 98, 0.28)'      // 골드 베이스 (더 통일감)
const warmBeigeLight = 'rgba(180, 160, 130, 0.22)' // 연한 베이지

// 단일 회전 애니메이션 (GPU 가속)
const rotate = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`

// 정적 전체 화면 레이어 (애니메이션 없음)
const StaticLayer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

// 단일 회전 레이어 (성능 최적화)
const RotatingLayer = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200vmax;
  height: 200vmax;
  transform: translate(-50%, -50%);
  will-change: transform;
  animation: ${rotate} 420s linear infinite;
`

const ArtDecoBackground = memo(function ArtDecoBackground() {
  return (
    <Container aria-hidden="true">
      {/* 정적 그리드 패턴 */}
      <StaticLayer preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <line x1="40" y1="0" x2="40" y2="80" stroke={warmBeigeLight} strokeWidth="0.5" />
            <line x1="0" y1="40" x2="80" y2="40" stroke={warmBeigeLight} strokeWidth="0.5" />
          </pattern>
          <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill={warmBeige} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#dots)" />
      </StaticLayer>

      {/* 정적 코너 장식 */}
      <StaticLayer>
        {/* 좌상단 */}
        <g>
          <path d="M 0 0 L 100 0 L 100 2 L 2 2 L 2 100 L 0 100 Z" fill="none" stroke={warmBeige} strokeWidth="1" />
          <path d="M 12 12 L 60 12 L 60 14 L 14 14 L 14 60 L 12 60 Z" fill="none" stroke={warmBeigeLight} strokeWidth="0.5" />
        </g>
        {/* 우상단 */}
        <g style={{ transform: 'translateX(100%) scaleX(-1)' }}>
          <path d="M 0 0 L 100 0 L 100 2 L 2 2 L 2 100 L 0 100 Z" fill="none" stroke={warmBeige} strokeWidth="1" />
          <path d="M 12 12 L 60 12 L 60 14 L 14 14 L 14 60 L 12 60 Z" fill="none" stroke={warmBeigeLight} strokeWidth="0.5" />
        </g>
        {/* 좌하단 */}
        <g style={{ transform: 'translateY(100%) scaleY(-1)' }}>
          <path d="M 0 0 L 100 0 L 100 2 L 2 2 L 2 100 L 0 100 Z" fill="none" stroke={warmBeige} strokeWidth="1" />
          <path d="M 12 12 L 60 12 L 60 14 L 14 14 L 14 60 L 12 60 Z" fill="none" stroke={warmBeigeLight} strokeWidth="0.5" />
        </g>
        {/* 우하단 */}
        <g style={{ transform: 'translate(100%, 100%) scale(-1, -1)' }}>
          <path d="M 0 0 L 100 0 L 100 2 L 2 2 L 2 100 L 0 100 Z" fill="none" stroke={warmBeige} strokeWidth="1" />
          <path d="M 12 12 L 60 12 L 60 14 L 14 14 L 14 60 L 12 60 Z" fill="none" stroke={warmBeigeLight} strokeWidth="0.5" />
        </g>
      </StaticLayer>

      {/* 단일 회전 레이어 - 모든 기하학 도형 통합 */}
      <RotatingLayer viewBox="0 0 1000 1000">
        {/* 동심원 */}
        {[100, 180, 280, 400, 550, 720].map((r) => (
          <circle
            key={`c${r}`}
            cx={500}
            cy={500}
            r={r}
            fill="none"
            stroke={warmBeige}
            strokeWidth="0.5"
          />
        ))}
        {/* 팔각형 */}
        {[150, 300, 480].map((r) => {
          const points = Array.from({ length: 8 }, (_, i) => {
            const angle = -Math.PI / 2 + (Math.PI / 4) * i
            return `${500 + r * Math.cos(angle)},${500 + r * Math.sin(angle)}`
          }).join(' ')
          return <polygon key={`o${r}`} points={points} fill="none" stroke={warmBeigeLight} strokeWidth="0.5" />
        })}
        {/* 방사형 라인 */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (Math.PI / 6) * i
          return (
            <line
              key={`l${i}`}
              x1={500 + 80 * Math.cos(angle)}
              y1={500 + 80 * Math.sin(angle)}
              x2={500 + 800 * Math.cos(angle)}
              y2={500 + 800 * Math.sin(angle)}
              stroke={warmBeigeLight}
              strokeWidth="0.3"
            />
          )
        })}
        {/* 다이아몬드 */}
        {[120, 250, 420].map((r) => {
          const points = Array.from({ length: 4 }, (_, i) => {
            const angle = -Math.PI / 2 + (Math.PI / 2) * i
            return `${500 + r * Math.cos(angle)},${500 + r * Math.sin(angle)}`
          }).join(' ')
          return <polygon key={`d${r}`} points={points} fill="none" stroke={warmBeige} strokeWidth="0.4" />
        })}
      </RotatingLayer>
    </Container>
  )
})

export default ArtDecoBackground
