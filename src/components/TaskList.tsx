import React from "react";
import Task from "./Task";

const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} title={task.title} completed={task.completed} />
      ))}
    </div>
  );
};

export default TaskList;
