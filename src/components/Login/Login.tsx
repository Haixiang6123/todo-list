import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Icon, message } from 'antd'
import axios from '../../config/axios'
import './Login.scss'
interface IProps {
  history: any
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

  private onChange = (key: string, value: string): void => {
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }

  private login = async () => {
    const { account, password } = this.state
    try {
      await axios.post('sign_in/user', {
        account,
        password,
      })
      message.success('Login Successfully');
      this.props.history.push('/index')
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
          onChange={e => this.onChange('account', e.target.value)}
        />
        <Input.Password
          value={password}
          onChange={e => this.onChange('password', e.target.value)}
          placeholder="Password" />
        <Button
          block={true}
          type="primary"
          onClick={this.login}
          htmlType="button">
          Login
        </Button>
        <p>If you don't have account, click here to <Link to="/register">login</Link></p>
      </div>
    )
  }
}

export default Login