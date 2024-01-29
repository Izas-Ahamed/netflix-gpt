import { useEffect } from "react";
import Header from "./Header";
import { MOVIE_API_OPTIONS } from "../utils/constants";

const Browse = () => {
  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const fetchNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();
    console.log(json);
  };

  return (
    <div>
      <Header />
    </div>
  );
};

export default Browse;
