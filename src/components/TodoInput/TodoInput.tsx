import * as React from 'react'
import { connect } from 'react-redux'
import { addTodo } from "../../store/todos/action";
import { Input, Icon, message } from 'antd'
import axios from '../../config/axios'

interface IProps {
  addTodo: (payload) => any
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
      await this.addTodo()
    }
  }

  private emptyInput = () => {
    this.setState({ description: '' })
  }

  private addTodo = async () => {
    try {
      const response = await axios.post('todos', {
        description: this.state.description
      })
      this.props.addTodo(response.data.resource)
      // Clear Input
      this.emptyInput()
    }
    catch (e) {
      message.error(e.toString())
    }
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
)(TodoInput)