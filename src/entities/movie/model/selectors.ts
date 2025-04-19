import { RootState } from '@/app/store';

export const selectMovies = (state: RootState) => state.movies.items;
export const selectSelectedMovie = (state: RootState) =>
  state.movies.selectedMovie;
export const selectMoviesLoading = (state: RootState) => state.movies.loading;
export const selectMoviesError = (state: RootState) => state.movies.error;

export const selectMovieById = (state: RootState, movieId: number) =>
  state.movies.items.find(movie => movie.id === movieId);
