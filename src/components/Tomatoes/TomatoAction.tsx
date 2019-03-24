import * as React from 'react'
import { Button } from 'antd'

interface IProps {
  startTomato: (payload: any) => any
  unfinishedTomato: any
}
interface IState {

}

class TomatoAction extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className="tomato-action" id="tomato-action">
        <Button
          size="large"
          block={true}
          htmlType="button"
          onClick={this.props.startTomato}
          type="primary">
          Start A Tomato
        </Button>
      </div>
    )
  }
}

export default TomatoAction