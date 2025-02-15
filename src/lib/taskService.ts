import { supabase } from "./supabaseClient";
import { Task } from "../types/task";

export const createTask = async (task: Omit<Task, "id">) => {
  const { data, error } = await supabase.from("tasks").insert([task]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Adicione outras funções conforme necessário (atualizar, excluir, etc.)
