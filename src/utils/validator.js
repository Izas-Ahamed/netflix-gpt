export const validateForm = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Invalid Email ID";
  if (!isPasswordValid) return "Invalid Password";

  return null;
};
export const validateName = (name) => {
  const isValidName =
    /^(?=[a-zA-Z\s\d]{3,}$)[a-zA-Z\d]+(?:\s*[a-zA-Z\d]+)*$/.test(name);
  if (!isValidName)
    return "Name should be alphanumeric with atleast 3 characters";
  return null;
};
