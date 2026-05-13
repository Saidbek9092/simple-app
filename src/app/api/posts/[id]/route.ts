import type { ExternalPost, Post } from "@/types/post";
import type { ExternalComment, Comment } from "@/types/comment";

interface PostDetail extends Post {
  comments: Comment[];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    return Response.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    const [postRes, commentsRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`),
    ]);

    if (!postRes.ok) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const externalPost: ExternalPost = await postRes.json();
    const externalComments: ExternalComment[] = commentsRes.ok
      ? await commentsRes.json()
      : [];

    const post: PostDetail = {
      id: externalPost.id,
      title: externalPost.title,
      body: externalPost.body,
      excerpt:
        externalPost.body.length > 100
          ? externalPost.body.slice(0, 100) + "..."
          : externalPost.body,
      comments: externalComments.map((c) => ({
        id: c.id,
        postId: c.postId,
        author: c.name,
        email: c.email,
        body: c.body,
        excerpt: c.body.length > 100 ? c.body.slice(0, 100) + "..." : c.body,
      })),
    };

    return Response.json(post);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
