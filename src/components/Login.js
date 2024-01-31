import { useState, useRef } from "react";
import Header from "./Header";
import { validateForm, validateName } from "../utils/validator";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE_URL, USER_AVATAR_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const handleValidation = (e) => {
    e.preventDefault();

    if (!isSignInForm) {
      const message =
        validateName(name.current.value) ||
        validateForm(email.current.value, password.current.value);
      setErrorMessage(message);
    } else {
      const message = validateForm(email.current.value, password.current.value);
      setErrorMessage(message);
    }

    if (errorMessage) return;

    if (!isSignInForm) {
      //sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR_URL,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      // sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div
      className={
        "h-screen bg-cover bg-no-repeat bg-[url('" + BG_IMAGE_URL + "')]"
      }
    >
      <div className="h-screen w-screen bg-[rgba(0,0,0,0.5)]">
        <Header />
        <div className="w-full h-screen flex items-center">
          <form className="px-12 py-12 w-[400px] min-w-[300px] flex flex-col m-auto bg-[rgba(0,0,0,0.7)] rounded-md">
            <h1 className="font-bold text-3xl text-white mx-2 mb-6">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Name"
                className="p-4 m-2 rounded-md bg-[rgba(16,16,16,0.8)] text-white border border-gray-600"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email Id"
              className="p-4 m-2 rounded-md bg-[rgba(16,16,16,0.8)] text-white border border-gray-600"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-4 m-2 rounded-md bg-[rgba(16,16,16,0.8)] text-white border border-gray-600"
            />
            <p className="text-red-500 font-medium p-2 px-3">{errorMessage}</p>
            <button
              className="p-2 m-2 rounded-lg bg-red-600 text-white "
              onClick={handleValidation}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className="text-[rgba(255,255,255,0.7)] p-2 mt-2">
              {isSignInForm ? "New to Netflix?" : "Already registered ?"}{" "}
              <span
                className="font-medium text-white cursor-pointer"
                onClick={() => setIsSignInForm(!isSignInForm)}
              >
                {isSignInForm ? "Sign up now." : "Sign in now."}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
