import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMoviesSuggestions = () => {
  const { searchedMovies, searchedMoviesResults } = useSelector(
    (store) => store?.gpt
  );
  if (!searchedMovies) return;
  return (
    <div className="bg-black bg-opacity-70 m-4 rounded-lg">
      {searchedMovies.map((movieName, index) => (
        <MovieList
          title={movieName}
          movies={searchedMoviesResults[index]?.results}
        />
      ))}
    </div>
  );
};

export default GptMoviesSuggestions;
