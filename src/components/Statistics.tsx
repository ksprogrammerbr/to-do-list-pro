import { FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

interface StatisticsProps {
  tasks: Task[];
}

const Statistics = ({ tasks }: StatisticsProps) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "done").length,
    inProgress: tasks.filter((task) => task.status === "doing").length,
    todo: tasks.filter((task) => task.status === "todo").length,
    highPriority: tasks.filter((task) => task.priority === "high").length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-full">
          <FiCheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-sm text-gray-600">Tarefas Concluídas</h3>
          <p className="text-2xl font-bold text-gray-800">
            {stats.completed}/{stats.total}
          </p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <FiClock className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm text-gray-600">Em Progresso</h3>
          <p className="text-2xl font-bold text-gray-800">{stats.inProgress}</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center gap-4">
        <div className="bg-red-100 p-3 rounded-full">
          <FiAlertCircle className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h3 className="text-sm text-gray-600">Alta Prioridade</h3>
          <p className="text-2xl font-bold text-gray-800">
            {stats.highPriority}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
