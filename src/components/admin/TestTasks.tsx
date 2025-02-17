import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export function TestTasks() {
  const [status, setStatus] = useState<string>("checking");

  useEffect(() => {
    async function checkTable() {
      try {
        // Tenta inserir uma tarefa de teste
        const { data, error } = await supabase
          .from("tasks")
          .insert({
            title: "Tarefa de Teste",
            description: "Testando a conexão com o Supabase",
            status: "pending",
            priority: "medium",
          })
          .select()
          .single();

        if (error) throw error;
        setStatus("Tabela tasks criada e funcionando!");

        // Limpa a tarefa de teste
        await supabase.from("tasks").delete().eq("id", data.id);
      } catch (err) {
        setStatus(`Erro: ${err.message}`);
      }
    }

    checkTable();
  }, []);

  return (
    <div className="p-4 border rounded mt-4">
      <h2>Teste da Tabela Tasks</h2>
      <p>{status}</p>
    </div>
  );
}
