import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Chip,
  Rating,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { useMovie } from '../model/hooks';

interface MovieDetailsModalProps {
  movieId: number | null;
  open: boolean;
  onClose: () => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movieId,
  open,
  onClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    selectedMovie: movie,
    loading,
    error,
    fetchMovieData,
    clearMovie,
  } = useMovie(movieId);

  useEffect(() => {
    if (movieId && open) {
      fetchMovieData();
    }

    return () => {
      if (!open) {
        clearMovie();
      }
    };
  }, [movieId, open, fetchMovieData, clearMovie]);

  const handleClose = () => {
    onClose();
  };

  if (!movieId) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="movie-details-title"
    >
      <DialogTitle
        id="movie-details-title"
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Typography variant="h6" component="h2">
          {loading ? 'Loading details...' : movie?.title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={10}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box p={3}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : movie ? (
          <>
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
                <Typography variant="h5" fontWeight="bold">
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
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: 3 }}>
              <Box display="flex" gap={3} flexWrap="wrap" mb={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarTodayIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <StarIcon fontSize="small" color="action" />
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Rating
                      value={movie.rating / 2}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2">
                      {movie.rating.toFixed(1)} (
                      {movie.voteCount.toLocaleString()} votes)
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <LocalMoviesIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    Popularity: {movie.popularity.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {movie.overview}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Box display="flex" gap={3}>
                <Box
                  component="img"
                  src={movie.posterUrl}
                  alt={`${movie.title} poster`}
                  sx={{
                    width: '180px',
                    height: 'auto',
                    borderRadius: 1,
                    boxShadow: 3,
                  }}
                />

                <Box>
                  <Typography variant="h6" gutterBottom>
                    Additional Information
                  </Typography>

                  <Box
                    display="grid"
                    gridTemplateColumns="auto 1fr"
                    gap={2}
                    alignItems="center"
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Release Date:
                    </Typography>
                    <Typography variant="body2">{movie.releaseDate}</Typography>

                    <Typography variant="body2" fontWeight="bold">
                      Rating:
                    </Typography>
                    <Typography variant="body2">{movie.rating} / 10</Typography>

                    <Typography variant="body2" fontWeight="bold">
                      Vote Count:
                    </Typography>
                    <Typography variant="body2">
                      {movie.voteCount.toLocaleString()}
                    </Typography>

                    <Typography variant="body2" fontWeight="bold">
                      Popularity:
                    </Typography>
                    <Typography variant="body2">
                      {movie.popularity.toLocaleString()}
                    </Typography>

                    <Typography variant="body2" fontWeight="bold">
                      Genres:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {movie.genres.map(genre => (
                        <Chip key={genre} label={genre} size="small" />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box p={3}>
            <Typography color="error">Failed to load movie details</Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
