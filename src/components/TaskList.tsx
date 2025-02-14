import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { FiPlus } from "react-icons/fi";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { Task } from "../types/task";

const TaskList: React.FC = () => {
  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Criar documentação",
      description: "Documentar o projeto To-Do List",
      status: "todo",
      priority: "high",
      dueDate: "2024-02-20",
      dueTime: "14:00",
    },
    {
      id: "2",
      title: "Implementar autenticação",
      description: "Adicionar login com Clerk",
      status: "doing",
      priority: "medium",
      dueDate: "2024-02-21",
      dueTime: "16:00",
    },
    {
      id: "3",
      title: "Design do sistema",
      description: "Criar o layout das telas",
      status: "done",
      priority: "low",
      dueDate: "2024-02-19",
      dueTime: "12:00",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);

    // Atualizar o status da tarefa baseado na coluna de destino
    reorderedItem.status = result.destination.droppableId as Task["status"];

    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  const handleAddTask = () => {
    setSelectedTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (selectedTask) {
      // Editando tarefa existente
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      // Adicionando nova tarefa
      setTasks([...tasks, task]);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Minhas Tarefas</h1>
        <button
          onClick={handleAddTask}
          className="flex items-center gap-2 px-4 py-2 bg-primary-400 text-white rounded-lg hover:bg-primary-300"
        >
          <FiPlus className="w-5 h-5" />
          Nova Tarefa
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coluna To Do */}
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-800">A Fazer</h2>
                {tasks
                  .filter((task) => task.status === "todo")
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Coluna Doing */}
          <Droppable droppableId="doing">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  Em Progresso
                </h2>
                {tasks
                  .filter((task) => task.status === "doing")
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Coluna Done */}
          <Droppable droppableId="done">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  Concluído
                </h2>
                {tasks
                  .filter((task) => task.status === "done")
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskList;
