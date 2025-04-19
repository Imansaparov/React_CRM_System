import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/app/store';
import { fetchMovies } from '@/entities/movie/model/moviesSlice';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';

export const useMovieSearch = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const performSearch = useCallback(() => {
    if (debouncedQuery) {
      dispatch(fetchMovies({ searchQuery: debouncedQuery }));
    } else {
      dispatch(fetchMovies());
    }
  }, [dispatch, debouncedQuery]);

  return {
    searchQuery,
    debouncedQuery,
    handleSearch,
    performSearch,
  };
};
