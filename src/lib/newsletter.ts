const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const REPO = "aiprojet101/monvtc";
const FILE_PATH = "data-newsletter/subscribers.json";

export interface Subscriber {
  email: string;
  subscribedAt: string;
  source?: string;
  emailsSent: number[]; // indices des emails déjà envoyés
  unsubscribed?: boolean;
}

async function getFile(): Promise<{ content: Subscriber[]; sha: string | null }> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });
  if (res.status === 404) return { content: [], sha: null };
  if (!res.ok) throw new Error("Failed to read subscribers");
  const data = await res.json();
  const content = JSON.parse(Buffer.from(data.content, "base64").toString());
  return { content, sha: data.sha };
}

async function saveFile(subscribers: Subscriber[], sha: string | null) {
  const encoded = Buffer.from(JSON.stringify(subscribers, null, 2)).toString("base64");
  const body: { message: string; content: string; branch: string; sha?: string } = {
    message: "chore: update newsletter subscribers",
    content: encoded,
    branch: "main",
  };
  if (sha) body.sha = sha;

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to save subscribers");
}

export async function addSubscriber(email: string, source?: string): Promise<boolean> {
  const { content, sha } = await getFile();
  const exists = content.find((s) => s.email.toLowerCase() === email.toLowerCase());
  if (exists) return false;

  content.push({
    email: email.toLowerCase(),
    subscribedAt: new Date().toISOString(),
    source: source || "blog",
    emailsSent: [],
  });

  await saveFile(content, sha);
  return true;
}

export async function getSubscribers(): Promise<Subscriber[]> {
  const { content } = await getFile();
  return content;
}

export async function markEmailSent(email: string, emailIndex: number) {
  const { content, sha } = await getFile();
  const sub = content.find((s) => s.email === email);
  if (sub && !sub.emailsSent.includes(emailIndex)) {
    sub.emailsSent.push(emailIndex);
    await saveFile(content, sha);
  }
}

export async function unsubscribe(email: string) {
  const { content, sha } = await getFile();
  const sub = content.find((s) => s.email === email);
  if (sub) {
    sub.unsubscribed = true;
    await saveFile(content, sha);
  }
}
