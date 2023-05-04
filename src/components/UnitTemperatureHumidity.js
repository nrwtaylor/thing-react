import React, { useState, useEffect } from "react";

import "../index.css";
import {
  Typography,
  //  Avatar,
  //  ListItemAvatar,
  Box,
} from "@mui/material";

import {
  Button,
  TextField,
  IconButton,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

import {
  //AddCircleOutlineRounded,
  //DeleteOutlineRounded,
  Edit,
} from "@mui/icons-material";

import Forget from "../components/Forget.js";
import Trace from "../components/Trace.js";
import Stream from "../components/Stream.js";
import BubbleLevel from "../components/BubbleLevel.js";
import Inclinometer from "../components/Inclinometer.js";

import Magnetometer from "../components/Magnetometer.js";

import MotionReference from "../components/MotionReference.js";

import Ping from "../components/Ping.js";
import History from "../components/History.js";


import { getSnapshot } from "../util/database.js";

import useSnapshot from "../useSnapshot.js";

//import { useSwipeable } from "react-swipeable";

function TemperatureHumidity(props) {
  const { datagram } = props;
  const { to } = datagram;

  const [inertialReference, setInertialReference] = useState();

  const user_name = props.user_name; // TODO
  const agent_input = props.agent_input;
  const webPrefix = agent_input;
  //const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");
  //const [snapshotInterval, setSnapshotInterval] = useState(500);

//  const toSnapshot = "http://192.168.10.10/snapshot.json";

const toSnapshot = "https://stackr.ca/snapshot/56f2dbb4-fde9-4f5c-89cf-35fb19494b8e/coop.json";

  const { snapshot, flag, snapshotRunTime, snapshotInterval } = useSnapshot(
    toSnapshot,
    500
  );

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  const [open, setOpen] = useState(false);

  const replyAgentDialog = (thing) => {
    setOpen(true);
  };
  /*
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
*/
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

useEffect(()=>{

setData(snapshot);

}, [snapshot]);

  //const [ampDataPointer, setAmpDataPointer] = useState(0);
  //const [ampPoints, setAmpPoints] = useState([]);
  //const startTime = new Date();
  //const [voltPoints, setVoltPoints] = useState([]);
  const [tracePeriod, setTracePeriod] = useState();

  function callBack() {
    console.log("Agent callBack called.");
  }

  const deleteButton = (
    <Forget uuid={datagram && datagram.uuid} callBack={callBack} />
  );

/*

{"talker_identifier":"TH","type":"A","amount":"-10.833","units":"X","name":"AMP0","
sensor_id":"thamp0ax0"},"thvlt0ax1":{"talker_identifier":"TH","type":"A","amount":"12.950","units":"X","name":"VLT0","sensor_id":"thvlt0ax1"},"
thclb0ax2":{"talker_identifier":"TH","type":"A","amount":"1142011.6","units":"X","name":"CLB0","sensor_id":"thclb0ax2"},
"thamp1ax0":{"talker_identifier":"TH","type":"A","amount":"0.000","units":"X","name":"AMP1","sensor_id":"thamp1ax0"},
"thvlt1ax1":{"talker_identifier":"TH","type":"A","amount":"12.755","units":"X","name":"VLT1","sensor_id":"thvlt1ax1"},"thclb1ax2":
"talker_identifier":"TH","type":"P","amount":"1020.11","units":"B","name":"PRSA","sensor_id":"thprsapb0"},
"thtmpatc1":{"talker_identifier":"TH","type":"T","amount":"12.95","units":"C","name":"TMPA","sensor_id":"thtmpatc1"},"thhmdahp2":{"talker_identifier":"TH","type":"H","amount":"74.01","units":"P","name":"HMDA","sensor_id":"thhmdahp2"},"thgasaxx3":{"talker_identifier":"TH","type":"X","amount":"128.75","units":"X","name":"GASA","sensor_id":"thgasaxx3"}},"true_heading_in_degrees"

*/

  return (
    <>
      <div>TEMPERATURE HUMIDITY</div>
      <div>URL {toSnapshot}</div>
      <div>
        FLAG {flag} COLOUR
        <br />
        GET TIME {snapshotRunTime}ms {Math.round(1000 / snapshotRunTime, 1)}Hz
        REQUEST INTERVAL {snapshotInterval}ms{" "}
        {Math.round(1000 / snapshotInterval, 1)}Hz
        <br />
{/*
thtmpdtc1"},"thhmddhp2":{"talker_identifier":"TH","type":"H","amount":"58.28",
"units":"P","name":"HMDD","sensor_id":"thhmddhp2
*/}



A - TEMPERATURE
                  <History
                    user={null}
                    //thing={data.thing}
                    datagram={{...datagram, subject:"transducers-thtmpatc1-10m"}}
                    agent_input={webPrefix}
                  />

A - HUMIDITY
                  <History
                    user={null}
                    //thing={data.thing}
                    datagram={{...datagram, subject:"transducers-thhmdahp2-10m"}}
                    agent_input={webPrefix}
                  />
A - GAS
                  <History
                    user={null}
                    //thing={data.thing}
                    datagram={{...datagram, subject:"transducers-thgasaxx3-10m"}}
                    agent_input={webPrefix}
                  />


A - PRESSURE
                  <History
                    user={null}
                    //thing={data.thing}
                    datagram={{...datagram, subject:"transducers-thprsapb0-10m"}}
                    agent_input={webPrefix}
                  />




B - TEMPERATURE
                  <History
                    user={null}
                    //thing={data.thing}
                    datagram={{...datagram, subject:"transducers-thtmpbtc1-10m"}}
                    agent_input={webPrefix}
                  />

B - HUMIDITY
                  <History
                    user={null}
                    //thing={data.thing}
                    datagram={{...datagram, subject:"transducers-thhmdbhp2-10m"}}
                    agent_input={webPrefix}
                  />




C - TEMPERATURE
                  <History
                    user={null}
                    //thing={data.thing}
                    datagram={{...datagram, subject:"transducers-thtmpctc1-10m"}}
                    agent_input={webPrefix}
                  />

C - TEMPERATURE
                  <History
                    user={null}
                    //thing={data.thing}
                    datagram={{...datagram, subject:"transducers-thhmdchp2-10m"}}
                    agent_input={webPrefix}
                  />





D - TEMPERATURE
                  <History
                    user={null}
                    //thing={data.thing}
                    datagram={{...datagram, subject:"transducers-thtmpdtc1-10m"}}
                    agent_input={webPrefix}
                  />

D - HUMIDITY
                  <History
                    user={null}
                    //thing={data.thing}
                    datagram={{...datagram, subject:"transducers-thhmddhp2-10m"}}
                    agent_input={webPrefix}
                  />








        {data && data.transducers && (
          <>
<br />
BATTERY PRESSURE{" "}
            {data &&
              data.transducers &&
              data.transducers.thprsapb0 &&
              data.transducers.thprsapb0.amount}{" "}
            mBar
            <br />
BATTERY TEMPERATURE{" "}
            {data &&
              data.transducers &&
              data.transducers.thtmpatc1 &&
              data.transducers.thtmpatc1.amount}{"°C "}
            <br />
BATTERY HUMIDITY{" "}
            {data &&
              data.transducers &&
              data.transducers.thhmdahp2 &&
              data.transducers.thhmdahp2.amount}{"% "}
            <br />



          </>
        )}
        <br />
      </div>
    </>
  );
}

export default TemperatureHumidity;
