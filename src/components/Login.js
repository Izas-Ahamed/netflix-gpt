import { useState, useRef } from "react";
import Header from "./Header";
import { validateForm } from "../utils/validator";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(false);
  const email = useRef(null);
  const password = useRef(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleValidation = (e) => {
    // validateForm(email.);
    e.preventDefault();
    const message = validateForm(email.current.value, password.current.value);
    setErrorMessage(message);
  };

  return (
    <div className="h-screen bg-cover bg-no-repeat bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/a449fabb-05e4-4c8a-b062-b0bec7d03085/IN-en-20240115-trifectadaily-perspective_alpha_website_large.jpg')]">
      <div className="h-screen w-screen bg-[rgba(0,0,0,0.5)]">
        <Header />
        <div className="w-full">
          <form className="px-12 py-12 w-[400px] min-w-[300px] flex flex-col m-auto bg-[rgba(0,0,0,0.7)] rounded-md">
            <h1 className="font-bold text-3xl text-white mx-2 mb-6">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
              <input
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
              {isSignInForm ? "Sign Up" : "Sign In"}
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
