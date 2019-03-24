import {ADD_TODO, EDIT_TODO, INIT_TODOS, UPDATE_TODO} from "../actionTypes";

export const initTodos = (payload: any[]) => {
  return {
    type: INIT_TODOS,
    payload
  }
}

export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload
  }
}

export const updateTodo = (payload) => {
  return {
    type: UPDATE_TODO,
    payload
  }
}

export const editTodo = (payload) => {
  return {
    type: EDIT_TODO,
    payload
  }
}
