import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export function TestConnection() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">(
    "loading"
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("count")
          .single();

        if (error) throw error;
        setStatus("connected");
      } catch (err) {
        setStatus("error");
        setError(err.message);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2>Status da Conexão Supabase</h2>
      <p>Status: {status}</p>
      {error && <p className="text-red-500">Erro: {error}</p>}
    </div>
  );
}
