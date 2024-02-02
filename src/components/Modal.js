import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addUserAPIKey } from "../utils/gptSlice";

const Modal = () => {
  const apiKey = useRef(null);
  const dispatch = useDispatch();
  const handleApiKey = (e) => {
    e.preventDefault();
    dispatch(addUserAPIKey(apiKey.current.value));
    apiKey.current.value = "";
  };
  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center fixed z-20 top-0">
      <form className="px-12 m-6 py-12 w-[400px] min-w-[300px] h-[420px] bg-gray-200 rounded-md">
        <h1 className="font-bold text-2xl text-black mb-3 text-start">
          OpenAi Api Key required!
        </h1>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Paste Api Key here"
            className=" w-full p-3 my-2 rounded-md bg-white text-black border border-gray-600"
            ref={apiKey}
          />
          <button
            className="p-3 m-2 rounded-lg bg-red-600 text-white"
            onClick={(e) => handleApiKey(e)}
          >
            Add
          </button>
        </div>
        <p className="py-2">
          *Your API key will be stored on local and will not sent to the server
        </p>
        <p className="py-2">
          *openAi changes plan, and I'm unable to provide the key
        </p>
        <p className="py-2">
          *You can avail the search functionality by adding youy api key, Sorry
          for the inconvenience
        </p>
      </form>
    </div>
  );
};

export default Modal;
