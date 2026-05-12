import type { ExternalComment, Comment } from "@/types/comment";

export async function GET() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments");

    if (!res.ok) {
      return new Response("Failed to fetch comments", { status: 502 });
    }

    const externalComments: ExternalComment[] = await res.json();

    const comments: Comment[] = externalComments.map((comment) => ({
      id: comment.id,
      postId: comment.postId,
      author: comment.name,
      email: comment.email,
      body: comment.body,
      excerpt: comment.body.length > 100 ? comment.body.slice(0, 100) + "..." : comment.body,
    }));

    return Response.json(comments);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
