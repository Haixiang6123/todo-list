import * as React from 'react'
import { Button, Input, message } from 'antd'
import Counter from '../Counter/Counter'
import axios from '../../config/axios'

interface IProps {
  startTomato: (payload: any) => any
  unfinishedTomato: any
}
interface IState {
  description: string
}

class TomatoAction extends React.Component<IProps, IState> {
  private ENTER = 13
  constructor(props) {
    super(props);
    this.state = {
      description: ''
    }
  }

  private onKeyUp = async (e) => {
    if (e.keyCode === this.ENTER && this.state.description !== '') {
      await this.addDescription()
    }
  }

  private addDescription = async () => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, {
        description: this.state.description,
        ended_at: new Date()
      })
      console.log(response);
      this.setState({ description: '' })
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  public render() {
    let html = <div/>
    if (!this.props.unfinishedTomato) {
      html = (
        <Button
          size="large"
          block={true}
          htmlType="button"
          onClick={this.props.startTomato}
          type="primary">
          Start A Tomato
        </Button>
      )
    }
    else {
      const startedAt = Date.parse(this.props.unfinishedTomato.started_at)
      const duration = this.props.unfinishedTomato.duration
      const timeNow = new Date().getTime()
      if (timeNow - startedAt > duration) {
        html = (
          <div>
            <Input
              placeholder="Enter Works You have Done"
              value={this.state.description}
              onChange={e => this.setState({description: e.target.value})}
              onKeyUp={e => this.onKeyUp(e)}
            />
          </div>
        )
      }
      else {
        html = <Counter/>
      }
    }
    return (
      <div className="tomato-action" id="tomato-action">
        {html}
      </div>
    )
  }
}

export default TomatoAction