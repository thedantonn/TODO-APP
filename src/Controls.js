import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome styles
import './App.css'; // Import the CSS file for additional styling

export default ({ task, search, setTask, addTask, sortTask, searchByStatus, searchTask }) => {
  const isButtonDisabled = task.name.trim() === '';

  return (
    <div className="controls-container">
      <input
        className="form-control my-2"
        type="text"
        onChange={(e) => setTask({ ...task, name: e.target.value })}
        value={task.name}
        placeholder="Enter the task"
      />
      <button
        className="btn btn-success w-100 my-2"
        onClick={() => {
          if (task.name.trim() !== '') {
            addTask(task);
          } else {
            alert('Task name cannot be empty');
          }
        }}
        disabled={isButtonDisabled}
      >
        Add Task
      </button>
      <button
        className="btn btn-warning w-100 my-2"
        onClick={() => sortTask('name')}
      >
        Sort by Name
      </button>
      <button
        className="btn btn-warning w-100 my-2"
        onClick={() => sortTask('completed')}
      >
        Sort by Completed
      </button>
      <button
        className="btn btn-info w-100 my-2"
        onClick={() => searchByStatus(true)}
      >
        Show Completed
      </button>
      <button
        className="btn btn-info w-100 my-2"
        onClick={() => searchByStatus(false)}
      >
        Show Uncompleted
      </button>
      <input
        className="form-control my-2"
        type="text"
        onChange={(e) => searchTask(e.target.value)}
        value={search}
        placeholder="Search the task"
      />
    </div>
  );
};
