import React from 'react';
import { Grid, Box } from '@mui/material';
import { MovieCard } from '@/entities/movie/ui/MovieCard';
import { Movie } from '@/shared/types/movie';
import { EmptyState } from '@/shared/ui/EmptyState';

interface MovieCardGridProps {
  movies: Movie[];
  loading: boolean;
  onMovieClick?: (movieId: number) => void;
}

export const MovieCardGrid: React.FC<MovieCardGridProps> = ({
  movies,
  loading,
  onMovieClick,
}) => {
  if (!loading && movies.length === 0) {
    return (
      <EmptyState
        title="No movies found"
        message="Try adjusting your search or filter criteria."
      />
    );
  }

  return (
    <Grid container spacing={3}>
      {movies.map(movie => (
        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
          <Box
            onClick={() => onMovieClick?.(movie.id)}
            sx={{
              height: '100%',
              cursor: onMovieClick ? 'pointer' : 'default',
            }}
          >
            <MovieCard movie={movie} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
