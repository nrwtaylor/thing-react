import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

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

import { replaceUuids} from "../util/text.js";
import useThing from "../useThing.js";
import useMessages from "../useMessages.js";
import useToken from "../useToken.js";

import { useNavigate } from "react-router-dom";

import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';

const blue = {
  500: '#007FFF',
};

const grey = {
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
};


const Root = styled('span')(
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
    background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
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
  `,
);


export default function Item({thing:inputThing}) {

const {thing} = useThing(inputThing);
const {token} = useToken();

const navigate = useNavigate();

const pathname = window.location.pathname.replace(/\//, "");
// "/" + "history/" + subject

const [text, setText] = useState();
const [subject, setSubject] = useState();
// > useLink

// A thing can have variables. A datagram cannot.

const [link, setLink] = useState();

const [disabled, setDisabled] = useState();

const { messages, addMessage } = useMessages();

useEffect(()=>{

if (thing) {
console.log("Item Thing", thing);

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


function handleToggleItem(e) {
console.log("Item handleToggleItem", e.target.checked);

//    return setThing(thing.uuid, {...thing, variables:{...thing.variables, item:e.target.checked}}, token)
/*
    return setThing(thing.uuid, thing, token)
      .then((result) => {
        addMessage("Item handleToggleItem set thing " + thing.subject);

        console.log("Item handleToggleItem setThing result", result);
      })
      .catch((error) => {
        //setError(error.message);
        console.log("Item handleToggleItem setThing error", error);
      });
*/
}

useEffect(()=>{
console.log("Button pathname", pathname, link);
if (pathname == null) {return;}

if (pathname === link) {setDisabled(true);}

}, [pathname,link]);


if (thing == null) {return null;}



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
ITEM TOGGLE <SwitchUnstyled component={Root} onChange={(e)=>handleToggleItem(e)}/>
ITEM VARIABLE {thing && thing.variables && thing.variables.item && ("ITEM TRUE")}
<br />

          <MaterialUiButton component={Link} to={"/"+subject} disabled={disabled}>

     {/*     <MaterialUiButton disabled={disabled} type="submit"> */}
            {text}
          </MaterialUiButton>
        </div>
{/*</a>*/}
{/*</div>*/}
</>
)

}
