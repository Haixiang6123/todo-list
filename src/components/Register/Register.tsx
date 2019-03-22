import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Icon, message } from 'antd'
import axios from '../../config/axios'
import './Register.scss'
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
      message.success(`Register successfully, ${account}`);
    }
    catch (e) {
      message.error(e.toString());
    }
  }

  public render() {
    const { account, password, confirmPassword } = this.state
    return (
      <div className="register" id="register">
        <h1>Todo Register</h1>
        <Input
          prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, 0.25)'}}/>}
          placeholder="Account"
          value={account}
          onChange={this.onChangeAccount}
        />
        <Input.Password value={password} onChange={this.onChangePassword} placeholder="Password" />
        <Input.Password value={confirmPassword} onChange={this.onChangeConfirmPassword} placeholder="Password" />
        <Button block={true} type="primary" onClick={this.register} htmlType="button">Register</Button>
        <p>If you have account, click here to <Link to="/login">login</Link></p>
      </div>
    )
  }
}

export default Register