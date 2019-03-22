import * as React from 'react'
import { Button, Input, Icon } from 'antd'
import axios from '../../config/axios'

interface IProps {

}
interface IState {
  account: string
  confirmPassword: string
  password: string
}

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

  private onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  private onChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value
    })
  }

  private register = async () => {
    const { account, password, confirmPassword} = this.state
    try {
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: confirmPassword
      })
      console.log('success');
    }
    catch (e) {
      throw new Error(e)
    }
  }

  public render() {
    const { account, password, confirmPassword } = this.state
    return (
      <div className="register">
        <Input
          prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, 0.25)'}}/>}
          placeholder="Account"
          value={account}
          onChange={this.onChangeAccount}
        />
        <Input.Password value={password} onChange={this.onChangePassword} placeholder="Password" />
        <Input.Password value={confirmPassword} onChange={this.onChangeConfirmPassword} placeholder="Password" />
        <Button onClick={this.register} htmlType="button">Register</Button>
      </div>
    )
  }
}

export default Register