import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // localStorage에서 저장된 언어 설정 불러오기
    const saved = localStorage.getItem('language')
    return saved || 'Korean'
  })

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const newLang = prev === 'English' ? 'Korean' : 'English'
      localStorage.setItem('language', newLang)
      return newLang
    })
  }, [])

  const value = useMemo(() => ({
    lang,
    toggleLang
  }), [lang, toggleLang])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext
