import React from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'

// 극도로 느린 회전 애니메이션들
const rotateSlowCW = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const rotateSlowCCW = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`

// 미세한 펄스 (거의 느껴지지 않을 정도)
const subtlePulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.06;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.12;
  }
`

// 부드러운 페이드
const gentleFade = keyframes`
  0%, 100% { opacity: 0.04; }
  50% { opacity: 0.10; }
`

// 호흡하듯 확장/수축
const breathe = keyframes`
  0%, 100% {
    transform: scale(0.98);
    opacity: 0.05;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.09;
  }
`

// 스트로크 대시 애니메이션
const dashFlow = keyframes`
  from { stroke-dashoffset: 1000; }
  to { stroke-dashoffset: 0; }
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
  width: 200vmax;
  height: 200vmax;
`

// 기하학적 패턴 그룹들
const RotatingGroup = styled.g`
  transform-origin: center;
  animation: ${props => props.direction === 'ccw' ? rotateSlowCCW : rotateSlowCW}
             ${props => props.duration || '600s'}
             linear infinite;
`

const PulsingGroup = styled.g`
  transform-origin: center;
  animation: ${subtlePulse} ${props => props.duration || '30s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`

const FadingGroup = styled.g`
  animation: ${gentleFade} ${props => props.duration || '45s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`

const BreathingGroup = styled.g`
  transform-origin: center;
  animation: ${breathe} ${props => props.duration || '60s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`

const FlowingPath = styled.path`
  stroke-dasharray: 20 10 5 10;
  animation: ${dashFlow} ${props => props.duration || '120s'} linear infinite;
`

// 매우 은은한 골드 스타일들
const styles = {
  // 가장 연한 (거의 보이지 않음)
  whisper: {
    stroke: theme.colors.gold,
    fill: 'none',
    strokeWidth: 0.3,
    opacity: 0.06,
  },
  // 연한
  faint: {
    stroke: theme.colors.gold,
    fill: 'none',
    strokeWidth: 0.4,
    opacity: 0.08,
  },
  // 보통
  subtle: {
    stroke: theme.colors.gold,
    fill: 'none',
    strokeWidth: 0.5,
    opacity: 0.10,
  },
  // 약간 진한 (여전히 은은함)
  soft: {
    stroke: theme.colors.goldLight,
    fill: 'none',
    strokeWidth: 0.6,
    opacity: 0.12,
  },
  // 점 스타일
  dot: {
    fill: theme.colors.gold,
    opacity: 0.08,
  },
}

