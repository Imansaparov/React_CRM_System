import { useState, useCallback, useMemo } from 'react';
import { useAppSelector } from '@/app/store';
import { selectMovies } from '@/entities/movie/model/selectors';
import { ActiveFilters } from './types';

export const useMovieFilters = () => {
  const movies = useAppSelector(selectMovies);

  // Generate filter options from movies data
  const filterOptions = useMemo(() => {
    const genres = new Set<string>();
    const ratings = new Set<number>();
    const years = new Set<string>();

    movies.forEach(movie => {
      // Add genres
      movie.genres.forEach(genre => genres.add(genre));

      // Add rounded rating values
      ratings.add(Math.floor(movie.rating));

      // Add release years
      if (movie.releaseDate) {
        const year = new Date(movie.releaseDate).getFullYear().toString();
        years.add(year);
      }
    });

    return {
      genres: Array.from(genres).sort(),
      ratings: Array.from(ratings).sort((a, b) => a - b),
      years: Array.from(years).sort(),
    };
  }, [movies]);

  // Active filters state
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    genres: [],
    minRating: null,
    fromYear: null,
    toYear: null,
  });

  // Update filter handlers
  const updateGenreFilter = useCallback((genres: string[]) => {
    setActiveFilters(prev => ({ ...prev, genres }));
  }, []);

  const updateRatingFilter = useCallback((rating: number | null) => {
    setActiveFilters(prev => ({ ...prev, minRating: rating }));
  }, []);

  const updateYearRangeFilter = useCallback(
    (fromYear: number | null, toYear: number | null) => {
      setActiveFilters(prev => ({ ...prev, fromYear, toYear }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setActiveFilters({
      genres: [],
      minRating: null,
      fromYear: null,
      toYear: null,
    });
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      activeFilters.genres.length > 0 ||
      activeFilters.minRating !== null ||
      activeFilters.fromYear !== null ||
      activeFilters.toYear !== null
    );
  }, [activeFilters]);

  return {
    filterOptions,
    activeFilters,
    updateGenreFilter,
    updateRatingFilter,
    updateYearRangeFilter,
    resetFilters,
    hasActiveFilters,
  };
};
