const GptSearchBar = () => {
  return (
    <div className="flex justify-center pt-[20%]">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="col-span-9 m-4 p-3 rounded-lg"
          placeholder="What would you like to watch?"
        ></input>
        <button className="col-span-3 m-4 bg-red-600 text-white rounded-lg p-3">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
