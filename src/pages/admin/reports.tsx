import React from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ReportsPage = () => {
  const data = [
    { month: "Jan", users: 400, tasks: 240 },
    { month: "Fev", users: 300, tasks: 139 },
    { month: "Mar", users: 200, tasks: 980 },
    { month: "Abr", users: 278, tasks: 390 },
    { month: "Mai", users: 189, tasks: 480 },
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Relatórios</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Atividade Mensal</h2>
          <LineChart width={800} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
            <Line type="monotone" dataKey="tasks" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
