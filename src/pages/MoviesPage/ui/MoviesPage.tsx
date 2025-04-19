import React, { useEffect } from 'react';
import { Box, Typography, Paper, Alert, Container, Grid } from '@mui/material';
import { MovieTable } from '@/widgets/MovieTable';
import { ThemeToggleButton } from '@/features/themeToggle';
import { SearchBar } from '@/features/movieSearch';
import { MovieFilters } from '@/features/movieFilters';
import { useMovies } from '@/entities/movie/model/hooks';
import { LoadingIndicator } from '@/shared/ui/LoadingIndicator';

const MoviesPage: React.FC = () => {
  const { movies, loading, error, fetchAllMovies } = useMovies();

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          Movie Collection
        </Typography>
        <ThemeToggleButton />
      </Box>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Box mb={4}>
          <SearchBar />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={2}>
            <MovieFilters />
          </Grid>

          <Grid item xs={12} md={9} lg={10}>
            {loading && movies.length === 0 ? (
              <Box display="flex" justifyContent="center" my={8}>
                <LoadingIndicator />
              </Box>
            ) : (
              <MovieTable movies={movies} loading={loading} />
            )}
          </Grid>
        </Grid>
      </Paper>

      <Box mt={3} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Movie Collection App
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Data provided by TMDB API • Click on any row for details • Click on
          poster for larger view
        </Typography>
      </Box>
    </Container>
  );
};

export default MoviesPage;
