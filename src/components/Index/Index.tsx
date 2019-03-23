import * as React from 'react'
import axios from '../../config/axios'
import { message, Button } from 'antd'

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

  private logout = () => {
    localStorage.setItem('x-token', '')
    this.props.history.push('/login')
  }

  public render() {
    return (
      <div className="Index">
        <p>Welcome, {this.state.user && this.state.user.account}</p>
        Home page
        <Button
          block={true}
          type="danger"
          onClick={this.logout}
          htmlType="button">
          Logout
        </Button>
      </div>
    )
  }
}

export default Index