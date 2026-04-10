import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  readTime: string;
  category: string;
  keywords: string[];
  image?: string;
  content: string;
}

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const articles = files.map((file) => {
    const slug = file.replace(".md", "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      updated: data.updated || data.date || "",
      readTime: data.readTime || "5 min",
      category: data.category || "Guide",
      keywords: data.keywords || [],
      image: data.image || undefined,
      content,
    };
  });
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    updated: data.updated || data.date || "",
    readTime: data.readTime || "5 min",
    category: data.category || "Guide",
    keywords: data.keywords || [],
    image: data.image || undefined,
    content,
  };
}
