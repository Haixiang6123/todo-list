import * as React from 'react'
import axios from '../../config/axios'
import { Button, message } from 'antd'

class TomatoAction extends React.Component {
  private startTomato = async() => {
    try {
      const response = await axios.post('tomatoes', {
        duration: 25 * 60 * 1000
      })
      console.log(response);
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  public render() {
    return (
      <div className="tomato-action" id="tomato-action">
        <Button
          size="large"
          block={true}
          htmlType="button"
          onClick={this.startTomato}
          type="primary">
          Start A Tomato
        </Button>
      </div>
    )
  }
}

export default TomatoAction