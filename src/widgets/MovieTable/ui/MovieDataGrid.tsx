import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  GridRowParams,
  GridPaginationModel,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Chip,
  Rating,
  Paper,
  useTheme,
  alpha,
  Tooltip,
} from '@mui/material';
import { Movie } from '@/shared/types/movie';
import { useTableSettingsStore } from '@/features/tableSettings/model/useTableSettingsStore';

interface MovieDataGridProps {
  movies: Movie[];
  loading: boolean;
  onRowClick: (movieId: number) => void;
  onImageClick: (
    event: React.MouseEvent<HTMLElement>,
    imageUrl: string
  ) => void;
}

export const MovieDataGrid: React.FC<MovieDataGridProps> = ({
  movies,
  loading,
  onRowClick,
  onImageClick,
}) => {
  const theme = useTheme();

  const { settings, updatePagination, updateSorting, updateFiltering } =
    useTableSettingsStore('movies');

  const handleRowClick = (params: GridRowParams) => {
    onRowClick(params.id as number);
  };

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    updatePagination(model);
  };

  const handleSortModelChange = (model: GridSortModel) => {
    updateSorting(model);
  };

  const handleFilterModelChange = (model: GridFilterModel) => {
    updateFiltering(model);
  };

  const columns: GridColDef[] = [
    {
      field: 'poster',
      headerName: 'Poster',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<Movie, string>) => {
        const movie = movies.find(m => m.id === params.row.id);
        return (
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={movie?.posterUrl}
              alt={`${movie?.title} poster`}
              onClick={e => onImageClick(e, movie?.posterUrl || '')}
              sx={{
                maxHeight: '90px',
                maxWidth: '100%',
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 3,
                },
              }}
            />
          </Box>
        );
      },
      renderHeader: () => (
        <Tooltip title="Click on poster to view large image">
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            Poster
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<Movie, string>) => {
        const movie = movies.find(m => m.id === params.row.id);
        return (
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                fontFamily: '"Georgia", "Times New Roman", serif',
                color:
                  theme.palette.mode === 'light'
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
                mb: 0.5,
              }}
            >
              {params.value}
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.5}>
              {movie?.genres.slice(0, 3).map(genre => (
                <Chip
                  key={genre}
                  label={genre}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                  }}
                />
              ))}
              {movie?.genres.length > 3 && (
                <Chip
                  label={`+${movie.genres.length - 3}`}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                  }}
                />
              )}
            </Box>
          </Box>
        );
      },
    },
    {
      field: 'overview',
      headerName: 'Overview',
      flex: 2,
      minWidth: 300,
      renderCell: (params: GridRenderCellParams<Movie, string>) => (
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            textAlign: 'justify',
            fontStyle: 'italic',
            color: theme.palette.text.secondary,
            lineHeight: 1.5,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'releaseDate',
      headerName: 'Release Date',
      width: 150,
      type: 'date',
      valueGetter: params => new Date(params.row.releaseDate),
      renderCell: params => {
        const date = new Date(params.value);
        return (
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 'bold',
              color: theme.palette.error.main,
              letterSpacing: '0.5px',
            }}
          >
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
        );
      },
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 150,
      type: 'number',
      renderCell: (params: GridRenderCellParams<Movie, number>) => (
        <Box display="flex" alignItems="center">
          <Rating
            value={params.value / 2}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              '& .MuiRating-iconFilled': {
                color: theme.palette.warning.main,
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              ml: 1,
              fontWeight: 'bold',
              color: theme.palette.warning.dark,
            }}
          >
            {params.value.toFixed(1)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'popularity',
      headerName: 'Popularity',
      width: 130,
      type: 'number',
      renderCell: (params: GridRenderCellParams<Movie, number>) => {
        const normalizedValue = Math.min(Math.max(params.value / 200, 0), 1);

        return (
          <Box display="flex" alignItems="center" width="100%">
            <Box
              sx={{
                width: '70%',
                height: 8,
                bgcolor: alpha(theme.palette.success.main, 0.2),
                borderRadius: 1,
                mr: 1,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${normalizedValue * 100}%`,
                  height: '100%',
                  bgcolor: theme.palette.success.main,
                  borderRadius: 1,
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.success.dark,
                fontWeight: 'medium',
                fontFamily: 'Arial, sans-serif',
                fontSize: '0.875rem',
              }}
            >
              {params.value.toLocaleString()}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const getRowClassName = (params: GridRowParams) => {
    const movie = movies.find(m => m.id === params.id);
    if (!movie) return '';

    if (movie.rating >= 8.5) {
      return 'high-rated-row';
    } else if (movie.rating < 7) {
      return 'low-rated-row';
    }
    return '';
  };

  const rows = movies.map(movie => ({
    id: movie.id,
    poster: movie.posterUrl,
    title: movie.title,
    overview: movie.overview,
    releaseDate: movie.releaseDate,
    rating: movie.rating,
    voteCount: movie.voteCount,
    popularity: movie.popularity,
  }));

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        height: 650,
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        getRowHeight={() => 'auto'}
        getEstimatedRowHeight={() => 200}
        getRowClassName={getRowClassName}
        onRowClick={handleRowClick}
        paginationModel={settings.pagination}
        sortModel={settings.sorting}
        filterModel={settings.filtering}
        onPaginationModelChange={handlePaginationModelChange}
        onSortModelChange={handleSortModelChange}
        onFilterModelChange={handleFilterModelChange}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell': {
            py: 2,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            minHeight: '100px !important',
            maxHeight: '300px !important',
          },
          '& .MuiDataGrid-columnHeaders': {
            bgcolor:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary.main, 0.2)
                : alpha(theme.palette.primary.main, 0.1),
            borderRadius: 0,
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            '&:hover': {
              bgcolor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.main, 0.1)
                  : alpha(theme.palette.primary.main, 0.05),
            },
          },
          '& .high-rated-row': {
            bgcolor:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.success.main, 0.1)
                : alpha(theme.palette.success.main, 0.05),
            '&:hover': {
              bgcolor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.success.main, 0.15)
                  : alpha(theme.palette.success.main, 0.1),
            },
          },
          '& .low-rated-row': {
            bgcolor:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.error.main, 0.05)
                : alpha(theme.palette.error.main, 0.03),
            '&:hover': {
              bgcolor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.error.main, 0.1)
                  : alpha(theme.palette.error.main, 0.07),
            },
          },
        }}
      />
    </Paper>
  );
};
