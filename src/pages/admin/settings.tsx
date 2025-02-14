import React from "react";
import AdminLayout from "../../components/AdminLayout";

const SettingsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Configurações</h1>
        <p>Aqui você pode gerenciar as configurações do sistema.</p>
        {/* Adicione opções de configuração aqui */}
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
