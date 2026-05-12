import type { NextRequest } from "next/server";
import type { ExternalPost, Post } from "@/types/post";
import type { PaginatedResponse } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      return new Response("Failed to fetch posts", { status: 502 });
    }

    const externalPosts: ExternalPost[] = await res.json();

    let posts: Post[] = externalPosts.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      excerpt:
        post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body,
    }));

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    if (search) {
      const term = search.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.body.toLowerCase().includes(term),
      );
    }

    if (pageParam !== null || limitParam !== null) {
      const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
      const limit = Math.max(1, parseInt(limitParam ?? "10", 10) || 10);
      const total = posts.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const data = posts.slice(start, start + limit);

      const paginated: PaginatedResponse<Post> = {
        data,
        total,
        page,
        totalPages,
      };
      return Response.json(paginated);
    }

    return Response.json(posts);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
