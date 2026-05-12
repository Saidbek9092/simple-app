import type { ExternalPost, Post } from "@/types/post";

export async function GET() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      return new Response("Failed to fetch posts", { status: 502 });
    }

    const externalPosts: ExternalPost[] = await res.json();

    const posts: Post[] = externalPosts.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      excerpt: post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body,
    }));

    return Response.json(posts);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
