import React from 'react';
import { CircularProgress, Box } from '@mui/material';

interface LoadingIndicatorProps {
  size?: number;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 40,
}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress size={size} />
    </Box>
  );
};
