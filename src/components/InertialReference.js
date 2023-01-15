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

function InertialReference(props) {
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

  const toSnapshot = "http://192.168.10.10/snapshot.json";
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

/*
              data={{
                displacement: {

*/

  useEffect(() => {
    const i = {
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
          data.transducers.thvelyxx1 &&
          data.transducers.thvelyxx1.amount,
        x:
          data &&
          data.transducers &&
          data.transducers.thvelxxx0 &&
          data.transducers.thvelxxx0.amount,
        z:
          data &&
          data.transducers &&
          data.transducers.thvelzxx2 &&
          data.transducers.thvelzxx2.amount,
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
    };

    setInertialReference(i);
  }, [data]);

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

  return (
    <>
      <div>INERTIAL REFERENCE</div>
      <div>URL {toSnapshot}</div>
      <div>
        FLAG {flag} COLOUR
        <br />
        GET TIME {snapshotRunTime}ms {Math.round(1000 / snapshotRunTime, 1)}Hz
        REQUEST INTERVAL {snapshotInterval}ms{" "}
        {Math.round(1000 / snapshotInterval, 1)}Hz
        <br />
        {inertialReference && <>Inertial array seen</>}

<br />
Motion Reference component
<br />
<MotionReference data={inertialReference} />

<br />
Intertial Reference parameters
<br />
        {inertialReference && (
          <>
            {Object.keys(inertialReference).map((aspect) => {
              //console.log("InertialReference aspect", aspect);

              return (<>{Object.keys(inertialReference[aspect]).map((dimension) => {
                //console.log("InertialReference dimension", dimension);
                return <div>{aspect}{' '}{dimension}{' '}{inertialReference[aspect][dimension]}</div>;

              })}<br /></>);

            })}
          </>
        )}


<Stream
                    hide={true}
                    quantity={{
                      units: "A",
                      amount:
                        data &&
                        data.transducers &&
                        data.transducers['thacczxx2'] &&
                        data.transducers['thacczxx2'].amount,
                    }}
                    transducer={data && data.transducers && data.transducers['thacczxx2']}
                    period={50}
                  />



        {data && data.transducers && (
          <>
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
        <br />
      </div>
    </>
  );
}

export default InertialReference;
