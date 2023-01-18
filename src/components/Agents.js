import React, { useState, useEffect } from "react";

import "../index.css";
import {
  Typography,
  //  Avatar,
  //  ListItemAvatar,
  Box,
} from "@material-ui/core";

import {
  Button,
  TextField,
  IconButton,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import {
  //AddCircleOutlineRounded,
  //DeleteOutlineRounded,
  Edit,
} from "@material-ui/icons";

import Forget from "../components/Forget.js";
import Agent from "../components/Agent.js";
import DynamicComponent from "../components/DynamicComponent.js";

const recognizedSlugs = [
  "history",
  "snapshot",
  "ping",
  "error",
  "text-snapshot",
  "global-positioning-system",
  "barometer",
  "weather",
  "motion-reference",
  "inertial-reference",
  "power",
  "messages",
  "temperature-humidity",
  "humidity-temperature",
];

function slugAgent(slug) {
  const parts = slug.split("-");

  const capitalizedParts = parts.map((part) => {
    const capitalized = part.charAt(0).toUpperCase() + part.slice(1);
    return capitalized;
  });

  return capitalizedParts.join("");
}

function Agents({ thing, agentInput }) {

  const agent_input = agentInput; // remove

  const [agents, setAgents] = useState();

  const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");

  //  const thing = props.thing;

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  /*
  useEffect(() => {
    setFlag("green");

//    getAgent();
  }, [getAgent]); // eslint-disable-line react-hooks/exhaustive-deps
*/
  //  const [open, setOpen] = useState(false);

  const replyAgentDialog = (thing) => {
    //    setOpen(true);
  };

  function humanTime(timestamp) {
    const ts = new Date();
    return ts.toISOString();
  }

  function fromName() {
    if (thing === undefined) {
      return "Agent";
    }

    if (thing && thing.from === undefined) {
      return "Agent";
    }

    return thing.from;
  }

  useEffect(() => {
    if (thing == null) {
      return;
    }
    console.log("Agents thing", thing);
console.log("Agents test", agentInput, recognizedSlugs);
    if (thing.subject) {
      const matchedSlugs = recognizedSlugs.filter((recognizedSlug) => {
console.log("merp", recognizedSlug, agentInput[recognizedSlug], agentInput);

if (recognizedSlug in agentInput && agentInput[recognizedSlug] === false) {
console.log("merp");
return false;
}


        if (thing.subject.toLowerCase().indexOf(recognizedSlug) !== -1) {
          return true;
        }
        return false;
      });

      console.log("Agents thing matchedSlugs", matchedSlugs);

      setAgents(matchedSlugs);

      {
        /*
     if (datagram.subject.toLowerCase().indexOf("history") !== -1) {

setAgent(recognizedAgents['history']);

     }
*/
      }
    }
  }, [thing]);
/*
useEffect(()=>{


console.log("Agents agentInput xkcd", agentInput);

},[agentInput]);
*/
  useEffect(() => {
    console.log("Agents agents", agents);
  }, [agents]);

  // Used??
  const editAgents = () => {
    const datagram = {
      comment: reply,
      to: "merp",
      from: thing.from,
      //from: user_name,
      association: thing.uuid,
    };
    console.log("Datagram");
    console.log(datagram);

    /*
    db.collection("things")
      .add(
        datagram
      )
      .then(function () {
        console.log("Document succesfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
*/

    //    setOpen(false);
  };

  function timeStamp() {
    var date = Date.now();
    return date.toString();
    //    return date.toLocaleDateString("en-US");
    /*
    if (timestamp === undefined) {
      return "X";
    }

    if (timestamp === null) {
      return "X";
    }


//    const date = timestamp.toDate();
    const d = date.toString();

    const thing_date = new Date(d);
    const today_date = new Date();
    const seconds_diff = Math.round(
      today_date.getTime() - thing_date.getTime()
    );
    return thing_date.toLocaleDateString("en-US");
*/
  }

  function callBack() {
    console.log("Agent callBack called.");
  }

  const deleteButton = (
    <Forget uuid={thing && thing.uuid} callBack={callBack} />
  );

  return (
    <>
      <div>AGENTS</div>
      {thing &&
        agents &&
        agents.map((agent) => {
          return (
            <>
              AGENT {agent}
              <br />
              <Agent
                thing={thing}
                agentInput={{ ...agentInput, agent: agent }}
              />
              <br />

            </>
          );
        })}
{/*
      <TextField
        multiline
        //        autoFocus
        margin="normal"
        label="INPUT"
        type="text"
        fullWidth
        name="updateReply"
        value={reply}
        onChange={(event) => setReply(event.target.value)}
      />
*/}
    </>
  );

}

export default Agents;
