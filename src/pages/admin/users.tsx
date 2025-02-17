import React from "react";
import AdminLayout from "@/components/AdminLayout";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { UsersManagement } from "@/components/admin/UsersManagement";

const UsersPage = () => {
  // Dados de exemplo
  const users = [
    { id: 1, name: "João Silva", email: "joao@exemplo.com", role: "user" },
    { id: 2, name: "Maria Santos", email: "maria@exemplo.com", role: "admin" },
  ];

  return (
    <AdminLayout>
      <UsersManagement />
    </AdminLayout>
  );
};

export default UsersPage;
