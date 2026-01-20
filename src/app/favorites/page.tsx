'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useFavorites } from '@/hooks/use-favorites';
import MovieCard from '@/components/MovieCard';
import { HyperText } from '@/components/ui/hyper-text';

const FavoritesPage = () => {
  const { favorites, loading, removeFavorite } = useFavorites();

  const handleRemoveFavorite = async (movie: { id?: number; movieId?: number }) => {
    try {
      const movieId = movie.movieId || movie.id;
      if (movieId) {
        await removeFavorite(movieId);
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.header
        className="border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/">
                <HyperText
                  className="text-3xl font-black text-foreground font-display hover:text-primary transition-colors cursor-pointer"
                  duration={1000}
                  delay={200}
                >
                  My Favorites
                </HyperText>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Movies
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {favorites.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring movies and add them to your favorites by clicking the heart icon.
            </p>
            <Link href="/">
              <Button>
                Discover Movies
              </Button>
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-2">
                Your Favorite Movies ({favorites.length})
              </h2>
              <p className="text-muted-foreground">
                Movies you&apos;ve saved for later. Click on any movie to view details.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {favorites.map((movie, index) => (
                <motion.div
                  key={movie._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.9 + index * 0.05,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <div className="space-y-3">
                    <MovieCard
                      movie={movie}
                      showFavoriteButton={false}
                      showOverview={false}
                      addedAt={movie.addedAt}
                    />
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                        onClick={() => handleRemoveFavorite(movie)}
                        aria-label="Remove from favorites"
                      >
                        <Heart className="h-3 w-3 mr-1 fill-red-500 text-red-500" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </motion.main>
    </motion.div>
  );
};

export default FavoritesPage;