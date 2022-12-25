import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

//import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

//import { setThing } from "../util/database.js";

import { humanTime } from "./../util/time.js";

export default function Subject({ subject, setSubject, token }) {
  //  const [subject, setSubject] = useState(datagram.subject);
  //const subject = thing.subject;
  // Display token.

const timeoutPeriod = 500;

  const [s, setS] = useState(subject);
const [defaultSubject, setDefaultSubject] = useState("");

  useEffect(()=>{
setS(subject);
  }, [subject]);


// Look for a space
// Then send what you have.
// This will send token by token. Which is probably okay.
useEffect(()=>{
if (s === undefined) {setDefaultSubject("");
return;}
if (s === "") {setDefaultSubject("");return;}

setDefaultSubject("");


if (s.endsWith(" ")) {
setSubject(s);
}
},[s]);

// Apply a 2 second "settle" to the subject line.
// After this time the request is sent.
useEffect(() => {
  const timer = setTimeout(() => {
    setSubject(s);
  }, 2000);
  return () => clearTimeout(timer);
}, [s]);


  function subjectChange(e) {
    console.log("Subejct subjectChange", subject);
    var d = e.target.value;
    setS(d);



//    setSubject(d);

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
        defaultValue={defaultSubject}
        value={s}
        onChange={subjectChange}
      />
    </>
  );
}

Subject.propTypes = {
  subject: PropTypes.func.isRequired,
};
