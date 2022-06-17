import React, { useState, useEffect } from "react";
import axios from "axios";

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

function Snapshot(props) {
  const user_name = props.user_name; // TODO
const agent_input=props.agent_input;
const webPrefix = agent_input;
  const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");

  const thing = props.thing;

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
  const [open, setOpen] = useState(false);


const [snapshotGetTime, setSnapshotGetTime] = useState();
  const replyAgentDialog = (thing) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//useEffect(()=>{

//getAgent();

//},[]);



  useEffect(() => {
    // If still processing the last one,
    // Skip a beat, do not request another.
//    if (flag === "red") {
//      return;
//    }

    // First time flag is green.

//    console.log("nextRunAt pollInterval", pollInterval);
//    const t = currentAt + pollInterval;

//    setNextRunAt(t);

    const interval = setInterval(() => {
      getSnapshot();
    }, 50); // 20 Hz was 200. 

    return () => clearInterval(interval);
  }, []);




/*
  useEffect(() => {
    console.log("Agent thing", thing);
  }, [thing]);
*/

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

  const editAgent = () => {
    const datagram = {
      comment: reply,
      to: "merp",
      from: user_name,
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

    setOpen(false);
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

  // TODO Call Thing > Database.
  function getSnapshot(agent) {
const startTime = new Date();
    if (flag === 'red') {return;}
   // setFlag("red");
    console.log("Snapshot axios call " + agent);
//    const webPrefix = process.env.REACT_APP_WEB_PREFIX
    //setRequestedAt(Date.now());

//const url = 'http://192.168.10.10/snapshot.json';
const url = webPrefix + 'snapshot.json';
    console.log("Snapshot axios url " + url);
    console.log("Snapshot axios url " + url , flag);
    console.log("Snapshot axios url " + url , webPrefix);

if (webPrefix  === "https://stackr.ca/") {
setFlag('red');
return;}
//    axios.get(webPrefix + agent + `.json`).then((res) => {
//if (flag === undefined) {setFlag('green');}
    axios.get(url).then((res) => {
console.log("Got "+url);
//console.log("snapshot", res);
      let thingy = res.data;
//      console.log("Agent res.data", res.data);
      setData(res.data);

      // dev flag available not available
      setFlag("green");
const endTime = new Date();
setSnapshotGetTime(endTime - startTime);
    //setFlag("green");

    })
.catch((error) => {
    setFlag("red");

console.log("Get error", url, error);
});
  }

const [ampDataPointer, setAmpDataPointer] = useState(0);
const [ampPoints, setAmpPoints] = useState([]);
const startTime = new Date();
const [voltPoints, setVoltPoints] = useState([]);
const [tracePeriod, setTracePeriod] = useState();

useEffect(()=>{
const startTime = new Date();

//console.log(data && data.transducers && data.transducers.thaccxad0);

console.log(data && data.transducers && data.transducers.thamp0ad0 && data.transducers.thamp0ad0.amount);


const amount = parseInt(data && data.transducers && data.transducers.thamp0ad0 && data.transducers.thamp0ad0.amount);
console.log("amount", amount);


// Create a new array based on current state:
let f = [...ampPoints];

// Add item to it
f.push({ name: 'asdf', student:24, fees:1, value: amount, amount:amount });

const maxAmpPoints = 100;

const excessPoints = f.length - maxAmpPoints;

if (excessPoints >= 0) {
const a = (ampDataPointer + 1) % maxAmpPoints;

setAmpDataPointer(a);

//f.splice(0, excessPoints);
f.shift();

}

//console.log(f);
// Set state


setAmpPoints(f);



//////////



const voltAmount = parseInt(data && data.transducers && data.transducers.thvlt0ad1 && data.transducers.thvlt0ad1.amount);
//console.log("voltAmount", voltAmount);
// Create a new array based on current state:
let g = [...voltPoints];

g.push({ name: 'volt', student:24, fees:1, value: amount, amount:voltAmount });

const maxVoltPoints = 100;
const excessVoltPoints = g.length - maxVoltPoints;

if (excessVoltPoints >= 0) {

//g.splice(0, excessVoltPoints);
g.shift();

}
//console.log("f volts",f);

setVoltPoints(g);


const endTime = new Date();
const tf = endTime - startTime;
const timeDiff = tf;
setTracePeriod(timeDiff);

}, [data]);

  function callBack() {
    console.log("Agent callBack called.");
  }

  const deleteButton = <Forget uuid={thing && thing.uuid} callBack={callBack} />;




  return (
    <>
<div>
SNAPSHOT FLAG {flag} COLOUR<br />
SNAPSHOT GET TIME {snapshotGetTime}ms {Math.round(1000 / snapshotGetTime,1)}Hz<br />
<Trace data={ampPoints}/><br />
AMP0: {data && data.transducers && data.transducers.thamp0ad0 && data.transducers.thamp0ad0.amount} A<br />
<br />
pointer {ampDataPointer}<br />
Process Amp Trace Period {tracePeriod}ms<br />

<br />
<Trace data={voltPoints}/> 

VLT0 (HOUSE): {data && data.transducers && data.transducers.thvlt0ad1 && data.transducers.thvlt0ad1.amount} V<br />
VLT1 (START): {data && data.transducers && data.transducers.thvlt1ad1 && data.transducers.thvlt1ad1.amount} V<br />

PRESSURE: {data && data.transducers && data.transducers.thprsapb0 && data.transducers.thprsapb0.amount} bar<br />
TEMPERATURE: {data && data.transducers && data.transducers.thtmpatc1 && data.transducers.thtmpatc1.amount} C<br />
HUMIDITY: {data && data.transducers && data.transducers.thhmdahp2 && data.transducers.thhmdahp2.amount} % RH<br />
GAS: {data && data.transducers && data.transducers.thgasaxx3 && data.transducers.thgasaxx3.amount} ohms<br />

ACCZ: {data && data.transducers && data.transducers.thacczax2 && data.transducers.thacczax2.amount} ms2<br />


PITCH: {data && data.transducers && data.transducers.thptchad1 && data.transducers.thptchad1.amount} degrees<br />
ROLL: {data && data.transducers && data.transducers.throllad0 && data.transducers.throllad0.amount} degrees<br />
YAW: {data && data.transducers && data.transducers.thyawax2 && data.transducers.thyawax2.amount} <br />

RATE OF TURN: {data && data.transducers && data.transducers.thgyrzax2 && data.transducers.thgyrzax2.amount} <br />
{/*
MRU<br />
ACCZ: {data && data.transducers && data.transducers.thacczax2 && data.transducers.thacczax2.amount} m<br />
ACCZ: {data && data.transducers && data.transducers.thacczax2 && data.transducers.thacczax2.amount} m<br />
ACCZ: {data && data.transducers && data.transducers.thacczax2 && data.transducers.thacczax2.amount} m<br />
*/}
LATITUDE: {data && data.current_latitude}<br />
LONGITUDE: {data && data.current_longitude}<br />

SPEED IN KNOTS: {data && data.speed_in_knots} knots<br />
TRUE COURSE: {data && data.true_course}<br />

NUMBER OF SATELLITES: {data && data.number_of_satellites}<br />


</div>

    </>
  );
}

export default Snapshot;
