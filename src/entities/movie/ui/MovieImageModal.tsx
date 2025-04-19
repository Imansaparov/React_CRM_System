import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

interface MovieImageModalProps {
  imageUrl: string | null;
  open: boolean;
  onClose: () => void;
}

export const MovieImageModal: React.FC<MovieImageModalProps> = ({
  imageUrl,
  open,
  onClose,
}) => {
  const [scale, setScale] = useState(1);

  React.useEffect(() => {
    if (open) {
      setScale(1);
    }
  }, [open]);

  if (!imageUrl) return null;

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="movie-image-modal"
      aria-describedby="enlarged movie image"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '90vh',
          outline: 'none',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 1,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 1,
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={zoomIn}
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
            aria-label="zoom in"
          >
            <ZoomInIcon />
          </IconButton>

          <IconButton
            onClick={zoomOut}
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
            aria-label="zoom out"
          >
            <ZoomOutIcon />
          </IconButton>

          <IconButton
            onClick={onClose}
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <img
          src={imageUrl}
          alt="Enlarged movie poster"
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '85vh',
            transform: `scale(${scale})`,
            transition: 'transform 0.3s ease',
            transformOrigin: 'center center',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
          }}
        >
          {Math.round(scale * 100)}%
        </Box>
      </Box>
    </Modal>
  );
};
