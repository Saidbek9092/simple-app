import type { NextRequest } from "next/server";
import type { ExternalUser, User } from "@/types/user";
import type { PaginatedResponse } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      return new Response("Failed to fetch users", { status: 502 });
    }

    const externalUsers: ExternalUser[] = await res.json();

    let users: User[] = externalUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
    }));

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    if (search) {
      const term = search.toLowerCase();
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term),
      );
    }

    if (pageParam !== null || limitParam !== null) {
      const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
      const limit = Math.max(1, parseInt(limitParam ?? "10", 10) || 10);
      const total = users.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const data = users.slice(start, start + limit);

      const paginated: PaginatedResponse<User> = {
        data,
        total,
        page,
        totalPages,
      };
      return Response.json(paginated);
    }

    return Response.json(users);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
