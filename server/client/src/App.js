import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>

      <Route path='/contact'>
        <Contact/>
      </Route>

      <Route path='/about'>
        <About/>
      </Route>

      <Route path='/login'>
        <Login/>
      </Route>

      <Route path='/signup'>
        <Signup/>
      </Route>
      </Switch>
    </div>
  )
}

export default App;
