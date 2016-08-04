import * as actionTypes from '../constants/actionTypes';

export function addTodo(data) {
  return {
    type: actionTypes.ADD_TODO,
    data,
  };
}

export function removeTodo(data) {
  return {
    type: actionTypes.REMOVE_TODO,
    data,
  };
}

export function toggleTodo(data) {
  return {
    type: actionTypes.TOGGLE_TODO,
    data,
  };
}
