import moment from "moment";

const setTokenInLocalStorage = (token, expiresIn) => {
  const expires = moment().add(
    expiresIn.split(" ")[0],
    expiresIn.split(" ")[1]
  );
  localStorage.setItem("tokenExpires", JSON.stringify(expires.valueOf()));
  localStorage.setItem("token", token);
};

const logout = () => {
  removeTokenFromLocalStorage();
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpires");
};

const getExpiration = () => {
  const expiresAt = JSON.parse(localStorage.getItem("tokenExpires"));
  return expiresAt;
};

const isLoggedIn = () => {
  if (localStorage.getItem("token") && moment().isBefore(getExpiration())) {
    return true;
  } else {
    removeTokenFromLocalStorage();
    return false;
  }
};

export { setTokenInLocalStorage, logout, isLoggedIn };
