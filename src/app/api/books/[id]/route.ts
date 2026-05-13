import type {
  ExternalBookWork,
  ExternalAuthor,
  BookDetail,
} from "@/types/book";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const workRes = await fetch(`https://openlibrary.org/works/${id}.json`);

    if (!workRes.ok) {
      return Response.json({ error: "Book not found" }, { status: 404 });
    }

    const work: ExternalBookWork = await workRes.json();

    // Fetch author name
    let authorName = "Unknown";
    const authorKey = work.authors?.[0]?.author?.key;
    if (authorKey) {
      const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
      if (authorRes.ok) {
        const author: ExternalAuthor = await authorRes.json();
        authorName = author.name;
      }
    }

    // Fetch edition count from search
    let editionCount: number | null = null;
    const searchRes = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(work.title)}&limit=1`,
    );
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      const match = searchData.docs?.[0];
      if (match) editionCount = match.edition_count ?? null;
    }

    const description =
      typeof work.description === "string"
        ? work.description
        : (work.description?.value ?? null);

    const coverUrl = work.covers?.[0]
      ? `https://covers.openlibrary.org/b/id/${work.covers[0]}-L.jpg`
      : null;

    const book: BookDetail = {
      id,
      title: work.title,
      author: authorName,
      coverUrl,
      description,
      subjects: (work.subjects ?? []).slice(0, 10),
      firstPublishYear: work.first_publish_date ?? null,
      editionCount,
    };

    return Response.json(book);
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
