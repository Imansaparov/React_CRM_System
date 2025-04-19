import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  selectMovies,
  selectSelectedMovie,
  selectMoviesLoading,
  selectMoviesError,
  selectMovieById,
} from './selectors';
import {
  fetchMovies,
  fetchMovieDetails,
  clearSelectedMovie,
} from './moviesSlice';

export const useMovies = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const loading = useAppSelector(selectMoviesLoading);
  const error = useAppSelector(selectMoviesError);

  const fetchAllMovies = useCallback(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return {
    movies,
    loading,
    error,
    fetchAllMovies,
  };
};

export const useMovie = (movieId: number | null) => {
  const dispatch = useAppDispatch();
  const movie = useAppSelector(state =>
    movieId ? selectMovieById(state, movieId) : null
  );
  const selectedMovie = useAppSelector(selectSelectedMovie);
  const loading = useAppSelector(selectMoviesLoading);
  const error = useAppSelector(selectMoviesError);

  const fetchMovieData = useCallback(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId));
    }
  }, [dispatch, movieId]);

  const clearMovie = useCallback(() => {
    dispatch(clearSelectedMovie());
  }, [dispatch]);

  return {
    movie,
    selectedMovie,
    loading,
    error,
    fetchMovieData,
    clearMovie,
  };
};
