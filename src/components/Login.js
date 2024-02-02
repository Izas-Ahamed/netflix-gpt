import { useState, useRef } from "react";
import Header from "./Header";
import { validateForm, validateName } from "../utils/validator";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE_URL, USER_AVATAR_URL } from "../utils/constants";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const handleValidation = (e) => {
    e.preventDefault();
    let message = null;
    setErrorMessage(null);
    if (!isSignInForm) {
      message =
        validateName(name.current.value) ||
        validateForm(email.current.value, password.current.value);
      setErrorMessage(message);
    } else {
      message = validateForm(
        email.current.value,
        password.current.value,
        isSignInForm
      );
      setErrorMessage(message);
    }

    if (message) return;

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
          const { uid, email } = auth.currentUser;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR_URL,
          })
            .then(() => {
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName: auth.currentUser.displayName,
                  apiCallLimit: 4,
                  photoURL: auth.currentUser.photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });

          setDoc(doc(db, "users", uid), { apiCallLimit: 4 })
            .then(() => {})
            .catch((error) => {
              // An error occurred
              // ...
              // console.log(error);
              // console.log(error.message);
              // console.log(error.code);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(
            errorCode === "auth/email-already-in-use"
              ? "Email already in use"
              : "User not found"
          );
          console.log(errorCode);
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
          const { uid } = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("Invalid Email ID or Password");
        });
    }
  };

  return (
    <div className={"h-screen"}>
      <div className="h-screen w-screen bg-[rgba(0,0,0,0.5)]">
        <img
          src={BG_IMAGE_URL}
          className="h-screen w-full fixed object-cover -z-20"
        ></img>{" "}
        <Header />
        <div className="w-full h-screen flex items-center justify-center">
          <form className="px-12 m-5 py-12 w-[400px] min-w-[300px] flex flex-col bg-[rgba(0,0,0,0.7)] rounded-md">
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
                onClick={() => {
                  setIsSignInForm(!isSignInForm);
                  setErrorMessage(null);
                }}
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
