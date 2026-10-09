// Server-side helpers for talking to the .NET Core Web API.
// Browser code uses relative "/api/..." URLs, which next.config.ts rewrites to the same API.

export const API_URL = process.env.API_URL ?? "http://localhost:5000";

export type ContentItem = {
  id: number;
  title: string;
  description: string | null;
  sortOrder: number;
};

export type Content = {
  id: number;
  page: string;
  section: string;
  title: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
  items: ContentItem[];
};

export async function getContents(page: string): Promise<Content[]> {
  const res = await fetch(
    `${API_URL}/api/content?page=${encodeURIComponent(page)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`API trả về lỗi HTTP ${res.status}`);
  return res.json();
}

export async function getStats(): Promise<{ contentCount: number; userCount: number }> {
  try {
    const res = await fetch(`${API_URL}/api/stats`, { cache: "no-store" });
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return { contentCount: 0, userCount: 0 };
  }
}
