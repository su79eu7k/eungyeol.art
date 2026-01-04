import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from './styles/theme'
import { LanguageProvider } from './contexts/LanguageContext'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ArtDecoBackground from './components/ArtDecoBackground'
import PageTransition from './components/PageTransition'

// Lazy loading for better performance
const Landing = lazy(() => import('./pages/Landing'))
const Home = lazy(() => import('./pages/Home'))
const Arts = lazy(() => import('./pages/Arts'))
const About = lazy(() => import('./pages/About'))

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
  }
`

// 메인 페이지용 레이아웃
function MainLayout() {
  return (
    <AppContainer>
      <NavBar />
      <Main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </Main>
      <Footer />
    </AppContainer>
  )
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ArtDecoBackground />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/arts" element={<Arts />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
