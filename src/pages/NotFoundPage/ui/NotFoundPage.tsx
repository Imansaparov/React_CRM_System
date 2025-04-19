import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 6,
          borderRadius: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'warning.main' }} />

        <Typography variant="h3" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>

        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          sx={{ maxWidth: 600, mb: 4 }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleGoHome}
          sx={{ minWidth: 200 }}
        >
          Go to Homepage
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
