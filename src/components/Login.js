import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
//import CryptoJS from "crypto-js";
import crypto from "crypto";
import Button from "@mui/material/Button";


//import * as crypto from "crypto"

import { v4 as uuidv4 } from "uuid";

import useToken from "../useToken.js";
import useIdentity from "../useIdentity.js";
import useThings from "../useThings.js";

import { createThing, forgetThing } from "../util/database.js";

import { toast } from "react-toastify";

//const crypto = require("crypto");

const { REACT_APP_CLIENT_SECRET } = process.env;
const { REACT_APP_API_PREFIX } = process.env;

const defaultWebPrefix = process.env.REACT_APP_WEB_PREFIX;

async function loginUser(credentials) {
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

export default function Login({ datagram }) {
  //  const { webPrefix } = datagram;
  const webPrefix = defaultWebPrefix;
  const { things, getThings } = useThings();
  //export default function Login({token, setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [message, setMessage] = useState();

  const { token, isValidToken, setToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  //const [ error, setError ] = useState();

  // FRAMING Needs to be minimal,

  const [login, setLogin] = useState();

const [response, setResponse] = useState('');

  useEffect(() => {
console.log("Login response", response);
    const intervalId = setInterval(() => {
console.log("Login response interval called");
      const sentences = response.split('. ');
console.log("Login response sentences", sentences);
      if (sentences.length > 1) {
        sentences.shift(); // Remove the first sentence
        const newText = sentences.join('. ');
        setResponse(newText);
      }
    }, 5000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [response]);



  useEffect(() => {
    console.log("Login isValidToken", isValidToken);

    if (isValidToken == null) {
      return;
    }
    if (isValidToken) {
setResponse((response) => {return response + 'Saw valid token. '});

      setLogin(false);
      return;
    }
    if (isValidToken === false) {
setResponse((response) => {return response + 'Saw false token. '});
      setLogin(true);
      return;
    }
  }, [isValidToken]);

  function processToken(token) {
    if (isValidToken == null) {
      return;
    }
    if (isValidToken) {
      setLogin(false);
      return;
    }
    if (isValidToken === false) {
      setLogin(true);
      return;
    }
  }


useEffect(() =>{

// Make sure the logout and token things are added.
if (login) {
let datagram = {
          index: 21,
          to: "localhost",
          from: "stack",
          subject: "Here is your token",
//          priority: "priority",
//          createdAt: Date.now(),
//          uuid: uuidv4(),
          input: "Token",
        };


createThing(defaultWebPrefix, datagram, token).then((result)=>{
}).catch((error)=>{
console.error("Login createThing error",error);

});
/*
datagram =  {
          index: 21,
          to: "localhost",
          from: "stack",
          subject: "Here is your token",
          priority: "priority",
          createdAt: Date.now(),
          uuid: uuidv4(),
          input: "Token",
        };


createThing(defaultWebPrefix, datagram, token).then((result)=>{
}).catch((error)=>{}; 
*/
// Get id of this login thing and remove it.
}

}, [login]);

  useEffect(() => {
    console.log("Login things", things);
  }, [things]);

  useEffect(() => {
    processToken(token);
    console.log("Login token", token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hash = crypto.createHmac("sha256", REACT_APP_CLIENT_SECRET);
    // Salted hash of username and password.
    // Using client provided salt.
    var data = hash.update(username + password);
    //Creating the hash in the required format
    var gen_hash = data.digest("hex");



    const pass = "";
/*

const salt = process.env.REACT_APP_CLIENT_SECRET;
  // Combine the username, password, and salt
  const combinedData = username + pass + salt;

  // Create an HMAC hash using crypto-js
  const hash = CryptoJS.HmacSHA256(combinedData, REACT_APP_CLIENT_SECRET);

  // Convert the hash to the required format (hex)
  const gen_hash = hash.toString(CryptoJS.enc.Hex);

*/

    const t = await loginUser({
      username: gen_hash,
      password: pass,
    });

    if (t === {}) {
      setMessage("Got an empty response.");
    }

    setToken(t);

    console.log("Login handleSubmit token", token);

    if (t && t.message) {
      setMessage(t.message);
      console.log("Login token message", t.message);

      setMessage("Got token message. " + t.message);
    } else {
      setLogin("yes");
      // Change window location here... route.
      console.log("Login change window location");
      //window.location.href = "http://localhost:3000/" + "thing";
      //window.history.replaceState(null, null, /product/${this.props.product.id});

      //window.history.replaceState(null, null, /thing/);

      const defaultThings = [
        {
          index: 20,
          to: "localhost",
          from: "stack",
          subject: "Log Out",
          priority: "priority",
          createdAt: Date.now(),
          uuid: uuidv4(),
          input: "Logout",
        },
        {
          index: 21,
          to: "localhost",
          from: "stack",
          subject: "Here is your token",
          priority: "priority",
          createdAt: Date.now(),
          uuid: uuidv4(),
          input: "Token",
        },
      ];

      createThing(webPrefix, defaultThings[0], token);
      createThing(webPrefix, defaultThings[1], token);

      getThings(token);
      // Get things to forget

      const forgetStrings = ["sign up", "log in"];
      if (things && things.length > 0) {
        const thingsToBeForgotten = things.filter((t) => {
          var found = false;
          forgetStrings.forEach((forgetString) => {
            if (t.subject.toLowerCase().includes(forgetString.toLowerCase())) {
              found = true;
            }
          });
          return !found;
        });
        console.log("Login thingsToBeForgotten", thingsToBeForgotten);

        thingsToBeForgotten.map((thingToBeForgotten) => {
console.log("Login thingToBeForgotten", thingToBeForgotten.subject);
          forgetThing(thingToBeForgotten, token);
return;
        });
      }
      getThings(token);

      setMessage(
        "Made a Token card. Made a Log Out card. Removed non-conguent cards. Swipe Right."
      );
toast("Logged in");
setResponse((response)=>{return response + "Logged in. "   })
    }

    // Authentication ... and Authorisation.
    // Keep roles out of JWT.
    // setError(response.error);
    setIdentity(username); //tbd
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

  function handleSubmitButton() {}

if (isValidToken) {

return (<>LOGIN Valid token seen.</>);

}

  return (
    <div className="login-wrapper">
      LOGIN {login }
      <br />
{JSON.stringify(token)}
      <h1>{!isValidToken ? "Please Log In" : "Logged In"}</h1>
{!isValidToken && (<>
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
          <Button variant="action" disabled={false} type="submit">
            Submit
          </Button>
        </div>
      </form>
</>)}
      {message}
<div>
{response}
</div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
