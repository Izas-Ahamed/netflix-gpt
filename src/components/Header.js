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
    <div className="w-screen h-24 p-5 bg-gradient-to-b from-black flex justify-between items-center fixed z-10">
      <div className="h-full">
        <img className="h-full" src={LOGO_URL} alt="logo"></img>
      </div>
      {user && (
        <div className="flex items-center">
          <select
            className="text-white bg-gray-500  bg-opacity-50 rounded-lg font-medium p-2 py-1 mx-2 hover:bg-white hover:text-black"
            onChange={(e) => handleLanguageChange(e)}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            className="text-white bg-gray-500  bg-opacity-50 rounded-lg font-medium p-2 py-1 mx-2 hover:bg-white hover:text-black "
            onClick={() => dispatch(toggleGptSearchView())}
          >
            GPT Search
          </button>
          <button
            className="text-white bg-gray-500  bg-opacity-50 rounded-lg font-medium p-2 py-1 mx-2 mr-5 hover:bg-white hover:text-black  "
            onClick={handleSignOut}
          >
            Sign out
          </button>
          <div>
            <img src={user.photoURL} className="h-8"></img>
          </div>
          <span className="text-white font-medium px-2 text-lg">
            Hi {user.displayName}!
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;
