import { POSTER_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-36 m-2">
      <img src={POSTER_CDN_URL + posterPath} alt="Poster Image"></img>
    </div>
  );
};

export default MovieCard;
