import * as React from 'react'
import {Button} from 'antd'

class Component extends React.Component {
  constructor(props: any) {
    super(props)
 }

  public render() {
    return (
      <div className="login">
        <Button onClick={this.login} htmlType="button">Login</Button>
      </div>
    )
  }
  private login = () => {
    console.log('login')
  }
}

export default Component