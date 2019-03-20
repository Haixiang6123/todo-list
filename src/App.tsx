import * as React from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom"
import Index from './components/Index/Index'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import './App.scss';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
        <Route exac={true} path="/" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Router>
    )
  }
}

export default App;
