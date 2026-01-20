import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

  const getPosterUrl = (posterPath: string | null) => {
    if (!posterPath) return '/placeholder-movie.jpg';
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <div className="h-full cursor-pointer py-0 duration-300 gap-0 before:absolute before:bottom-0 before:inset-x-0 before:bg-linear-to-t before:from-black before:to-transparent before:h-full before:content-[''] overflow-hidden rounded-lg relative @container before:z-2">
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
            <div className="p-4 absolute bottom-0 z-3">
              <h3 className="text-lg line-clamp-2 mb-2">{movie.title}</h3>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{formatDate(movie.release_date)}</Badge>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <p className="line-clamp-3 text-sm">
                {movie.overview}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MoviesList;