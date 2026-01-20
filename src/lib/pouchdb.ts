import { useState, useEffect } from 'react';

export interface FavoriteMovie {
  _id: string;
  _rev?: string;
  movieId: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  addedAt: string;
}

// Dynamic import for PouchDB to avoid server-side rendering issues
let PouchDB: any = null;

const loadPouchDB = async () => {
  if (typeof window === 'undefined') {
    throw new Error('PouchDB can only be used in the browser');
  }
  if (!PouchDB) {
    PouchDB = (await import('pouchdb')).default;
  }
  return PouchDB;
};

class FavoritesDB {
  private db: any;

  async init() {
    if (!this.db) {
      const PouchDBClass = await loadPouchDB();
      this.db = new PouchDBClass('movie-favorites');
    }
    return this.db;
  }

  async addFavorite(movie: Omit<FavoriteMovie, '_id' | '_rev' | 'addedAt'>): Promise<void> {
    const favorite: FavoriteMovie = {
      _id: `movie-${movie.movieId}`,
      movieId: movie.movieId,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      addedAt: new Date().toISOString(),
    };

    try {
      const db = await this.init();
      await db.put(favorite);
    } catch (error) {
      if ((error as any).status === 409) {
        // Document already exists, which is fine for favorites
        return;
      }
      throw error;
    }
  }

  async removeFavorite(movieId: number): Promise<void> {
    try {
      const db = await this.init();
      const doc = await db.get(`movie-${movieId}`);
      await db.remove(doc);
    } catch (error) {
      if ((error as any).status === 404) {
        // Document doesn't exist, which is fine
        return;
      }
      throw error;
    }
  }

  async getFavorites(): Promise<FavoriteMovie[]> {
    try {
      const db = await this.init();
      const result = await db.allDocs({ include_docs: true });
      return result.rows
        .map((row: any) => row.doc)
        .filter((doc: any): doc is FavoriteMovie => doc !== undefined)
        .sort((a: FavoriteMovie, b: FavoriteMovie) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  async isFavorite(movieId: number): Promise<boolean> {
    try {
      const db = await this.init();
      await db.get(`movie-${movieId}`);
      return true;
    } catch (error) {
      if ((error as any).status === 404) {
        return false;
      }
      throw error;
    }
  }

  async toggleFavorite(movie: Omit<FavoriteMovie, '_id' | '_rev' | 'addedAt'>): Promise<boolean> {
    const isFav = await this.isFavorite(movie.movieId);
    if (isFav) {
      await this.removeFavorite(movie.movieId);
      return false;
    } else {
      await this.addFavorite(movie);
      return true;
    }
  }

  // Clean up method for development/testing
  async destroy(): Promise<void> {
    const db = await this.init();
    await db.destroy();
  }
}

// Singleton instance
let favoritesDB: FavoritesDB | null = null;

const getFavoritesDB = () => {
  if (!favoritesDB) {
    favoritesDB = new FavoritesDB();
  }
  return favoritesDB;
};

export default getFavoritesDB;