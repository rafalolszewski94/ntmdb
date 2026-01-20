import { TMDB } from 'tmdb-ts';

let tmdb: TMDB | null = null;

function getTMDBClient(): TMDB {
  if (!tmdb) {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!API_KEY) {
      throw new Error('NEXT_PUBLIC_TMDB_API_KEY is not set. Please add NEXT_PUBLIC_TMDB_API_KEY to your environment variables.');
    }
    tmdb = new TMDB(API_KEY);
  }
  return tmdb;
}

export default getTMDBClient;