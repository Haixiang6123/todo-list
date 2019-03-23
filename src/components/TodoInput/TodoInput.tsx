import * as React from 'react'
import { Input, Icon } from 'antd'

interface IProps {
  addTodo: (HTMLEvent) => void
}
interface IState {
  description: string
}

class TodoInput extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }
  }

  private ENTER = 13

  private onKeyUp = async (e) => {
    if (e.keyCode === this.ENTER && this.state.description !== '') {
      this.addTodo()
    }
  }

  private emptyInput = () => {
    this.setState({ description: '' })
  }

  private addTodo = () => {
    this.props.addTodo({ description: this.state.description })
    // Clear Input
    this.emptyInput()
  }

  private onChange = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  public render() {
    const { description } = this.state
    const suffix = description ? <Icon type="enter" onClick={this.addTodo}/> : <span/>;
    return (
      <div id="todo-input" className="todo-input">
        <Input
          placeholder="Add A New Todo"
          size="large"
          suffix={suffix}
          value={description}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
        />
      </div>
    )
  }
}

export default TodoInput