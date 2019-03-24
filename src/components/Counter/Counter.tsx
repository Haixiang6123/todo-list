import * as React from 'react'
import { Icon } from 'antd'
import './Counter.scss'

interface IProps {
  duration: number
  timer: number
  onFinish: () => void
  onCancel: () => void
}

interface IState {
  counter: number
}

class Counter extends React.Component<IProps, IState> {
  private timerId: number;
  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.timer
    }
  }

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      if (this.state.counter <= 0) {
        this.props.onFinish()
        window.clearInterval(this.timerId)
      }
      this.setState({
        counter: this.state.counter - 1000
      })
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId)
  }

  public render() {
    const min = Math.floor(this.state.counter / 1000 / 60)
    const second = Math.floor(this.state.counter / 1000 % 60)
    const time = `${min}: ${second < 10 ? `0${second}`: second}`
    const percent = 1 - this.state.counter / this.props.duration
    return (
      <div className="counter" id="counter">
        <Icon className="counter-close" type="close" onClick={this.props.onCancel}/>
        {time}
        <div className="counter-progress" style={{width: `${percent * 100}%`}}/>
      </div>
    )
  }
}

export default Counter