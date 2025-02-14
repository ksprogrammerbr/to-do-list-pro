import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiUsers, FiActivity, FiSettings } from "react-icons/fi";
import Link from "next/link";
import ActivityList from "../../components/ActivityList";
import Statistics from "../../components/Statistics";
import { Task } from "../../types/task";
import AdminLayout from "../../components/AdminLayout";
import { FiDollarSign, FiPieChart, FiUserPlus, FiClock } from "react-icons/fi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  // Dados de exemplo para estatísticas
  const exampleTasks = [
    {
      id: "1",
      title: "Tarefa 1",
      status: "done",
      priority: "high",
    },
    {
      id: "2",
      title: "Tarefa 2",
      status: "doing",
      priority: "medium",
    },
    {
      id: "3",
      title: "Tarefa 3",
      status: "todo",
      priority: "low",
    },
  ] as Task[];

  // Dados de exemplo - substituir por dados reais do backend
  const recentUsers = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@exemplo.com",
      joinedAt: new Date(2024, 1, 15),
      plan: "Pro",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@exemplo.com",
      joinedAt: new Date(2024, 1, 14),
      plan: "Basic",
    },
    // Adicionar mais usuários
  ];

  const pieData = [
    { name: "Plano Basic", value: 30 },
    { name: "Plano Pro", value: 50 },
    { name: "Plano Enterprise", value: 20 },
  ];

  const activityData = [
    { day: "01/02", users: 4 },
    { day: "02/02", users: 6 },
    { day: "03/02", users: 8 },
    { day: "04/02", users: 5 },
    { day: "05/02", users: 10 },
    { day: "06/02", users: 7 },
    { day: "07/02", users: 9 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <AdminLayout>
      <main className="container mx-auto px-4 py-8">
        <Statistics tasks={exampleTasks} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600">Total de Usuários</p>
                <h3 className="text-2xl font-bold text-gray-800">1,234</h3>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FiDollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600">Receita Mensal</p>
                <h3 className="text-2xl font-bold text-gray-800">R$ 12.345</h3>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FiUserPlus className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600">Novos Usuários</p>
                <h3 className="text-2xl font-bold text-gray-800">48</h3>
                <p className="text-sm text-gray-500">últimos 7 dias</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <FiActivity className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600">Taxa de Conversão</p>
                <h3 className="text-2xl font-bold text-gray-800">12.5%</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Atividade de Usuários
            </h3>
            <LineChart width={500} height={300} data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Distribuição de Planos
            </h3>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Histórico de Alterações
          </h2>
          <ActivityList />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Usuários Recentes
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Plano
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Data de Entrada
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {user.plan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {format(user.joinedAt, "dd/MM/yyyy", { locale: ptBR })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
};

export default AdminDashboard;
