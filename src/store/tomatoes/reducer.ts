import {ADD_TOMATO, INIT_TOMATOES} from "../actionTypes";

const reducer = (state: any[]=[], action) => {
  switch (action.type) {
    case ADD_TOMATO:
      return [action.payload, ...state]
    case INIT_TOMATOES:
      return [...action.payload]
    default:
      return state
  }
}

export default reducer
