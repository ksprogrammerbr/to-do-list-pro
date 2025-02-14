import React from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const DashboardPage: React.FC = () => {
  // Dados de exemplo para o gráfico
  const data = [
    { name: "Jan", users: 4000 },
    { name: "Fev", users: 3000 },
    { name: "Mar", users: 2000 },
    { name: "Abr", users: 2780 },
    { name: "Mai", users: 1890 },
    { name: "Jun", users: 2390 },
    { name: "Jul", users: 3490 },
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Usuários ao Longo do Tempo
          </h2>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
          </LineChart>
        </div>
        {/* Adicione mais seções e gráficos conforme necessário */}
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
