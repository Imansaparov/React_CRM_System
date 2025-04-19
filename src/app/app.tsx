import React from 'react';
import { Container } from '@mui/material';
import { ThemeProvider } from '@/app/providers/theme/ThemeProvider';
import MoviesPage from '@/pages/MoviesPage/ui/MoviesPage.tsx';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MoviesPage />
      </Container>
    </ThemeProvider>
  );
};

export default App;
