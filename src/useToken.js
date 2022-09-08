import { useState, useEffect } from "react";

export default function useToken(inputToken) {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");

    //console.log("useToken getToken tokenString", tokenString);
    var userToken = null;

    try {
      userToken = JSON.parse(tokenString);
    } catch (e) {
      console.log("Problem with localStorage token");
      return null;
    }

    if (userToken && userToken.accessToken) {
      return userToken.accessToken;
      //return {token:userToken};
    }

    return null;
  };
  useEffect(() => {
    console.log("useToken token", token);
    //    if (props.token) {props.token = token;}
  }, [token]);

  const [token, setToken] = useState(getToken());
  const [username, setUsername] = useState();

  const saveToken = (userToken) => {
    if (!userToken) {
      return false;
    }
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
    username,
  };
}
