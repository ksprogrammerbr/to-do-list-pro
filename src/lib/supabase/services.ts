import { supabase } from "./client";
import type {
  Notification,
  TaskComment,
  Profile,
  ActivityLog,
  Task,
  UserProfile,
  Subscription,
  Payment,
  Product,
} from "@/types/database";

export const notificationService = {
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Notification[];
  },

  async markAsRead(id: string) {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);

    if (error) throw error;
  },
};

export const taskService = {
  async create(task: Omit<Task, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("tasks")
      .insert(task)
      .select()
      .single();

    if (error) throw error;
    return data as Task;
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Task[];
  },
};

export const subscriptionService = {
  async getCurrentSubscription(userId: string) {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*, products(*)")
      .eq("user_id", userId)
      .eq("status", "active")
      .single();

    if (error) throw error;
    return data as Subscription & { products: Product };
  },
};

export const activityLogService = {
  async log(log: Omit<ActivityLog, "id" | "created_at">) {
    const { error } = await supabase.from("activity_logs").insert(log);

    if (error) throw error;
  },

  async getRecent(limit = 50) {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as ActivityLog[];
  },
};
