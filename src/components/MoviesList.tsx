import { useFavorites } from '@/hooks/use-favorites';
import MovieCard from './MovieCard';
import { Movie } from '@/lib/types';

interface MoviesListProps {
  movies: Movie[];
}

const MoviesList = ({ movies }: MoviesListProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite(movie.id)}
        />
      ))}
    </div>
  );
};

export default MoviesList;