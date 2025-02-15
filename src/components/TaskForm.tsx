import React, { useState } from "react";
import { createTask } from "../lib/taskService";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTask({
        title,
        description,
        status: "todo",
        priority: "medium",
        dueDate: null,
        userId: "user_id_do_clerk",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da tarefa"
        className="w-full p-2 border rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição da tarefa"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-primary-400 text-white px-4 py-2 rounded hover:bg-primary-300"
      >
        Adicionar Tarefa
      </button>
    </form>
  );
};

export default TaskForm;
