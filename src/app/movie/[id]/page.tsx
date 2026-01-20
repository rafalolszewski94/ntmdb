import MovieDetail from '@/components/MovieDetail';
import { getMovieWithCredits } from '@/lib/server-actions';
import { notFound } from 'next/navigation';

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{ id: number; name: string; logo_path?: string | null }>;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Enable ISR (Incremental Static Regeneration) for movie pages
// Revalidate every 24 hours
export const revalidate = 86400;

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    notFound();
  }

  const data = await getMovieWithCredits(movieId);

  return <MovieDetail movie={data.movie as MovieDetails} credits={data.credits} />;
}