import axios from "axios";
import type { Movie } from "../../types/movie";
interface MovieFetch {
  page: number;
  total_pages: number;
  results: Movie[];
}

export default async function fetchMovies(
  query: string,
  page: number,
): Promise<MovieFetch> {
  const configObject = {
    baseURL: "https://api.themoviedb.org/3",
    params: {
      query,
      page,
    },
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      accept: "application/json",
    },
  };
  const result = await axios<MovieFetch>("/search/movie", configObject);
  console.log(result.data);
  return result.data;
}
