import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

import { humanTime } from "./../util/time.js";

export default function Token({ token }) {
  const [refreshedAt, setRefreshedAt] = useState();
  const [expiresAt, setExpiresAt] = useState();
  // Display token.

  useEffect(() => {
    console.log("Token token", token);
    if (!token) {
      return;
    }
    //console.log("Token token", token);

    if (token === null) {
      return;
    }

    const t = jwt_decode(token);
    console.log("Token", t);
    setRefreshedAt(t.iat);
    setExpiresAt(t.exp);
  }, [token]);

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
      <br />
    </>
  );
}

Token.propTypes = {
  //  token: PropTypes.func.isRequired
};
