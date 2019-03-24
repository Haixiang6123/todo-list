import todosReducer from './todos/reducer'
import { combineReducers } from "redux";

export default combineReducers(todosReducer)