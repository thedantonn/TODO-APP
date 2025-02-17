export default ({tasks,updateTask,deleteTask})=>{

  const getTasks = () => {
      return tasks.map((task, index) => (
        <li
        key={index}
        className={
          task.completed
            ? 'list-group-item list-group-item-success'
            : 'list-group-item list-group-item-danger'
        }
        onClick={() => updateTask(index)}
        onDoubleClick={() => deleteTask(index)}
        >
          {task.name}
        </li>
      ));
    };


return <ol className="list-group my-3">{getTasks()}</ol>

}