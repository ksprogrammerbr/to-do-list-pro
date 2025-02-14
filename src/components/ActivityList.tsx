import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FiClock, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

interface Activity {
  id: string;
  type: "create" | "update" | "delete";
  taskId: string;
  taskTitle: string;
  userId: string;
  userName: string;
  timestamp: string;
  details?: string;
}

const ActivityList: React.FC = () => {
  // Exemplo de atividades (substituir por dados reais do backend)
  const activities: Activity[] = [
    {
      id: "1",
      type: "create",
      taskId: "task1",
      taskTitle: "Nova Tarefa",
      userId: "user1",
      userName: "João",
      timestamp: new Date().toISOString(),
      details: "Criou uma nova tarefa",
    },
    // Adicionar mais atividades aqui
  ];

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "create":
        return <FiPlus className="w-5 h-5 text-green-500" />;
      case "update":
        return <FiEdit className="w-5 h-5 text-blue-500" />;
      case "delete":
        return <FiTrash2 className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="bg-white/5 backdrop-blur-md rounded-lg p-4 flex items-start gap-4"
        >
          <div className="bg-white/10 p-2 rounded-full">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1">
            <p className="text-gray-800">
              <span className="font-medium">{activity.userName}</span>{" "}
              {activity.details}:{" "}
              <span className="font-medium">{activity.taskTitle}</span>
            </p>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <FiClock className="w-4 h-4" />
              <span>
                {format(new Date(activity.timestamp), "PPp", {
                  locale: ptBR,
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
