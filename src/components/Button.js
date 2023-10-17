import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useHybridEffect from "../useHybridEffect.js";

import {
  Button as MuiButton,
  TextField,
  //  IconButton,
  //  ListItem,
  //  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { replaceUuids } from "../util/text.js";

import { useNavigate } from "react-router-dom";

export default function Button({thing, agentInput}) {
  const navigate = useNavigate();

  const pathname = window.location.pathname.replace(/\//, "");
  // "/" + "history/" + subject

  const [text, setText] = useState();
  const [subject, setSubject] = useState();
  // > useLink

  // A thing can have variables. A datagram cannot.

  const [link, setLink] = useState();

  const [disabled, setDisabled] = useState();

  useHybridEffect(() => {
    if (thing) {
      if (thing.subject) {
        // pre-recognition
        setSubject(thing.subject);
        setLink(thing.subject);

        setText(replaceUuids(thing.agentInput));
        //setText("Hello");

        //setText(props.thing.subject);
      }
    }
  }, [thing]);

  useEffect(() => {
    console.log("Button pathname", pathname, link);
    if (pathname == null) {
      return;
    }

    if (pathname === link) {
      setDisabled(true);
    }
  }, [pathname, link]);



useHybridEffect(() =>{

if (agentInput == null) {return;}

if (
    typeof agentInput === 'object' &&
    !Array.isArray(agentInput) &&
    agentInput !== null
) {

if (agentInput.link) {
setLink(agentInput.link);
}
if (agentInput.text) {
setText(agentInput.text);
}


}




}, [agentInput]);


  return (
    <>
      {/*
      <div onClick={() => 
{
if (disabled) {return;}
navigate("/"+subject)
}
}>
*/}
      {/* Provide the hint of a link in browser. */}
      {/* <a href={subject} disabled="disabled" > */}

      <div>
        <MuiButton
variant="url"
          component={Link}
//          to={"/" + subject}
to={link}
          disabled={disabled}
        >
          {/*     <MaterialUiButton disabled={disabled} type="submit"> */}
          {text}
        </MuiButton>
      </div>
      {/*</a>*/}
      {/*</div>*/}
    </>
  );
}
