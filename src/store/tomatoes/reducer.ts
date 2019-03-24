import { ADD_TOMATO } from "../actionTypes";

const reducer = (state: any[]=[], action) => {
  switch (action.type) {
    case ADD_TOMATO:
      return [action.payload, ...state]
    default:
      return state
  }
}

export default reducer
