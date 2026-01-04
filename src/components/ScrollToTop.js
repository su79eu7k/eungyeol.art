import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 페이지 전환 시 스크롤 위치를 맨 위로 복원하는 컴포넌트
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

export default ScrollToTop
