import * as React from 'react'
import { Button } from 'antd'

interface IRouter {
  history: any
}

class Component extends React.Component<IRouter> {
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className="Index">
        <Button onClick={this.login} htmlType="button">Login</Button>
      </div>
    )
  }

  private login = () => {
    this.props.history.push('/login')
  }
}

export default Component