import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import { useUser } from "@clerk/nextjs";
import {
  Clock,
  Calendar as CalendarIcon,
  CheckCircle,
  List,
} from "lucide-react";

export function Dashboard() {
  const { user, isLoaded } = useUser();
  const [greeting, setGreeting] = useState("");
  const { data: tasks } = useRealtimeSubscription("tasks");
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  // Aguarda o carregamento dos dados do usuário
  if (!isLoaded) {
    return <div>Carregando...</div>;
  }

  const pendingTasks =
    tasks?.filter((task) => task.status === "pending").length || 0;
  const completedTasks =
    tasks?.filter((task) => task.status === "completed").length || 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {greeting}, {user?.fullName || user?.firstName || user?.username}!
        </h1>
        <div className="text-lg font-medium text-gray-500">
          <Clock className="inline-block mr-2" />
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3>Tarefas Pendentes</h3>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <List className="mr-2 text-orange-500" />
              {pendingTasks}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3>Tarefas Concluídas</h3>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <CheckCircle className="mr-2 text-green-500" />
              {completedTasks}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3>Calendário</h3>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      {/* Lista de Tarefas Recentes */}
      <Card>
        <CardHeader>
          <h3>Tarefas Recentes</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks?.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : task.status === "in_progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
