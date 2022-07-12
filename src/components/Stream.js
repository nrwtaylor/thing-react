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

function Stream(props) {
  const { data } = props;
  const user_name = props.user_name; // TODO
  const agent_input = props.agent_input;
  const webPrefix = agent_input;
  const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");

  const thing = props.thing;

  // const [data, setData] = useState({
  //   thing: { uuid: "X" },
  //   thing_report: { sms: "No response. Yet." },
  // });

  /*
  useEffect(() => {
    setFlag("green");

//    getAgent();
  }, [getAgent]); // eslint-disable-line react-hooks/exhaustive-deps
*/
  const [open, setOpen] = useState(false);

  const [streamGetTime, setStreamGetTime] = useState();
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
      getStream();
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
  function getStream(agent) {
    // No function data is a props.
  }

  const [ampDataPointer, setAmpDataPointer] = useState(0);
  const [ampPoints, setAmpPoints] = useState([]);
  const startTime = new Date();
  const [voltPoints, setVoltPoints] = useState([]);
  const [tracePeriod, setTracePeriod] = useState();

  useEffect(() => {
    const startTime = new Date();

    //console.log(data && data.transducers && data.transducers.thaccxad0);

    console.log(
      data &&
        data.transducers &&
        data.transducers.thamp0ad0 &&
        data.transducers.thamp0ad0.amount
    );

    const amount = parseInt(
      data &&
        data.transducers &&
        data.transducers.thamp0ad0 &&
        data.transducers.thamp0ad0.amount
    );
    console.log("amount", amount);

    // Create a new array based on current state:
    let f = [...ampPoints];

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
      const a = (ampDataPointer + 1) % maxAmpPoints;

      setAmpDataPointer(a);

      //f.splice(0, excessPoints);
      f.shift();
    }

    //console.log(f);
    // Set state

    setAmpPoints(f);

    //////////

    const voltAmount = parseInt(
      data &&
        data.transducers &&
        data.transducers.thvlt0ad1 &&
        data.transducers.thvlt0ad1.amount
    );
    //console.log("voltAmount", voltAmount);
    // Create a new array based on current state:
    let g = [...voltPoints];

    g.push({
      name: "volt",
      student: 24,
      fees: 1,
      value: amount,
      amount: voltAmount,
    });

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

  const deleteButton = (
    <Forget uuid={thing && thing.uuid} callBack={callBack} />
  );

  return (
    <>
      <div>STREAM</div>
      <div>
        FLAG {flag} COLOUR
        <br />
        GET TIME {streamGetTime}ms {Math.round(1000 / streamGetTime, 1)}Hz
        <br />
        <Trace data={data} />
        <br />
        AMP0:{" "}
        {data &&
          data.transducers &&
          data.transducers.thamp0ad0 &&
          data.transducers.thamp0ad0.amount}{" "}
        A<br />
        <br />
        pointer {ampDataPointer}
        <br />
        Process Amp Trace Period {tracePeriod}ms
        <br />
        <br />
      </div>
    </>
  );
}

export default Stream;
