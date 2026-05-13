export interface ExternalAnime {
  mal_id: number;
  title: string;
  title_english: string | null;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string | null;
  score: number | null;
  episodes: number | null;
  status: string;
  type: string;
  genres: { mal_id: number; name: string }[];
  year: number | null;
}

export interface Anime {
  id: number;
  title: string;
  imageUrl: string;
  score: number | null;
  episodes: number | null;
  type: string;
  year: number | null;
}

export interface AnimeDetail {
  id: number;
  title: string;
  titleEnglish: string | null;
  imageUrl: string;
  synopsis: string | null;
  score: number | null;
  episodes: number | null;
  status: string;
  type: string;
  genres: string[];
  year: number | null;
}
