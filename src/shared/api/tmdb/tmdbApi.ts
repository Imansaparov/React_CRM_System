import { Movie, MovieDetails } from '@/shared/types/movie';
import { API_CONFIG } from '@/shared/config/constants';

const { BASE_URL, IMAGE_BASE_URL, KEY } = API_CONFIG.TMDB;

type TMDBMovieListResponse = {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
};

type TMDBMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
};

type TMDBGenre = {
  id: number;
  name: string;
};

type TMDBGenreListResponse = {
  genres: TMDBGenre[];
};

const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

const transformMovieData = (
  movie: TMDBMovie,
  genres: Record<number, string>
): Movie => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  posterUrl: getImageUrl(movie.poster_path),
  backdropUrl: getImageUrl(movie.backdrop_path, 'original'),
  releaseDate: movie.release_date,
  rating: movie.vote_average,
  voteCount: movie.vote_count,
  popularity: movie.popularity,
  genres: movie.genre_ids.map(id => genres[id] || 'Unknown'),
});

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

console.log(KEY);
class TMDBApiClient {
  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      if (!KEY) {
        throw new ApiError('API key is not provided', 401);
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! Status: ${response.status}`,
          response.status
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      console.error('API request failed:', error);
      throw new ApiError('Failed to fetch data from API');
    }
  }

  async getGenres(): Promise<Record<number, string>> {
    try {
      const url = `${BASE_URL}/genre/movie/list?api_key=${KEY}&language=en-US`;
      const data =
        await this.fetchWithErrorHandling<TMDBGenreListResponse>(url);

      const genresMap: Record<number, string> = {};
      data.genres.forEach(genre => {
        genresMap[genre.id] = genre.name;
      });

      return genresMap;
    } catch (error) {
      console.error('Failed to fetch genres:', error);
      return {};
    }
  }

  async getPopularMovies(page: number = 1): Promise<Movie[]> {
    try {
      const genres = await this.getGenres();
      const url = `${BASE_URL}/movie/popular?api_key=${KEY}&language=en-US&page=${page}`;
      const data =
        await this.fetchWithErrorHandling<TMDBMovieListResponse>(url);

      return data.results.map(movie => transformMovieData(movie, genres));
    } catch (error) {
      console.error('Failed to fetch popular movies:', error);
      return [];
    }
  }

  async searchMovies(query: string, page: number = 1): Promise<Movie[]> {
    try {
      const genres = await this.getGenres();
      const url = `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`;
      const data =
        await this.fetchWithErrorHandling<TMDBMovieListResponse>(url);

      return data.results.map(movie => transformMovieData(movie, genres));
    } catch (error) {
      console.error('Failed to search movies:', error);
      return [];
    }
  }

  async getMovieDetails(id: number): Promise<MovieDetails | null> {
    try {
      const url = `${BASE_URL}/movie/${id}?api_key=${KEY}&language=en-US`;
      const data = await this.fetchWithErrorHandling<any>(url);

      return {
        id: data.id,
        title: data.title,
        overview: data.overview,
        posterUrl: getImageUrl(data.poster_path),
        backdropUrl: getImageUrl(data.backdrop_path, 'original'),
        releaseDate: data.release_date,
        rating: data.vote_average,
        voteCount: data.vote_count,
        popularity: data.popularity,
        genres: data.genres.map((g: TMDBGenre) => g.name),
        runtime: data.runtime,
        tagline: data.tagline,
        status: data.status,
      };
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
      return null;
    }
  }

  getMockMovies(): Movie[] {
    return mockMoviesData;
  }
}

const mockMoviesData: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    overview:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
    backdropUrl:
      'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    releaseDate: '2010-07-16',
    rating: 8.4,
    voteCount: 32456,
    popularity: 123456,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    overview:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    backdropUrl:
      'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    releaseDate: '1994-09-23',
    rating: 9.3,
    voteCount: 23456,
    popularity: 98765,
    genres: ['Drama', 'Crime'],
  },
  {
    id: 3,
    title: 'The Dark Knight',
    overview:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdropUrl:
      'https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
    releaseDate: '2008-07-18',
    rating: 9.0,
    voteCount: 28456,
    popularity: 112233,
    genres: ['Action', 'Crime', 'Drama', 'Thriller'],
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    overview:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdropUrl:
      'https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2QM528GlJDHLeq.jpg',
    releaseDate: '1994-10-14',
    rating: 8.9,
    voteCount: 24315,
    popularity: 75421,
    genres: ['Crime', 'Drama'],
  },
  {
    id: 5,
    title: 'The Lord of the Rings: The Return of the King',
    overview:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    posterUrl:
      'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
    backdropUrl:
      'https://image.tmdb.org/t/p/original/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg',
    releaseDate: '2003-12-17',
    rating: 8.9,
    voteCount: 21634,
    popularity: 86420,
    genres: ['Adventure', 'Fantasy', 'Action'],
  },
];

export const tmdbApi = new TMDBApiClient();
