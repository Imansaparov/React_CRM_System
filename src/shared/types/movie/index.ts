export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  rating: number;
  voteCount: number;
  popularity: number;
  genres: string[];
}

export interface MovieDetails extends Movie {
  runtime?: number;
  tagline?: string;
  status?: string;
}
