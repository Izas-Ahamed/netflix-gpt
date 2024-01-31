import { MOVIE_API_OPTIONS } from "../utils/constants";

const useTMDBMovieSearch = () => {
  return async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=" +
        movie,
      MOVIE_API_OPTIONS
    );
    const json = await data.json();
    return json;
  };
};
export default useTMDBMovieSearch;
