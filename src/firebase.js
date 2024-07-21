import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Import Firestore


const firebaseConfig = {
    apiKey: "AIzaSyC5uPUHNjehmYYYxp_3QIglLQROHgXh3VI",
    authDomain: "to-do-6586f.firebaseapp.com",
    projectId: "to-do-6586f",
    storageBucket: "to-do-6586f.appspot.com",
    messagingSenderId: "154308324300",
    appId: "1:154308324300:web:e4e3961bffc4bfe2d40b69",
    measurementId: "G-E31N74TB04"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

 const addTasksToFirebase = (task) => {
   const taskRef = db.collection('tasks').doc();
   const newTask = { ...task, id: taskRef.id, time: new Date() };
   return new Promise((resolve)=>{
     taskRef.set(newTask).then(()=>{
         resolve(newTask);
     })
   })

 };

 const deleteTaskFromFirebase = (task) => {
   const taskRef = db.collection('tasks').doc(task.id);

   return taskRef.delete()
 };

 const updateTaskFromFirebase = (task, i) => {
   const taskRef = db.collection('tasks').doc(task.id);
   return taskRef.update(task)
 };

 const getTasksByName = (search) =>
   db.collection('tasks').where('name', '==', search).get();
 const getTasksByCompleted = (status) =>
   db.collection('tasks').where('completed', '==', status).get();
 const getTasksBySorting = (sortOption, limit) =>
   db.collection('tasks').orderBy(sortOption).limit(limit).get();

 const getTasksNext = (sortOption, limit, lastDoc) =>
   db.collection('tasks').orderBy(sortOption).startAfter(lastDoc).limit(limit).get();

 const getTasksPrev = (sortOption, limit, firstDoc) =>
   db
     .collection('tasks')
     .orderBy(sortOption)
     .endBefore(firstDoc)
     .limitToLast(limit).get();
     

export {
  addTasksToFirebase,
  updateTaskFromFirebase,
  deleteTaskFromFirebase,
  getTasksByName,
  getTasksByCompleted,
  getTasksBySorting,
  getTasksNext,
  getTasksPrev,

};