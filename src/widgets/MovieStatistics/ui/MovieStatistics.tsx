import React, { useMemo } from 'react';
import { Box, Paper, Typography, Grid, Divider, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Movie } from '@/shared/types/movie';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface MovieStatisticsProps {
  movies: Movie[];
}

export const MovieStatistics: React.FC<MovieStatisticsProps> = ({ movies }) => {
  const theme = useTheme();

  const statistics = useMemo(() => {
    if (!movies.length) {
      return {
        totalMovies: 0,
        averageRating: 0,
        highestRated: null as Movie | null,
        lowestRated: null as Movie | null,
        genreCounts: {} as Record<string, number>,
        decadeCounts: {} as Record<string, number>,
      };
    }

    const sortedByRating = [...movies].sort((a, b) => b.rating - a.rating);
    const highestRated = sortedByRating[0];
    const lowestRated = sortedByRating[sortedByRating.length - 1];

    const totalRating = movies.reduce((sum, movie) => sum + movie.rating, 0);
    const averageRating = totalRating / movies.length;

    const genreCounts: Record<string, number> = {};
    movies.forEach(movie => {
      movie.genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    const decadeCounts: Record<string, number> = {};
    movies.forEach(movie => {
      if (movie.releaseDate) {
        const year = new Date(movie.releaseDate).getFullYear();
        const decade = `${Math.floor(year / 10) * 10}s`;
        decadeCounts[decade] = (decadeCounts[decade] || 0) + 1;
      }
    });

    return {
      totalMovies: movies.length,
      averageRating,
      highestRated,
      lowestRated,
      genreCounts,
      decadeCounts,
    };
  }, [movies]);

  const genreChartData = useMemo(() => {
    const sortedGenres = Object.entries(statistics.genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      labels: sortedGenres.map(([genre]) => genre),
      datasets: [
        {
          label: 'Number of Movies',
          data: sortedGenres.map(([, count]) => count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderColor: theme.palette.background.paper,
          borderWidth: 2,
        },
      ],
    };
  }, [statistics.genreCounts, theme.palette.background.paper]);

  const decadeChartData = useMemo(() => {
    const decades = Object.entries(statistics.decadeCounts).sort(
      ([decadeA], [decadeB]) => {
        const yearA = parseInt(decadeA);
        const yearB = parseInt(decadeB);
        return yearA - yearB;
      }
    );

    return {
      labels: decades.map(([decade]) => decade),
      datasets: [
        {
          label: 'Movies by Decade',
          data: decades.map(([, count]) => count),
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(54, 162, 235, 0.7)'
              : 'rgba(54, 162, 235, 0.7)',
          borderColor:
            theme.palette.mode === 'dark'
              ? 'rgba(54, 162, 235, 1)'
              : 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [statistics.decadeCounts, theme.palette.mode]);

  if (!movies.length) {
    return null;
  }

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Movie Statistics
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Box textAlign="center" p={2}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Total Movies
            </Typography>
            <Typography variant="h4">{statistics.totalMovies}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box textAlign="center" p={2}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Average Rating
            </Typography>
            <Typography variant="h4">
              {statistics.averageRating.toFixed(1)}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box textAlign="center" p={2}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Highest Rated
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {statistics.highestRated?.title}
            </Typography>
            <Typography variant="body2" color="success.main">
              {statistics.highestRated?.rating.toFixed(1)}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box textAlign="center" p={2}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Lowest Rated
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {statistics.lowestRated?.title}
            </Typography>
            <Typography variant="body2" color="error.main">
              {statistics.lowestRated?.rating.toFixed(1)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Top 5 Genres
          </Typography>
          <Box height={300}>
            <Pie
              data={genreChartData}
              options={{ maintainAspectRatio: false }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Movies by Decade
          </Typography>
          <Box height={300}>
            <Bar
              data={decadeChartData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Movies',
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Decade',
                    },
                  },
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
