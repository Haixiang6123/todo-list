import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Icon, message } from 'antd'
import axios from '../../config/axios'
import './Login.scss'
interface IProps {

}
interface IState {
  account: string
  password: string
}

class Login extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
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

  private login = async () => {
    const { account, password } = this.state
    try {
      await axios.post('sign_in/user', {
        account,
        password,
      })
      message.success(`Welcome, ${account}`);
    }
    catch (e) {
      message.error(e.toString());
    }
  }

  public render() {
    const { account, password } = this.state
    return (
      <div className="login" id="login">
        <h1>Todo Login</h1>
        <Input
          prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, 0.25)'}}/>}
          placeholder="Account"
          value={account}
          onChange={this.onChangeAccount}
        />
        <Input.Password value={password} onChange={this.onChangePassword} placeholder="Password" />
        <Button block={true} type="primary" onClick={this.login} htmlType="button">Login</Button>
        <p>If you don't have account, click here to <Link to="/register">login</Link></p>
      </div>
    )
  }
}

export default Login