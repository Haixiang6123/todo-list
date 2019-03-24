import * as React from 'react'
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

export default Tomatoes