import { useState, useEffect, useCallback } from 'react';
import getFavoritesDB from '@/lib/pouchdb';
import { Movie, FavoriteMovie } from '@/lib/types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadFavorites = useCallback(async () => {
    if (!isClient) return;

    try {
      const db = getFavoritesDB();
      const favs = await db.getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [isClient]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const addFavorite = useCallback(async (movie: Movie) => {
    if (!isClient) return;

    try {
      const db = getFavoritesDB();
      await db.addFavorite({
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      });
      await loadFavorites(); // Refresh the list
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }, [loadFavorites, isClient]);

  const removeFavorite = useCallback(async (movieId: number) => {
    if (!isClient) return;

    try {
      const db = getFavoritesDB();
      await db.removeFavorite(movieId);
      await loadFavorites(); // Refresh the list
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }, [loadFavorites, isClient]);

  const toggleFavorite = useCallback(async (movie: Movie): Promise<void> => {
    if (!isClient) return;

    try {
      const db = getFavoritesDB();
      await db.toggleFavorite({
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      });
      await loadFavorites(); // Refresh the list
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }, [loadFavorites, isClient]);

  const isFavorite = useCallback((movieId: number) => {
    return favorites.some(fav => fav.movieId === movieId);
  }, [favorites]);

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    refreshFavorites: loadFavorites,
  };
};