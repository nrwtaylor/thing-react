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

const engineState = process.env.REACT_APP_ENGINE_STATE;
var debugFlag = false;
var devFlag = false;
if (engineState === 'dev') {debugFlag = true; devFlag = true;}


function slugAgent(slug) {

if (slug == null) {return false;}


  const parts = slug.split("-");

  const capitalizedParts = parts.map((part) => {
    const capitalized = part.charAt(0).toUpperCase() + part.slice(1);
    return capitalized;
  });

  return capitalizedParts.join("");
}

function Agent({ thing, agentInput }) {
  //const {datagram} = props;

  //  const user_name = props.user_name; // TODO
  const agent_input = agentInput; // remove

  //const [agent, setAgent] = useState();

  const agent = slugAgent(agentInput.agent);

  const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");

  //  const thing = props.thing;

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thingReport: { sms: "No response. Yet." },
  });

  /*
  useEffect(() => {
    setFlag("green");

//    getAgent();
  }, [getAgent]); // eslint-disable-line react-hooks/exhaustive-deps
*/
  //  const [open, setOpen] = useState(false);
useEffect(()=>{

console.log("Agent agent", agent);

}, [agent]);

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
/*
  useEffect(() => {
    if (thing == null) {
      return;
    }

    console.log("Agent thing", thing);
    if (thing.subject) {
      recognizedSlugs.every((recognizedSlug) => {
        console.log("Agent key value", recognizedSlug);
        console.log("xxx", thing.subject, recognizedSlug);
        if (thing.subject.toLowerCase().indexOf(recognizedSlug) !== -1) {
          setAgent(slugAgent(recognizedSlug));
          return false;
        }

        return true;
      });

    }
  }, [thing]);
*/

  useEffect(() => {
    console.log("Agent agent", agent);
  }, [agent]);

  // Used??
  const editAgent = () => {
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

function handleThingReport(event) {

console.log("Agent handleThingReport event", event);

}

  return (
    <>
{debugFlag && (      <div>AGENT</div>)}
{debugFlag && (<>
DEV
{thing && thing.variables && thing.variables.flag && thing.variables.flag.dev}
</>)}

{debugFlag && (<>
      {thing && thing.nomFrom}
      {thing && thing.from}
</>)}

      {thing && agent && (
        <DynamicComponent
          is={agent}
          channel={"image"}
          user={null}
          //thing={data.thing}

thing={thing}
agentInput={agentInput}
thingReport={()=>handleThingReport()}


          datagram={thing}
          agent_input={agentInput}
        />
      )}

{devFlag && (
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
)}
    </>
  );

  return (
    <>
      <div>AGENT</div>

      <DynamicComponent
        is={agent_input}
        channel={"image"}
        user={null}
        //thing={data.thing}
        datagram={thing}
        agent_input={agentInput}
      />
{devFlag && (<>
      {thing && thing.nomFrom}
      {thing && thing.from}
      {/* flag */}
</>)}
      <ListItem key={thing && thing.uuid} alignItems="flex-start">
        <ListItemText
          primary={
            {
              /*           <Typography variant="body2">
              timestamp {timeStamp()}
              <br />
              humanTime {humanTime(timeStamp())}
              <br />
              from {fromName()}
              <br />
            </Typography>
*/
            }
          }
          secondary={
            <>
              <Typography component="span" variant="body1" color="textPrimary">
                {thing && thing.subject}
                {data.etime}
                To {thing && thing.to}
              </Typography>
              <Box className="delete-button">{deleteButton}</Box>
            </>
          }
        />
      </ListItem>

      <TextField
        multiline
        //        autoFocus
        margin="normal"
        label="Type your reply here... (TODO)"
        type="text"
        fullWidth
        name="updateReply"
        value={reply}
        onChange={(event) => setReply(event.target.value)}
      />
      <Button onClick={editAgent} color="primary">
        Save
      </Button>
    </>
  );
}

export default Agent;
