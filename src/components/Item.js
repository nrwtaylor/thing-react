import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { setThing } from "../util/database.js";

//import SwitchUnstyled from '@mui/base/SwitchUnstyled';

import {
  Button as MaterialUiButton,
  TextField,
  //  IconButton,
  //  ListItem,
  //  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import { replaceUuids } from "../util/text.js";
import useThing from "../useThing.js";
import useMessages from "../useMessages.js";
import useToken from "../useToken.js";

import { useNavigate } from "react-router-dom";

import { styled } from "@mui/system";
import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";

const blue = {
  500: "#007FFF",
};

const grey = {
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
};

const Root = styled("span")(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${theme.palette.mode === "dark" ? grey[600] : grey[400]};
    border-radius: 16px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 16px;
    height: 16px;
    top: 4px;
    left: 4px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 20px;
      top: 4px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${blue[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `
);

export default function Item({ thing, agentInput, updateThing }) {
  //  const { updateThing } = useThing(thing);
  const { token } = useToken();

  const [text, setText] = useState();
  const [subject, setSubject] = useState();

  const [link, setLink] = useState();

  const [disabled, setDisabled] = useState();

  const { messages, addMessage } = useMessages();

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
        <SwitchUnstyled
          component={Root}
          onChange={(e) => handleToggleItem(e)}
        />
        <br />
        {thing && thing.variables && thing.variables.item === true
          ? "ITEM TRUE"
          : "NOT ITEM"}
        <br />
        <MaterialUiButton
          component={Link}
          to={"/" + subject}
          disabled={disabled}
        >
          {/*     <MaterialUiButton disabled={disabled} type="submit"> */}
          {text}
        </MaterialUiButton>
      </div>
      {/*</a>*/}
      {/*</div>*/}
    </>
  );
}
