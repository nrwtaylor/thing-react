import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

import { humanTime, humanAge } from "./../util/time.js";

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

useEffect(()=>{
console.log("Token start");
},[]);


  useEffect(() => {
    updateAge();

    const interval = setInterval(() => {
setCurrentTime(Date.now());
      updateAge();
    }, 500); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, []);


function updateAge() {

console.log("Token updateAge", age, expiresAt);

//if (!expiresAt) {return;}
setAge(Date.now() - expiresAt*1000);
}


useEffect(() =>{
console.log("Token expiresAt", expiresAt);

}, [expiresAt]);


  return (
    <>
      TOKEN{' '}
      {!token && "NONE"}
      {token && token === null && "NULL"}
      {token && token === false && "FALSE"}
      {token && token === "" && "EMPTY"}
      {token && token === true && "TRUE"}
      {token && Array.isArray(token) && "ARRAY"}
      {token && token.isString && <>{"STRING" + token}</>}
      {token && token} 
<br />
      EXPIRES AT{' '}{expiresAt && <>{expiresAt}{' '}{humanTime(expiresAt)}</>} 
<br />
      REFRESHED AT{' '}{refreshedAt && <>{refreshedAt}{' '}{humanTime(refreshedAt)}</>} 
<br />
AGE{' '}
{((expiresAt * 1000) - currentTime)  }ms
      <br />
    </>
  );
}

Token.propTypes = {
  //  token: PropTypes.func.isRequired
};
