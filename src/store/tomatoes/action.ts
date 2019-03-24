import { ADD_TOMATO } from "../actionTypes";

export const addTomato = (payload) => {
  return {
    type: ADD_TOMATO,
    payload
  }
}