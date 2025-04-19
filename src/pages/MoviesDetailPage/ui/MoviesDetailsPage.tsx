import React, { useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Rating,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovie } from '@/entities/movie/model/hooks.ts';
import { LoadingIndicator } from '@/shared/ui/LoadingIndicator';
import { formatDate } from '@/shared/lib/helpers/formatters';

const MoviesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = id ? parseInt(id) : null;
  const {
    selectedMovie: movie,
    loading,
    error,
    fetchMovieData,
  } = useMovie(movieId);

  useEffect(() => {
    if (movieId) {
      fetchMovieData();
    }
  }, [movieId, fetchMovieData]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <LoadingIndicator size={60} />
        </Box>
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            {error || 'Movie not found'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleGoBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {movie.title}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={movie.backdropUrl}
            alt={`${movie.title} backdrop`}
            sx={{
              width: '100%',
              height: { xs: '200px', sm: '300px', md: '400px' },
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              color: 'white',
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              {movie.title}
            </Typography>

            <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
              {movie.genres.map(genre => (
                <Chip
                  key={genre}
                  label={genre}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} lg={3}>
              <Box
                component="img"
                src={movie.posterUrl}
                alt={`${movie.title} poster`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />

              <Box mt={3}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Movie Info
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box
                  display="grid"
                  gridTemplateColumns="auto 1fr"
                  columnGap={2}
                  rowGap={1}
                >
                  <Typography variant="body2" color="text.secondary">
                    Release Date:
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(movie.releaseDate)}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Rating:
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Rating
                      value={movie.rating / 2}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2">
                      {movie.rating.toFixed(1)}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    Votes:
                  </Typography>
                  <Typography variant="body2">
                    {movie.voteCount.toLocaleString()}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Popularity:
                  </Typography>
                  <Typography variant="body2">
                    {movie.popularity.toLocaleString()}
                  </Typography>

                  {movie.runtime && (
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Runtime:
                      </Typography>
                      <Typography variant="body2">
                        {movie.runtime} minutes
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              {movie.tagline && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  fontStyle="italic"
                  gutterBottom
                  sx={{ mb: 3 }}
                >
                  "{movie.tagline}"
                </Typography>
              )}

              <Typography variant="h5" gutterBottom>
                Overview
              </Typography>

              <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                {movie.overview}
              </Typography>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h5" gutterBottom>
                Cast
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Cast information not available.
              </Typography>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h5" gutterBottom>
                Related Movies
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Related movies information not available.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default MoviesDetailsPage;
