import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";

import useThing from "../useThing.js";

export default function Subject({ thing, setSubject }) {
  //  const [subject, setSubject] = useState(datagram.subject);
  //const subject = thing.subject;
  // Display token.

  const { setThing, testThing, updateThing } = useThing(thing);

  const textInput = React.useRef(null);

  const timeoutPeriod = 500;

//  const [subject, setSubject2] =useState();
const subject = thing.subject;

  const [s, setS] = useState(subject);
  const [defaultSubject, setDefaultSubject] = useState(subject);

/*
useEffect(()=>{
if (thing == null) {return;}
//if (thing.subject === subject) {return;}

//setSubject(thing.subject);
console.log("Subject thing", thing.subject, thing);

//setDefaultSubject(thing.subject);
setSubject(thing.subject);
},[thing]);
*/

//useEffect(() =>{

//updateThing(thing);
//setSubject(thing.subject);
//setS(thing.subject);
//},[]);

  useEffect(() => {
console.log("Subject subject", subject);
    setS(subject);
//testThing();
    textInput.current.value = subject;
  }, [subject]);

  // Look for a space
  // Then send what you have.
  // This will send token by token. Which is probably okay.
  useEffect(() => {
    if (s == null) {
      //      setDefaultSubject("");
      return;
    }
    if (s === "") {
      setDefaultSubject("");
      return;
    }

    setDefaultSubject("");

    if (s.endsWith(" ")) {
//      setSubject(s);
updateThing({...thing, subject:s});

    }
  }, [s]);

  // Apply a 2 second "settle" to the subject line.
  // After this time the request is sent.
  useEffect(() => {
    const timer = setTimeout(() => {
//      setSubject(s);
updateThing({...thing, subject:s});

    }, 2000);
    return () => clearTimeout(timer);
  }, [s]);

  function subjectChange(e) {
    var d = e.target.value;
    console.log("Subject subjectChange", d);
    setS(d);

    // Allow two seconds for subject to settle.
    //    setSubject(d);

    //setThing(thing.uuid, {subject:d}, token);
  }

  return (
    <>
{thing.subject}
      <TextField
        //              error = {validation.validator(variableType,subject)}
        variant="filled"
        margin="normal"
        label={"subject"}
        type="text"
        fullWidth
        name="updateSubject"
        defaultValue={defaultSubject}
        //        value={s}
        onChange={subjectChange}
        inputRef={textInput}
        onKeyDown={(ev) => {
          console.log(`Subject onKeyDown ${ev.key}`);
          if (ev.key === "Enter") {
            setSubject(ev.target.value);
            // Do code here
            ev.preventDefault();
          }
        }}
      />
    </>
  );
}

Subject.propTypes = {
  subject: PropTypes.func.isRequired,
};
