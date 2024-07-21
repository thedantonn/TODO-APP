// src/redux/reducers.js

import { ADD_TODO, TOGGLE_COMPLETE, DELETE_TODO, EDIT_TODO } from './action';

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodos = [action.payload, ...state.todos];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { ...state, todos: newTodos };
    case TOGGLE_COMPLETE:
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { ...state, todos: updatedTodos };
    case DELETE_TODO:
      const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(filteredTodos));
      return { ...state, todos: filteredTodos };
    case EDIT_TODO:
      const editedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      );
      localStorage.setItem('todos', JSON.stringify(editedTodos));
      return { ...state, todos: editedTodos };
    default:
      return state;
  }
};

export default todoReducer;
