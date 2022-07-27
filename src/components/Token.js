import React, {useEffect} from 'react';
//import './Login.css';
import PropTypes from 'prop-types';


export default function Token({token}) {

// Display token.

useEffect(() =>{
if (!token) {return;}
console.log("Token token", token);
}, [token]);

  return (
<>
TOKEN 
{!token && ("NOT") }
{token && token === null && ("NULL")}
{token && token === false && ("FALSE")}
{token && token === '' && ("EMPTY")}
{token && token === true && ("TRUE")}
{token && Array.isArray(token) && ("ARRAY")}
{token && token.isString && (<>{"STRING" + token}</>)}
{token && token}
<br />

</>
  )


}

Token.propTypes = {
//  token: PropTypes.func.isRequired
}
