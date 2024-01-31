import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
  useEffect(() => {
    !upcomingMovies && fetchUpcomingMovies();
  }, []);

  const fetchUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };
};

export default useUpcomingMovies;
