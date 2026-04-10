import { NextRequest, NextResponse } from "next/server";
import { BLOG_TOPICS } from "@/lib/blog-topics";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const CRON_SECRET = process.env.MONVTC_CRON_SECRET || "";
const REPO = "aiprojet101/monvtc";
const BRANCH = "main";

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel cron sends it as Authorization header)
  const authHeader = request.headers.get("authorization");
  const querySecret = request.nextUrl.searchParams.get("secret");
  const providedSecret = authHeader?.replace("Bearer ", "") || querySecret || "";
  if (CRON_SECRET && providedSecret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Find next unpublished topic
    const existingFiles = await getExistingArticles();
    const nextTopic = BLOG_TOPICS.find((t) => !existingFiles.includes(`${t.slug}.md`));

    if (!nextTopic) {
      return NextResponse.json({ message: "All topics published" });
    }

    // 2. Generate article with Claude
    const article = await generateArticle(nextTopic);

    // 3. Commit to GitHub
    await commitToGitHub(nextTopic.slug, article);

    // 4. Notify admin
    await notifyAdmin(nextTopic.title, nextTopic.slug);

    return NextResponse.json({
      success: true,
      article: nextTopic.title,
      slug: nextTopic.slug,
      url: `https://vtc-site.fr/blog/${nextTopic.slug}`,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Cron publish error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

async function getExistingArticles(): Promise<string[]> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/src/content/blog`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });
  if (!res.ok) return [];
  const files = await res.json();
  return Array.isArray(files) ? files.map((f: { name: string }) => f.name) : [];
}

async function generateArticle(topic: { slug: string; title: string; category: string; keywords: string[] }): Promise<string> {
  const today = new Date().toISOString().split("T")[0];

  const prompt = `Tu es un expert SEO et rédacteur spécialisé dans le transport VTC en France. Écris un article de blog complet et professionnel.

SUJET : ${topic.title}
CATÉGORIE : ${topic.category}
MOTS-CLÉS À INTÉGRER NATURELLEMENT : ${topic.keywords.join(", ")}

RÈGLES :
- 1500-2000 mots
- Ton expert mais accessible, tutoiement
- Phrases courtes, paragraphes de 3-4 lignes max
- Structuré avec des ## (H2) et ### (H3)
- Listes à puces pour la scannabilité
- Chiffres concrets quand possible
- Termine par une section ## FAQ avec 3-4 questions/réponses (### pour chaque question)
- Pas d'emojis
- Pas de markdown pour le gras dans le frontmatter

COMMENCE DIRECTEMENT par le frontmatter YAML puis le contenu. Format exact :

---
title: "${topic.title}"
description: "[description SEO de 150-160 caractères avec mots-clés]"
date: "${today}"
updated: "${today}"
readTime: "[X] min"
category: "${topic.category}"
keywords: ${JSON.stringify(topic.keywords)}
---

[contenu de l'article ici]`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Claude API error: ${JSON.stringify(err)}`);
  }

  const data = await res.json();
  const content = data.content[0]?.text || "";

  if (!content.includes("---")) {
    throw new Error("Article generation failed: no frontmatter");
  }

  return content;
}

async function commitToGitHub(slug: string, content: string) {
  const path = `src/content/blog/${slug}.md`;
  const encoded = Buffer.from(content).toString("base64");

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `feat(blog): auto-publish "${slug}"`,
      content: encoded,
      branch: BRANCH,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub commit error: ${JSON.stringify(err)}`);
  }
}

async function notifyAdmin(title: string, slug: string) {
  if (!RESEND_API_KEY) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "MonVTC <noreply@vtc-site.fr>",
      to: "101etoiletriangle@gmail.com",
      subject: `Blog MonVTC : nouvel article publié — ${title}`,
      html: `
        <h2>Nouvel article publié automatiquement</h2>
        <p><strong>${title}</strong></p>
        <p><a href="https://vtc-site.fr/blog/${slug}">Voir l'article</a></p>
        <p style="color: #666; font-size: 12px;">Publié automatiquement par le système MonVTC.</p>
      `,
    }),
  });
}
