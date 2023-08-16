import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { findUUIDPositions, isValidUUID } from "../util/uuid.js";
import { findTokenPositions } from "../util/token.js";
import { findTextPositions } from "../util/text.js";

import "../index.css";

import { makeStyles } from "@mui/styles";

import {
  Typography,
  //  Avatar,
  //  ListItemAvatar,
  Box,
} from "@mui/material";

import {
  //  Button,
  TextField,
  //  IconButton,
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
import TraceCircle from "../components/TraceCircle.js";
import Stream from "../components/Stream.js";
import BubbleLevel from "../components/BubbleLevel.js";
import Inclinometer from "../components/Inclinometer.js";

import Magnetometer from "../components/Magnetometer.js";

import MotionReference from "../components/MotionReference.js";

import Ping from "../components/Ping.js";
import Button from "../components/Button.js";

//import { getSnapshot } from "../util/database.js";

import {
  zuluTimeDifferenceMilliseconds,
  zuluTime,
  humanRuntime,
  convertFromMilliseconds,
  convertToMilliseconds,
} from "../util/time.js";
import { extractUuid, parsePing, prefixText } from "../util/text.js";

import useSnapshot from "../useSnapshot.js";
import useThingReport from "../useThingReport.js";

import { useSwipeable } from "react-swipeable";

//import { devFlag, debugFlag } from "../util/dev.js";
import { devFlag } from "../util/dev.js";


import { useTheme } from "@mui/material/styles";


const debugFlag = true;



// Refactor to pass this in thing as variables.
const engineState = process.env.REACT_APP_ENGINE_STATE;

function History({ thing, agentInput }) {
  const navigate = useNavigate();

  //const {agentInput} = props;

  //const { datagram } = props;
  const datagram = thing;
  //  const { showLive } = props;
  const showLive = true;

  const [subject, setSubject] = useState();

  const [windowIndex, setWindowIndex] = useState();
  const [tracePoints, setTracePoints] = useState([]);

  const [ref, setRef] = useState();
  const [historyRef, setHistoryRef] = useState();
  const [text, setText] = useState();
  const [resolution, setResolution] = useState();
  /*
  const ref = subject
    .replace("transducers-", "")
    .replace("history-", "")
    .replace("history ", "")
    .replace("-10m", "")
    .replace("-1h", "")
    .replace("-2m", "");

  const historyRef = subject
    .replace("history/", "")
    .replace("history-", "")
    .replace("history ", "");
*/
  useEffect(() => {
    if (datagram == null) {
      return;
    }

    if (datagram.subject) {
      setSubject(datagram.subject);
    }

    console.log("History datagram", datagram);
  }, [datagram]);

  useEffect(() => {
    if (subject == null) {
      return;
    }

    console.debug("History subject", subject);
    var tempR = subject
      .replace("transducers-", "")
      .replace("history/", "")
      .replace("history-", "")
      .replace("history ", "");
    //      .replace("-10m", "")
    //      .replace("-1h", "")
    //      .replace("-2m", "");

    const r = tempR;
    //console.log("History tempR", tempR);
    const i = tempR.split("-");
    console.log("History tempR i", tempR, i);

    var textInterval = true;
    if (i.length === 2) {
      textInterval = i[1];
    }

    if (textInterval !== true) {
      tempR = tempR.replace("-" + textInterval, "");
    }

    console.log("History tempR textInterval", tempR, textInterval);

    const maxInterval = 1000;

    //if (interval > 1000) {textInterval = maxInterval;}

    try {
      var interval = true;
      // Convert ms s and minutes and hours to milliseconds

      interval = convertToMilliseconds(textInterval);
setPeriod(interval);
      //if (interval > 1000) {
      //  interval = 1000;
      //}
    } catch (error) {
      console.error("History convertToMilliseconds", error);
      interval = 1000;
    }

    setSnapshotInterval(interval);

    console.log("History interval", tempR, textInterval, interval);

    // setRef(r);

    setRef(tempR);

    const hr = subject
      .replace("history/", "")
      .replace("history-", "")
      .replace("history ", "");

    setHistoryRef(hr);

    if (hr == null) {
      return;
    }
    setHistoryTo(webPrefix + "history/" + hr + ".json");

    console.debug("History subject", subject);
    const subjectTokens = subject.split("-");
    console.debug("History parts", subjectTokens[subjectTokens.length - 1]);

    setResolution(subjectTokens[subjectTokens.length - 1]);

    const tokenPositions = findTokenPositions(subjectTokens, "snapshot");

    console.log("History tokenPositions", subjectTokens, tokenPositions);

    if (tokenPositions.length === 1) {
      const startIndex = tokenPositions[0];
      const t = subjectTokens.slice(startIndex + 1, subjectTokens.length - 1);
      const f = t.join(" ");
      setText(f);
      // setText(subjectTokens[tokenPositions[0]]]);

      return;
    }

    setText(subjectTokens[subjectTokens.length - 2]);
  }, [subject]);

  //const user_name = props.user_name; // TODO
  //const agent_input = props.agent_input;
  //  const webPrefix =
  //    agentInput.web && agentInput.web.webPrefix == null ? process.env.REACT_APP_WEB_PREFIX : agentInput.web.webPrefix;

  const webPrefix = process.env.REACT_APP_WEB_PREFIX;

  const [snapshotTo, setSnapshotTo] = useState();
  const [historyTo, setHistoryTo] = useState();
  //  const [snapshotInterval, setSnapshotInterval] = useState(showLive === false ? true : 1000);

  const [snapshotInterval, setSnapshotInterval] = useState();

  const [period, setPeriod] = useState();


  //  var snapshotInterval = 1000;
  /*
  if (showLive === false) {
//    snapshotInterval = true;
setSnapshotInterval(true);
  }
*/
  /*
  const {
    snapshot: data,
    flag: snapshotFlag,
    snapshotRunTime: snapshotRunTime,
    snapshotRunAt,
  } = useSnapshot(snapshotTo, snapshotInterval);

  const {
    thingReport,
    flag: thingReportFlag,
    //    thingReportGetTime: thingReportGetTime,
  } = useThingReport(snapshotTo, snapshotInterval);
*/
  const {
    snapshot: data,
    flag: snapshotFlag,
    snapshotRunTime: snapshotRunTime,
    snapshotRunAt,
  } = useSnapshot(snapshotTo, 1000);

  const {
    thingReport,
    flag: thingReportFlag,
    //    thingReportGetTime: thingReportGetTime,
  } = useThingReport(snapshotTo, 1000);

  const {
    snapshot: history,
    flag: historyFlag,
    snapshotRunTime: historyRunTime,
  } = useSnapshot(historyTo, 1000);

  const x = snapshotInterval / 1000 < 500 ? 500 : snapshotInterval/1000;
  const y = convertFromMilliseconds(x);
  console.log("History y", snapshotInterval, y);

  const periodTo = historyTo;

  const {
    snapshot: periodHistory,
    flag: periodFlag,
    snapshotRunTime: periodRunTime,
  } = useSnapshot(periodTo, 1000);

  /*
  const {
    snapshot: history,
    flag: historyFlag,
    snapshotRunTime: historyRunTime,
  } = useSnapshot(historyTo, snapshotInterval);
*/
  useEffect(() => {
    console.debug("History thingReport", thingReport);
  }, [thingReport]);

  useEffect(() => {
    console.debug("History snapshotTo historyTo", snapshotTo, historyTo);
  }, [snapshotTo, historyTo]);

  useEffect(() => {
    if (datagram == null) {
      return;
    }
    // Extract uuid from datagram.
    // To provide access to the snapshot.
    // Consider: Can refactor this code into useSnapshot().
    console.debug("History datagram", snapshotTo, datagram.subject);
    const uuid = extractUuid(datagram.subject);

    var to = webPrefix + "/snapshot/" + uuid + "/hey.json";
    if (uuid === false) {
      to = webPrefix + "/snapshot.json";
    }

    setSnapshotTo(to);
  }, [datagram]);

  const [flag, setFlag] = useState();
  const [historyPoints, setHistoryPoints] = useState([]);

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
      console.debug("User Swiped test");
      handleSwipe(eventData);

      console.debug("User Swiped!", eventData);
    },
    ...config,
  });

  const availableWindows = ["", "1m", "2m", "10m", "15m", "30m", "1h"];

  const [reply, setReply] = useState("");

  const [open, setOpen] = useState(false);

  const replyAgentDialog = (thing) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.debug("History data", snapshotTo, data);
  }, [data]);

  useEffect(() => {
    if (history == null) {
      return;
    }
    console.debug(
      "History history",
      history && history.thingReport && history.thingReport.history
    );

    var hist = false;

    if (history.agent_input) {
      if (Array.isArray(history.agent_input)) {
        console.debug("History set history from history.agent_input");
        hist = history.agent_input;
      }
    }

    if (history.thingReport && history.thingReport.history) {
      console.debug("History set history from history.thingReport.history");
      hist = history.thingReport.history;
    }

    if (hist === false) {
      return;
    }

    console.debug("History hist", hist);
    //    const hist = history.agent_input;
    const p = hist.map((h) => {
      var amount = null;

      if (typeof h.event === "string" || h.event instanceof String) {
        amount = parseFloat(h.event);
      }

      if (h.event.amount) {
        amount = parseFloat(h.event.amount);
      }

      if (h.event.data) {
        const pingArray = parsePing(h.event.data);

        const f = {
          name: pingArray.host,
          student: 24,
          fees: 1,
          value: pingArray.amount,
          amount: pingArray.amount,
          amount2: pingArray.amount2,
          amount3: pingArray.amount3,
          at: h.eventAt,
        };

        return f;
      }

      // Add item to it
      const f = {
        name: "asdf",
        student: 24,
        fees: 1,
        value: amount,
        amount: amount,
        amount2: amount,
        amount3: amount,
        at: h.eventAt,
      };

      return f;
    });
    setHistoryPoints(p);
  }, [history]);

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
    console.debug("Agent callBack called.");
  }

  function handleSwipe(e) {
    console.debug("User Swiped e.dir", e.dir);

    if (e.dir === "Left") {
      const w = windowIndex + 1;
      setWindowIndex(w);

      console.debug("User Swiped Left");
      if (thingReport) {
        thingReport(w);
      }
    }

    if (e.dir === "Right") {
      console.debug("User Swiped  Right");

      const w = windowIndex - 1;
      if (w >= 0) {
        setWindowIndex(w);

        if (thingReport) {
          thingReport(w);
        }
      }
    }
  }

  useEffect(() => {
    // Bin history points in to cycle.
    const cycleMilliseconds = 1000 * 24 * 60 * 60;

    var cycleStartDate = new Date();
    cycleStartDate.setHours(24, 0, 0, 0);

    // Set to midnight local time.

    const cycleRunAt = zuluTime(cycleStartDate);
    console.debug("History cycleRunAt", cycleRunAt);
    const cycleStartMilliseconds = cycleStartDate.getTime();

    const cyclePoints = historyPoints.map((historyPoint) => {
      var cyclePoint = {};
      const ageMilliseconds = zuluTimeDifferenceMilliseconds(
        historyPoint.at,
        cycleRunAt
      );

      const cycleIndex = Math.floor(ageMilliseconds / cycleMilliseconds);

      const key = cycleIndex === 0 ? "amount" : "amount" + cycleIndex;
      cyclePoint[key] = historyPoint.amount;

      const cycleAgeMilliseconds =
        ageMilliseconds - cycleIndex * cycleMilliseconds;

      const x = cycleStartMilliseconds - cycleAgeMilliseconds;

      const at = zuluTime(new Date(x));

      cyclePoint["at"] = at;
      return cyclePoint;
    });

    setTracePoints(cyclePoints);
  }, [historyPoints]);

  const deleteButton = (
    <Forget uuid={datagram && datagram.uuid} callBack={callBack} />
  );

  return (
    <>
      {debugFlag && (
        <>
          DEV
          {thing &&
            thing.variables &&
            thing.variables.flag &&
            thing.variables.flag.dev}
        </>
      )}
PERIOD{' '}
{period}
<br />
      {debugFlag && <div>HISTORY</div>}
      {snapshotRunAt}
      <br />
      {debugFlag && (
        <>
          {historyFlag}
          <br />
          {snapshotFlag}
          <br />
          {thingReportFlag}
          <br />
        </>
      )}
      {debugFlag && <>TEXT {thingReport && thingReport.text}</>}
      <br />
      {text} {resolution}
      <br />
      {data && data.thingReport && data.thingReport.text}
      {false && <>SUBJECT {subject}</>}
      <Button
        variant="url"
        thing={{
          subject: prefixText(subject, ""),
          agentInput: "Go To History",
        }}
      >
        {subject}
      </Button>
      <br />
      {debugFlag && (
        <>
          REF {ref}
          <br />
          HISTORYREF {historyRef}
          <br />
          HISTORYTO {historyTo}
          <br />
          SNAPSHOTTO {snapshotTo}
          <br />
        </>
      )}
      {debugFlag && <>SNAPSHOT INTERVAL {snapshotInterval}</>}
      <TraceCircle data={tracePoints} cycle={1} />
      <Trace data={tracePoints} cycle={1} />
      <Trace data={historyPoints} cycle={1} />
      <br />
      HEY
      {data &&
        data.transducers &&
        data.transducers[ref] &&
        data.transducers[ref].amount &&
        showLive && (
          <Stream
            hide={true}
            period={snapshotInterval}
            data={historyPoints} // Use this as it should be a singular array of time points
            quantity={{
              units: "A",
              amount:
                data &&
                data.transducers &&
                data.transducers[ref] &&
                data.transducers[ref].amount,
            }}
            //             transducer={data && data.transducers && data.transducers[ref]}
            //              period={100}
            //              domain={[-50, 50]}
          />
        )}
      {false && (
        <>
          <br />
          <div>SUBJECT {subject}</div>
          <div>
            FLAG {flag} COLOUR
            <br />
          </div>
        </>
      )}
      <div>
        SNAPSHOT GET TIME {snapshotRunTime}ms{" "}
        {Math.round(1000 / snapshotRunTime, 1)}Hz
        <br />
        HISTORY GET TIME {historyRunTime}ms{" "}
        {Math.round(1000 / historyRunTime, 1)}Hz
      </div>
    </>
  );
}

export default History;
