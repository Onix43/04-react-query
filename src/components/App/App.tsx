import fetchMovies from "../movieService/movieService";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

const notify = () => toast("No movies found for your request.");

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMovie, setModalMovie] = useState<Movie>();

  const openModal = (movie: Movie) => {
    setModalMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSearch = async (data: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetchMovies(data);
      if (response.results.length === 0) {
        notify();
      }
      setMovies(response.results);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
      {isModalOpen && modalMovie && (
        <MovieModal onClose={closeModal} movie={modalMovie} />
      )}
    </div>
  );
}

export default App;
