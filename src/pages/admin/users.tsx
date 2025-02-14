import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface User {
  id: string;
  name: string;
  email: string;
}

const UsersPage: React.FC = () => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      // Simulação de dados
      const fetchedUsers: User[] = [
        { id: "1", name: "João Silva", email: "joao@exemplo.com" },
        { id: "2", name: "Maria Santos", email: "maria@exemplo.com" },
      ];
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Usuários</h1>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500">
                    <FiEdit />
                  </button>
                  <button className="text-red-500 ml-2">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
