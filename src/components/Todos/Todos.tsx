import * as React from 'react'
import TodoInput from '../TodoInput/TodoInput'
import axios from '../../config/axios'
import { message } from 'antd'
import './Todo.scss'

interface IProps {

}
interface IState {

}

class Todos extends React.Component<IProps, IState> {
  private addTodo = async (params: any) => {
    try {
      const response = await axios.post('todos', params)
      console.log(response.data);
    }
    catch (e) {
      message.error(e.toString())
    }
  }

  public render() {
    return (
      <div className="todos" id="todos">
        <TodoInput addTodo={(params) => this.addTodo(params)}/>
      </div>
    )
  }
}

export default Todos