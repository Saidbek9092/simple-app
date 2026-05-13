import type { NextRequest } from "next/server";
import type { ExternalPhoto, Photo } from "@/types/photo";
import type { PaginatedResponse } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search")?.toLowerCase() ?? "";
    const page = Math.max(
      1,
      parseInt(searchParams.get("page") ?? "1", 10) || 1,
    );
    const limit = Math.max(
      1,
      parseInt(searchParams.get("limit") ?? "12", 10) || 12,
    );

    if (search) {
      // Picsum has no search API — fetch a larger set and filter by author
      const fetchPages = 5;
      const fetchLimit = 30;
      const fetches = Array.from({ length: fetchPages }, (_, i) =>
        fetch(
          `https://picsum.photos/v2/list?page=${i + 1}&limit=${fetchLimit}`,
        ).then((r) => (r.ok ? (r.json() as Promise<ExternalPhoto[]>) : [])),
      );
      const allPages = await Promise.all(fetches);
      const allPhotos = allPages.flat();

      const filtered = allPhotos.filter((p) =>
        p.author.toLowerCase().includes(search),
      );

      const start = (page - 1) * limit;
      const paged = filtered.slice(start, start + limit);

      const photos: Photo[] = paged.map((p) => ({
        id: p.id,
        author: p.author,
        width: p.width,
        height: p.height,
        thumbnailUrl: `https://picsum.photos/id/${p.id}/400/300`,
        fullUrl: `https://picsum.photos/id/${p.id}/${p.width}/${p.height}`,
        unsplashUrl: p.url,
      }));

      const paginated: PaginatedResponse<Photo> = {
        data: photos,
        total: filtered.length,
        page,
        totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
      };

      return Response.json(paginated);
    }

    const res = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`,
    );

    if (!res.ok) {
      return new Response("Failed to fetch photos", { status: 502 });
    }

    const externalPhotos: ExternalPhoto[] = await res.json();

    const photos: Photo[] = externalPhotos.map((p) => ({
      id: p.id,
      author: p.author,
      width: p.width,
      height: p.height,
      thumbnailUrl: `https://picsum.photos/id/${p.id}/400/300`,
      fullUrl: `https://picsum.photos/id/${p.id}/${p.width}/${p.height}`,
      unsplashUrl: p.url,
    }));

    // Picsum doesn't provide a total count header. If we received fewer
    // items than requested, we've reached the end — compute real total.
    const isLastPage = externalPhotos.length < limit;
    const total = isLastPage
      ? (page - 1) * limit + externalPhotos.length
      : page * limit + 1; // ensure there's at least one more page
    const totalPages = isLastPage ? page : page + 1;

    const paginated: PaginatedResponse<Photo> = {
      data: photos,
      total,
      page,
      totalPages,
    };

    return Response.json(paginated);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
