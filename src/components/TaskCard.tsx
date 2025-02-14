import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FiEdit2, FiTrash2, FiClock } from "react-icons/fi";
import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div
      className={`bg-primary-${
        task.status === "todo" ? "200" : task.status === "doing" ? "300" : "400"
      }/80 p-4 rounded-lg shadow-lg border border-white/40 cursor-move hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
      )}
      {task.dueDate && task.dueTime && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiClock className="w-4 h-4" />
          <span>
            {format(new Date(`${task.dueDate}T${task.dueTime}`), "PPp", {
              locale: ptBR,
            })}
          </span>
        </div>
      )}
      <div className="mt-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority === "low"
            ? "Baixa"
            : task.priority === "medium"
            ? "Média"
            : "Alta"}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
