import { useSelector } from "react-redux";
import languages from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const chosenLanguage = useSelector((store) => store?.config?.lang);
  const searchText = useRef(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const gptQuery =
      "Act as a movie recomendation system and suggest some movies for the query:" +
      searchText.current.value +
      ". Only give me names of 5 movies. Expected result format: Movie Name,Movie Name,Movie Name,Movie Name,Movie Name";

    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });
    console.log("hello");
  };

  return (
    <div className="flex justify-center pt-[20%]">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          ref={searchText}
          type="text"
          className="col-span-9 m-4 p-3 rounded-lg"
          placeholder={languages[chosenLanguage].gptSearchPlaceHolder}
        ></input>
        <button
          className="col-span-3 m-4 bg-red-600 text-white rounded-lg p-3"
          onClick={(e) => handleOnSubmit(e)}
        >
          {languages[chosenLanguage].gtpSearchText}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
