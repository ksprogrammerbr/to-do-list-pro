import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/types/supabase";

type Tables = Database["public"]["Tables"];

export function useRealtimeSubscription<T extends keyof Tables>(table: T) {
  const [data, setData] = useState<Tables[T]["Row"][] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar dados
    async function fetchData() {
      try {
        const { data: result, error } = await supabase.from(table).select("*");

        if (error) {
          console.error("Erro ao buscar dados:", error);
          return;
        }

        setData(result);
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
