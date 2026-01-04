import { useEffect } from 'react'

const BASE_TITLE = '은결 - EunGyeol Art Gallery'

/**
 * 페이지별 동적 타이틀 설정 훅
 * @param {string} title - 페이지 제목
 * @param {string} lang - 언어 ('Korean' 또는 'English')
 */
export function usePageTitle(title, lang = 'Korean') {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${BASE_TITLE}`
    } else {
      document.title = BASE_TITLE
    }

    // html lang 속성 동적 변경
    document.documentElement.lang = lang === 'English' ? 'en' : 'ko'

    return () => {
      document.title = BASE_TITLE
    }
  }, [title, lang])
}

export default usePageTitle
