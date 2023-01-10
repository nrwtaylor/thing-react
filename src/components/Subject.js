import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";

export default function Subject({ subject, setSubject, token }) {
  //  const [subject, setSubject] = useState(datagram.subject);
  //const subject = thing.subject;
  // Display token.

  const textInput = React.useRef(null);

  const timeoutPeriod = 500;

  const [s, setS] = useState(subject);
  const [defaultSubject, setDefaultSubject] = useState(subject);

  useEffect(() => {
    setS(subject);

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
      setSubject(s);
    }
  }, [s]);

  // Apply a 2 second "settle" to the subject line.
  // After this time the request is sent.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSubject(s);
    }, 2000);
    return () => clearTimeout(timer);
  }, [s]);

  function subjectChange(e) {
    console.log("Subject subjectChange", subject);
    var d = e.target.value;
    setS(d);

    // Allow two seconds for subject to settle.
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
