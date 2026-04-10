const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

export const PRICES = {
  setup: 19900, // 199€ en centimes
  monthly: 2900, // 29€/mois en centimes
};

export async function stripeRequest(endpoint: string, params: Record<string, string>) {
  const res = await fetch(`https://api.stripe.com/v1/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(STRIPE_SECRET_KEY + ":").toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data;
}
