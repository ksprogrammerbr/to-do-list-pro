import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiArrowLeft, FiEdit2, FiTrash2, FiUserPlus } from "react-icons/fi";
import Link from "next/link";

const UsersPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  // Dados de exemplo para usuários
  const users = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@example.com",
      role: "user",
      status: "active",
    },
    // Adicione mais usuários de exemplo aqui
  ];

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-800">
                <FiArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">
                Gerenciar Usuários
              </h1>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-400 text-white rounded-lg hover:bg-primary-300">
              <FiUserPlus className="w-5 h-5" />
              Adicionar Usuário
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-gray-700">Nome</th>
                  <th className="px-4 py-3 text-left text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left text-gray-700">Função</th>
                  <th className="px-4 py-3 text-left text-gray-700">Status</th>
                  <th className="px-4 py-3 text-right text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-800">{user.name}</td>
                    <td className="px-4 py-3 text-gray-800">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                          <FiEdit2 className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                          <FiTrash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsersPage;
