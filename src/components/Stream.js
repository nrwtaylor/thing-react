import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

//import { Link } from "react-router-dom";

import useSnapshot from "../useSnapshot.js";

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

import Frequency from "../components/Frequency.js";

import Forget from "../components/Forget.js";
import Trace from "../components/Trace.js";

import { zuluTime, spliceArrayByDate } from "../util/time.js";

import { sortThingsByAt } from "../util/text.js";


import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useSwipeable } from "react-swipeable";

function Stream(props) {
  //const cycleDays = 1;

  const navigate = useNavigate();

  const {
    domain,
    data,
    at,
    quantities,
    quantity,
    period: inputPeriod,
    hide,
    agentInput,
  } = props;

useEffect(() =>{

console.log("Stream domain", domain);

}, [domain]);

  /*
  const {
    snapshot: history,
    flag: historyFlag,
    snapshotRunTime: historyRunTime,
  } = useSnapshot("transducers-thvlt0ax1-500ms", 1000);
*/
  /*
  const {
    snapshot: aa,
    flag: xx,
    snapshotRunTime: yy,
  } = useSnapshot("thvlt0ax1-500ms", 1000);
*/

  /*
useEffect(() =>{

console.log("Stream history", history);

}, [history]);
*/
  const canSwipe = true;

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
    onSwiped: (eventData) => {
      console.log("User Swiped test");
      handleSwipe(eventData);

      console.log("User Swiped!", eventData);
    },
    ...config,
  });

  const [period, setPeriod] = useState();
  var { amount, units } = quantity;

  var { transducer } = props;
  if (transducer && transducer.amount) {
    amount = transducer.amount;
  }

  useEffect(() => {
    if (inputPeriod == null) {
      return;
    }
    console.log("Stream inputPeriod", inputPeriod);
    setPeriod(inputPeriod);
  }, [inputPeriod]);

  useEffect(() => {
    if (agentInput == null) {
      return;
    }

    if (typeof agentInput.period !== "undefined") {
      if (agentInput.period === false) {
        setPeriod(50);
      }
    }
  }, [agentInput]);

  if (transducer && transducer.units && transducer.units !== "X") {
    units = transducer.units;
  }

  const availableWindows = ["", "1m", "2m", "10m", "15m", "30m", "1h"];

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

