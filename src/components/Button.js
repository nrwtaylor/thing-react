import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

import {
  Button as MaterialUiButton,
  TextField,
//  IconButton,
//  ListItem,
//  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { replaceUuids} from "../util/text.js";

import { useNavigate } from "react-router-dom";


export default function Button(props) {

const navigate = useNavigate();

const pathname = window.location.pathname.replace(/\//, "");
// "/" + "history/" + subject

const [text, setText] = useState();
const [subject, setSubject] = useState();
// > useLink

// A thing can have variables. A datagram cannot.

const [link, setLink] = useState();

const [disabled, setDisabled] = useState();

useEffect(()=>{

if (props.thing) {

if (props.thing.subject) {

// pre-recognition 
setSubject(props.thing.subject);
setLink(props.thing.subject);

setText(replaceUuids(props.thing.agentInput));
//setText("Hello");

//setText(props.thing.subject);
}


}

}, [props]);

useEffect(()=>{
console.log("Button pathname", pathname, link);
if (pathname == null) {return;}

if (pathname === link) {setDisabled(true);}

}, [pathname,link]);


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
