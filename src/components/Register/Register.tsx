import * as React from 'react'
import { Button, Input, Icon } from 'antd'

interface IProps {

};
interface IState {
  account: string
  confirmPassword: string
  password: string
};

class Register extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      confirmPassword: '',
      password: ''
    }
  }

  private onChangeAccount = (e) => {
    this.setState({
      account: e.target.value
    })
  }

  private register = () => {
    console.log('register')
  }

  public render() {
    const { account } = this.state
    return (
      <div className="register">
        <Input
          prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, 0.25)'}}/>}
          placeholder="Account"
          value={account}
          onChange={this.onChangeAccount}
        />
        <Button onClick={this.register} htmlType="button">Register</Button>
      </div>
    )
  }
}

export default Register