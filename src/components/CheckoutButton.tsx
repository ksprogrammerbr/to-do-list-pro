import React from "react";
import { getStripe } from "../lib/stripe";
import { FiCreditCard } from "react-icons/fi";

interface CheckoutButtonProps {
  items: Array<{
    price: string;
    quantity: number;
  }>;
  className?: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  items,
  className = "",
}) => {
  const handleClick = async () => {
    try {
      const stripe = await getStripe();
      if (!stripe) throw new Error("Stripe not initialized");

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { sessionId } = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      // Adicione aqui sua lógica de tratamento de erro
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 bg-primary-400 text-white rounded-lg hover:bg-primary-300 transition-colors ${className}`}
    >
      <FiCreditCard className="w-5 h-5" />
      <span>Finalizar Compra</span>
    </button>
  );
};

export default CheckoutButton;
