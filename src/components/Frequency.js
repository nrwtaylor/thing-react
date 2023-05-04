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

function Frequency(props) {
  const { frequency } = props;
  const user_name = props.user_name; // TODO
  const agent_input = props.agent_input;
  const webPrefix = agent_input;
  const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");

const period = 1 / frequency;

const frequencyRef = React.createRef();
frequencyRef.current = frequency;

  const thing = props.thing;

  const [open, setOpen] = useState(false);

  const [currentAmount, setCurrentAmount] = useState();

  useInterval(() => {
    // Your custom logic here
getStream();  
}, period);

  const [streamGetTime, setStreamGetTime] = useState();
  const replyAgentDialog = (thing) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    function useInterval(callback, delay) {
        const savedCallback = React.useRef();
      
        // Remember the latest function.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

  //useEffect(()=>{

  //getAgent();

  //},[]);
/*
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
//getStream();
    const interval = setInterval(() => {
  //    getStream();
    }, 50); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, []);
*/
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
  }

  const [streamPointer, setStreamPointer] = useState(0);
  const [streamPoints, setStreamPoints] = useState([]);

  const [dataPointer, setDataPointer] = useState(0);
  const [dataPoints, setDataPoints] = useState([]);

  const startTime = new Date();
  const [voltPoints, setVoltPoints] = useState([]);
  const [tracePeriod, setTracePeriod] = useState();


function humanFrequency(p) {

if (p<1) {return "1/"+Math.round(1/p, 0) + " Hz"}

return Math.round(p, 1) + " Hz";


}


function humanPeriod(p) {

if (p>0) {return "1/"+Math.round(p / 1000, 0) + " Hz"}

return Math.round(1000 / p, 1) + " Hz";


}

  function getStream() {

//console.log("Stream tick");
const a = frequencyRef.current;
    console.log("Stream mountRef.current", a);


    const conditionedAmount = parseFloat(a);
    console.log("Stream conditionedAmountt", conditionedAmount);
    // Create a new array based on current state:
    let s = [...streamPoints];

    // Add item to it
    s.push({
      name: "asdf",
      student: 24,
      fees: 1,
      value: conditionedAmount,
      amount: conditionedAmount,
    });

    const maxStreamPoints = 100;

    const excessPoints = s.length - maxStreamPoints;

    if (excessPoints >= 0) {
      const a = (streamPointer + 1) % maxStreamPoints;

      setStreamPointer(a);

      //f.splice(0, excessPoints);
      s.shift();
    }

    console.log("Stream f", s);
    // Set state

    setStreamPoints(s);

    //////////

//    const endTime = new Date();
//    const tf = endTime - startTime;
//    const timeDiff = tf;
//    setTracePeriod(timeDiff);
  }

  useEffect(() => {
    console.log("Stream start");
  }, []);

  useEffect(() => {
    console.log("Stream amount", frequency);
/* 
   if (amount === undefined) {
      return;
    }

if (isNaN(amount)) {return;}
*/
    //getStream();

    //getStream(amount);
    //return
    //}, [amount]);

    //function getStream() {
    const startTime = new Date();

    const amount = parseFloat(frequency);

    // Create a new array based on current state:
    let f = [...dataPoints];

    // Add item to it
    f.push({
      name: "asdf",
      student: 24,
      fees: 1,
      value: amount,
      amount: amount,
    });

    const maxAmpPoints = 100;

    const excessPoints = f.length - maxAmpPoints;

    if (excessPoints >= 0) {
      const a = (dataPointer + 1) % maxAmpPoints;

      setDataPointer(a);

      //f.splice(0, excessPoints);
      f.shift();
    }

    //console.log(f);
    // Set state

    setDataPoints(f);

    //////////

    const endTime = new Date();
    const tf = endTime - startTime;
    const timeDiff = tf;
    setTracePeriod(timeDiff);
    //  }
  }, [frequency]);

  function callBack() {
    console.log("Agent callBack called.");
  }

  const deleteButton = (
    <Forget uuid={thing && thing.uuid} callBack={callBack} />
  );

  return (
    <>
{frequency && (<> 
{humanFrequency(frequency)}
</>)}

{frequency === undefined && (<>
UNDEFINED
</>)}
    </>
  );
}

export default Frequency;
