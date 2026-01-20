"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Star, Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';

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

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface MovieDetailProps {
  movie: MovieDetails;
  credits: CastMember[];
}

const MovieDetail = ({ movie, credits }: MovieDetailProps) => {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const getImageUrl = (path: string | null | undefined, size: 'w500' | 'w1280' = 'w500') => {
    if (!path) return '/placeholder-movie.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  const getProfileUrl = (path: string | null | undefined) => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/w185${path}`;
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Movies
          </Button>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        className="relative mb-8 rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="aspect-4/3 sm:aspect-16/9 md:aspect-21/9 bg-linear-to-r from-black/60 to-transparent">
          <Image
            src={getImageUrl(movie.backdrop_path, 'w1280')}
            alt={movie.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <motion.div
          className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {movie.title}
          </motion.h1>
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 space-y-2 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
              <span className="font-semibold text-lg sm:text-base">{movie.vote_average.toFixed(1)}</span>
              <span className="text-gray-300 text-sm sm:text-base">({movie.vote_count.toLocaleString('en-US')} votes)</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm sm:text-base">{formatDate(movie.release_date)}</span>
            </div>
            {movie.runtime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base">{formatRuntime(movie.runtime)}</span>
              </div>
            )}
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {movie.genres.map((genre) => (
              <Badge key={genre.id} variant="secondary" className="bg-white/20 text-white border-white/30 text-sm sm:text-base px-3 py-1">
                {genre.name}
              </Badge>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {/* Poster */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Card className='py-0 overflow-hidden'>
            <CardContent className="p-0">
              <div className="aspect-2/3 relative rounded-lg overflow-hidden">
                <Image
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Details */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {movie.overview || 'No description available.'}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Cast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {credits.map((actor, index) => (
                    <motion.div
                      key={actor.id}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 1.2 + index * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <Avatar>
                        <AvatarImage src={getProfileUrl(actor.profile_path) || undefined} alt={actor.name} />
                        <AvatarFallback>
                          {actor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{actor.name}</p>
                        <p className="text-sm text-muted-foreground">{actor.character}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Production Companies */}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Production Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {movie.production_companies.map((company, index) => (
                      <motion.div
                        key={company.id}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 1.4 + index * 0.1,
                          type: "tween",
                          stiffness: 200
                        }}
                      >
                        {company.logo_path ? (
                          <div className="relative h-8 w-32">
                            <Image
                              src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                              alt={company.name}
                              fill
                              sizes="128px"
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="h-8 w-8 bg-muted rounded flex items-center justify-center text-xs font-medium">
                            {company.name[0]}
                          </div>
                        )}
                        <span className="text-sm">{company.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MovieDetail;