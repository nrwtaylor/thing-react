import React from "react";
import Button from "@mui/material/Button";
import useToken from "../useToken.js";


//import './Login.css';
import PropTypes from "prop-types";

async function logoutUser(token) {
  //deleteToken(token);
  /*
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
*/
}

export default function Logout() {

const { deleteToken } = useToken();


  //  const [username, setUserName] = useState();
  //  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //    const token = await loginUser({
    //      username,
    //      password
    //    });
    console.log("Logout handleSubmit");
    const token = false;
    deleteToken(token);
    logoutUser(token);

    window.history.replaceState(null, null, "/");
  };

  return (
    <div className="logout-wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <Button variant="action" type="submit">Logout</Button>
        </div>
      </form>
    </div>
  );
}

//Logout.propTypes = {
//  deleteToken: PropTypes.func.isRequired,
//};
