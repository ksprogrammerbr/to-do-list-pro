import React from "react";
import AdminLayout from "../../components/AdminLayout";

const ReportsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Relatórios Detalhados</h1>
        <p>Aqui você pode adicionar gráficos e relatórios detalhados.</p>
        {/* Adicione gráficos e relatórios aqui */}
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
