export interface ExternalPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  excerpt: string;
}
