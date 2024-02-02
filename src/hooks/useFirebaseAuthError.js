const useFirebaseAuthError = (errorMessage) => {
  switch (errorMessage) {
    case "auth/invalid-credential":
      return "Invalid Username or Password";
  }
};
