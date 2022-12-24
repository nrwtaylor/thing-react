import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";


import useToken from "../useToken";
import useIdentity from "../useIdentity";
import useThings from "../useThings";

import { createThing, forgetThing } from "../util/database.js";


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
console.log("Login loginUser data", data);
    return data.json();
  }).catch((error)=>{
console.log("Login loginUser error", error);

return {message:error.code};
//return ({data:null, error:{message:error}});
});
}

export default function Login({datagram}) {

  const {webPrefix} = datagram;
  const {things, getThings} = useThings(token);
//export default function Login({token, setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [submit, setSubmit] = useState();
  const [message, setMessage] = useState();

  const { token, setToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  //const [ error, setError ] = useState();

useEffect(() => {

console.log("Login things", things);

}, [things]);

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

    const t = await loginUser({
      username: gen_hash,
      password: pass,
    });

setToken(t);

    console.log("Login handleSubmit token", token);


if (t && t.message) {setMessage(t.message);
console.log("Login token message", t.message);

setMessage("Got token message. " + t.message);

} else {

// Change window location here... route.
console.log("Login change window location");
//window.location.href = "http://localhost:3000/" + "thing";
//window.history.replaceState(null, null, /product/${this.props.product.id}); 

//window.history.replaceState(null, null, /thing/); 


  const defaultThings = [
    {
      index: 20,
      to: "localhost",
      subject: "Log Out",
      createdAt: Date.now(),
      uuid: uuidv4(),
      input: "Logout",
      //      webPrefix: "http://192.168.10.10/snapshot.json",
    },
    {
      index: 21,
      to: "localhost",
      subject: "Here is your token",
      createdAt: Date.now(),
      uuid: uuidv4(),
      input: "Token",
      //      webPrefix: "http://192.168.10.10/snapshot.json",
    },
  ];
       


createThing(webPrefix, defaultThings[0], token);
createThing(webPrefix, defaultThings[1], token);

getThings(token);
// Get things to forget

const forgetStrings = ['sign up', 'log in'];
if (things && things.length > 0) {
const thingsToBeForgotten = things.filter((t)=>{
  var found = false;
  forgetStrings.forEach(forgetString => {
    if (t.subject.toLowerCase().includes(forgetString.toLowerCase())) {
      found = true;
    }
  });
  return !found;

});
console.log("thingsToBeForgotten", thingsToBeForgotten);

thingsToBeForgotten.map((thingToBeForgotten) =>{
forgetThing(thingToBeForgotten, token);
})

}
setMessage("Made a Token card. Made a Log Out card. Removed non-conguent cards. Swipe Right.");
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

function handleSubmitButton() {

//if (!username) {setSubmit(false); return;}
//if (!password) {setSubmit(false); return;}

//setSubmit(true);

}

//if (!token) {

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => {handleUsername(e)}} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => {handlePassword(e);}}
          />
        </label>

        <div>
          <button disabled={submit} type="submit">Submit</button>
        </div>

      </form>
{message}
    </div>
  );

//setToken={setToken} setIdentity={setIdentity}}

//return (<>Login Token {message}</>);

}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
