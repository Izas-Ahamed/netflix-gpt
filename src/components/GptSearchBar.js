import { useDispatch, useSelector } from "react-redux";
import languages from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { addSearchedMovies, addUserAPIKey } from "../utils/gptSlice";
import useTMDBMovieSearch from "../hooks/useTMDBMovieSearch";
import { addUser, updateUserApiCallLimit } from "../utils/userSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const GptSearchBar = () => {
  const chosenLanguage = useSelector((store) => store?.config?.lang);
  const user = useSelector((store) => store.user);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const searchMovieOnTMDB = useTMDBMovieSearch();

  const apiKey = useSelector((store) => store.gpt?.userAPIKey);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const gptQuery =
      "Act as a movie recomendation system and suggest some movies for the query:" +
      searchText.current.value +
      ". Only give me names of 5 movies list. Expected result format: Movie Name,Movie Name,Movie Name,Movie Name,Movie Name";
    // const gptResults = {
    //   choices: [
    //     {
    //       index: 0,
    //       message: {
    //         role: "assistant",
    //         content:
    //           "Inception, Blade Runner, The Matrix, Interstellar, Arrival",
    //       },
    //       logprobs: null,
    //       finish_reason: "stop",
    //     },
    //   ],
    // };

    const apiResults = await getDoc(doc(db, "users", user.uid));
    const apiData = apiResults.data();
    dispatch(addUser(apiData));
    if (apiData.apiCallLimit <= 0 && !apiKey) {
      return;
    }
    const gptResults = await openai(
      apiData.apiCallLimit > 0 ? process.env.REACT_APP_OPENAI_API_KEY : apiKey
    )
      .chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      })
      .catch((error) => {
        // console.log(error);
      });

    if (!gptResults) {
      alert("Seems like your API Key is not Valid...");
      return;
    }
    const moviesNames = gptResults?.choices[0]?.message?.content.split(",");
    const promiseArray = moviesNames.map((movie) => searchMovieOnTMDB(movie));
    const moviesResults = await Promise.all(promiseArray);
    dispatch(addSearchedMovies({ moviesNames, moviesResults }));
    await setDoc(doc(db, "users", user.uid), {
      apiCallLimit: user?.apiCallLimit - 1,
    }).then(() => dispatch(updateUserApiCallLimit()));
  };

  return (
    <div className="flex justify-center pt-[60%] md:pt-[15%] sm:pt-[30%]  mb-10">
      <form className="w-full m-3 md:w-1/2 bg-black flex flex-col justify-between rounded-lg">
        <div className="mt-2 w-full flex justify-between">
          <div className="flex items-center">
            <label className="text-white m-2 mb-0 ml-4 ">
              {languages[chosenLanguage].gptSearchBarTitle}
            </label>
          </div>
          <div className="m-2 mb-0 flex items-center">
            <span className="text-white text-end mr-2">
              {languages[chosenLanguage].gptSearchLimitText}:{" "}
              {apiKey ? "API KEY" : user?.apiCallLimit}
            </span>
            {user?.apiCallLimit <= 0 && (
              <button
                className="text-black bg-white p-2 rounded-lg mr-2 "
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addUserAPIKey(null));
                }}
              >
                Add Key
              </button>
            )}
          </div>
        </div>
        <div className="flex">
          <input
            ref={searchText}
            type="text"
            className="w-full m-4 p-3 rounded-lg"
            placeholder={languages[chosenLanguage].gptSearchPlaceHolder}
          ></input>
          <button
            className="m-4 bg-red-600 text-white rounded-lg p-3"
            onClick={(e) => handleOnSubmit(e)}
          >
            {languages[chosenLanguage].gptSearchText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;
