import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";

import useHybridEffect from "../useHybridEffect.js";


import useThing from "../useThing.js";

import { devFlag, debugFlag } from "../util/dev.js";

const engineState = process.env.REACT_APP_ENGINE_STATE;

export default function Subject({ thing:inputThing, agentInput }) {
  //  const [subject, setSubject] = useState(datagram.subject);

  const { thing, setThing, testThing, updateThing } = useThing(inputThing);

  const textInput = React.useRef(null);

  const timeoutPeriod = 500;

  const [s, setS] = useState('a');
  const [defaultSubject, setDefaultSubject] = useState('b');

  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('idle');

useHybridEffect(() =>{

console.log("Subject inputThing", inputThing);
if (inputThing == null) {return;}

var tempSubject = inputThing.subject;
if (inputThing.subject == null) {tempSubject = '';}

setDefaultSubject(tempSubject);

    setS(tempSubject);
    //testThing();
    textInput.current.value = tempSubject;


},[inputThing]);

function handleSubjectSubmit(ev) {

          console.log(`Subject onKeyDown ${ev.key}`);
          if (ev.key === "Enter") {
//            setSubject(ev.target.value);
            // Do code here
const s = ev.target.value;
      updateThing({ ...thing, subject: s });



            ev.preventDefault();
          }


}

  // Look for a space
  // Then send what you have.
  // This will send token by token. Which is probably okay.
  useEffect(() => {
    if (s == null) {
            setDefaultSubject("");
      return;
    }
    if (s === "") {
      setDefaultSubject("");
      return;
    }

    setDefaultSubject(s);

  }, [s]);

  // Apply a 2 second "settle" to the subject line.
  // After this time the request is sent.
  useEffect(() => {
    const timer = setTimeout(() => {
      //      setSubject(s);
console.log("Subject 2 second settle");
      updateThing({ ...thing, subject: s });
    }, 2000);
    return () => clearTimeout(timer);
  }, [s]);


useEffect(() =>{

if (s== null) {return;}

    if (s.endsWith(" ")) {
      //      setSubject(s);
console.log("Subject space settle");
      updateThing({ ...thing, subject: s });
    }


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
      {debugFlag && <>{thing.subject}</>}
{agentInput && agentInput.edit && (<>
      <TextField
        //              error = {validation.validator(variableType,subject)}
//disabled={agentInput && !agentInput.edit}
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
handleSubjectSubmit(ev);
/*
          console.log(`Subject onKeyDown ${ev.key}`);
          if (ev.key === "Enter") {
            setSubject(ev.target.value);
            // Do code here
            ev.preventDefault();
          }
*/
        }}



      />

<div>
{thing.subject !== defaultSubject && (<>Not synced</>)}
</div>
<div>
SUBJECT {thing.subject}
<br />
S {s}
<br />
DEFAULT SUBJECT {defaultSubject}
</div>

<br />


</>)}

{agentInput && !agentInput.edit && (
<div ref={textInput} >
{defaultSubject}
</div>
)}


    </>
  );
}

Subject.propTypes = {
  subject: PropTypes.func.isRequired,
};
