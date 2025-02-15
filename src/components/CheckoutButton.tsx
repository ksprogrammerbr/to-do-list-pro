import React from "react";
import getStripe from "../lib/stripe";

const CheckoutButton = ({ items }) => {
  const handleClick = async (event) => {
    const stripe = await getStripe();

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const session = await response.json();

    // Redireciona para o Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <button role="link" onClick={handleClick}>
      Checkout
    </button>
  );
};

export default CheckoutButton;
