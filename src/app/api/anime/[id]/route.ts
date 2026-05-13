import type { ExternalAnime, AnimeDetail } from "@/types/anime";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const animeId = parseInt(id, 10);

  if (isNaN(animeId)) {
    return Response.json({ error: "Invalid anime ID" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);

    if (!res.ok) {
      return Response.json({ error: "Anime not found" }, { status: 404 });
    }

    const json = await res.json();
    const a: ExternalAnime = json.data;

    const anime: AnimeDetail = {
      id: a.mal_id,
      title: a.title_english ?? a.title,
      titleEnglish: a.title_english,
      imageUrl: a.images.jpg.large_image_url,
      synopsis: a.synopsis,
      score: a.score,
      episodes: a.episodes,
      status: a.status,
      type: a.type,
      genres: a.genres.map((g) => g.name),
      year: a.year,
    };

    return Response.json(anime);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
