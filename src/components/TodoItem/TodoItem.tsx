import * as React from 'react'
import { Checkbox } from 'antd'

interface IProps {
  id: number
  completed: boolean
  deleted: boolean
  description: string
  updateTodo: (id: number, params: any) => void
}
interface IState {

}

class TodoItem extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    console.log(props)
  }

  private updateTodo = (params: any) => {
    this.props.updateTodo(this.props.id, params)
  }

  public render() {
    return (
      <div className="todo-item">
        <Checkbox
          checked={this.props.completed}
          onChange={e => this.updateTodo({completed: e.target.checked})}>
          {this.props.description}
        </Checkbox>
      </div>
    )
  }
}

export default TodoItem