export interface ExternalPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  thumbnailUrl: string;
  fullUrl: string;
  unsplashUrl: string;
}
