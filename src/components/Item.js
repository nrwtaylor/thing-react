import React, { useState, useEffect } from "react";
import { devFlag, debugFlag } from "../util/dev.js";

import { Link } from "react-router-dom";
import { setThing } from "../util/database.js";

import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Switch
} from "@mui/material";

import { replaceUuids } from "../util/text.js";
import useThing from "../useThing.js";
import useMessages from "../useMessages.js";
import useToken from "../useToken.js";

import { useNavigate } from "react-router-dom";


const blue = {
  500: "#007FFF",
};

const grey = {
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
};

export default function Item({ thing, agentInput, updateThing }) {
  //  const { updateThing } = useThing(thing);
  const { token } = useToken();

  const [text, setText] = useState();
  const [subject, setSubject] = useState();

  const [link, setLink] = useState();

  const [disabled, setDisabled] = useState();

  const { addMessage } = useMessages();

  useEffect(() => {
    if (thing) {
      console.debug("Item Thing", thing);

      if (thing.subject) {
        // pre-recognition
        setSubject(thing.subject);

        setText(replaceUuids(thing.agentInput));
      }
    }
  }, [thing]);

  function handleToggleItem(e) {
    console.log("Item handleToggleItem", e.target.checked);
    console.debug("Item handleToggleItem thing", thing);

    // Review this
    // May not need to use the useThing hook.

    return updateThing({
      variables: { item: e.target.checked },
    })
      .then((result) => {
        addMessage("Item handleToggleItem update thing " + thing.subject);

        console.debug("Item handleToggleItem updateThing result", result);
      })
      .catch((error) => {
        //setError(error.message);
        console.error("Item handleToggleItem updateThing error", error);
      });
  }
  if (thing == null) {
    return null;
  }

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

    <Switch
      checked={thing && thing.variables && thing.variables.item}
      onChange={handleToggleItem}
      color="primary"
    />

        {/* <SwitchUnstyled
          component={Root}
          onChange={(e) => handleToggleItem(e)}
        /> */}
        <br />

        {debugFlag && (<>


        {thing && thing.variables && thing.variables.item === true
          ? "ITEM TRUE"
          : "NOT ITEM"}

</>) }


        <br />

{/*
<Button component={Link} to={"/" + subject} disabled={disabled} variant="url">
  {text}
</Button>
*/}
      </div>
      {/*</a>*/}
      {/*</div>*/}
    </>
  );
}
