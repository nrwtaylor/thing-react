import { useState, useEffect } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");

console.log("useToken getToken tokenString", tokenString);

    const userToken = JSON.parse(tokenString);

    //if (userToken) {
    //return userToken;
    //}

    //return true;
    //if (Array.isArray(userToken)) {
    //    return userToken.token;
    //    return userToken.accessToken;

    //}

    if (userToken && userToken.accessToken) {
      return userToken.accessToken;
      //return {token:userToken};
    }

    return null;
  };
  useEffect(() => {
    console.log("useToken token", token);
  }, [token]);
  const [token, setToken] = useState(getToken());
  const [username, setUsername] = useState();

  const saveToken = (userToken) => {
    console.log("useToken saveToken userToken", userToken);

    localStorage.setItem("token", JSON.stringify(userToken));

//    setUsername(userToken.username);
    setToken(userToken.token);

  };

  const deleteToken = (userToken) => {
    // Leave no rubbish behind.

    localStorage.clear();
    setToken(false);
  };

  return {
    deleteToken: deleteToken,
    setToken: saveToken,
    token,
    username
  };
}
