import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import type { Database } from "@/types/supabase";

export function Notifications() {
  // Busca notificações em tempo real
  const { data: notifications } = useRealtimeSubscription("notifications", {
    column: "read",
    value: false,
  });

  return (
    <div className="dropdown">
      <button>Notificações ({notifications?.length || 0})</button>

      <div className="dropdown-content">
        {notifications?.map((notification) => (
          <div key={notification.id} className="p-2 border-b">
            <p>{notification.message}</p>
            <small>{notification.created_at}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
