import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";

export default function Variable({ variable }) {
  //  const [refreshedAt, setRefreshedAt] = useState();
  //  const [expiresAt, setExpiresAt] = useState();
  // Display variable.

  useEffect(() => {
    console.log("Variable variable", variable);
    if (!variable) {
      return;
    }
    //console.log("variable variable", variable);

    if (variable === null) {
      return;
    }
  }, [variable]);

  return <>VAR</>;
  /*
  return (
    <>
      variable
      {!variable && "NOT"}
      {variable && variable === null && "NULL"}
      {variable && variable === false && "FALSE"}
      {variable && variable === "" && "EMPTY"}
      {variable && variable === true && "TRUE"}
      {variable && Array.isArray(variable) && "ARRAY"}
      {variable && variable.isString && <>{"STRING" + variable}</>}
      {variable && variable} <br />
      <br />
    </>
  );
*/
}

Variable.propTypes = {
  //  variable: PropTypes.func.isRequired
};
