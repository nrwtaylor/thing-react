import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import useHybridEffect from "./useHybridEffect.js";

import { humanPosixTime, humanTime, zuluTime } from "./util/time.js";

export function readToken(jwtToken) {
  if (jwtToken == null) {
    return { refreshedAt: null, expiresAt: null, isValidToken: false };
  }

  console.log("jwtToken", jwtToken);

  const t = jwt_decode(jwtToken);
  //    console.log("useToken readToken t", t);
  //    console.log("Token setExpiresAt", t.exp);
  return {
    refreshedAt: t.iat,
    expiresAt: t.exp,
    isValidToken: checkToken(t),
  };
}

export function checkToken(t) {
if (t == null) {return false}
  //console.log("jwtToken", jwtToken);

  //  const t = jwt_decode(jwtToken);
  //const expiresAt = t.iat;
const expiresAt = t.exp;

  const age = parseFloat(expiresAt) * 1000 - Date.now();
  console.log("useToken checkToken expiresAt age", humanPosixTime(expiresAt), age);
  var isValidToken = false;
  if (age >= 0) {
    isValidToken = true;
  }

  if (age < 0) {
    isValidToken = false;
  }

  return isValidToken;
}

export default function useToken() {
  const [token, setToken] = useState();
  const [username, setUsername] = useState();

  const [isValidToken, setIsValidToken] = useState();
  const [expiresAt, setExpiresAt] = useState();
  const [refreshedAt, setRefreshedAt] = useState();

  const [age, setAge] = useState();

  const validToken = (token) => {
    if (token == null) {
      return;
    }

    if (token === false) {
      return;
    }

    console.log("useToken token", token);

    const t = jwt_decode(token);
    //    console.log("useToken readToken t", t);
    //    console.log("Token setExpiresAt", t.exp);
    setRefreshedAt(t.iat);

    setExpiresAt(t.exp);



    setIsValidToken(checkToken(t));



  };

  // Watch the localStorage for a token we recognize.
  /*
{
  "id": "85a1a47b8733fd6d0bbfa090",
  "iat": 1671850844,
  "exp": 1671937244
}
*/
  useEffect(() => {
    getToken();
  }, []);

useEffect(()=>{

console.log("useToken isValidToken", isValidToken);

}, [isValidToken]);

  const getToken = () => {
    const tokenString = localStorage.getItem("token");

    console.log("useToken getToken tokenString", tokenString);
    var userToken = null;

    try {
      userToken = JSON.parse(tokenString);
    } catch (e) {
      console.log("useToken Error Problem with localStorage token", e);
      return null;
    }
    //console.log("useToken getToken userToken", tokenString, userToken);
    //    validToken(userToken.accessToken);

    if (userToken && userToken.accessToken) {
      setToken(userToken.accessToken);
      return userToken.accessToken;
      //return {token:userToken};
    }

    return null;
  };
  useHybridEffect(() => {
    console.log("useToken token", token);
    validToken(token);
    //    if (props.token) {props.token = token;}
  }, [token]);

  useEffect(() => {
    updateAge();

    const interval = setInterval(() => {
      //      console.log("Token tick");
      //setCurrentTime(Date.now());
      updateAge(expiresAt);

console.log("useToken isValidToken", isValidToken);
if (isValidToken === false) {

const response = getToken();
//const t = readToken(response);
console.log("useToken getToken response", response);
validToken(response);


}


    }, 500); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, [expiresAt]);

  function updateAge() {
    const t = parseFloat(expiresAt) * 1000 - Date.now();

    setAge(t);
  }
  /*
  useEffect(() => {
    if ((age) => 0) {
      setIsValidToken(true);
    }
    if (age < 0) {
      setIsValidToken(false);
    }
  }, [age]);
*/
  const saveToken = (userToken) => {
    if (!userToken) {
      return false;
    }

    console.log("useToken saveToken userToken", userToken);

    localStorage.setItem("token", JSON.stringify(userToken));
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
    isValidToken,
    token,
    age,
    username,
  };
}
