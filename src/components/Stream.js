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

import Frequency from "../components/Frequency.js";

import Forget from "../components/Forget.js";
import Trace from "../components/Trace.js";

function Stream(props) {
  const { quantities, quantity, period, hide } = props;

  const { amount, units } = quantity;

  const user_name = props.user_name; // TODO
  const agent_input = props.agent_input;
  const webPrefix = agent_input;
  const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");

  const [refreshedAt, setRefreshedAt] = useState();

  const amountRef = React.createRef();
  amountRef.current = amount;

  const thing = props.thing;

  const [open, setOpen] = useState(false);

  const [currentAmount, setCurrentAmount] = useState();

  useInterval(() => {
    // Your custom logic here
    console.log("Stream useInterval amount", amount);
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

  function humanPeriod(p) {
    //if (p>0) {return "1/"+Math.round(p / 1000, 0) + " Hz"}

    //return Math.round(1000 / p, 1) + " Hz";
    return Math.round(p / 1000, 0) + " s";
  }

  function getStream() {
    //console.log("Stream tick");
    const a = amountRef.current;
    console.log("Stream mountRef.current", a);

    var conditionedAmount = parseFloat(a);

    console.log("Stream conditionedAmountt", conditionedAmount);
    // Create a new array based on current state:
    let s = [...streamPoints];
    const amounts = [];
    if (quantities) {
      quantities.map((quantity) => {
        const amount = parseFloat(quantity.amount);
        amounts.push(amount);
      });
      conditionedAmount = amounts[1];
    }

    // Add item to it
    s.push({
      name: "asdf",
      student: 24,
      fees: 1,
      value: conditionedAmount,
      amount: conditionedAmount,
      amount2: amounts && amounts[0],
      amount3: amounts && amounts[2],
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
    console.log("Stream amount", amount);
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
    const d = startTime - refreshedAt;
    setRefreshedAt(startTime);

    var conditionedAmount = parseFloat(amount);

    // Create a new array based on current state:
    let f = [...dataPoints];




    const amounts = [];
    if (quantities) {
      quantities.map((quantity) => {
        const amount = parseFloat(quantity.amount);
        amounts.push(amount);
      });
      conditionedAmount = amounts[0];
    }

    // Add item to it
    f.push({
      name: "asdf",
      student: 24,
      fees: 1,
      value: conditionedAmount,
      amount: conditionedAmount,
      amount2: amounts && amounts[1],
      amount3: amounts && amounts[2],
    });







    // Add item to it
/*
    f.push({
      name: "asdf",
      student: 24,
      fees: 1,
      value: conditionedAmount,
      amount: conditionedAmount,
    });
*/
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
    //setTracePeriod(timeDiff);
    setTracePeriod(d);
    //  }
  }, [amount]);

  function callBack() {
    console.log("Agent callBack called.");
  }

  const deleteButton = (
    <Forget uuid={thing && thing.uuid} callBack={callBack} />
  );

  return (
    <>
      <div>
        {period && hide && (
          <>
            {" "}
            <Trace data={streamPoints} domain={props.domain} />
            <br />
            Period {humanPeriod(period)}
            <Typography>
              <Frequency frequency={1000 / period} /> requested
            </Typography>
            <Typography>
              <Frequency frequency={1000 / tracePeriod} /> observed
            </Typography>
          </>
        )}

        {period === undefined && hide && (
          <>
            <Trace data={dataPoints} domain={props.domain} />
            <br />
            <Typography>Period {humanPeriod(tracePeriod)}</Typography>
            <Typography>
              <Frequency frequency={1000 / tracePeriod} />
            </Typography>
          </>
        )}

        {hide && (
          <>
            amount {amount} {units}
            <br />
            pointer {dataPointer}
            <br />
          </>
        )}
      </div>
    </>
  );
}

export default Stream;
