import type { NextRequest } from "next/server";
import type { ExternalBookDoc, Book } from "@/types/book";
import type { PaginatedResponse } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") ?? "popular";
    const page = Math.max(
      1,
      parseInt(searchParams.get("page") ?? "1", 10) || 1,
    );
    const limit = Math.max(
      1,
      parseInt(searchParams.get("limit") ?? "12", 10) || 12,
    );

    const offset = (page - 1) * limit;
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(search)}&limit=${limit}&offset=${offset}`,
    );

    if (!res.ok) {
      return new Response("Failed to fetch books", { status: 502 });
    }

    const json = await res.json();
    const docs: ExternalBookDoc[] = json.docs ?? [];
    const total: number = json.numFound ?? 0;

    const books: Book[] = docs.map((doc) => ({
      id: doc.key.replace("/works/", ""),
      title: doc.title,
      author: doc.author_name?.[0] ?? "Unknown",
      coverUrl: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : null,
      firstPublishYear: doc.first_publish_year ?? null,
      editionCount: doc.edition_count ?? 0,
    }));

    const paginated: PaginatedResponse<Book> = {
      data: books,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };

    return Response.json(paginated);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
