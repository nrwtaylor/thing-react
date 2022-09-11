import React, { useState } from "react";
import PropTypes from "prop-types";
//import jwt_decode from "jwt-decode";

//import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

//import { setThing } from "../util/database.js";

import { humanTime } from "./../util/time.js";

export default function Subject({ subject, setSubject, token }) {
  //  const [subject, setSubject] = useState(datagram.subject);
  //const subject = thing.subject;
  // Display token.

  const [s, setS] = useState(subject);

  function subjectChange(e) {
    console.log("Subejct subjectChange", subject);
    var d = e.target.value;
    setS(d);
    setSubject(d);

    //setThing(thing.uuid, {subject:d}, token);
  }

  return (
    <>
      <TextField
        //              error = {validation.validator(variableType,subject)}
        variant="filled"
        margin="normal"
        label={"subject"}
        type="text"
        fullWidth
        name="updateSubject"
        defaultValue={subject}
        value={s}
        onChange={subjectChange}
      />
    </>
  );
}

Subject.propTypes = {
  subject: PropTypes.func.isRequired,
};
