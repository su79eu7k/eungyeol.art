import React from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'

// 느린 회전 애니메이션
const rotateSlowCW = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const rotateSlowCCW = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`

// 펄스 애니메이션 (확대/축소)
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.5;
  }
`

// 페이드 인/아웃
const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0.15;
  }
  50% {
    opacity: 0.35;
  }
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
`

const SVGContainer = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150vmax;
  height: 150vmax;
`

// 기하학적 패턴 그룹
const GeometricGroup = styled.g`
  transform-origin: center;
  animation: ${props => props.direction === 'ccw' ? rotateSlowCCW : rotateSlowCW}
             ${props => props.duration || '120s'}
             linear infinite;
`

const PulsingGroup = styled.g`
  transform-origin: center;
  animation: ${pulse} ${props => props.duration || '8s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`

const FadingGroup = styled.g`
  animation: ${fadeInOut} ${props => props.duration || '12s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`

// 골드 색상 스타일
const goldStroke = {
  stroke: theme.colors.gold,
  fill: 'none',
  strokeWidth: 0.5,
  opacity: 0.4,
}

const goldStrokeLight = {
  stroke: theme.colors.goldLight,
  fill: 'none',
  strokeWidth: 0.3,
  opacity: 0.25,
}

const goldStrokeMuted = {
  stroke: theme.colors.gold,
  fill: 'none',
  strokeWidth: 0.8,
  opacity: 0.15,
}

// 육각형 생성 함수
const createHexagonPoints = (cx, cy, r) => {
  const points = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return points.join(' ')
}

// 다이아몬드 패턴
const createDiamondPoints = (cx, cy, r) => {
  return `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`
}

function ArtDecoBackground() {
  const center = 500 // SVG viewBox 중심

  // 동심원 반지름들
  const circleRadii = [80, 160, 240, 320, 400, 480]

  // 육각형 반지름들
  const hexRadii = [120, 200, 280, 360, 440]

  return (
    <Container aria-hidden="true">
      <SVGContainer viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">

        {/* 레이어 1: 천천히 시계방향으로 회전하는 동심원 */}
        <GeometricGroup direction="cw" duration="180s">
          {circleRadii.map((r, i) => (
            <circle
              key={`circle-${i}`}
              cx={center}
              cy={center}
              r={r}
              style={i % 2 === 0 ? goldStroke : goldStrokeLight}
            />
          ))}
        </GeometricGroup>

        {/* 레이어 2: 반시계방향으로 회전하는 육각형들 */}
        <GeometricGroup direction="ccw" duration="240s">
          {hexRadii.map((r, i) => (
            <polygon
              key={`hex-${i}`}
              points={createHexagonPoints(center, center, r)}
              style={goldStrokeMuted}
            />
          ))}
        </GeometricGroup>

        {/* 레이어 3: 펄스하는 다이아몬드 패턴 */}
        <PulsingGroup duration="15s" delay="0s">
          <polygon
            points={createDiamondPoints(center, center, 300)}
            style={{ ...goldStroke, strokeWidth: 1, opacity: 0.2 }}
          />
        </PulsingGroup>

        <PulsingGroup duration="18s" delay="3s">
          <polygon
            points={createDiamondPoints(center, center, 200)}
            style={{ ...goldStrokeLight, strokeWidth: 0.8 }}
          />
        </PulsingGroup>

        {/* 레이어 4: 방사형 라인들 (시계방향 회전) */}
        <GeometricGroup direction="cw" duration="300s">
          {[...Array(12)].map((_, i) => {
            const angle = (Math.PI / 6) * i
            const x2 = center + 480 * Math.cos(angle)
            const y2 = center + 480 * Math.sin(angle)
            return (
              <line
                key={`line-${i}`}
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                style={{ ...goldStrokeLight, opacity: 0.15 }}
              />
            )
          })}
        </GeometricGroup>

        {/* 레이어 5: 페이딩 장식 원들 */}
        <FadingGroup duration="20s" delay="0s">
          {[...Array(8)].map((_, i) => {
            const angle = (Math.PI / 4) * i
            const distance = 350
            const cx = center + distance * Math.cos(angle)
            const cy = center + distance * Math.sin(angle)
            return (
              <circle
                key={`deco-circle-${i}`}
                cx={cx}
                cy={cy}
                r={15}
                style={{ ...goldStroke, strokeWidth: 1 }}
              />
            )
          })}
        </FadingGroup>

        {/* 레이어 6: 내부 정교한 패턴 */}
        <GeometricGroup direction="ccw" duration="150s">
          {/* 작은 동심 사각형들 */}
          {[40, 60, 80].map((size, i) => (
            <rect
              key={`rect-${i}`}
              x={center - size}
              y={center - size}
              width={size * 2}
              height={size * 2}
              transform={`rotate(45, ${center}, ${center})`}
              style={goldStrokeLight}
            />
          ))}
        </GeometricGroup>

        {/* 레이어 7: 외곽 아트데코 프레임 */}
        <FadingGroup duration="25s" delay="5s">
          {/* 코너 장식 */}
          {[
            { x: center - 420, y: center - 420, rotate: 0 },
            { x: center + 420, y: center - 420, rotate: 90 },
            { x: center + 420, y: center + 420, rotate: 180 },
            { x: center - 420, y: center + 420, rotate: 270 },
          ].map((corner, i) => (
            <g
              key={`corner-${i}`}
              transform={`translate(${corner.x}, ${corner.y}) rotate(${corner.rotate})`}
            >
              <path
                d="M 0 0 L 40 0 L 40 5 L 5 5 L 5 40 L 0 40 Z"
                style={{ ...goldStroke, strokeWidth: 0.8 }}
              />
            </g>
          ))}
        </FadingGroup>

      </SVGContainer>
    </Container>
  )
}

export default ArtDecoBackground
