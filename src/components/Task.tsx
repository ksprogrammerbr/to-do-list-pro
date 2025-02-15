import React from "react";

interface TaskProps {
  title: string;
  completed: boolean;
}

const Task: React.FC<TaskProps> = ({ title, completed }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{completed ? "Concluída" : "Pendente"}</p>
    </div>
  );
};

export default Task;
