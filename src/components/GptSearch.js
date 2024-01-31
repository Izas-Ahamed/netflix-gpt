import { BG_IMAGE_URL } from "../utils/constants";
import GptMoviesSuggestions from "./GptMoviesSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div>
      <img
        src={BG_IMAGE_URL}
        className="h-screen w-full fixed object-cover -z-20"
      ></img>
      <GptSearchBar />
      <GptMoviesSuggestions />
    </div>
  );
};

export default GptSearch;
