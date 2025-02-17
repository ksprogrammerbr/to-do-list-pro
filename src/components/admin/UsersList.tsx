import type { Database } from "@/types/supabase";

type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

interface UserListProps {
  users: Array<
    UserProfile & {
      subscription?: Subscription;
    }
  >;
}

// Componente com filtros e paginação
const UsersList = ({ users }: UserListProps) => {
  // Implementar lógica de filtros e paginação
  return <div>{/* Lista de usuários com ações */}</div>;
};

export default UsersList;