// 기하학적 도형 생성 함수들
const createPolygonPoints = (cx, cy, r, sides, startAngle = -Math.PI / 2) => {
  const points = []
  for (let i = 0; i < sides; i++) {
    const angle = startAngle + (2 * Math.PI / sides) * i
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return points.join(' ')
}

// 피보나치 스파이럴 포인트 생성
const createFibonacciSpiral = (cx, cy, scale = 1) => {
  const points = []
  const phi = (1 + Math.sqrt(5)) / 2 // 황금비
  for (let i = 0; i < 200; i++) {
    const angle = i * 0.1
    const r = Math.pow(phi, angle / (2 * Math.PI)) * 5 * scale
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return points.join(' ')
}

// 동심 물결 경로 생성
const createWavyCircle = (cx, cy, r, waves = 12, amplitude = 5) => {
  const points = []
  const steps = 360
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI
    const waveOffset = Math.sin(angle * waves) * amplitude
    const x = cx + (r + waveOffset) * Math.cos(angle)
    const y = cy + (r + waveOffset) * Math.sin(angle)
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return points.join(' ') + ' Z'
}

function ArtDecoBackground() {
  const center = 500

  return (
    <Container aria-hidden="true">
      <SVGContainer viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">

        {/* ═══════════════════════════════════════════════════════════
            레이어 1: 가장 바깥 - 극도로 느린 동심원들 (600초 = 10분 1회전)
        ═══════════════════════════════════════════════════════════ */}
        <RotatingGroup direction="cw" duration="600s">
          {[100, 150, 200, 250, 300, 350, 400, 450, 500, 550].map((r, i) => (
            <circle
              key={`outer-circle-${i}`}
              cx={center}
              cy={center}
              r={r}
              style={i % 3 === 0 ? styles.subtle : styles.whisper}
            />
          ))}
        </RotatingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 2: 반대 방향 다각형들 (480초)
        ═══════════════════════════════════════════════════════════ */}
        <RotatingGroup direction="ccw" duration="480s">
          {/* 팔각형들 */}
          {[120, 200, 280, 360, 440].map((r, i) => (
            <polygon
              key={`octagon-${i}`}
              points={createPolygonPoints(center, center, r, 8)}
              style={styles.faint}
            />
          ))}
        </RotatingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 3: 육각형 그리드 (540초, 반대방향)
        ═══════════════════════════════════════════════════════════ */}
        <RotatingGroup direction="cw" duration="540s">
          {[90, 160, 230, 300, 370, 440].map((r, i) => (
            <polygon
              key={`hexagon-${i}`}
              points={createPolygonPoints(center, center, r, 6)}
              style={styles.whisper}
            />
          ))}
        </RotatingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 4: 12각형 (도데카곤) - 시계 같은 정교함 (720초)
        ═══════════════════════════════════════════════════════════ */}
        <RotatingGroup direction="ccw" duration="720s">
          {[180, 280, 380, 480].map((r, i) => (
            <polygon
              key={`dodecagon-${i}`}
              points={createPolygonPoints(center, center, r, 12)}
              style={styles.faint}
            />
          ))}
        </RotatingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 5: 피보나치 스파이럴 (황금비) - 매우 느리게 (900초)
        ═══════════════════════════════════════════════════════════ */}
        <RotatingGroup direction="cw" duration="900s">
          <path
            d={createFibonacciSpiral(center, center, 0.8)}
            style={{ ...styles.subtle, strokeWidth: 0.4 }}
          />
        </RotatingGroup>
        <RotatingGroup direction="ccw" duration="1080s">
          <path
            d={createFibonacciSpiral(center, center, 1.2)}
            style={{ ...styles.whisper, strokeWidth: 0.3 }}
          />
        </RotatingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 6: 물결치는 원들 (360초)
        ═══════════════════════════════════════════════════════════ */}
        <RotatingGroup direction="cw" duration="360s">
          <path d={createWavyCircle(center, center, 220, 8, 8)} style={styles.whisper} />
          <path d={createWavyCircle(center, center, 320, 12, 6)} style={styles.faint} />
          <path d={createWavyCircle(center, center, 420, 16, 4)} style={styles.whisper} />
        </RotatingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 7: 방사형 라인들 - 24개 (매우 정교함, 800초)
        ═══════════════════════════════════════════════════════════ */}
        <RotatingGroup direction="ccw" duration="800s">
          {[...Array(24)].map((_, i) => {
            const angle = (Math.PI / 12) * i
            return (
              <line
                key={`radial-${i}`}
                x1={center + 80 * Math.cos(angle)}
                y1={center + 80 * Math.sin(angle)}
                x2={center + 520 * Math.cos(angle)}
                y2={center + 520 * Math.sin(angle)}
                style={i % 2 === 0 ? styles.whisper : { ...styles.whisper, opacity: 0.03 }}
              />
            )
          })}
        </RotatingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 8: 호흡하는 다이아몬드들 (60초 펄스)
        ═══════════════════════════════════════════════════════════ */}
        <BreathingGroup duration="60s" delay="0s">
          <polygon
            points={createPolygonPoints(center, center, 250, 4)}
            style={styles.faint}
          />
        </BreathingGroup>
        <BreathingGroup duration="75s" delay="15s">
          <polygon
            points={createPolygonPoints(center, center, 180, 4)}
            style={styles.whisper}
          />
        </BreathingGroup>
        <BreathingGroup duration="90s" delay="30s">
          <polygon
            points={createPolygonPoints(center, center, 350, 4)}
            style={styles.whisper}
          />
        </BreathingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 9: 중첩 사각형들 (다른 각도로 회전, 420초)
        ═══════════════════════════════════════════════════════════ */}
        <RotatingGroup direction="cw" duration="420s">
          {[50, 70, 90, 110, 130].map((size, i) => (
            <rect
              key={`inner-rect-${i}`}
              x={center - size}
              y={center - size}
              width={size * 2}
              height={size * 2}
              transform={`rotate(${45 + i * 5}, ${center}, ${center})`}
              style={styles.whisper}
            />
          ))}
        </RotatingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 10: 점들의 원형 배열 (페이딩, 45초)
        ═══════════════════════════════════════════════════════════ */}
        <FadingGroup duration="45s" delay="0s">
          {[200, 280, 360, 440].map((r, ringIdx) => (
            <g key={`dot-ring-${ringIdx}`}>
              {[...Array(ringIdx === 0 ? 12 : ringIdx === 1 ? 18 : ringIdx === 2 ? 24 : 30)].map((_, i, arr) => {
                const angle = (2 * Math.PI / arr.length) * i
                return (
                  <circle
                    key={`dot-${ringIdx}-${i}`}
                    cx={center + r * Math.cos(angle)}
                    cy={center + r * Math.sin(angle)}
                    r={1.5}
                    style={styles.dot}
                  />
                )
              })}
            </g>
          ))}
        </FadingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 11: 삼각형 패턴 (660초, 반대방향)
        ═══════════════════════════════════════════════════════════ */}
        <RotatingGroup direction="ccw" duration="660s">
          {[140, 240, 340, 440].map((r, i) => (
            <polygon
              key={`triangle-${i}`}
              points={createPolygonPoints(center, center, r, 3)}
              style={styles.whisper}
            />
          ))}
        </RotatingGroup>
        <RotatingGroup direction="cw" duration="780s">
          {[180, 280, 380, 480].map((r, i) => (
            <polygon
              key={`triangle-inv-${i}`}
              points={createPolygonPoints(center, center, r, 3, Math.PI / 2)}
              style={{ ...styles.whisper, opacity: 0.04 }}
            />
          ))}
        </RotatingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 12: 아트데코 코너 장식 (50초 페이드)
        ═══════════════════════════════════════════════════════════ */}
        <FadingGroup duration="50s" delay="10s">
          {[
            { x: center - 450, y: center - 450, rotate: 0 },
            { x: center + 450, y: center - 450, rotate: 90 },
            { x: center + 450, y: center + 450, rotate: 180 },
            { x: center - 450, y: center + 450, rotate: 270 },
          ].map((corner, i) => (
            <g
              key={`corner-${i}`}
              transform={`translate(${corner.x}, ${corner.y}) rotate(${corner.rotate})`}
            >
              {/* 복잡한 아트데코 코너 */}
              <path
                d="M 0 0 L 60 0 L 60 3 L 3 3 L 3 60 L 0 60 Z"
                style={styles.faint}
              />
              <path
                d="M 8 8 L 50 8 L 50 10 L 10 10 L 10 50 L 8 50 Z"
                style={styles.whisper}
              />
              <path
                d="M 15 15 L 40 15 L 40 17 L 17 17 L 17 40 L 15 40 Z"
                style={{ ...styles.whisper, opacity: 0.04 }}
              />
              <circle cx={25} cy={25} r={3} style={styles.dot} />
            </g>
          ))}
        </FadingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 13: 중앙 만다라 패턴 (매우 정교함, 1200초)
        ═══════════════════════════════════════════════════════════ */}
        <RotatingGroup direction="cw" duration="1200s">
          {/* 중앙 꽃잎 패턴 */}
          {[...Array(16)].map((_, i) => {
            const angle = (Math.PI / 8) * i
            const x1 = center + 30 * Math.cos(angle)
            const y1 = center + 30 * Math.sin(angle)
            const x2 = center + 100 * Math.cos(angle)
            const y2 = center + 100 * Math.sin(angle)
            const cx1 = center + 70 * Math.cos(angle + 0.2)
            const cy1 = center + 70 * Math.sin(angle + 0.2)
            const cx2 = center + 70 * Math.cos(angle - 0.2)
            const cy2 = center + 70 * Math.sin(angle - 0.2)
            return (
              <path
                key={`petal-${i}`}
                d={`M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2} Q ${cx2} ${cy2} ${x1} ${y1}`}
                style={styles.whisper}
              />
            )
          })}
        </RotatingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 14: 흐르는 곡선 (대시 애니메이션, 120초)
        ═══════════════════════════════════════════════════════════ */}
        <RotatingGroup direction="ccw" duration="960s">
          <FlowingPath
            d={createFibonacciSpiral(center, center, 1.5)}
            style={{ ...styles.whisper, strokeDasharray: '10 20 5 15' }}
            duration="180s"
          />
        </RotatingGroup>

        {/* ═══════════════════════════════════════════════════════════
            레이어 15: 펄스하는 중앙 장식
        ═══════════════════════════════════════════════════════════ */}
        <PulsingGroup duration="40s" delay="0s">
          <circle cx={center} cy={center} r={25} style={styles.faint} />
          <circle cx={center} cy={center} r={35} style={styles.whisper} />
          <circle cx={center} cy={center} r={45} style={{ ...styles.whisper, opacity: 0.04 }} />
        </PulsingGroup>

      </SVGContainer>
    </Container>
  )
}

export default ArtDecoBackground
