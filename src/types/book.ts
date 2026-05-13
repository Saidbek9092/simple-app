export interface ExternalBookDoc {
  key: string;
  title: string;
  author_name?: string[];
  author_key?: string[];
  cover_i?: number;
  first_publish_year?: number;
  edition_count?: number;
  subject?: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  firstPublishYear: number | null;
  editionCount: number;
}

export interface ExternalBookWork {
  title: string;
  key: string;
  description?: string | { value: string };
  covers?: number[];
  subjects?: string[];
  authors?: { author: { key: string } }[];
  first_publish_date?: string;
}

export interface ExternalAuthor {
  name: string;
  key: string;
}

export interface BookDetail {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  description: string | null;
  subjects: string[];
  firstPublishYear: string | null;
  editionCount: number | null;
}
