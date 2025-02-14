import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

interface DraggableTaskListProps {
  tasks: Task[];
  onDragEnd: (result: any) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const DraggableTaskList = ({
  tasks,
  onDragEnd,
  onEdit,
  onDelete,
}: DraggableTaskListProps) => {
  const columns = {
    todo: tasks.filter((task) => task.status === "todo"),
    doing: tasks.filter((task) => task.status === "doing"),
    done: tasks.filter((task) => task.status === "done"),
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([columnId, tasks]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4"
              >
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  {columnId === "todo"
                    ? "A Fazer"
                    : columnId === "doing"
                    ? "Em Progresso"
                    : "Concluído"}
                </h2>
                <div className="space-y-4">
                  {tasks.map((task, index) => (
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
                            onEdit={onEdit}
                            onDelete={onDelete}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DraggableTaskList;
