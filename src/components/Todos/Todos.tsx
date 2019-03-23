import * as React from 'react'
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

  private addTodo = async (params: any) => {
    const { todos } = this.state
    try {
      const response = await axios.post('todos', params)
      this.setState({
        todos: [response.data.resource, ...todos]
      })
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  private getTodos = async () => {
    try {
      let response = await axios.get('todos')
      this.setState({todos: response.data.resources})
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  private toggleTodo = async (id: number, params: any) => {
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

  async componentDidMount(){
    this.getTodos()
  }

  public render() {
    return (
      <div className="todos" id="todos">
        <TodoInput addTodo={(params) => this.addTodo(params)}/>
        <div className="todos-list">
          {
            this.state.todos.map(todo => {
              return <TodoItem toggleTodo={this.toggleTodo} key={todo.id} {...todo}/>
            })
          }
        </div>
      </div>
    )
  }
}

export default Todos