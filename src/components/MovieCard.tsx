import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface Movie {
  id?: number;
  movieId?: number;
  title: string;
  overview?: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  addedAt?: string;
}

interface MovieCardProps {
  movie: Movie;
  onToggleFavorite?: (movie: Movie) => void;
  isFavorite?: boolean;
  showFavoriteButton?: boolean;
  showOverview?: boolean;
  addedAt?: string;
}

const MovieCard = ({
  movie,
  onToggleFavorite,
  isFavorite = false,
  showFavoriteButton = true,
  showOverview = true,
  addedAt
}: MovieCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

  const getPosterUrl = (posterPath: string | null) => {
    if (!posterPath) return '/placeholder-movie.jpg';
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to movie detail page
    e.stopPropagation();
    try {
      if (onToggleFavorite) {
        await onToggleFavorite(movie);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const movieId = movie.id || movie.movieId;

  return (
    <Link href={`/movie/${movieId}`}>
      <div className="h-full cursor-pointer py-0 duration-300 gap-0 before:absolute before:bottom-0 before:inset-x-0 before:bg-linear-to-t before:from-black before:to-transparent before:h-full before:content-[''] overflow-hidden rounded-lg relative @container before:z-2 group">
        <div className="aspect-2/3 z-1">
          <Image
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
          />
        </div>
        {showFavoriteButton && onToggleFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 hover:bg-black/70 text-white border-0"
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
          </Button>
        )}
        <div className="p-4 absolute bottom-0 z-3 text-white">
          <h3 className="text-lg line-clamp-2 mb-2">{movie.title}</h3>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className='text-white'>{formatDate(movie.release_date)}</Badge>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
          {showOverview ? (
            <p className="line-clamp-3 text-sm">
              {movie.overview}
            </p>
          ) : (
            addedAt && (
              <p className="text-xs text-muted-foreground">
                Added {new Date(addedAt).toLocaleDateString()}
              </p>
            )
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;