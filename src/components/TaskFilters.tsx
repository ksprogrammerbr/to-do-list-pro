import { useState } from "react";
import { FiFilter, FiSearch, FiCalendar } from "react-icons/fi";

interface TaskFiltersProps {
  onFilterChange: (filters: TaskFilters) => void;
}

export interface TaskFilters {
  search: string;
  priority: "all" | "low" | "medium" | "high";
  date: "all" | "today" | "week" | "month";
  status: "all" | "todo" | "doing" | "done";
}

const TaskFilters = ({ onFilterChange }: TaskFiltersProps) => {
  const [filters, setFilters] = useState<TaskFilters>({
    search: "",
    priority: "all",
    date: "all",
    status: "all",
  });

  const handleFilterChange = (
    key: keyof TaskFilters,
    value: TaskFilters[keyof TaskFilters]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Busca */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar tarefas..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        {/* Prioridade */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiFilter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
            value={filters.priority}
            onChange={(e) =>
              handleFilterChange(
                "priority",
                e.target.value as TaskFilters["priority"]
              )
            }
          >
            <option value="all">Todas as prioridades</option>
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>

        {/* Data */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiCalendar className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
            value={filters.date}
            onChange={(e) =>
              handleFilterChange("date", e.target.value as TaskFilters["date"])
            }
          >
            <option value="all">Todas as datas</option>
            <option value="today">Hoje</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mês</option>
          </select>
        </div>

        {/* Status */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiFilter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
            value={filters.status}
            onChange={(e) =>
              handleFilterChange(
                "status",
                e.target.value as TaskFilters["status"]
              )
            }
          >
            <option value="all">Todos os status</option>
            <option value="todo">A Fazer</option>
            <option value="doing">Em Progresso</option>
            <option value="done">Concluído</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
