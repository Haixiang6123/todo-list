import * as React from 'react'
import { connect } from 'react-redux'
import { addTomato } from "../../store/tomatoes/action";
import TomatoAction from './TomatoAction'
import './Tomatoes.scss'

class Tomatoes extends React.Component {
  public render() {
    return (
      <div className="tomatoes" id="tomatoes">
        <TomatoAction/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})
const mapDispatchToProps = {
  addTomato
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tomatoes)