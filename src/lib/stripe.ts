import { loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<any>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("sua_chave_publica_do_stripe");
  }
  return stripePromise;
};

export default getStripe;
