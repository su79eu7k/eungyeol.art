import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './components/NavBar'
import About from './pages/About'
import Arts from './pages/Arts'
import Landing from './pages/Landing'

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
