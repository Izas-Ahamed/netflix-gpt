import { POSTER_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return;
  return (
    <div className=" w-28 md:w-36 m-2">
      <img src={POSTER_CDN_URL + posterPath} alt="Poster Image"></img>
    </div>
  );
};

export default MovieCard;
