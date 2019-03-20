import { Button, Rate } from 'antd';
import * as React from 'react';
import './App.scss';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Rate character="6"/>
        <Button>Hello</Button>
      </div>
    );
  }
}

export default App;
