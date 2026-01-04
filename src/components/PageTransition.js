import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const TransitionWrapper = styled.div`
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? 0 : '8px'});
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  will-change: opacity, transform;
`

function PageTransition({ children }) {
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const [content, setContent] = useState(children)
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      // Fade out
      setVisible(false)

      const timer = setTimeout(() => {
        setContent(children)
        setVisible(true)
        prevPath.current = location.pathname
      }, 150)

      return () => clearTimeout(timer)
    } else {
      setContent(children)
    }
  }, [location.pathname, children])

  return (
    <TransitionWrapper $visible={visible}>
      {content}
    </TransitionWrapper>
  )
}

// 언어 전환용 래퍼
const LangTransitionWrapper = styled.div`
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.2s ease-out;
`

export function LanguageTransition({ children, lang }) {
  const [visible, setVisible] = useState(true)
  const [displayContent, setDisplayContent] = useState(children)
  const [currentLang, setCurrentLang] = useState(lang)
  const isTransitioning = useRef(false)

  useEffect(() => {
    // 언어가 변경되었을 때만 트랜지션 실행
    if (lang !== currentLang && !isTransitioning.current) {
      isTransitioning.current = true

      // 1. Fade out (현재 컨텐츠 유지)
      setVisible(false)

      // 2. fade-out 완료 후 컨텐츠 교체 및 fade-in
      const timer = setTimeout(() => {
        setDisplayContent(children)
        setCurrentLang(lang)
        setVisible(true)
        isTransitioning.current = false
      }, 200)

      return () => {
        clearTimeout(timer)
        isTransitioning.current = false
      }
    } else if (lang === currentLang) {
      // 언어가 같으면 컨텐츠만 업데이트 (트랜지션 없이)
      setDisplayContent(children)
    }
  }, [lang, children, currentLang])

  return (
    <LangTransitionWrapper $visible={visible}>
      {displayContent}
    </LangTransitionWrapper>
  )
}

export default PageTransition
