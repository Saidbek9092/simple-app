import type { NextRequest } from "next/server";
import type { ExternalComment, Comment } from "@/types/comment";
import type { PaginatedResponse } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments");

    if (!res.ok) {
      return new Response("Failed to fetch comments", { status: 502 });
    }

    const externalComments: ExternalComment[] = await res.json();

    let comments: Comment[] = externalComments.map((comment) => ({
      id: comment.id,
      postId: comment.postId,
      author: comment.name,
      email: comment.email,
      body: comment.body,
      excerpt: comment.body.length > 100 ? comment.body.slice(0, 100) + "..." : comment.body,
    }));

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    if (search) {
      const term = search.toLowerCase();
      comments = comments.filter(
        (comment) =>
          comment.author.toLowerCase().includes(term) ||
          comment.body.toLowerCase().includes(term)
      );
    }

    if (pageParam !== null || limitParam !== null) {
      const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
      const limit = Math.max(1, parseInt(limitParam ?? "10", 10) || 10);
      const total = comments.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const data = comments.slice(start, start + limit);

      const paginated: PaginatedResponse<Comment> = { data, total, page, totalPages };
      return Response.json(paginated);
    }

    return Response.json(comments);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
