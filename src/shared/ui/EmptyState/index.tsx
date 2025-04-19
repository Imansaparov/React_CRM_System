import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No results found',
  message = "We couldn't find any items matching your criteria.",
  actionText,
  onAction,
  icon = (
    <SearchOffIcon
      sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }}
    />
  ),
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={8}
      px={2}
    >
      {icon}

      <Typography variant="h5" mt={3} mb={1}>
        {title}
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3} maxWidth="sm">
        {message}
      </Typography>

      {actionText && onAction && (
        <Button variant="contained" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Box>
  );
};
