import { BG_IMAGE_URL } from "../utils/constants";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div
      className={
        "h-screen w-full bg-cover bg-no-repeat bg-[url('" + BG_IMAGE_URL + "')]"
      }
    >
      <GptSearchBar />
    </div>
  );
};

export default GptSearch;
