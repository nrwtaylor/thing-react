import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
// import crypto from "crypto";

import useToken from "../useToken.js";
import useIdentity from "../useIdentity.js";

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
  })
    .then((data) => {
      console.log("Login loginUser data", data);
      return data.json();
    })
    .catch((error) => {
      console.log("Login loginUser error", error);

      return { message: error.code };
      //return ({data:null, error:{message:error}});
    });
}

export default function Login({ token, setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [submit, setSubmit] = useState();
  const [message, setMessage] = useState();

  //const { token, setToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  //const [ error, setError ] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hash = crypto.createHmac("sha256", REACT_APP_CLIENT_SECRET);
    // Salted hash of username and password.
    // Using client provided salt.
    var data = hash.update(username + password);
    //Creating the hash in the required format
    var gen_hash = data.digest("hex");

    const pass = "";

    const t = await loginUser({
      username: gen_hash,
      password: pass,
    });

    setToken(t);

    console.log("Login handleSubmit token", token);

    if (t && t.message) {
      setMessage(t.message);
      console.log("Login token message", t.message);

      setMessage("Got token message.");
    } else {
      // Change window location here... route.
      console.log("Login change window location");
      //window.location.href = "http://localhost:3000/" + "thing";
      //window.history.replaceState(null, null, /product/${this.props.product.id});

      window.history.replaceState(null, null, /thing/);
      setMessage("No message.");
    }

    // Authentication ... and Authorisation.
    // Keep roles out of JWT.
    // setError(response.error);
    setIdentity(gen_hash); //tbd
    //setToken(token);
  };

  function handlePassword(e) {
    handleChange(e);
    setPassword(e.target.value);
  }

  function handleUsername(e) {
    handleChange(e);
    setUserName(e.target.value);
  }

  function handleChange() {
    handleSubmitButton();
  }

  function handleSubmitButton() {
    //if (!username) {setSubmit(false); return;}
    //if (!password) {setSubmit(false); return;}
    //setSubmit(true);
  }

  if (!token) {
    return (
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input
              type="text"
              onChange={(e) => {
                handleUsername(e);
              }}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => {
                handlePassword(e);
              }}
            />
          </label>

          <div>
            <button disabled={submit} type="submit">
              Submit
            </button>
          </div>
        </form>
        {message}
      </div>
    );
  }

  return <>Login Token {message}</>;
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
