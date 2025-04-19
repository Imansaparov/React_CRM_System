import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { tmdbApi } from '@/shared/api/tmdb/tmdbApi';
import { Movie, MovieDetails } from '@/shared/types/movie';
import { MoviesState, FetchMoviesPayload } from './types';

const initialState: MoviesState = {
  items: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (payload?: FetchMoviesPayload, { rejectWithValue }) => {
    try {
      let movieData: Movie[] = [];

      try {
        const page = payload?.page || 1;
        const searchQuery = payload?.searchQuery;

        if (searchQuery) {
          // movieData = await tmdbApi.searchMovies(searchQuery, page);
          movieData = [];
        } else {
          movieData = await tmdbApi.getPopularMovies(page);
        }
      } catch (error) {
        console.log('Error fetching from API, using mock data:', error);
        movieData = tmdbApi.getMockMovies();
      }

      return movieData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch movies');
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId: number, { rejectWithValue }) => {
    try {
      const movieDetails = await tmdbApi.getMovieDetails(movieId);
      if (!movieDetails) {
        throw new Error('Movie details not found');
      }
      return movieDetails;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch movie details');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSelectedMovie: state => {
      state.selectedMovie = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMovieDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMovieDetails.fulfilled,
        (state, action: PayloadAction<MovieDetails>) => {
          state.loading = false;
          state.selectedMovie = action.payload;
        }
      )
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
