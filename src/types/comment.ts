export interface ExternalComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  email: string;
  body: string;
  excerpt: string;
}
