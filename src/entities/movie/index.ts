export { MovieCard } from './ui/MovieCard';
export { MovieDetailsModal } from './ui/MovieDetailsModal';
export { MovieImageModal } from './ui/MovieImageModal';
export { useMovies, useMovie } from './model/hooks';
export {
  fetchMovies,
  fetchMovieDetails,
  clearSelectedMovie,
} from './model/moviesSlice';
export type { MoviesState } from './model/types';
