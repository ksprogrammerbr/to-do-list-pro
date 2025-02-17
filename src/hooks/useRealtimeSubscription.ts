import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/types/supabase";

type Tables = Database["public"]["Tables"];

// Define an interface for the expected structure of tasks
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  user_id: string;
  tags: string[];
  created_at: string; // Add this if you have a created_at field, and adjust the type
  updated_at: string; // Add this if you have an updated_at field, and adjust the type
  // Add other properties based on your database schema - VERY IMPORTANT TO ADD ALL PROPERTIES HERE
}

export function useRealtimeSubscription<T extends keyof Tables>(table: T) {
  const [data, setData] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar dados
    async function fetchData() {
      try {
        console.log("Consultando tabela:", table);

        if (!table) {
          console.error("Nome da tabela inválido:", table);
          return;
        }

        const { data: result, error } = await supabase.from(table).select("*");

        console.log("Resultado da consulta:", result);

        if (error) {
          console.error("Erro ao buscar dados:", error);
          return;
        }

        // **SOLUTION: Process and map the data to ensure it matches ActivityLog**
        if (result) {
          const processedResult: Task[] = (result as any[]).map((item) => {
            // ** IMPORTANT: REMOVE EXTRA PROPERTIES THAT ARE NOT ON ActivityLog **

            return {
              //Creates a new object to match the correct Type
              id: item.id,
              title: item.title,
              description: item.description,
              status: item.status,
              priority: item.priority,
              user_id: item.user_id,
              tags: item.tags,
              created_at: item.created_at,
              updated_at: item.updated_at,
              // ** ADD ALL Task properties here, mapping from 'item' **
            } as Task; // Assertion at the end of the construction
          });
          setData(processedResult);
        } else {
          setData([]); // Ensure you set an empty array if result is null
        }
      } catch (error) {
        console.error("Erro na consulta:", error);
      } finally {
        setLoading(false);
      }
    }

    // Busca inicial
    fetchData();

    // Subscription para atualizações
    const channel = supabase
      .channel(`public:${table}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table]);

  return { data, loading };
}
