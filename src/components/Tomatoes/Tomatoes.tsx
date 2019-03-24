import * as React from 'react'
import { connect } from 'react-redux'
import {initTomatoes, addTomato, updateTomato} from "../../store/tomatoes/action";
import { message } from 'antd'
import axios from '../../config/axios'
import TomatoAction from './TomatoAction'
import './Tomatoes.scss'

interface IProps {
  tomatoes: any[]
  initTomatoes: (payload: any) => any
  addTomato: (payload: any) => any
  updateTomato: (payload: any) => any
}

interface IState {

}

class Tomatoes extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  get unfinishedTomato() {
    return this.props.tomatoes.find(tomato => !tomato.description && !tomato.ended_at && !tomato.aborted)
  }

  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes')
      this.props.initTomatoes(response.data.resources)
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  async componentDidMount() {
    await this.getTomatoes()
  }

  private startTomato = async() => {
    try {
      const response = await axios.post('tomatoes', {
        duration: 25 * 60 * 1000
      })
      this.props.addTomato(response.data.resource)
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  public render() {
    return (
      <div className="tomatoes" id="tomatoes">
        <TomatoAction
          unfinishedTomato={this.unfinishedTomato}
          startTomato={this.startTomato}
          updateTomato={this.props.updateTomato}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})
const mapDispatchToProps = {
  initTomatoes,
  addTomato,
  updateTomato
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tomatoes)