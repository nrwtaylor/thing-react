import React, { useState } from "react";
import PropTypes from "prop-types";

//import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

//import { setThing } from "../util/database.js";

import { humanTime } from "./../util/time.js";

export default function Text({ text, setText, token }) {
  //  const [subject, setSubject] = useState(datagram.subject);
  //const subject = thing.subject;
  // Display token.

  const [t, setT] = useState(text);

  function textChange(e) {
    console.log("Text textChange", text);
    var d = e.target.value;
    setT(d);
    setText(d);

    //setThing(thing.uuid, {subject:d}, token);
  }

  return (
    <>
      <TextField
        //              error = {validation.validator(variableType,subject)}
        variant="filled"
        margin="normal"
        label={"text"}
        type="text"
        fullWidth
        name="updateText"
        defaultValue={text}
        value={t}
        onChange={textChange}
      />
    </>
  );
}

Text.propTypes = {
  text: PropTypes.func.isRequired,
};
