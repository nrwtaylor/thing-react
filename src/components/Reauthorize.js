import React from "react";
//import './Login.css';
//import PropTypes from 'prop-types';

async function reauthorizeUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Reauthorize({}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    //    const token = await loginUser({
    //      username,
    //      password
    //    });
    const credentials = null;
    console.log("Logout handleSubmit");
    reauthorizeUser(credentials);
    //    const token = false;
    //    deleteToken(token);
  };

  return (
    <div className="logout-wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit">Reauthorize client</button>
        </div>
      </form>
    </div>
  );
}

Reauthorize.propTypes = {
  //  deleteToken: PropTypes.func.isRequired
};
