import type { ExternalUser, User } from "@/types/user";
import type { ExternalPost, Post } from "@/types/post";

interface UserDetail extends User {
  posts: Post[];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = parseInt(id, 10);

  if (isNaN(userId)) {
    return Response.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const [userRes, postsRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
    ]);

    if (!userRes.ok) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const externalUser: ExternalUser = await userRes.json();
    const externalPosts: ExternalPost[] = postsRes.ok
      ? await postsRes.json()
      : [];

    const user: UserDetail = {
      id: externalUser.id,
      name: externalUser.name,
      email: externalUser.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(externalUser.name)}&background=random`,
      posts: externalPosts.map((p) => ({
        id: p.id,
        title: p.title,
        body: p.body,
        excerpt: p.body.length > 100 ? p.body.slice(0, 100) + "..." : p.body,
      })),
    };

    return Response.json(user);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
