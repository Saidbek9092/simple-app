import type { NextRequest } from "next/server";
import type { ExternalPhoto, Photo } from "@/types/photo";
import type { PaginatedResponse } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(
      1,
      parseInt(searchParams.get("page") ?? "1", 10) || 1,
    );
    const limit = Math.max(
      1,
      parseInt(searchParams.get("limit") ?? "12", 10) || 12,
    );

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
