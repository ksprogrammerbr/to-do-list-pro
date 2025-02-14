import React from "react";
import AdminLayout from "../../components/AdminLayout";

const ActivityPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Atividades</h1>
        <p>Aqui você pode visualizar o histórico de atividades dos usuários.</p>
        {/* Adicione a lista de atividades aqui */}
      </div>
    </AdminLayout>
  );
};

export default ActivityPage;
