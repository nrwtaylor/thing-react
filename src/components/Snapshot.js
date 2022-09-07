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
import Magnetometer from "../components/Magnetometer.js";

import Ping from "../components/Ping.js";
import { getSnapshot } from "../util/database.js";

function Snapshot(props) {
  const { datagram } = props;
  const { to } = datagram;

  const user_name = props.user_name; // TODO
  const agent_input = props.agent_input;
  const webPrefix = agent_input;
  const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");
  const [snapshotInterval, setSnapshotInterval] = useState(50);

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  const [open, setOpen] = useState(false);

  const [snapshotGetTime, setSnapshotGetTime] = useState();
  const replyAgentDialog = (thing) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getSnapshot2();

    const interval = setInterval(() => {
      getSnapshot2();
    }, snapshotInterval); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, []);

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

  function getSnapshot2(agent) {
    const startTime = new Date();
    if (flag === "red") {
      return;
    }
    // setFlag("red");
    console.log("Snapshot getSnapshot call " + agent);
    //    const webPrefix = process.env.REACT_APP_WEB_PREFIX
    //setRequestedAt(Date.now());
    console.log("Snapshot getSnapshot to", to);
//    const url = "http://192.168.10.10/snapshot.json";

const url = to;
//console.log("Snapshot getSnapshot datagram", datagram);
    return getSnapshot(url, "")
      .then((result) => {
        //getSnapshot(webPrefix,"").then((result)=>{

        console.log("Snapshot getSnapshot result", result);

        if (!result) {return true;}

        if (result && result.thingReport === false) {
          // No thing report. Do not update snapshot.
          return false;
        }

        if (result && result.thingReport && result.thingReport.snapshot) {
          setData(result.thingReport.snapshot);
        } else {
          // Failback situation where thingReport format not found.
          setData(result);
        }
        // dev flag available not available
        setFlag("green");
        const endTime = new Date();
        setSnapshotGetTime(endTime - startTime);
        return result;
      })
      .catch((error) => {
        console.error("Snapshot getSnapshot error", error);
        return error;
      });
    /*
    axios
      .get(url)
      .then((res) => {
        console.log("Got " + url);
        //console.log("snapshot", res);
        let thingy = res.data;
        console.log("Snapshot res.data", res.data);
if (res && res.data && res.data.thingReport && res.data.thingReport.snapshot) {
setData(res.data.thingReport.snapshot);
} else {
      setData(res.data);

}
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
*/
  }

  const [ampDataPointer, setAmpDataPointer] = useState(0);
  const [ampPoints, setAmpPoints] = useState([]);
  const startTime = new Date();
  const [voltPoints, setVoltPoints] = useState([]);
  const [tracePeriod, setTracePeriod] = useState();

  function callBack() {
    console.log("Agent callBack called.");
  }

  const deleteButton = (
    <Forget uuid={datagram && datagram.uuid} callBack={callBack} />
  );

  return (
    <>
      <div>SNAPSHOT</div>
      <div>URL {webPrefix}.snapshot.json</div>
      <div>
        FLAG {flag} COLOUR
        <br />
        GET TIME {snapshotGetTime}ms {Math.round(1000 / snapshotGetTime, 1)}Hz
        <br />
        {data && data.ping && (
          <>
            PING
            <br />
          </>
        )}
        {data && data.ping && <Ping ping={data.ping} />}
        {data &&
          data.ping &&
          data.ping.map((ping, index) => {
            return (
              <>
                {ping.host}
                <br />
                {ping.data}
                <br />
                {ping.refreshedAt}
                <br />
              </>
            );
          })}
        {data && data.transducers && (
          <>
            AMP0:{" "}
            {data &&
              data.transducers &&
              data.transducers.thamp0ad0 &&
              data.transducers.thamp0ad0.amount}{" "}
            A<br />
            {/*     <Trace data={ampPoints} />
        <br />
*/}
            <br />
            <Stream
              hide={false}
              quantity={{
                units: "A",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thamp0ad0 &&
                  data.transducers.thamp0ad0.amount,
              }}
            />
            <br />
            <Stream
              hide={true}
              quantity={{
                units: "A",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thamp0ad0 &&
                  data.transducers.thamp0ad0.amount,
              }}
              period={100}
            />
            <br />
            <Stream
              hide={false}
              quantity={{
                units: "A",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thamp0ad0 &&
                  data.transducers.thamp0ad0.amount,
              }}
              period={5 * 1000}
            />
            <br />
            <Stream
              hide={false}
              quantity={{
                units: "A",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thamp0ad0 &&
                  data.transducers.thamp0ad0.amount,
              }}
              period={1 * 60 * 1000}
            />
            <br />
            VLT0 (HOUSE):{" "}
            {data &&
              data.transducers &&
              data.transducers.thvlt0ad1 &&
              data.transducers.thvlt0ad1.amount}{" "}
            V<br />
            <br />
            {/*     <Trace data={voltPoints} /> */}
            <Stream
              hide={true}
              quantity={{
                units: "V",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thvlt0ad1 &&
                  data.transducers.thvlt0ad1.amount,
              }}
              period={100}
              domain={{ maximum: 16, minimum: 10 }}
            />
            <br />
            <Stream
              hide={true}
              quantity={{
                units: "V",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thvlt0ad1 &&
                  data.transducers.thvlt0ad1.amount,
              }}
              period={1 * 60 * 1000}
            />
            <br />
            <Stream
              hide={false}
              quantity={{
                units: "V",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thvlt0ad1 &&
                  data.transducers.thvlt0ad1.amount,
              }}
            />
            <br />
            VLT1 (START):{" "}
            {data &&
              data.transducers &&
              data.transducers.thvlt1ad1 &&
              data.transducers.thvlt1ad1.amount}{" "}
            V<br />
            <Stream
              hide={true}
              quantity={{
                units: "V",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thvlt1ad1 &&
                  data.transducers.thvlt1ad1.amount,
              }}
              period={100}
              domain={{ maximum: 16, minimum: 10 }}
            />
            <br />
            <Stream
              hide={true}
              quantity={{
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thvlt1ad1 &&
                  data.transducers.thvlt1ad1.amount,
              }}
              period={1 * 60 * 1000}
            />
            <br />
            <Stream
              hide={false}
              quantity={{
                units: "V",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thvlt1ad1 &&
                  data.transducers.thvlt1ad1.amount,
              }}
            />
            <br />
            PRESSURE:{" "}
            {data &&
              data.transducers &&
              data.transducers.thprsapb0 &&
              data.transducers.thprsapb0.amount}{" "}
            bar
            <br />
            <Stream
              hide={true}
              quantity={{
                units: "mbar",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thprsapb0 &&
                  data.transducers.thprsapb0.amount,
              }}
              period={50}
            />
            <br />
            TEMPERATURE:{" "}
            {data &&
              data.transducers &&
              data.transducers.thtmpatc1 &&
              data.transducers.thtmpatc1.amount}{" "}
            C<br />
            <Stream
              hide={true}
              quantity={{
                units: "C",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thtmpatc1 &&
                  data.transducers.thtmpatc1.amount,
              }}
              period={50}
            />
            <br />
            <Stream
              hide={true}
              quantity={{
                units: "C",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thtmpatc1 &&
                  data.transducers.thtmpatc1.amount,
              }}
              period={1000}
            />
            <br />
            <Stream
              hide={true}
              quantity={{
                units: "C",
                amount:
                  data > data.transducers &&
                  data.transducers.thtmpatc1 &&
                  data.transducers.thtmpatc1.amount,
              }}
              period={10 * 60 * 1000}
            />
            <br />
            HUMIDITY:{" "}
            {data &&
              data.transducers &&
              data.transducers.thhmdahp2 &&
              data.transducers.thhmdahp2.amount}{" "}
            % RH
            <br />
            <Stream
              hide={true}
              quantity={{
                units: "%RH",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thhmdahp2 &&
                  data.transducers.thhmdahp2.amount,
              }}
              period={50}
            />
            <br />
            <Stream
              hide={true}
              quantity={{
                units: "%RH",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thhmdahp2 &&
                  data.transducers.thhmdahp2.amount,
              }}
              period={1000}
            />
            <br />
            GAS:{" "}
            {data &&
              data.transducers &&
              data.transducers.thgasaxx3 &&
              data.transducers.thgasaxx3.amount}{" "}
            ohms
            <br />
            <Stream
              hide={true}
              quantity={{
                units: "ohms",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thgasaxx3 &&
                  data.transducers.thgasaxx3.amount,
              }}
              period={50}
            />
            <br />
            <Stream
              hide={true}
              quantity={{
                units: "ohms",
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thgasaxx3 &&
                  data.transducers.thgasaxx3.amount,
              }}
              period={1000}
            />

            <br />
            ACCZ:{" "}
            {data &&
              data.transducers &&
              data.transducers.thacczax2 &&
              data.transducers.thacczax2.amount}{" "}
            ms2
            <br />
            <Stream
              hide={false}
              quantity={{
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thacczax2 &&
                  data.transducers.thacczax2.amount,
                units: "ms-2",
              }}
            />
            <br />
            <Stream
              hide={true}
              quantity={{
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thacczax2 &&
                  data.transducers.thacczax2.amount,
                units: "ms-2",
              }}
              period={50}
              domain={{ maximum: 1000, minimum: 750 }}
            />

<Magnetometer vector={{z:data && data.transducers && data.transducers.thmagzax2, y:data && data.transducers && data.transducers.thmagyad1, x:data && data.transducers && data.transducers.thmagxad0}} />

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
                  data.transducers.thyawax2 &&
                  data.transducers.thyawax2.amount,
                dotZ:
                  data &&
                  data.transducers &&
                  data.transducers.thgyrzax2 &&
                  data.transducers.thgyrzax2.amount,
              }}
            />
            PITCH:{" "}
            {data &&
              data.transducers &&
              data.transducers.thptchad1 &&
              data.transducers.thptchad1.amount}{" "}
            degrees
            <br />
            <Stream
              hide={true}
              quantity={{
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.thptchad1 &&
                  data.transducers.thptchad1.amount,
                units: "degrees",
              }}
              period={50}
            />
            <br />
            ROLL:{" "}
            {data &&
              data.transducers &&
              data.transducers.throllad0 &&
              data.transducers.throllad0.amount}{" "}
            degrees
            <br />
            <Stream
              hide={true}
              quantity={{
                amount:
                  data &&
                  data.transducers &&
                  data.transducers.throllad0 &&
                  data.transducers.throllad0.amount,
                units: "degrees",
              }}
              period={50}
            />
            <br />
            YAW:{" "}
            {data &&
              data.transducers &&
              data.transducers.thyawax2 &&
              data.transducers.thyawax2.amount}{" "}
            <br />
            RATE OF TURN:{" "}
            {data &&
              data.transducers &&
              data.transducers.thgyrzax2 &&
              data.transducers.thgyrzax2.amount}{" "}
            <br />
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
                amount:
                data && data.speed_in_knots,
                units: "knots",
              }}
              period={50}
            />
            <br />

        TRUE COURSE: {data && data.true_course}
        <br />
        NUMBER OF SATELLITES: {data && data.number_of_satellites}
        <br />
            <Stream
              hide={true}
              quantity={{
                amount:
data && data.number_of_satellites,
                units: "",
              }}
              period={50}
            />
            <br />

        HDOP: {data && data.horizontal_dilution_of_precision}
        <br />
        ALTITUDE: {data && data.altitude_above_mean_sea_level}m (MSL)
        <br />
        <Stream
          hide={true}
          quantity={{ amount: data && data.altitude_above_mean_sea_level }}
          period={50}
        />
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
