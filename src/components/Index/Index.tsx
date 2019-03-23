import * as React from 'react'
import axios from '../../config/axios'
import { message, Dropdown, Icon, Menu } from 'antd'
import Todos from '../Todos/Todos'
import history from '../../config/history'
import './Index.scss'

interface User {
  account: string
  password: string
}
interface IProps {
  history: any
}
interface IState {
  user: User
}


const logout = () => {
  localStorage.setItem('x-token', '')
  history.push('/login')
}

const menu = (
  <Menu>
    <Menu.Item key="1"><Icon type="setting"/>Settings</Menu.Item>
    <Menu.Item key="2" onClick={logout}><Icon type="logout"/>Logout</Menu.Item>
  </Menu>
)

class Index extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        account: '',
        password: ''
      }
    }
  }

  async componentDidMount() {
    await this.getUserInfo()
  }

  private getUserInfo = async () => {
    try {
      const response = await axios.get('me')
      console.log(response);
      this.setState({
        user: response.data
      })
      message.success('Welcome')
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  public render() {
    return (
      <div className="index" id="index">
        <header>
          <span className="logo">LOGO</span>
          <Dropdown className="dropdown" overlay={menu}>
            <span>
              <span>{this.state.user && this.state.user.account}</span>
              <Icon className="dropdown-icon" type="down"/>
            </span>
          </Dropdown>
        </header>

        <main>
          <Todos/>
        </main>
      </div>
    )
  }
}

export default Index