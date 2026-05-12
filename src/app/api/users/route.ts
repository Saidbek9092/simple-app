import type { ExternalUser, User } from "@/types/user";

export async function GET() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      return new Response("Failed to fetch users", { status: 502 });
    }

    const externalUsers: ExternalUser[] = await res.json();

    const users: User[] = externalUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
    }));

    return Response.json(users);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
