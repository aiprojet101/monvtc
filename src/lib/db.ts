import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const CLIENTS_FILE = path.join(DATA_DIR, "clients.json");

export interface Client {
  id: string;
  createdAt: string;
  status: "pending" | "provisioning" | "active" | "failed";
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  email: string;
  phone: string;
  brand: string;
  brandShort: string;
  slug: string;
  city: string;
  region: string;
  department: string;
  postalCode: string;
  whatsapp: string;
  pricePerKm: string;
  minPrice: string;
  zones: string;
  siteUrl: string;
  vercelProjectId: string;
}

export async function getClients(): Promise<Client[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(CLIENTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveClients(clients: Client[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CLIENTS_FILE, JSON.stringify(clients, null, 2));
}

export async function addClient(client: Client) {
  const clients = await getClients();
  clients.push(client);
  await saveClients(clients);
}

export async function updateClient(id: string, updates: Partial<Client>) {
  const clients = await getClients();
  const index = clients.findIndex((c) => c.id === id);
  if (index !== -1) {
    clients[index] = { ...clients[index], ...updates };
    await saveClients(clients);
  }
}
