import { INIT_TOMATOES, ADD_TOMATO, UPDATE_TOMATO } from "../actionTypes";

export const initTomatoes = (payload) => {
  return {
    type: INIT_TOMATOES,
    payload
  }
}

export const addTomato = (payload) => {
  return {
    type: ADD_TOMATO,
    payload
  }
}

export const updateTomato = (payload) => {
  return {
    type: UPDATE_TOMATO,
    payload
  }
}