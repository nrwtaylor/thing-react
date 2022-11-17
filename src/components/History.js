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
import Trace from "../components/Trace.js";
import Stream from "../components/Stream.js";
import BubbleLevel from "../components/BubbleLevel.js";
import Inclinometer from "../components/Inclinometer.js";

import Magnetometer from "../components/Magnetometer.js";

import MotionReference from "../components/MotionReference.js";

import Ping from "../components/Ping.js";
import { getSnapshot } from "../util/database.js";

import {humanRuntime} from "../util/time.js";

import useSnapshot from "../useSnapshot";


import { useSwipeable } from "react-swipeable";

function History(props) {
  const { datagram } = props;

//  const { to } = datagram;
//.thamp0ad0
//  const subject = "thamp0ad0";
const {subject} = datagram;

const ref = subject.replace("transducers-","").replace("history-","").replace("history ","");
const historyRef = subject.replace("history/","").replace("history-","").replace("history ","");

  const to = "http://192.168.10.10/snapshot2.json";

//const historyTo = "http://192.168.10.10/transducers-" + subject + ".json";

const historyTo = "http://192.168.10.10/" + historyRef + ".json";


const {snapshot:snapshot, flag:snapshotFlag} = useSnapshot(to);

const {snapshot:history, flag:historyFlag} = useSnapshot(historyTo);

  const user_name = props.user_name; // TODO
  const agent_input = props.agent_input;
  const webPrefix = agent_input;
  const [flag, setFlag] = useState();
const [historyPoints, setHistoryPoints] = useState([]);
  //const [requestedAt, setRequestedAt] = useState();

//const [spread, setSpread] = useState();

  const [reply, setReply] = useState("");
  const [snapshotInterval, setSnapshotInterval] = useState(50);

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  const [open, setOpen] = useState(false);

  const [snapshotGetTime, setSnapshotGetTime] = useState();
  const replyAgentDialog = (thing) => {
    setOpen(true);
  };

  const config = {
    delta: 10, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => console.log("User Swiped!", eventData),
    ...config,
  });

  const handleClose = () => {
    setOpen(false);
  };

// http://192.168.10.10/transducers-thaccyxx1.json

useEffect(()=>{
if (!history) {return;}
console.log("History history", history);

if (!history.agent_input) {return;}
console.log("History agent_input", history.agent_input);
if (!Array.isArray(history.agent_input)) {

return;}

const hist = history.agent_input;
const p = hist.map((h)=>{

        const amount = parseFloat(h.event.amount);

    // Add item to it
    const f = {
      name: "asdf",
      student: 24,
      fees: 1,
      value: amount,
      amount: amount,
      amount2: amount,
      amount3: amount,
      at: h.eventAt,
    };



return f;
});
setHistoryPoints(p);

// Find earliest and newest points
//if (hist !== undefined && Array.isArray(hist)) {
//const firstEvent= new Date(p[0].at);
//const lastEvent = new Date(p[p.length - 1].at);
//const spreadEvent = lastEvent - firstEvent;
//console.log("History spreadEvent", p[0].at, p[p.length-1].at, spreadEvent);
//setSpread(spreadEvent);

//}

}, [history]);

  function humanTime(timestamp) {
    const ts = new Date();
    return ts.toISOString();
  }

  function fromName() {
    if (datagram === undefined) {
      return "Agent";
    }

    if (datagram && datagram.from === undefined) {
      return "Agent";
    }

    return datagram.from;
  }

  function timeStamp() {
    var date = Date.now();
    return date.toString();
  }

  const [ampDataPointer, setAmpDataPointer] = useState(0);
  const [ampPoints, setAmpPoints] = useState([]);
  const startTime = new Date();
  const [voltPoints, setVoltPoints] = useState([]);
  const [tracePeriod, setTracePeriod] = useState();

  function callBack() {
    console.log("Agent callBack called.");
  }

  const deleteButton = (
    <Forget uuid={datagram && datagram.uuid} callBack={callBack} />
  );



  return (
    <>
      <div>HISTORY</div>
SUBJECT {subject}
<br />
REF {ref}
<br />
HISTORYREF {historyRef}
<br />

            <Trace data={historyPoints} /> 

<br />


            <Stream
              hide={true}
              quantity={{
                units: "A",
                amount:
                  snapshot &&
                  snapshot.transducers &&
                  snapshot.transducers[ref] &&
                  snapshot.transducers[ref].amount,

              }}
              period={100}
//              domain={[-50, 50]}
            />

            <br />



      <div>SUBJECT {subject}</div>
      <div>
        FLAG {flag} COLOUR
        <br />
        GET TIME {snapshotGetTime}ms {Math.round(1000 / snapshotGetTime, 1)}Hz


      </div>

    </>
  );
}

export default History;
