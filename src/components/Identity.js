import React, {useEffect, useState} from 'react';
//import './Login.css';
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";

import { humanTime } from "./../util/time.js";


export default function Identity({identity}) {


// Display token.

useEffect(() =>{
console.log("Identity identity", identity);
if (!identity) {return;}
//console.log("Token token", token);

if (identity === null) {return;}

}, [identity]);

  return (
<>
IDENTITY 
{!identity && ("NOT") }
{identity && identity === null && ("NULL")}
{identity && identity === false && ("FALSE")}
{identity && identity === '' && ("EMPTY")}
{identity && identity === true && ("TRUE")}
{identity && Array.isArray(identity) && ("ARRAY")}

{identity && identity.isString && (<>{"STRING" + identity}</>)}
{identity && identity} <br />

<br />

</>
  )


}

Identity.propTypes = {
//  token: PropTypes.func.isRequired
}
