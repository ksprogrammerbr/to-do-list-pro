import { supabase } from "./supabaseClient";
import { stripe } from "./stripe";

export interface PaymentRecord {
  id: string;
  userId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  stripeId: string;
  createdAt: string;
}

export const paymentService = {
  async createPaymentRecord(data: Omit<PaymentRecord, "id" | "createdAt">) {
    const { data: payment, error } = await supabase
      .from("payments")
      .insert([
        {
          user_id: data.userId,
          amount: data.amount,
          status: data.status,
          stripe_id: data.stripeId,
        },
      ])
      .single();

    if (error) throw error;
    return payment;
  },

  async updatePaymentStatus(stripeId: string, status: PaymentRecord["status"]) {
    const { data, error } = await supabase
      .from("payments")
      .update({ status })
      .match({ stripe_id: stripeId });

    if (error) throw error;
    return data;
  },

  async getPaymentHistory(userId: string) {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};
