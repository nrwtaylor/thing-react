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
} from "@material-ui/core";

import useThing from "../useThing.js";

const defaultFlag = "red";

export default function Flag({thing, agentInput, updateThing}) {

const {getThing} = useThing({...thing,priority:"urgent"});

const [text, setText] = useState();
const [subject, setSubject] = useState();
const [flag,setFlag] = useState();

const [flags, setFlags] = useState();

const [disabled, setDisabled] = useState();

useEffect(() =>{

console.debug("Flag start");

}, []);

useEffect(()=>{

if (thing == null) {return;}

// Only set on incoming once.
if (thing !== undefined) {return;}

if (thing.variables && thing.variables !== false) {

if (thing.variables.flag) {

// pre-recognition 
//setThing(thing.variables.flag);
setFlag(thing.variables.flag);

return;
}

setFlag("red");

}

}, [thing]);

useEffect(()=>{

console.debug("Flag flag", thing.uuid, flag);

}, [flag]);

useEffect(() =>{

if (agentInput == null) {return;}

console.debug("Agent agentInput", agentInput);

//if (agentInput.text) {setFlag(agentInput.text);}
if (agentInput.texts) {setFlags(agentInput.texts);}

},[agentInput]);

function handleClick(event) {
event.preventDefault();

console.debug("Flag handleClick");
//return;
const currentIndex = flags.indexOf(flag);
const nextIndex = (currentIndex + 1) % flags.length;
setFlag(flags[nextIndex]);
/*
if (flag == null) {setFlag('red');}

if (flag ==='green') {setFlag('red');}
if (flag ==='red') {setFlag('green');}
*/
updateThing({variables:{flag:flag}});

// And trigger a hard get.
//getThing();


}



return (
        <div>

          <MaterialUiButton  disabled={disabled} onClick={(e)=>handleClick(e)} >
{flag ? flag : defaultFlag}
     {/*     <MaterialUiButton disabled={disabled} type="submit"> */}
          </MaterialUiButton>
        </div>
);



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
