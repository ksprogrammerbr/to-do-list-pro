import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function ConnectionTest() {
  const { isSignedIn } = useAuth();
  const [supabaseStatus, setSupabaseStatus] = useState<
    "checking" | "success" | "error"
  >("checking");

  useEffect(() => {
    async function checkConnections() {
      try {
        // Testa conexão com Supabase
        const { data, error } = await supabase.from("tasks").select("count");
        setSupabaseStatus(error ? "error" : "success");
      } catch (error) {
        setSupabaseStatus("error");
      }
    }

    checkConnections();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Status das Conexões</h2>

      <div className="space-y-2">
        {/* Status Supabase */}
        <div className="flex items-center justify-between">
          <span>Supabase:</span>
          <span
            className={`px-2 py-1 rounded text-sm ${
              supabaseStatus === "success"
                ? "bg-green-100 text-green-800"
                : supabaseStatus === "error"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {supabaseStatus === "success"
              ? "Conectado"
              : supabaseStatus === "error"
              ? "Erro"
              : "Verificando..."}
          </span>
        </div>

        {/* Status Clerk */}
        <div className="flex items-center justify-between">
          <span>Clerk Auth:</span>
          <span
            className={`px-2 py-1 rounded text-sm ${
              isSignedIn
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isSignedIn ? "Autenticado" : "Não Autenticado"}
          </span>
        </div>
      </div>
    </div>
  );
}
