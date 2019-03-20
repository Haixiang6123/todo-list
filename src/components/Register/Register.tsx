import * as React from 'react'
import { Button } from 'antd'

class Component extends React.Component {
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className="register">
        <Button onClick={this.register} htmlType="button">Register</Button>
      </div>
    )
  }

  private register = () => {
    console.log('register')
  }
}

export default Component