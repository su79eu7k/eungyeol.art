import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from './styles/theme'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ArtDecoBackground from './components/ArtDecoBackground'
import About from './pages/About'
import Arts from './pages/Arts'
import Home from './pages/Home'
import Landing from './pages/Landing'

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

function App() {
  const [lang, setLang] = useState('Korean')

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ArtDecoBackground />

      <Route exact path="/">
        <Landing />
      </Route>

      <Route path={['/home', '/arts', '/about']}>
        <AppContainer>
          <NavBar lang={lang} setLang={setLang} />
          <Main>
            <Switch>
              <Redirect from='/' to='/home' exact />
              <Route path='/home'>
                <Home lang={lang} />
              </Route>
              <Route path='/arts'>
                <Arts />
              </Route>
              <Route path='/about'>
                <About lang={lang} />
              </Route>
            </Switch>
          </Main>
          <Footer />
        </AppContainer>
      </Route>
    </BrowserRouter>
  )
}

export default App
