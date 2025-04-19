import React, { useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useMovieSearch } from '../model/useMovieSearch';

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search movies...',
}) => {
  const { searchQuery, debouncedQuery, handleSearch, performSearch } =
    useMovieSearch();

  // Trigger search on debounced query change
  useEffect(() => {
    performSearch();
  }, [debouncedQuery, performSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  const handleClearSearch = () => {
    handleSearch('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    performSearch();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 500,
        m: 'auto',
      }}
    >
      <TextField
        fullWidth
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: searchQuery ? (
            <InputAdornment position="end">
              <Tooltip title="Clear search">
                <IconButton
                  aria-label="clear search"
                  onClick={handleClearSearch}
                  edge="end"
                  size="small"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'divider',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
    </Box>
  );
};
