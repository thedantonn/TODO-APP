import React, { useState } from 'react';
import { db } from './firebase'; // Import Firestore instance
import React from 'react';
function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Function to add a new todo
  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      await db.collection('todos').add({
        text: newTodo,
        completed: false,
      });
      setNewTodo('');
    }
  };

  // Function to fetch todos from Firestore
  const getTodos = async () => {
    const querySnapshot = await db.collection('todos').get();
    const todosData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTodos(todosData);
  };

  // Function to toggle todo completion
  const toggleComplete = async (id) => {
    const todoRef = db.collection('todos').doc(id);
    const doc = await todoRef.get();
    await todoRef.update({
      completed: !doc.data().completed,
    });
  };

  // Function to delete a todo
  const deleteTodo = async (id) => {
    await db.collection('todos').doc(id).delete();
  };

  // Fetch todos on component mount
  React.useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
