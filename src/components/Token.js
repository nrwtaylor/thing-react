import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

import useToken from "../useToken.js";
import useIdentity from "../useIdentity.js";


import { humanPosixTime,humanTime, humanAge, humanRuntime } from "./../util/time.js";
import Reauthorize from "../components/Reauthorize.js";
import Login from "../components/Login.js";
import Logout from "../components/Logout.js";



export default function Token({ token, setToken, setIdentity }) {
  const [refreshedAt, setRefreshedAt] = useState();
  const [expiresAt, setExpiresAt] = useState();
  const [age, setAge] = useState();
  const [currentTime, setCurrentTime] = useState();
  const updateInterval = 1000;
  // Display token.

  const { deleteToken } = useToken();


  useEffect(() => {
    if (!token) {
      return;
    }

    console.log("Token token", token);

    if (token == null) {
      return;
    }

    const t = jwt_decode(token);

//    console.log("Token setExpiresAt", t.exp);
    setRefreshedAt(t.iat);

    setExpiresAt(t.exp);
  }, [token]);

useEffect(()=>{

console.log("Token refreshedAt expiresAt", refreshedAt, humanPosixTime(refreshedAt), expiresAt, humanPosixTime(expiresAt));

},[refreshedAt, expiresAt]);

  useEffect(() => {
    updateAge();

    const interval = setInterval(() => {
      console.log("Token tick");
      setCurrentTime(Date.now());
      updateAge(expiresAt);
    }, 500); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, [expiresAt]);

  function updateAge() {
//    console.log("Token updateAge", age, expiresAt);

    //if (!expiresAt) {return;}
    //setAge(Date.now() - expiresAt*1000);

    const t = parseFloat(expiresAt) * 1000 - Date.now();

    setAge(t);
  }


  return (
    <>
      TOKEN {!token && "NONE"}
      {token && token === null && "NULL"}
      {token && token === false && "FALSE"}
      {token && token === "" && "EMPTY"}
      {token && token === true && "TRUE"}
      {token && Array.isArray(token) && "ARRAY"}
      {token && token.isString && <>{"STRING" + token}</>}
      {/*token && token*/}
      <br />
      {age < 0 && "EXPIRED"} {age >=0 && "EXPIRES"} AT{" "}
      {expiresAt && (
        <>
          {humanPosixTime(expiresAt)}
        </>
      )}
      <br />
      REFRESHED AT{" "}
      {refreshedAt && (
        <>
          {humanPosixTime(refreshedAt)}
        </>
      )}
<br />

{(age<0) && (<>TOKEN EXPIRED {humanRuntime(age, 'text', 'ago')} <Login setToken={setToken} setIdentity={setIdentity} />
</>)}
{(age>=0) && (<>TOKEN CURRENT {humanRuntime(age, 'text', 'remaining')} <Reauthorize />
            <Logout deleteToken={deleteToken} /> 

</>)} 
      <br />
    </>
  );
}

Token.propTypes = {
  //  token: PropTypes.func.isRequired
};
