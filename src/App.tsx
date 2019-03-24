import * as React from 'react';
import {Router, Route} from "react-router-dom"
import history from './config/history'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import './App.scss';

class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Router>
    )
  }
}

export default App;
