import * as React from 'react'
import { connect } from 'react-redux'
import { initTodos, addTodo, updateTodo, editTodo } from "../../store/todos/action";
import TodoInput from '../TodoInput/TodoInput'
import TodoItem from '../TodoItem/TodoItem'
import axios from '../../config/axios'
import { message } from 'antd'
import './Todo.scss'

interface IProps {
  todos: any[]
  initTodos: (payload: any) => any
  addTodo: (payload: any) => any
  updateTodo: (payload: any) => any
  editTodo: (payload: any) => any
}

class Todos extends React.Component<IProps, null> {
  constructor(props) {
    super(props)
  }

  get unDeletedTodos() {
    return this.props.todos.filter(todo => !todo.deleted)
  }

  get unCompletedTodos() {
    return this.unDeletedTodos.filter(todo => !todo.completed)
  }

  get completedTodos() {
    return this.unDeletedTodos.filter(todo => todo.completed)
  }

  private getTodos = async () => {
    try {
      const response = await axios.get('todos')
      const todos = response.data.resources.map(todo => Object.assign({}, todo, {editing: false}))
      this.props.initTodos(todos)
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  private updateTodo = async (id: number, params: any) => {
    try {
      const response = await axios.put(`todos/${id}`, params)
      this.props.updateTodo(response.data.resource)
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  private editTodo = (id: number) => {
    this.props.editTodo(id)
  }

  async componentDidMount(){
    await this.getTodos()
  }

  public render() {
    return (
      <div className="todos" id="todos">
        <TodoInput/>
        <div className="todos-list">
          <p className="todos-list-header">Todo</p>
          {
            this.unCompletedTodos.map(todo => {
              return <TodoItem editTodo={this.editTodo} updateTodo={this.updateTodo} key={todo.id} {...todo}/>
            })
          }
          <p className="todos-list-header">Completed Todo</p>
          {
            this.completedTodos.map(todo => {
              return <TodoItem editTodo={this.editTodo} updateTodo={this.updateTodo} key={todo.id} {...todo}/>
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  ...ownProps
})
const mapDispatchToProps = {
  initTodos,
  addTodo,
  updateTodo,
  editTodo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)