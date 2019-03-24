import { ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO } from "../actionTypes";

const reducer = (state: any[]=[], action) => {
  switch (action.type) {
    case INIT_TOMATOES:
      return [...action.payload]
    case ADD_TOMATO:
      return [action.payload, ...state]
    case UPDATE_TOMATO:
      return state.map(tomato => {
        return tomato.id === action.payload.id ? action.payload : tomato;
      })
    default:
      return state
  }
}

export default reducer
