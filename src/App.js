import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import About from './pages/About'
import Arts from './pages/Arts'
import Home from './pages/Home'
import Landing from './pages/Landing'

const StyledContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: stretch;
  min-height: inherit;
  & main {
    padding-top: 2vh;
    padding-bottom: 2vh;
  }
`

function App() {
  const [lang, setLang] = useState('Korean')

  return (
    <BrowserRouter>
    <Landing lang={lang} setLang={setLang} />
    <StyledContainer>
      <NavBar lang={lang} setLang={setLang} />
      <main>
        <Switch>
          <Redirect from='/' to='/home' exact />
          <Route path='/home'>
            <Home lang={lang} setLang={setLang} />
          </Route>
          <Route path='/arts'>
            <Arts />
          </Route>
          <Route path='/about'>
            <About lang={lang} setLang={setLang} />
          </Route>
        </Switch>
      </main>
      <Footer />
      </StyledContainer>
    </BrowserRouter>
  );
}

export default App;
