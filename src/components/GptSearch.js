import { useSelector } from "react-redux";
import { BG_IMAGE_URL } from "../utils/constants";
import GptMoviesSuggestions from "./GptMoviesSuggestions";
import GptSearchBar from "./GptSearchBar";
import Modal from "./Modal";

const GptSearch = () => {
  const apiCallLimit = useSelector((store) => store.user?.apiCallLimit);
  const apiKey = useSelector((store) => store.gpt?.userAPIKey);
  const searchedMoviesResults = useSelector(
    (store) => store.gpt?.searchedMoviesResults
  );
  return (
    <div>
      <div>
        <img
          src={BG_IMAGE_URL}
          className="h-screen w-full fixed object-cover -z-20"
        ></img>
        <GptSearchBar />
        <GptMoviesSuggestions />
      </div>
      {!searchedMoviesResults && apiCallLimit <= 0 && !apiKey && <Modal />}
    </div>
  );
};

export default GptSearch;
