import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Rating,
  Stack,
} from '@mui/material';
import { Movie } from '@/shared/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          pb: '56.25%', // 16:9 aspect ratio
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          {movie.title}
        </Typography>

        <Box sx={{ mb: 1.5 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating
              value={movie.rating / 2}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              {movie.rating.toFixed(1)}
            </Typography>
          </Stack>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {movie.overview}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 1 }}
          >
            Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {movie.genres.slice(0, 3).map(genre => (
              <Chip key={genre} label={genre} size="small" />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
