'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function RouterCacheProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Prefetch popular movies on app load
    if (pathname === '/' && typeof window !== 'undefined') {
      // Prefetch movie detail pages for better navigation
      const prefetchMoviePages = async () => {
        try {
          // Prefetch the first few movie pages that users are likely to visit
          const popularMovieIds = [550, 278, 238, 680, 155, 13, 122, 389]; // Popular movies
          popularMovieIds.forEach(id => {
            // Use Next.js router prefetch
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = `/movie/${id}`;
            link.as = 'document';
            document.head.appendChild(link);
          });
        } catch (error) {
          console.warn('Router cache prefetch failed:', error);
        }
      };

      prefetchMoviePages();
    }
  }, [pathname, searchParams]);

  // Enable router cache by ensuring consistent rendering
  return <>{children}</>;
}