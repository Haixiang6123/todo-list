import * as React from 'react'
import { connect } from 'react-redux'
import { editTodo, updateTodo } from "../../store/todos/action";
import axios from '../../config/axios'
import { Checkbox, Icon, Input, message } from 'antd'
import classnames from 'classnames'
import './TodoItem.scss'

interface IProps {
  id: number
  completed: boolean
  deleted: boolean
  description: string
  updateTodo: (params: any) => void
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

  private updateTodo = async (params: any) => {
    try {
      const response = await axios.put(`todos/${this.props.id}`, params)
      this.props.updateTodo(response.data.resource)
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  private editTodo = () => {
    this.props.editTodo(this.props.id)
  }

  private onKeyUp = async (e) => {
    if (e.keyCode === this.ENTER && this.state.editText !== '') {
      await this.updateTodo({description: this.state.editText})
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
          <Icon style={{marginRight: 8}} theme="filled" type="lock" onClick={() => this.updateTodo({description: editText})}/>
          <Icon type="delete" theme="filled" onClick={() => this.updateTodo({deleted: true})}/>
        </div>
      </div>
    )
    const Text = <span className="text" onDoubleClick={this.editTodo}>{description}</span>
    const todoItemClass = classnames({
      'todo-item': true,
      editing,
      completed
    })

    return (
      <div className={todoItemClass}>
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

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
})
const mapDispatchToProps = {
  editTodo,
  updateTodo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem)