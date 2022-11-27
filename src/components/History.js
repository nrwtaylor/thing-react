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

import { humanRuntime } from "../util/time.js";

import useSnapshot from "../useSnapshot";

//import { useSwipeable } from "react-swipeable";

function History(props) {
  const { datagram } = props;

  const {showLive } =props;

  const { subject } = datagram;

  const ref = subject
    .replace("transducers-", "")
    .replace("history-", "")
    .replace("history ", "")
    .replace("-10m", "")
    .replace("-1h", "")
    .replace("-2m", "");

  const historyRef = subject
    .replace("history/", "")
    .replace("history-", "")
    .replace("history ", "");

  const to = "http://192.168.10.10/snapshot.json";

  //const historyTo = "http://192.168.10.10/transducers-" + subject + ".json";

  const historyTo = "http://192.168.10.10/" + historyRef + ".json";

var snapshotInterval = 1000;
if (showLive === false) {
  snapshotInterval = true;
}

  const { snapshot: data, flag: snapshotFlag, snapshotGetTime:snapshotGetTime } = useSnapshot(to, snapshotInterval);

  const { snapshot: history, flag: historyFlag, snapshotGetTime:historyGetTime } = useSnapshot(
    historyTo, 60000
  );

  const user_name = props.user_name; // TODO
  const agent_input = props.agent_input;
  const webPrefix = agent_input;
  const [flag, setFlag] = useState();
  const [historyPoints, setHistoryPoints] = useState([]);
  //const [requestedAt, setRequestedAt] = useState();

  //const [spread, setSpread] = useState();

  //const [data,setData] = useState();

  const [reply, setReply] = useState("");
  //  const [snapshotInterval, setSnapshotInterval] = useState(50);
  /*
  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });
*/
//  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const replyAgentDialog = (thing) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//  useEffect(() => {
//    setData(snapshot);
//  }, [snapshot]);

  // http://192.168.10.10/transducers-thaccyxx1.json

  useEffect(() => {
    if (!history) {
      return;
    }
    console.log("History history", history);

    if (!history.agent_input) {
      return;
    }
    console.log("History agent_input", history.agent_input);
    if (!Array.isArray(history.agent_input)) {
      return;
    }

    const hist = history.agent_input;
    const p = hist.map((h) => {
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
      {data &&
        data.transducers &&
        data.transducers[ref] &&
        data.transducers[ref].amount}
{showLive && (
      <Stream
        hide={true}
        period={1000}
        quantity={{
          units: "A",
          amount:
            data &&
            data.transducers &&
            data.transducers[ref] &&
            data.transducers[ref].amount,
        }}
        //             transducer={data && data.transducers && data.transducers[ref]}
        //              period={100}
        //              domain={[-50, 50]}
      />
)}
      <br />
      <div>SUBJECT {subject}</div>
      <div>
        FLAG {flag} COLOUR
        <br />
        SNAPSHOT GET TIME {snapshotGetTime}ms {Math.round(1000 / snapshotGetTime, 1)}Hz
       <br />
        HISTORY GET TIME {historyGetTime}ms {Math.round(1000 / historyGetTime, 1)}Hz


      </div>
    </>
  );
}

export default History;
