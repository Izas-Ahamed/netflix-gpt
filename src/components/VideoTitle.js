const VideoTitle = ({ title, overview }) => {
  return (
    <div>
      <h1 className="text-5xl p-6 font-bold">{title}</h1>
      <p className="w-1/2 p-6 py-3">{overview}</p>
      <button className="bg-gray-600  py-3 px-6 m-6 rounded-md text-black">
        ▶️ Play
      </button>
      <button className="bg-gray-600  py-3 px-6 m-6 ml-1 rounded-md text-black">
        More Info
      </button>
    </div>
  );
};

export default VideoTitle;
