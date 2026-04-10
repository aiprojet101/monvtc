import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

export const PRICES = {
  setup: 19900, // 199€ en centimes
  monthly: 2900, // 29€/mois en centimes
};
