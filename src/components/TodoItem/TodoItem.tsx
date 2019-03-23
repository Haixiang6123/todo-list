import * as React from 'react'
import { Checkbox, Icon, Input } from 'antd'
import './TodoItem.scss'

interface IProps {
  id: number
  completed: boolean
  deleted: boolean
  description: string
  updateTodo: (id: number, params: any) => void
  editTodo: (id: number) => void
  editing: boolean
}
interface IState {
  editText: string
}

class TodoItem extends React.Component<IProps, IState> {
  private ENTER = 13
  constructor(props) {
    super(props);
    this.state = {
      editText: this.props.description
    }
  }

  private updateTodo = (params: any) => {
    this.props.updateTodo(this.props.id, params)
  }

  private editTodo = () => {
    this.props.editTodo(this.props.id)
  }

  private onKeyUp = (e) => {
    if (e.keyCode === this.ENTER && this.state.editText !== '') {
      this.updateTodo({description: this.state.editText})
    }
  }

  public render() {
    const { editText } = this.state
    const { description, completed, editing } = this.props

    const Editing = (
      <div className="todo-item-editing">
        <Input
          className="todo-item-editing-input"
          size="small"
          type="text"
          value={editText}
          onChange={e => this.setState({editText: e.target.value})}
          onKeyUp={e => this.onKeyUp(e)}/>
        <div className="todo-item-editing-actions">
          <Icon type="enter"/>
          <Icon type="delete" theme="filled" onClick={() => this.updateTodo({deleted: true})}/>
        </div>
      </div>
    )
    const Text = <span onDoubleClick={this.editTodo}>{description}</span>

    return (
      <div className="todo-item">
        <Checkbox
          checked={completed}
          onChange={e => this.updateTodo({completed: e.target.checked})}>
        </Checkbox>
        {
          editing ? Editing : Text
        }
      </div>
    )
  }
}

export default TodoItem