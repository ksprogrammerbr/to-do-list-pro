import { useEffect, useState } from "react";
import { taskService, activityLogService } from "@/lib/supabase/services";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import type { Database } from "@/types/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { TestTasks } from "./TestTasks";
import { TestConnection } from "./TestConnection";

type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];
type ActivityLogRow = Database["public"]["Tables"]["activity_logs"]["Row"];

export function Dashboard() {
  // Busca dados em tempo real
  const { data: tasks } = useRealtimeSubscription("tasks");
  const { data: users } = useRealtimeSubscription("user_profiles");
  const { data: subscriptions } = useRealtimeSubscription("subscriptions");
  const { data: activities } = useRealtimeSubscription("activity_logs");

  // Métricas do Dashboard
  const totalUsers = users?.length || 0;
  const activeSubscriptions =
    subscriptions?.filter((sub) => sub.status === "active").length || 0;
  const pendingTasks =
    tasks?.filter((task) => task.status === "pending").length || 0;

  return (
    <div className="p-6">
      <TestConnection />
      <TestTasks />
      {/* Widgets de Métricas */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent>
            <h3>Usuários Totais</h3>
            <p className="text-2xl">{totalUsers}</p>
          </CardContent>
        </Card>
        {/* Outros widgets... */}
      </div>

      {/* Lista de Atividades Recentes */}
      <div className="mb-6">
        <h2>Atividades Recentes</h2>
        <ul>
          {activities?.map((activity) => (
            <li key={activity.id}>
              {activity.action} - {activity.created_at}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
