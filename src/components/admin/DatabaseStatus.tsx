import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export function DatabaseStatus() {
  const [status, setStatus] = useState<
    "connected" | "disconnected" | "checking"
  >("checking");

  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase.from("tasks").select("count");
        setStatus(error ? "disconnected" : "connected");
      } catch {
        setStatus("disconnected");
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="mb-4 p-2 rounded bg-gray-100">
      <p className="text-sm">
        Status do Banco de Dados:{" "}
        <span
          className={
            status === "connected"
              ? "text-green-600"
              : status === "disconnected"
              ? "text-red-600"
              : "text-yellow-600"
          }
        >
          {status === "connected"
            ? "Conectado"
            : status === "disconnected"
            ? "Desconectado"
            : "Verificando..."}
        </span>
      </p>
    </div>
  );
}
