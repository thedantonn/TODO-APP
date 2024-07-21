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
            onClick={() => {
              updateTask(index);
            }}
            onDoubleClick={() => {
              deleteTask(index);
            }}
          >
            {task.name}
          </li>
        ));
      };


return <ul className="list-group">{getTasks()}</ul>

}