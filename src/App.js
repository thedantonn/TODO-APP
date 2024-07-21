import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import List from './List';
import Controls from './Controls';
import Nav from './Nav';
import {
  addTasksToFirebase,
  updateTaskFromFirebase,
  deleteTaskFromFirebase,
  getTasksByName,
  getTasksByCompleted,
  getTasksBySorting,
  getTasksNext,
  getTasksPrev,
} from './firebase';
import './App.css';

function App() {
  const pageSize = 4;
  const [task, setTask] = useState({ name: '', completed: false });
  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState('time');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(false);
  const [filter, setFilter] = useState(2);
  const [firstDoc, setFirstDoc] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let queryRef;
    switch (filter) {
      case 0:
        queryRef = getTasksByName(search);
        break;
      case 1:
        queryRef = getTasksByCompleted(status);
        break;
      case 2:
        queryRef = getTasksBySorting(sortOption, pageSize);
        break;
      case 3:
        queryRef = getTasksNext(sortOption, pageSize, lastDoc);
        break;
      case 4:
        queryRef = getTasksPrev(sortOption, pageSize, firstDoc);
        break;
    }

    queryRef.then((querySnapshot) => {
      const allTasks = [];
      const allDocs = [];
      querySnapshot.forEach((doc) => {
        allTasks.push(doc.data());
        allDocs.push(doc);
      });
      if (allTasks.length) {
        setFirstDoc(allDocs[0]);
        setLastDoc(allDocs[allDocs.length - 1]);
        setTasks(allTasks);
      }
    });
  }, [sortOption, search, status, filter, page]);

  const goToNext = () => {
    setFilter(3);
    setPage(page + 1);
  };

  const goToPrev = () => {
    setFilter(4);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const sortTask = (option) => {
    setFilter(2);
    setSortOption(option);
  };

  const searchTask = (text) => {
    setFilter(0);
    setSearch(text);
  };

  const searchByStatus = (status) => {
    setFilter(1);
    setStatus(status);
  };

  const updateTask = (i) => {
    const updatedTask = { ...tasks[i], completed: !tasks[i].completed };
    updateTaskFromFirebase(updatedTask).then(() => {
      const allTasks = [...tasks];
      allTasks.splice(i, 1, updatedTask);
      setTasks(allTasks);
    });
  };

  const deleteTask = (i) => {
    deleteTaskFromFirebase(tasks[i]).then(() => {
      console.log('deleted', tasks[i].id);
      setTasks(tasks.filter((t) => t.id !== tasks[i].id));
    });
  };

  const addTask = (t) => {
    if (t.name.trim() !== '') {
      addTasksToFirebase({ name: t.name, completed: t.completed }).then((newTask) => {
        if (tasks.length < pageSize) {
          setTasks([...tasks, newTask]);
        } else {
          alert('Task added to the last page');
        }
      });
      setTask({ name: '', completed: false });
    } else {
      alert('Task name cannot be empty');
    }
  };

  const listProps = { tasks, updateTask, deleteTask };
  const controlsProps = {
    task,
    search,
    setTask,
    addTask,
    sortTask,
    searchByStatus,
    searchTask,
  };
  const navProps = { goToPrev, goToNext, page };

  return (
    <div className="App">
      <div className="header-container">
        <h1 className="heading">TO-DO NOTEPAD</h1>
        <button className="btn btn-info btn-rules" onClick={() => alert(`Welcome to TODO NOTEPAD, before starting here are some instructions to help you out:
          - You can add, update, and delete tasks.
          - Use the search bar to find tasks.
          - Sort tasks by name or completion status.
          - Use pagination to navigate through tasks.
          - Single click on Tasks to mark as completed.
          - Double click on Tasks to delete `)}>
          <span className="help-text">Help me out?</span>
          <i className="fas fa-info-circle"></i>
        </button>
      </div>
      <div className="main-container">
        <div className="controls">
          <Controls {...controlsProps} />
        </div>
        <div className="tasks">
          <List {...listProps} />
          <Nav {...navProps} />
        </div>
      </div>
    </div>
  );
}

export default App;
