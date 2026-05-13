import type { ExternalPhoto, Photo } from "@/types/photo";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const res = await fetch(`https://picsum.photos/id/${id}/info`);

    if (!res.ok) {
      return Response.json({ error: "Photo not found" }, { status: 404 });
    }

    const p: ExternalPhoto = await res.json();

    const photo: Photo = {
      id: p.id,
      author: p.author,
      width: p.width,
      height: p.height,
      thumbnailUrl: `https://picsum.photos/id/${p.id}/800/600`,
      fullUrl: `https://picsum.photos/id/${p.id}/${p.width}/${p.height}`,
      unsplashUrl: p.url,
    };

    return Response.json(photo);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
