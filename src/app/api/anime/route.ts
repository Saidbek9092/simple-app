import type { NextRequest } from "next/server";
import type { ExternalAnime, Anime } from "@/types/anime";
import type { PaginatedResponse } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const page = Math.max(
      1,
      parseInt(searchParams.get("page") ?? "1", 10) || 1,
    );
    const limit = Math.max(
      1,
      parseInt(searchParams.get("limit") ?? "12", 10) || 12,
    );

    const url = search
      ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      : `https://api.jikan.moe/v4/top/anime?page=${page}&limit=${limit}`;

    const res = await fetch(url);

    if (!res.ok) {
      return new Response("Failed to fetch anime", { status: 502 });
    }

    const json = await res.json();
    const externalAnime: ExternalAnime[] = json.data ?? [];
    const total: number = json.pagination?.items?.total ?? 0;
    const totalPages: number = json.pagination?.last_visible_page ?? 1;

    const anime: Anime[] = externalAnime.map((a) => ({
      id: a.mal_id,
      title: a.title_english ?? a.title,
      imageUrl: a.images.jpg.image_url,
      score: a.score,
      episodes: a.episodes,
      type: a.type,
      year: a.year,
    }));

    const paginated: PaginatedResponse<Anime> = {
      data: anime,
      total,
      page,
      totalPages,
    };

    return Response.json(paginated);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
