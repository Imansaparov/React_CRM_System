import { Movie, MovieDetails } from '@/shared/types/movie';

export interface MoviesState {
  items: Movie[];
  selectedMovie: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

export interface FetchMoviesPayload {
  page?: number;
  searchQuery?: string;
}

export interface FetchMovieDetailsPayload {
  movieId: number;
}
