import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

import { humanTime, humanAge } from "./../util/time.js";
import Reauthorize from "../components/Reauthorize.js";



export default function Token({ token }) {
  const [refreshedAt, setRefreshedAt] = useState();
  const [expiresAt, setExpiresAt] = useState();
  const [age, setAge] = useState();
  const [currentTime, setCurrentTime] = useState();
  const updateInterval = 1000;
  // Display token.

  useEffect(() => {
    if (!token) {
      return;
    }

    console.log("Token token", token);

    if (token === null) {
      return;
    }

    const t = jwt_decode(token);

    console.log("Token setExpiresAt", t.exp);
    setRefreshedAt(t.iat);

    setExpiresAt(t.exp);
  }, [token]);

  //useEffect(()=>{
  //console.log("Token start");
  //},[]);

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
    console.log("Token updateAge", age, expiresAt);

    //if (!expiresAt) {return;}
    //setAge(Date.now() - expiresAt*1000);

    const t = parseFloat(expiresAt) * 1000 - Date.now();

    console.log("xkcd", t, expiresAt, Date.now());

    setAge(t);
  }

  useEffect(() => {
    console.log("Token expiresAt", expiresAt);
  }, [expiresAt]);

  return (
    <>
      TOKEN {!token && "NONE"}
      {token && token === null && "NULL"}
      {token && token === false && "FALSE"}
      {token && token === "" && "EMPTY"}
      {token && token === true && "TRUE"}
      {token && Array.isArray(token) && "ARRAY"}
      {token && token.isString && <>{"STRING" + token}</>}
      {token && token}
      <br />
      EXPIRES AT{" "}
      {expiresAt && (
        <>
          {expiresAt} {humanTime(expiresAt)}
        </>
      )}
      <br />
      REFRESHED AT{" "}
      {refreshedAt && (
        <>
          {refreshedAt} {humanTime(refreshedAt)}
        </>
      )}
      <br />
      AGE {age}ms
<br />
{(age<0) && (<>TOKEN EXPIRED<Reauthorize /></>)}
{(age>=0) && (<>TOKEN CURRENT<Reauthorize /></>)} 
      <br />
    </>
  );
}

Token.propTypes = {
  //  token: PropTypes.func.isRequired
};
