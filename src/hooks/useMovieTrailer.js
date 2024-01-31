import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  useEffect(() => {
    !trailerVideo && fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();
    const filterData = json?.results.filter((data) => data?.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };
};

export default useMovieTrailer;
