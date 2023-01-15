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

import useSnapshot from "../useSnapshot";

//import { useSwipeable } from "react-swipeable";

const { REACT_APP_SNAPSHOT } = process.env;


// refactor as 
// Snapshot(thing, agentInput)

function Snapshot(props) {
  const { datagram } = props;
  const { to } = datagram;

  const user_name = props.user_name; // TODO
  const agent_input = props.agent_input;
  const webPrefix = agent_input;
  //const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");
  const [snapshotInterval, setSnapshotInterval] = useState(250);

  const defaultToSnapshot = REACT_APP_SNAPSHOT;
  const [toSnapshot, setToSnapshot] = useState(defaultToSnapshot);

  //  const toSnapshot = "http://192.168.10.10/snapshot.json";
  const { snapshot, flag, snapshotRunTime } = useSnapshot(toSnapshot);

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
    console.log("Snapshot snapshot", snapshot);
    setData(snapshot);
  }, [snapshot]);

  function humanTime(timestamp) {
    const ts = new Date();
    return ts.toISOString();
  }

  useEffect(() => {
    console.log("Snapshot data", data);
  }, [data]);

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

  function handleChangeStream(c) {
    console.log("Snapshot handleChangeStream c", c);
  }

  function callBack() {
    console.log("Agent callBack called.");
  }

  const deleteButton = (
    <Forget uuid={datagram && datagram.uuid} callBack={callBack} />
  );

  //if (true) {
  if (false) {
    return (
      <>
        <div>SNAPSHOT</div>
        <div>URL {toSnapshot}</div>
        <div>
          FLAG {flag} COLOUR
          <br />
          GET TIME {snapshotRunTime}ms {Math.round(1000 / snapshotRunTime, 1)}Hz
          <br />
          {data && data.ping && (
            <>
              PING
              <br />
            </>
          )}
          {data && data.ping && <Ping ping={data.ping} />}
          {data && data.transducers && (
            <>
              {Object.keys(data.transducers).map((transducer) => {
                console.log("Snapshot transducer", transducer);
                return (
                  <Stream
                    key={transducer}
                    hide={true}
                    quantity={{
                      units: "A",
                      amount:
                        data &&
                        data.transducers &&
                        data.transducers[transducer] &&
                        data.transducers[transducer].amount,
                    }}
                    transducer={data.transducers[transducer]}
                    onChangeStream={(c) => {
                      handleChangeStream(c);
                    }}
                  />
                );
              })}
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div>SNAPSHOT</div>
      <div>URL {toSnapshot}</div>
      <div>
        FLAG {flag} COLOUR
        <br />
        GET TIME {snapshotRunTime}ms {Math.round(1000 / snapshotRunTime, 1)}Hz
        <br />
        {data && data.ping && <Ping ping={data.ping} />}
        {data && (
          <>
            SNAPSHOT TRANSDUCER
            <br />
            {Object.keys(data).map((transducer) => {
              console.log("Snapshot transducer", transducer);
              if (!["temperature", "humidity"].includes(transducer)) {
                return;
              }

              return (
                <Stream
                  key={transducer}
                  hide={true}
                  quantity={{
                    units: "A",
                    amount: data && data[transducer],
                  }}
                  transducer={data[transducer]}
                />
              );
            })}
          </>
        )}
        {data && data.transducers && (
          <>
            {Object.keys(data.transducers).map((transducer) => {
              console.log("Snapshot transducer", transducer);
              return (
                <Stream
                  key={transducer}
                  hide={true}
                  quantity={{
                    units: "A",
                    amount:
                      data &&
                      data.transducers &&
                      data.transducers[transducer] &&
                      data.transducers[transducer].amount,
                  }}
                  period={snapshotInterval}
                  transducer={data.transducers[transducer]}
                />
              );
            })}
          </>
        )}
        {data && data.transducers && (
          <>
            <MotionReference
              data={{
                displacement: {
                  y:
                    data &&
                    data.transducers &&
                    data.transducers.thdisyxm1 &&
                    data.transducers.thdisyxm1.amount,
                  x:
                    data &&
                    data.transducers &&
                    data.transducers.thdisxxm0 &&
                    data.transducers.thdisxxm0.amount,
                  z:
                    data &&
                    data.transducers &&
                    data.transducers.thdiszxm2 &&
                    data.transducers.thdiszxm2.amount,
                },

                velocity: {
                  y:
                    data &&
                    data.transducers &&
                    data.transducers.thvelyxm1 &&
                    data.transducers.thvelyxm1.amount,
                  x:
                    data &&
                    data.transducers &&
                    data.transducers.thvelxxm0 &&
                    data.transducers.thvelxxm0.amount,
                  z:
                    data &&
                    data.transducers &&
                    data.transducers.thvelzxm2 &&
                    data.transducers.thvelzxm2.amount,
                },

                acceleration: {
                  y:
                    data &&
                    data.transducers &&
                    data.transducers.thaccyxx1 &&
                    data.transducers.thaccyxx1.amount,
                  x:
                    data &&
                    data.transducers &&
                    data.transducers.thaccxxx0 &&
                    data.transducers.thaccxxx0.amount,
                  z:
                    data &&
                    data.transducers &&
                    data.transducers.thacczxx2 &&
                    data.transducers.thacczxx2.amount,
                },
              }}
            />
            <br />
            <Magnetometer
              vector={{
                z: data && data.transducers && data.transducers.thmagzxx2,
                y: data && data.transducers && data.transducers.thmagyxx1,
                x: data && data.transducers && data.transducers.thmagxxx0,
              }}
            />
            {/* <Magnetometer vector={{z:1, 
y:1, 
x:1}} /> */}
            <br />
            BUBBLE LEVEL
            <BubbleLevel
              data={{
                y:
                  data &&
                  data.transducers &&
                  data.transducers.thptchad1 &&
                  data.transducers.thptchad1.amount,
                x:
                  data &&
                  data.transducers &&
                  data.transducers.throllad0 &&
                  data.transducers.throllad0.amount,
                z:
                  data &&
                  data.transducers &&
                  data.transducers.thyawad2 &&
                  data.transducers.thyawad2.amount,
                dotZ:
                  data &&
                  data.transducers &&
                  data.transducers.thgyrzax2 &&
                  data.transducers.thgyrzax2.amount,
              }}
            />
            PITCH:{" "}
            <Inclinometer
              data={{
                x:
                  data &&
                  data.transducers &&
                  data.transducers.thptchad1 &&
                  data.transducers.thptchad1.amount,
              }}
            />
            {data &&
              data.transducers &&
              data.transducers.thptchad1 &&
              data.transducers.thptchad1.amount}{" "}
            degrees
            <br />
            ROLL:{" "}
            <Inclinometer
              data={{
                x:
                  data &&
                  data.transducers &&
                  data.transducers.throllad0 &&
                  data.transducers.throllad0.amount,
              }}
            />
            {data &&
              data.transducers &&
              data.transducers.throllad0 &&
              data.transducers.throllad0.amount}{" "}
            degrees
            <br />
            YAW:{" "}
            {data &&
              data.transducers &&
              data.transducers.thyawax2 &&
              data.transducers.thyawax2.amount}{" "}
            <br />
            MAGNETIC HEADING: {data && data.magnetic_heading_in_degrees} <br />
            TRUE HEADING: {data && data.true_heading_in_degrees} <br />
            RATE OF TURN: {data && data.rate_of_turn} <br />
          </>
        )}
        {/*
MRU<br />
ACCZ: {data && data.transducers && data.transducers.thacczax2 && data.transducers.thacczax2.amount} m<br />
ACCZ: {data && data.transducers && data.transducers.thacczax2 && data.transducers.thacczax2.amount} m<br />
ACCZ: {data && data.transducers && data.transducers.thacczax2 && data.transducers.thacczax2.amount} m<br />
*/}
        LATITUDE: {data && data.current_latitude}
        <br />
        LONGITUDE: {data && data.current_longitude}
        <br />
        SPEED IN KNOTS: {data && data.speed_in_knots} knots
        <br />
        <Stream
          hide={true}
          quantity={{
            amount: data && data.speed_in_knots,
            units: "knots",
          }}
          period={50}
        />
        <br />
        TRUE COURSE: {data && data.true_course}
        <br />
        NUMBER OF SATELLITES: {data && data.number_of_satellites}
        <br />
        HDOP: {data && data.horizontal_dilution_of_precision}
        <br />
        ALTITUDE: {data && data.altitude_above_mean_sea_level}m (MSL)
        <br />
        FIX TIME: {data && data.fix_time}
        <br />
        TIMESTAMP: {data && data.time_stamp}
        <br />
        PARSED AT: {data && data.parsedAt}
        <br />
      </div>
    </>
  );
}

export default Snapshot;
