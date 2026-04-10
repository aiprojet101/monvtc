import Stripe from "stripe";

// @ts-expect-error — Stripe API version may differ between local and Vercel
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const PRICES = {
  setup: 19900, // 199€ en centimes
  monthly: 2900, // 29€/mois en centimes
};
