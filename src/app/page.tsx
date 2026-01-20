import { getPopularMovies } from '@/lib/server-actions';
import AnimatedHome from '@/components/AnimatedHome';

export default async function Home() {
  const movies = await getPopularMovies();

  return <AnimatedHome movies={movies} />;
}
