import React, { useState } from "react";
import PropTypes from "prop-types";

import crypto from "crypto";

async function signupUser(credentials) {
  const { REACT_APP_CLIENT_SECRET } = process.env;
  const { REACT_APP_API_PREFIX } = process.env;

  console.log("Login loginUser credentials", credentials);
  console.log("credentials", credentials);

  return fetch(REACT_APP_API_PREFIX + "auth/signup", {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => {
    return data.json();
  });
}

export default function Signup() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [from, setFrom] = useState();

  const [message, setMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login username", username);
    console.log("Login password", password);

    // Client salted hash
    const hash = crypto.createHmac(
      "sha256",
      process.env.REACT_APP_CLIENT_SECRET
    );
    // Salted hash of username and password.
    // Using client provided salt.
    var data = hash.update(username + password);
    //Creating the hash in the required format
    var gen_hash = data.digest("hex");
    //Printing the output on the console
    //console.log("Login hash : " + gen_hash);

    const pass = "";

    const token = await signupUser({
      username: gen_hash,
      password: pass,
      email: from
    });

    console.log("Signup handleSubmit", token);

setMessage(token.message);

    //setIdentity(token);
    //setToken(token);
  };

  return (
    <div className="signup-wrapper">
      <h1>Please Sign Up</h1>
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
          <p>From(email)</p>
          <input
            type="channel"
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Signup.propTypes = {
//  setToken: PropTypes.func.isRequired,
};
