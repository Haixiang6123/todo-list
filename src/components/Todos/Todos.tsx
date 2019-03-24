import * as React from 'react'
import { connect } from 'react-redux'
import { addTodo } from "../../store/todos/action";
import TodoInput from '../TodoInput/TodoInput'
import TodoItem from '../TodoItem/TodoItem'
import axios from '../../config/axios'
import { message } from 'antd'
import './Todo.scss'

interface Todo {
  id: number
  description: string
  completed: boolean
  deleted: boolean
  editing: boolean
}
interface IProps {

}
interface IState {
  todos: Todo[]
}

class Todos extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }

  get unDeletedTodos() {
    return this.state.todos.filter(todo => !todo.deleted)
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
      this.setState({todos})
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  private updateTodo = async (id: number, params: any) => {
    const { todos } = this.state
    try {
      const response = await axios.put(`todos/${id}`, params)
      const newTodos = todos.map(todo => {
        return id === todo.id ? response.data.resource : todo;
      })
      this.setState({ todos: newTodos })
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  private editTodo = (id: number) => {
    const { todos } = this.state

    const newTodos = todos.map(todo => {
      return Object.assign({}, todo, {editing: id === todo.id})
    })

    this.setState({ todos: newTodos })
  }

  async componentDidMount(){
    this.getTodos()
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
  addTodo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)