import * as React from 'react'

interface IProps {
  timer: number
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
      console.log(this.state.counter);
      if (this.state.counter <= 0) {
        window.clearInterval(this.timerId)
      }
      this.setState({
        counter: this.state.counter - 1000
      })
    }, 1000)
  }

  public render() {
    const min = Math.floor(this.state.counter / 1000 / 60)
    const second = Math.floor(this.state.counter / 1000 % 60)
    const time = `${min}: ${second < 10 ? `0${second}`: second}`
    return (
      <div>
        <div>
          {time}
        </div>
      </div>
    )
  }
}

export default Counter