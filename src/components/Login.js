import React, { useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import crypto from "crypto";

async function loginUser(credentials) {
  const { REACT_APP_CLIENT_SECRET } = process.env;
  const { REACT_APP_API_PREFIX } = process.env;

  console.log("Login loginUser credentials", credentials);

  return fetch(REACT_APP_API_PREFIX + "auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => {
    return data.json();
  });
}

export default function Login({ setToken, setIdentity }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hash = crypto.createHmac(
      "sha256",
      process.env.REACT_APP_CLIENT_SECRET
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

    console.log("Login handleSubmit", token);

    // Authentication ... and Authorisation.
    // Keep roles out of JWT.

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
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
