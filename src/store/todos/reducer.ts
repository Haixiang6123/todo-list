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
      state.forEach(todo => {
        todo.editing = todo.id === action.payload;
      })
      return state
    default:
      return state
  }
}

export default reducer