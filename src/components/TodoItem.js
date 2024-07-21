// src/components/TodoItem.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo, editTodo } from '../redux/actions';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    const newTitle = prompt('Edit the title:', todo.title);
    if (newTitle) {
      dispatch(editTodo(todo.id, newTitle));
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleComplete(todo.id))}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title}
      </span>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
    </div>
  );
};

export default TodoItem;
