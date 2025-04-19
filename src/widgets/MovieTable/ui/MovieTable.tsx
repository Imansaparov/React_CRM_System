import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { MovieDataGrid } from './MovieDataGrid';
import { Movie } from '@/shared/types/movie';
import { MovieDetailsModal } from '@/entities/movie/ui/MovieDetailsModal';
import { MovieImageModal } from '@/entities/movie/ui/MovieImageModal';
import { EmptyState } from '@/shared/ui/EmptyState';

interface MovieTableProps {
  movies: Movie[];
  loading: boolean;
}

export const MovieTable: React.FC<MovieTableProps> = ({ movies, loading }) => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleRowClick = (movieId: number) => {
    setSelectedMovieId(movieId);
    setIsDetailsModalOpen(true);
  };

  const handleImageClick = (
    event: React.MouseEvent<HTMLElement>,
    imageUrl: string
  ) => {
    event.stopPropagation();
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedMovieId(null);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  if (!loading && movies.length === 0) {
    return (
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ borderRadius: 2, overflow: 'hidden' }}
      >
        <EmptyState
          title="No movies found"
          message="Try adjusting your search or filter criteria."
        />
      </Paper>
    );
  }

  return (
    <Box>
      <MovieDataGrid
        movies={movies}
        loading={loading}
        onRowClick={handleRowClick}
        onImageClick={handleImageClick}
      />

      <MovieDetailsModal
        movieId={selectedMovieId}
        open={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
      />

      <MovieImageModal
        imageUrl={selectedImage}
        open={isImageModalOpen}
        onClose={handleCloseImageModal}
      />
    </Box>
  );
};
