import todos from './todos/reducer'
import tomatoes from './tomatoes/reducer'
import { combineReducers } from "redux";

export default combineReducers({
  todos,
  tomatoes
})