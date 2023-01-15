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

import { isText } from "../util/text.js";


import useSnapshot from "../useSnapshot";

import { useSwipeable } from "react-swipeable";

function TextSnapshot(props) {
  const { datagram } = props;
  const { to } = datagram;

  const user_name = props.user_name; // TODO
  const agent_input = props.agent_input;
  const webPrefix = agent_input;
  //const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");
  const [snapshotInterval, setSnapshotInterval] = useState(50);

  const toSnapshot = "http://192.168.10.10/snapshot.json";
  const { snapshot, flag, snapshotRunTime } = useSnapshot(toSnapshot);

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    setData(snapshot);
  }, [snapshot]);

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
        <div>SNAPSHOT</div>
        <div>URL {toSnapshot}</div>
        <div>
          FLAG {flag} COLOUR
          <br />
          GET TIME {snapshotRunTime}ms {Math.round(1000 / snapshotRunTime, 1)}Hz
          <br />
          {data && data.transducers && (
            <>
              {Object.keys(data.transducers).map((transducer) => {
                console.log("Snapshot transducer", transducer);
                return (
                  <>
                    {transducer}{" "}
                    {data &&
                      data.transducers &&
                      data.transducers[transducer] &&
                      data.transducers[transducer].amount}{" "}
                    {data &&
                      data.transducers &&
                      data.transducers[transducer] &&
                      data.transducers[transducer].units}
                    <br />
                  </>
                );
              })}
            </>
          )}







{/*
          <br />
          {data && (
            <>
              {Object.keys(data).map((element) => {
if (!isText(element)) {return null;}
                console.log("Snapshot element", element);
                return (
                  <>
                    {element}{" "}
                    {data &&
                      data[element]}
                    <br />
                  </>
                );
              })}
            </>
          )}
*/}









        </div>
      </>
    );

}

export default TextSnapshot;
