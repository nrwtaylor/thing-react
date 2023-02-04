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
//import { getSnapshot } from "../util/database.js";

import useSnapshot from "../useSnapshot";

import { extractUuid, extractNuuid, getSlug } from "../util/text.js";

//import { useSwipeable } from "react-swipeable";

const { REACT_APP_SNAPSHOT } = process.env;


// refactor as 
// Snapshot(thing, agentInput)

const engineState = process.env.REACT_APP_ENGINE_STATE;
var debugFlag = false;
var devFlag = false;
if (engineState === 'dev') {debugFlag = true; devFlag = true;}



function Snapshot({thing, agentInput}) {

  const datagram = thing;
  //const { to } = datagram;

  const agent_input = agentInput;
  const webPrefix = agentInput;
  //const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");
  const [snapshotInterval, setSnapshotInterval] = useState(250);

  const defaultToSnapshot = REACT_APP_SNAPSHOT;
  const [toSnapshot, setToSnapshot] = useState(defaultToSnapshot);

  //  const toSnapshot = "http://192.168.10.10/snapshot.json";
  const { snapshot, flag, snapshotRunTime } = useSnapshot(toSnapshot);

useEffect(() =>{
if (thing == null) {return;}
if (thing.subject == null) {return;}

const uuidPathname = extractUuid(thing.subject);

if (uuidPathname === true) {return;}
if (uuidPathname === false) {return;}

setToSnapshot("https://stackr.ca/snapshot/" + uuidPathname + "/hey.json");


}, [thing]);

useEffect(() =>{
//const i = "861cd510-65bc-457e-b10f-e58182ff7a3d";
//setToSnapshot("https://stackr.ca/snapshot/" + i + "/hey.json");

console.log("Snapshot toSnapshot", toSnapshot);

},[toSnapshot]);

  //const [data, setData] = useState({
  //  thing: { uuid: "X" },
  //  thingReport: { sms: "No response. Yet." },
  //});
  const [data, setData] = useState();

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
    console.log("Snapshot thing snapshot", thing, snapshot);

if (snapshot && snapshot.thingReport) {
if (snapshot.thingReport.snapshot) {
console.log("Snapshot setData snapshot.thingReport.snapshot", snapshot.thingReport.snapshot);
setData(snapshot.thingReport.snapshot);
return;
}
}

if (snapshot.thingReport == null) {
console.log("Snapshot setData snapshot", snapshot);
    setData(snapshot);
return;
}
// Or perhaps don't refresh snapshot.Snapshot thing snapshot
setData(true);
  }, [snapshot]);

  function humanTime(timestamp) {
    const ts = new Date();
    return ts.toISOString();
  }

  useEffect(() => {
if (thing == null) {return;}
    console.log("Snapshot data", toSnapshot, data);
  }, [data]);

useEffect(()=>{
if (thing == null) {return;}

console.log("Snapshot thing", toSnapshot, thing.uuid, thing);

},[thing]);

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

useEffect(() =>{

console.log("Snapshot data", data);

}, [data]);

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

{debugFlag && (<>
      <div>SNAPSHOT</div>
</>)}
{debugFlag && (<>
      <div>URL {toSnapshot}</div>
</>)}
      <div>
{debugFlag && (<>
        FLAG {flag} COLOUR
        <br /></>)}
{debugFlag && (<>
        GET TIME {snapshotRunTime}ms {Math.round(1000 / snapshotRunTime, 1)}Hz
        <br /></>)}

        {data && data.ping && <Ping ping={data.ping} />}

        {data && (
          <>
{debugFlag && (<>            SNAPSHOT TRANSDUCER
            <br /></>)}
            {Object.keys(data).map((transducer) => {
              console.log("Snapshot transducer", transducer);
              if (!["temperature", "humidity"].includes(transducer)) {
return (<>{transducer} not used<br /></>);
            //    return;
              }

              return (
<>
{transducer} used<br />
                <Stream
                  key={transducer}
                  hide={true}
                  quantity={{
                    units: "A",
                    amount: data && data[transducer],
                  }}
                  transducer={data[transducer]}
                />
</>
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
                  agentInput={{snapshot:{interval:snapshotInterval,period:false}}}
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
{data && data.current_latitude && (<>
        LATITUDE: {data && data.current_latitude}
        <br /></>)}

{data && data.current_longitude && (<>
        LONGITUDE: {data && data.current_longitude}
        <br /></>)}

{data && data.speed_in_knots && (<>
        SPEED IN KNOTS: {data && data.speed_in_knots} knots
        <br /></>)}

{data && data.speed_in_knots && (<>
        <Stream
          hide={true}
          quantity={{
            amount: data && data.speed_in_knots,
            units: "knots",
          }}
          period={50}
        />
        <br /></>)}

{data && data.true_course && (<>
        TRUE COURSE: {data && data.true_course}
        <br /></>)}

{data && data.number_of_satellites && (<>
        NUMBER OF SATELLITES: {data && data.number_of_satellites}
        <br /></>)}

{data && data.horizontal_dilution_of_precision && (<>
        HDOP: {data && data.horizontal_dilution_of_precision}
        <br /></>)}

{data && data.altitude_above_mean_sea_level && (<>
        ALTITUDE: {data && data.altitude_above_mean_sea_level}m (MSL)
        <br /></>)}

{data && data.fix_time && (<>
        FIX TIME: {data && data.fix_time}
        <br /></>)}

{data && data.time_stamp && (<>
        TIMESTAMP: {data && data.time_stamp}
        <br /></>)}

{data && data.parsedAt && (<>
        PARSED AT: {data && data.parsedAt}
        <br /></>)}

      </div>
    </>
  );
}

export default Snapshot;
