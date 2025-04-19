import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useMovieFilters } from '@/features/movieFilters/model/useMovieFilters';

export const MovieFilters: React.FC = () => {
  const theme = useTheme();
  const {
    filterOptions,
    activeFilters,
    updateGenreFilter,
    updateRatingFilter,
    updateYearRangeFilter,
    resetFilters,
    hasActiveFilters,
  } = useMovieFilters();

  const handleGenreClick = (genre: string) => {
    const newGenres = activeFilters.genres.includes(genre)
      ? activeFilters.genres.filter(g => g !== genre)
      : [...activeFilters.genres, genre];

    updateGenreFilter(newGenres);
  };

  const handleRatingChange = (_event: Event, value: number | number[]) => {
    updateRatingFilter(value as number);
  };

  const handleFromYearChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string;
    updateYearRangeFilter(value ? parseInt(value) : null, activeFilters.toYear);
  };

  const handleToYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    updateYearRangeFilter(
      activeFilters.fromYear,
      value ? parseInt(value) : null
    );
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <FilterListIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2">
            Filters
          </Typography>
        </Box>

        {hasActiveFilters && (
          <Button size="small" onClick={resetFilters} variant="outlined">
            Reset Filters
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box mb={3}>
        <Typography variant="subtitle2" gutterBottom>
          Genres
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {filterOptions.genres.map(genre => (
            <Chip
              key={genre}
              label={genre}
              clickable
              color={
                activeFilters.genres.includes(genre) ? 'primary' : 'default'
              }
              onClick={() => handleGenreClick(genre)}
              size="small"
            />
          ))}
        </Box>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle2" gutterBottom>
          Minimum Rating
        </Typography>
        <Slider
          value={activeFilters.minRating || 0}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={10}
          sx={{ maxWidth: 300 }}
        />
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>From Year</InputLabel>
          <Select
            value={activeFilters.fromYear || ''}
            onChange={handleFromYearChange}
            label="From Year"
          >
            <MenuItem value="">
              <em>Any</em>
            </MenuItem>
            {filterOptions.years.map(year => (
              <MenuItem key={`from-${year}`} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>To Year</InputLabel>
          <Select
            value={activeFilters.toYear || ''}
            onChange={handleToYearChange}
            label="To Year"
          >
            <MenuItem value="">
              <em>Any</em>
            </MenuItem>
            {filterOptions.years.map(year => (
              <MenuItem key={`to-${year}`} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};
