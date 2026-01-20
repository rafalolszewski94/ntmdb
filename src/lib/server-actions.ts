import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { TMDB } from 'tmdb-ts';

let tmdb: TMDB | null = null;

function getTMDBClient(): TMDB {
  if (!tmdb) {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!API_KEY) {
      throw new Error('NEXT_PUBLIC_TMDB_API_KEY is not set. Please add NEXT_PUBLIC_TMDB_API_KEY to your environment variables.');
    }
    tmdb = new TMDB(API_KEY);
  }
  return tmdb;
}

// Cache popular movies for 1 hour (3600 seconds)
// Using unstable_cache for persistent caching across requests
export const getPopularMovies = unstable_cache(
  async () => {
    const tmdb = getTMDBClient();
    const response = await tmdb.trending.trending('movie', 'week');
    return response.results.slice(0, 20);
  },
  ['popular-movies'],
  {
    revalidate: 3600, // 1 hour
    tags: ['movies', 'popular']
  }
);

// Cache individual movie details for 24 hours
export const getMovieDetails = unstable_cache(
  async (movieId: number) => {
    const tmdb = getTMDBClient();
    const response = await tmdb.movies.details(movieId);
    return response;
  },
  ['movie-details'],
  {
    revalidate: 86400, // 24 hours
    tags: ['movies', 'details']
  }
);

// Cache movie credits for 24 hours
export const getMovieCredits = unstable_cache(
  async (movieId: number) => {
    const tmdb = getTMDBClient();
    const response = await tmdb.movies.credits(movieId);
    // Ensure cast exists and is an array
    if (!response || !response.cast || !Array.isArray(response.cast)) {
      return [];
    }
    return response.cast.slice(0, 10);
  },
  ['movie-credits'],
  {
    revalidate: 86400, // 24 hours
    tags: ['movies', 'credits']
  }
);

// Cache movie watch providers for 24 hours
export const getMovieWatchProviders = unstable_cache(
  async (movieId: number) => {
    const tmdb = getTMDBClient();
    const response = await tmdb.movies.watchProviders(movieId);
    return response;
  },
  ['movie-watch-providers'],
  {
    revalidate: 86400, // 24 hours
    tags: ['movies', 'watch-providers']
  }
);

// Request memoization for parallel requests within the same request
export const getMovieWithCredits = cache(async (movieId: number) => {
  const [movie, credits, watchProviders] = await Promise.all([
    getMovieDetails(movieId),
    getMovieCredits(movieId),
    getMovieWatchProviders(movieId)
  ]);

  return { movie, credits, watchProviders };
});
