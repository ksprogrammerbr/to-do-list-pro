import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import type { Database } from "@/types/supabase";

export function UsersManagement() {
  // Busca usuários e suas assinaturas em tempo real
  const { data: users } = useRealtimeSubscription("user_profiles");
  const { data: subscriptions } = useRealtimeSubscription("subscriptions");

  // Combina dados de usuários com suas assinaturas
  const usersWithSubscriptions = users?.map((user) => ({
    ...user,
    subscription: subscriptions?.find((sub) => sub.user_id === user.id),
  }));

  return (
    <div className="p-6">
      <h1>Gerenciamento de Usuários</h1>

      <table className="w-full">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Plano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usersWithSubscriptions?.map((user) => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.subscription?.status}</td>
              <td>{/* Botões de ação */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
