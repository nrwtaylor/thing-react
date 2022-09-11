import React, { useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import crypto from "crypto";

import useToken from "../useToken";
import useIdentity from "../useIdentity";

  const { REACT_APP_CLIENT_SECRET } = process.env;
  const { REACT_APP_API_PREFIX } = process.env;

async function loginUser(credentials) {
  // const { REACT_APP_CLIENT_SECRET } = process.env;
  // const { REACT_APP_API_PREFIX } = process.env;
  const url = REACT_APP_API_PREFIX + "auth/signin";
  console.log("Login loginUser url credentials", url, credentials);

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => {
    return data.json();
  }).catch((error)=>{
console.error("Login loginUser error", error);

return {message:"Error"};
//return ({data:null, error:{message:error}});
});
}

export default function Login({token, setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [message, setMessage] = useState();

  //const { token, setToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  //const [ error, setError ] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hash = crypto.createHmac(
      "sha256",
      REACT_APP_CLIENT_SECRET
    );
    // Salted hash of username and password.
    // Using client provided salt.
    var data = hash.update(username + password);
    //Creating the hash in the required format
    var gen_hash = data.digest("hex");

    const pass = "";

    const token = await loginUser({
      username: gen_hash,
      password: pass,
    });

if (token && token.message) {setMessage(token.message);} else {

setMessage("No message.");
}

    console.log("Login handleSubmit", token);

    // Authentication ... and Authorisation.
    // Keep roles out of JWT.
    // setError(response.error);
    setIdentity(gen_hash); //tbd
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
{message}
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
