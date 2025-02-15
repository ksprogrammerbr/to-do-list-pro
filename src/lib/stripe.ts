import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripeSecretKey) {
  console.error(
    "⚠️ Stripe secret key is missing. Please check your .env.local file."
  );
}

if (!stripePublishableKey) {
  console.error(
    "⚠️ Stripe publishable key is missing. Please check your .env.local file."
  );
}

// Configuração do Stripe no servidor
export const stripe = new Stripe(stripeSecretKey || "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

// Configuração do Stripe no cliente
let stripePromise: Promise<any>;

export const getStripe = () => {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};
