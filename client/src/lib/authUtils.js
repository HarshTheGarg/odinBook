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
    // TODO check the token from the backend too

    fetch("http://localhost:3000/protected", {
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          return false;
        } else {
          return false;
        }
      })
      .then((result) => {
        console.log(result);
        if (result.success) {
          console.log("SDFD");
          return true;
        } else {
          removeTokenFromLocalStorage();
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        removeTokenFromLocalStorage();
        return false;
      });
  } else {
    removeTokenFromLocalStorage();
    return false;
  }
};

export { setTokenInLocalStorage, logout, isLoggedIn };
