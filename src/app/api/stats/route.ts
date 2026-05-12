import type { ExternalPost, Post } from "@/types/post";
import type { ExternalUser } from "@/types/user";
import type { ExternalComment } from "@/types/comment";

interface TopCommenter {
  name: string;
  email: string;
  count: number;
}

interface StatsResponse {
  totalPosts: number;
  totalUsers: number;
  totalComments: number;
  recentPosts: Post[];
  topCommenters: TopCommenter[];
}

export async function GET() {
  const results = await Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/posts"),
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/comments"),
  ]);

  let externalPosts: ExternalPost[] = [];
  let totalUsers = 0;
  let externalComments: ExternalComment[] = [];

  if (results[0].status === "fulfilled" && results[0].value.ok) {
    externalPosts = await results[0].value.json();
  }

  if (results[1].status === "fulfilled" && results[1].value.ok) {
    const externalUsers: ExternalUser[] = await results[1].value.json();
    totalUsers = externalUsers.length;
  }

  if (results[2].status === "fulfilled" && results[2].value.ok) {
    externalComments = await results[2].value.json();
  }

  const posts: Post[] = externalPosts.map((post) => ({
    id: post.id,
    title: post.title,
    body: post.body,
    excerpt:
      post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body,
  }));

  const recentPosts = [...posts].sort((a, b) => b.id - a.id).slice(0, 5);

  const commenterMap = new Map<
    string,
    { name: string; email: string; count: number }
  >();
  for (const comment of externalComments) {
    const key = comment.email.toLowerCase();
    const existing = commenterMap.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      commenterMap.set(key, {
        name: comment.name,
        email: comment.email,
        count: 1,
      });
    }
  }

  const topCommenters: TopCommenter[] = Array.from(commenterMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const stats: StatsResponse = {
    totalPosts: posts.length,
    totalUsers,
    totalComments: externalComments.length,
    recentPosts,
    topCommenters,
  };

  return Response.json(stats);
}
