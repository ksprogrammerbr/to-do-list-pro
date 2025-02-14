import React from "react";

const Task = ({ title, completed }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{completed ? "Concluída" : "Pendente"}</p>
    </div>
  );
};

export default Task;
