import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";

import useHybridEffect from "../useHybridEffect.js";

import useThing from "../useThing.js";

import { devFlag, debugFlag } from "../util/dev.js";
import { getSlug } from "./../util/text.js";

const engineState = process.env.REACT_APP_ENGINE_STATE;

export default function Subject({
  thing: inputThing,
  agentInput,
  onThingReport,
}) {
  const { thing, updateThing } = useThing(inputThing);

  const textInput = React.useRef(null);

  const timeoutPeriod = 500;

  const [s, setS] = useState("null");
  const [defaultSubject, setDefaultSubject] = useState("default");

  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("idle");

  useHybridEffect(() => {
    if (inputThing == null) {
      return;
    }
    console.log("Subject inputThing", inputThing);

    var tempSubject = inputThing.subject;
    if (inputThing.subject == null) {
      tempSubject = "";
    }

    setDefaultSubject(tempSubject);

    setS(tempSubject);
    textInput.current.value = tempSubject;
  }, [inputThing]);

  function handleSubjectSubmit(ev) {
    console.log(`Subject onKeyDown ${ev.key}`);
    if (ev.key === "Enter") {
      ev.preventDefault();

      // Do code here
      const s = ev.target.value;

      console.log("Subject u", thing, s);
      setStatus("saving");

      updateThing({ uuid: inputThing.uuid, subject: s })
        .then((result) => {
          //addMessage("Item handleToggleItem update thing " + inputThing.subject);
          onThingReport(result);
          if (result && result.error && result.error.message) {
            setResponse((response) => {
              return response + result.error.message;
            });

            return;
          }
          setStatus("synced");
          setResponse((response) => {
            return response + "Update thing. ";
          });

          console.debug(
            "Subject handleToggleItem updateThing result data",
            result.data
          );
          console.debug("Item handleToggleItem updateThing result", result);
        })
        .catch((error) => {
          setResponse((response) => {
            return response + "Error";
          });
          //setError(error.message);
          console.error("Item handleToggleItem updateThing error", error);
        });
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
      updateThing({ uuid: inputThing.uuid, subject: s })
        .then((result) => {
          console.log("Subject timer result", result);
          onThingReport();
        })
        .catch((error) => {
          console.error("Subject timer error", error);
        });
    }, 2000);
    return () => clearTimeout(timer);
  }, [s]);

  useEffect(() => {
    if (s == null) {
      return;
    }

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
      {agentInput && agentInput.edit && (
        <>
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

          <div>{thing.subject !== defaultSubject && <>Not synced</>}</div>

          {debugFlag && (
            <>
              {" "}
              <div>
                SUBJECT {thing.subject}
                <br />S {s}
                <br />
                DEFAULT SUBJECT {defaultSubject}
                <br />
                {status}
                <br />
              </div>
            </>
          )}
          <div>{response}</div>

          <br />
        </>
      )}

      {agentInput && !agentInput.edit && (
        <div ref={textInput}>{defaultSubject}</div>
      )}
    </>
  );
}

Subject.propTypes = {
  subject: PropTypes.func.isRequired,
};