const [splittingDate, setSplittingDate] = useState();

  const [currentAmount, setCurrentAmount] = useState();

  useInterval(() => {
    // Your custom logic here
    console.log("Stream useInterval period", period);
    getStream();
  }, period);

  const [streamGetTime, setStreamGetTime] = useState();
  const replyAgentDialog = (thing) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSwipe(e) {
    console.log("User Swiped e.dir", e.dir);

    if (e.dir === "Left") {
      const w = windowIndex + 1;
      setWindowIndex(w);

      console.log("User Swiped Left");
      if (props.onChangeStream) {
        props.onChangeStream(w);
      }
    }

    if (e.dir === "Right") {
      console.log("User Swiped  Right");

      const w = windowIndex - 1;
      if (w >= 0) {
        setWindowIndex(w);

        if (props.onChangeStream) {
          props.onChangeStream(w);
        }
      }
    }
  }

  // Put this here for now.
  // Needs proofing

  function generateTimestampFromCurrentTime(amountInMilliseconds) {
    const currentTime = new Date();
    const newTime = new Date(currentTime.getTime() - amountInMilliseconds);

    const year = newTime.getUTCFullYear();
    const month = String(newTime.getUTCMonth() + 1).padStart(2, "0");
    const day = String(newTime.getUTCDate()).padStart(2, "0");
    const hours = String(newTime.getUTCHours()).padStart(2, "0");
    const minutes = String(newTime.getUTCMinutes()).padStart(2, "0");
    const seconds = String(newTime.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(newTime.getUTCMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }

  function useInterval(callback, delay) {
    const savedCallback = React.useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        console.log("Stream tick");
        savedCallback.current();
      }
      if (delay !== null) {
        console.log("Stream delay not null", generateTimestampFromCurrentTime(0));
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
    //console.log("Datagram");
    //console.log(datagram);

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

  const [windowIndex, setWindowIndex] = useState(0);

  const startTime = new Date();
  const [voltPoints, setVoltPoints] = useState([]);
  const [tracePeriod, setTracePeriod] = useState();

  useEffect(() => {
    console.log("Stream init");
  }, []);

  function handleChange(windowIndex, b) {
    console.log("Stream handleChange windowIndex b", windowIndex, b);
  }

  function humanPeriod(p) {
    //if (p>0) {return "1/"+Math.round(p / 1000, 0) + " Hz"}

    //return Math.round(1000 / p, 1) + " Hz";
    return Math.round(p / 1000, 0) + " s";
  }

useEffect(() =>{

if (data == null) {return;}

getStream();

}, [data]);

  function getStream() {
    //console.log("Stream tick");
    const a = amountRef.current;
    //console.log("Stream mountRef.current", a);

    var conditionedAmount = parseFloat(a);

    // console.log("Stream conditionedAmountt", conditionedAmount);
    // Create a new array based on current state:
    console.log("Stream split data", data, data && data.length);

    //const splittingDate = "2023-08-15T18:00:00.000Z"; // Example splitting date

//    const splittingDate = generateTimestampFromCurrentTime(period);
console.log("Stream split period", period);
//    const splittingDate = generateTimestampFromCurrentTime(1000 * 60);

const splitPeriod = period;
    const tempSplittingDate = generateTimestampFromCurrentTime(splitPeriod);
setSplittingDate(tempSplittingDate);

//    let knownStreamPoints = sortThingsByAt([...data, ...streamPoints]);
//
let knownStreamPoints = data;

    const [beforeSplitting, afterSplitting] = spliceArrayByDate(
      knownStreamPoints,
      tempSplittingDate
    );

    console.log("Stream split splittingDate", splittingDate);
    console.log("Stream split Before Splitting:", beforeSplitting);
    console.log("Stream split After Splitting:", afterSplitting);

    //let s = [...streamPoints];
// HERE

    //let s = afterSplitting;sortThingsByAt([...data, ...streamPoints]);
let s = knownStreamPoints;
///let s = afterSplitting;

    const amounts = [];
    if (quantities) {
      quantities.map((quantity) => {
        const amount = parseFloat(quantity.amount);
        amounts.push(amount);
      });
      conditionedAmount = amounts[1];
    }
    var atTemp = at;
    if (atTemp === undefined) {
      atTemp = zuluTime();
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
      amounts: amounts,
      at: atTemp,
    });

    const maxStreamPoints = 100;

    const excessPoints = s.length - maxStreamPoints;

    if (excessPoints >= 0) {
      const a = (streamPointer + 1) % maxStreamPoints;

      setStreamPointer(a);

      //f.splice(0, excessPoints);
      s.shift();
    }

    //console.log("Stream f", s);
    // Set state

const sortedS = sortThingsByAt(s);

    setStreamPoints(sortedS);
  }

  useEffect(() => {
    // console.log("Stream amount", amount);

    const startTime = new Date();
    const d = startTime - refreshedAt;
    setRefreshedAt(startTime);

    var conditionedAmount = parseFloat(amount);
console.log("Stream data", data);
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
      amounts: amounts,
    });

    const maxAmpPoints = 100;

    const excessPoints = f.length - maxAmpPoints;

    if (excessPoints >= 0) {
      const a = (dataPointer + 1) % maxAmpPoints;

      setDataPointer(a);
      f.shift();
    }

    setDataPoints(f);

    //////////

    const endTime = new Date();
    const tf = endTime - startTime;
    const timeDiff = tf;
    setTracePeriod(d);
  }, [data, amount]);

  function callBack() {
    console.log("Strean callBack called.");
  }

  const deleteButton = (
    <Forget uuid={thing && thing.uuid} callBack={callBack} />
  );

  return (
    <>
<div>
STREAM
</div>
      <div {...handlers}>
HANDLERS<br />
SPLITTING DATE{' '}{splittingDate}<br />
AVAILABLE WINDOWS{' '}        {availableWindows[windowIndex]}
<br />
      {/*  {period && hide && ( */}
PERIOD{' '}{period}
<br />
STREAM POINTS {streamPoints && streamPoints.length}
<br />
{period && (
          <>
            PERIOD {period} <Trace period={period} timeType={'continuum'} data={streamPoints} domain={props.domain} />
            <br />
AAA
<br />
            <Typography>
              Period {humanPeriod(period)}{" "}
              <Frequency frequency={1000 / period} /> requested{" "}
              <Frequency frequency={1000 / tracePeriod} /> observed
            </Typography>
          </>
        )}

        {period === undefined && hide && (
          <>
            PERIOD UNDEFINED
<br />
BBB
<br />   
         <Trace data={dataPoints} domain={props.domain} />
            <br />
            <Typography>
              Period {humanPeriod(tracePeriod)}{" "}
              <Frequency frequency={1000 / tracePeriod} />
            </Typography>
          </>
        )}
CCC
        {hide && (
          <>
DDD
            amount {amount} {units}
            <br />
            {transducer && (
              <div
                onClick={() =>
                  navigate("/" + "history/transducers-" + transducer.sensor_id)
                }
              >
                transducer-{transducer && transducer.sensor_id}
              </div>
            )}
            <br />
          </>
        )}

{!hide && (<>Hidden</>)}
      </div>
    </>
  );
}

export default Stream;
