import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "../index.css";
import {
  Typography,
  //  Avatar,
  //  ListItemAvatar,
  Box,
} from "@material-ui/core";

import {
  //  Button,
  TextField,
  //  IconButton,
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
import Button from "../components/Button.js";

//import { getSnapshot } from "../util/database.js";

import {
  zuluTimeDifferenceMilliseconds,
  zuluTime,
  humanRuntime,
} from "../util/time.js";
import { extractUuid, parsePing, prefixText } from "../util/text.js";

import useSnapshot from "../useSnapshot";
import useThingReport from "../useThingReport";

import { useSwipeable } from "react-swipeable";

//import { useSwipeable } from "react-swipeable";

//const webPrefix = process.env.REACT_APP_WEB_PREFIX;

function History(props) {
  const navigate = useNavigate();

  const { datagram } = props;

  const { showLive } = props;

  const { subject } = datagram;

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
useEffect(() =>{

console.log("History datagram", datagram);

}, [datagram]);

  useEffect(() => {
    if (subject == null) {
      return;
    }
    console.debug("History subject", subject);
    const r = subject
      .replace("transducers-", "")
      .replace("history-", "")
      .replace("history ", "")
      .replace("-10m", "")
      .replace("-1h", "")
      .replace("-2m", "");

    setRef(r);

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
    setText(subjectTokens[subjectTokens.length - 2]);
  }, [subject]);

  const user_name = props.user_name; // TODO
  const agent_input = props.agent_input;
  const webPrefix =
    agent_input === undefined ? process.env.REACT_APP_WEB_PREFIX : agent_input;

  //  const webPrefix =
  //    process.env.REACT_APP_WEB_PREFIX;

  const [snapshotTo, setSnapshotTo] = useState();
  const [historyTo, setHistoryTo] = useState();
  //const to = webPrefix + "/snapshot/" + history.uuid + "/hey.json";

  //const historyTo = webPrefix + "history/" + historyRef + ".json";

  var snapshotInterval = 1000;
  if (showLive === false) {
    snapshotInterval = true;
  }

  const {
    snapshot: data,
    flag: snapshotFlag,
    snapshotRunTime: snapshotRunTime,
    snapshotRunAt
  } = useSnapshot(snapshotTo, snapshotInterval);

  const {
    thingReport,
    flag: thingReportFlag,
//    thingReportGetTime: thingReportGetTime,
  } = useThingReport(snapshotTo, snapshotInterval);

  const {
    snapshot: history,
    flag: historyFlag,
    snapshotRunTime: historyRunTime,
  } = useSnapshot(historyTo, 60000);

  useEffect(() => {
    console.debug("History thingReport", thingReport);
  }, [thingReport]);

  useEffect(() => {
    console.debug("History snapshotTo historyTo", snapshotTo, historyTo);
  }, [snapshotTo, historyTo]);

  useEffect(() => {
    // Extract uuid from datagram.
    // To provide access to the snapshot.
    // Consider: Can refactor this code into useSnapshot().
    console.debug("History datagram", snapshotTo, datagram.subject);
    const uuid = extractUuid(datagram.subject);
    const to = webPrefix + "/snapshot/" + uuid + "/hey.json";
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
  //  const [snapshotInterval, setSnapshotInterval] = useState(50);
  /*
  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });
*/
  //  const [data, setData] = useState([]);
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

    //setSnapshotTo(webPrefix + "/snapshot/" + history.uuid + "/hey.json");

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
      if (props.onChangeStream) {
        props.onChangeStream(w);
      }
    }

    if (e.dir === "Right") {
      console.debug("User Swiped  Right");

      const w = windowIndex - 1;
      if (w >= 0) {
        setWindowIndex(w);

        if (props.onChangeStream) {
          props.onChangeStream(w);
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
      <div>HISTORY</div>
{snapshotRunAt}
<br/>
      {historyFlag}
      <br />
      {snapshotFlag}
      <br />
      {thingReportFlag}
      <br />
      TEXT {thingReport && thingReport.text}
      <br />
      {text} {resolution}
      <br />
      {data && data.thingReport && data.thingReport.text}
      {false && <>SUBJECT {subject}</>}
      <Button
        thing={{
          subject: prefixText(subject, ""),
          agentInput: "Go To History",
        }}
      >
        {subject}
      </Button>
      <br />
      {false && (
        <>
          REF {ref}
          <br />
          HISTORYREF {historyRef}
          <br />
          HISTORYTO {historyTo}
          <br />
        </>
      )}
      SNAPSHOT INTERVAL {snapshotInterval}
      <Trace data={tracePoints} cycle={1} />
      <Trace data={historyPoints} cycle={1} />
      <br />
      {data &&
        data.transducers &&
        data.transducers[ref] &&
        data.transducers[ref].amount &&
        showLive && (
          <Stream
            hide={true}
            period={1000}
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
