const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute aspect-video w-screen bg-gradient-to-r from-black text-white bottom-0 ">
      <div className="absolute p-3 bottom-[20%]">
        <h1 className="text-2xl md:text-5xl md:p-6 b-0 px-6 font-bold">
          {title}
        </h1>
        <p className="hidden md:block w-1/2 p-6 py-3">{overview}</p>
        <button className="bg-white font-medium  py-3 px-10 m-6 mr-3 rounded-md text-black ">
          Play
        </button>
        <button className="bg-gray-500  py-3 px-6  rounded-md text-white font-medium bg-opacity-50">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
