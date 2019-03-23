import * as React from 'react';
import {Router, Route} from "react-router-dom"
import history from './config/history'
import Index from './components/Index/Index'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import './App.scss';

class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <Route exact={true} path="/" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Router>
    )
  }
}

export default App;
