import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import About from './pages/About'
import Arts from './pages/Arts'
import Landing from './pages/Landing'

const StyledContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: stretch;

  & main {
    min-height: 60vh;
  }
`

function App() {
  return (
    <BrowserRouter>
    <StyledContainer>
      <NavBar />
      <main>
        <Switch>
          <Redirect from='/' to='/home' exact />
          <Route path='/home'>
            <Landing />
          </Route>
          <Route path='/arts'>
            <Arts />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
        </Switch>
      </main>
      <Footer />
      </StyledContainer>
    </BrowserRouter>
  );
}

export default App;
