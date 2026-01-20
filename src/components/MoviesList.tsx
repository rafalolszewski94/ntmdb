import { useFavorites } from '@/hooks/use-favorites';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

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