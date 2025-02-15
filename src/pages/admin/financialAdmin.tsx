import React from "react";
import AdminLayout from "../../components/AdminLayout";
import { useUser } from "@clerk/nextjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import getStripe from "../../lib/stripe";

const FinancialAdmin: React.FC = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn)
    return <div>Você precisa estar logado para acessar esta página.</div>;

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

  // Dados de exemplo para contas a pagar e receber
  const accountsPayable = [
    { id: 1, description: "Fornecedor A", amount: 500, dueDate: "2024-10-01" },
    { id: 2, description: "Fornecedor B", amount: 300, dueDate: "2024-10-15" },
  ];

  const accountsReceivable = [
    { id: 1, description: "Cliente A", amount: 700, dueDate: "2024-10-05" },
    { id: 2, description: "Cliente B", amount: 400, dueDate: "2024-10-20" },
  ];

  const handlePayment = async () => {
    const stripe = await getStripe();
    // Lógica para criar uma sessão de pagamento ou processar o pagamento
    // Exemplo: const { error } = await stripe.redirectToCheckout({ ... });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Painel Financeiro</h1>

        {/* Seção de Estatísticas Financeiras */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold">Total de Vendas</h2>
            <p className="text-3xl font-bold">R$ 12,345</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold">Receita Mensal</h2>
            <p className="text-3xl font-bold">R$ 5,678</p>
          </div>
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

        {/* Contas a Pagar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Contas a Pagar</h2>
          <ul>
            {accountsPayable.map((account) => (
              <li key={account.id} className="flex justify-between mb-2">
                <span>{account.description}</span>
                <span>R$ {account.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contas a Receber */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Contas a Receber</h2>
          <ul>
            {accountsReceivable.map((account) => (
              <li key={account.id} className="flex justify-between mb-2">
                <span>{account.description}</span>
                <span>R$ {account.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botão de Pagamento */}
        <button
          onClick={handlePayment}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Processar Pagamento
        </button>
      </div>
    </AdminLayout>
  );
};

export default FinancialAdmin;
