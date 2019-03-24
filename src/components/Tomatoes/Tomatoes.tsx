import * as React from 'react'
import { connect } from 'react-redux'
import { initTomatoes, addTomato } from "../../store/tomatoes/action";
import { message } from 'antd'
import axios from '../../config/axios'
import TomatoAction from './TomatoAction'
import './Tomatoes.scss'

interface IProps {
  tomatoes: any[]
  addTomato: (payload: any) => any
}

interface IState {

}

class Tomatoes extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  get unfinishedTomato() {
    return this.props.tomatoes.find(tomato => !tomato.description && !tomato.ender_at)
  }

  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes')
      console.log(response);
    }
    catch (e) {

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
        <TomatoAction unfinishedTomato={this.unfinishedTomato} startTomato={this.startTomato}/>
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
  addTomato
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tomatoes)