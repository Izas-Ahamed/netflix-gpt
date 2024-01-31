import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-screen  p-5 bg-black md:bg-gradient-to-b md:bg-transparent from-black flex justify-between items-center fixed z-10 flex-col md:flex-row">
      <div className="">
        <img className="w-40" src={LOGO_URL} alt="logo"></img>
      </div>
      {user && (
        <div className="flex items-center flex-wrap justify-center">
          {showGptSearch && (
            <select
              className="curson text-white bg-gray-500  bg-opacity-50 rounded-lg font-medium p-2 py-1 mx-2 hover:bg-white hover:text-black"
              onChange={(e) => handleLanguageChange(e)}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-white bg-gray-500  bg-opacity-50 rounded-lg font-medium p-2 py-1 mx-2 m-2 hover:bg-white hover:text-black "
            onClick={() => dispatch(toggleGptSearchView())}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <button
            className="text-white bg-gray-500  bg-opacity-50 rounded-lg font-medium p-2 py-1 mx-2 mr-5 hover:bg-white hover:text-black  "
            onClick={handleSignOut}
          >
            Sign out
          </button>
          <div className="flex items-center justify-center">
            <div>
              <img src={user.photoURL} className="h-8"></img>
            </div>
            <span className="text-white font-medium px-2 m-2 text-lg">
              Hi {user.displayName}!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
