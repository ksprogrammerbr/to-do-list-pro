import React from "react";
import AdminLayout from "../components/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import CheckoutButton from "../components/CheckoutButton";
import TaskForm from "../components/TaskForm";

const AdminPanel: React.FC = () => {
  // Dados de exemplo para formas de pagamento
  const paymentMethods = [
    { id: 1, method: "Cartão de Crédito", status: "Ativo" },
    { id: 2, method: "PayPal", status: "Inativo" },
    { id: 3, method: "Transferência Bancária", status: "Ativo" },
  ];

  // Dados de exemplo para uma lista de tarefas
  const tasks = [
    {
      id: 1,
      description: "Configurar integração com Stripe",
      completed: false,
    },
    { id: 2, description: "Revisar relatórios financeiros", completed: true },
    { id: 3, description: "Atualizar usuários", completed: false },
  ];

  // Dados de exemplo para o gráfico
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Fev", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Abr", sales: 2780 },
    { name: "Mai", sales: 1890 },
    { name: "Jun", sales: 2390 },
    { name: "Jul", sales: 3490 },
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Painel de Administração</h1>

        {/* Seção de Formas de Pagamento */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Formas de Pagamento</h2>
          <ul>
            {paymentMethods.map((method) => (
              <li key={method.id} className="flex justify-between mb-2">
                <span>{method.method}</span>
                <span>{method.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gráfico de Vendas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Gráfico de Vendas</h2>
          <LineChart width={600} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </div>

        {/* Seção de Tarefas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Lista de Tarefas</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="flex justify-between mb-2">
                <span>{task.description}</span>
                <span>{task.completed ? "✔️" : "❌"}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Atividades Recentes</h2>
          <ul>
            <li className="flex justify-between mb-2">
              <span>Usuário A criou uma nova conta.</span>
              <span>10 minutos atrás</span>
            </li>
            <li className="flex justify-between mb-2">
              <span>Usuário B atualizou suas informações.</span>
              <span>30 minutos atrás</span>
            </li>
            <li className="flex justify-between mb-2">
              <span>Usuário C fez um pagamento.</span>
              <span>1 hora atrás</span>
            </li>
          </ul>
        </div>

        <TaskForm />

        <CheckoutButton items={[{ price: "price_id", quantity: 1 }]} />
      </div>
    </AdminLayout>
  );
};

export default AdminPanel;
