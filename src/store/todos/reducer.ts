import {ADD_TODO, EDIT_TODO, INIT_TODOS, UPDATE_TODO} from "../actionTypes";

const reducer = (state: any[]=[], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, ...action.payload]
    case INIT_TODOS:
      return [...action.payload]
    case UPDATE_TODO:
      return state.map(todo => {
        return todo.id === action.payload.id ? action.payload : todo;
      })
    case EDIT_TODO:
      return state.map(todo => {
        return Object.assign({}, todo, {editing: todo.id === action.payload})
      })
    default:
      return state
  }
}

export default reducer