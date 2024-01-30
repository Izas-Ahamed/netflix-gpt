import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies);
  return (
    <div className="bg-black w-screen  ">
      <div className="-mt-44 z-20 relative">
        <MovieList title={"Now Playing"} movies={movies} />
        <MovieList title={"Now Playing"} movies={movies} />
        <MovieList title={"Now Playing"} movies={movies} />
        <MovieList title={"Now Playing"} movies={movies} />
        <MovieList title={"Now Playing"} movies={movies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
