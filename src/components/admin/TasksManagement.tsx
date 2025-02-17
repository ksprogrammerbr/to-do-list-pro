import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import type { Database } from "@/types/supabase";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatabaseStatus } from "./DatabaseStatus";
import { useAuth, useUser } from "@clerk/clerk-react";

// Tipos corretos da tabela tasks
type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];
type TaskInsert = Database["public"]["Tables"]["tasks"]["Insert"];

export function TasksManagement() {
  const { user, isLoaded } = useUser();
  const { data: tasks, loading } = useRealtimeSubscription("tasks");
  const { data: users } = useRealtimeSubscription("user_profiles");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  async function handleCreateTask() {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            title: newTask.title,
            description: newTask.description,
            status: "pending",
            priority: newTask.priority,
            user_id: user.id,
            tags: [],
          },
        ])
        .select();

      if (error) throw error;

      // Limpa o formulário e fecha o diálogo
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  }

  async function handleUpdateTaskStatus(taskId: string, newStatus: string) {
    try {
      await supabase
        .from("tasks")
        .update({ status: newStatus })
        .eq("id", taskId);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  }

  return (
    <div className="p-6">
      <DatabaseStatus />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gerenciamento de Tarefas</h2>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Nova Tarefa
        </button>
      </div>

      {/* Modal de Nova Tarefa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-xl font-semibold">Criar Nova Tarefa</h2>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <Input
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                placeholder="Digite o título da tarefa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Descrição
              </label>
              <Textarea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                placeholder="Digite a descrição da tarefa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Prioridade
              </label>
              <Select
                value={newTask.priority}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={!user?.id || !newTask.title}
              >
                Criar Tarefa
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {/* Coluna: Pendentes */}
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="font-bold mb-4">Pendentes</h2>
            {tasks
              ?.filter((task) => task.status === "pending")
              .map((task) => (
                <div key={task.id} className="bg-white p-4 rounded shadow mb-2">
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs bg-yellow-100 px-2 py-1 rounded">
                      {task.priority}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateTaskStatus(task.id, "in_progress")
                      }
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Iniciar
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Coluna: Em Progresso */}
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="font-bold mb-4">Em Progresso</h2>
            {tasks
              ?.filter((task) => task.status === "in_progress")
              .map((task) => (
                <div key={task.id} className="bg-white p-4 rounded shadow mb-2">
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs bg-yellow-100 px-2 py-1 rounded">
                      {task.priority}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateTaskStatus(task.id, "completed")
                      }
                      className="text-sm text-green-600"
                    >
                      Concluir
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Coluna: Concluídas */}
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="font-bold mb-4">Concluídas</h2>
            {tasks
              ?.filter((task) => task.status === "completed")
              .map((task) => (
                <div key={task.id} className="bg-white p-4 rounded shadow mb-2">
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs bg-green-100 px-2 py-1 rounded">
                      Concluída
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
