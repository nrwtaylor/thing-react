import React, { useState, useEffect } from "react";
import Agent from "../components/Agent";
import axios from "axios";
import { Get } from "../components/Database";

export default function Thing(props) {
  const subject = props.subject;
  const defaultPollInterval = 10 * 1000; //ms
  const minimumPollInterval = 60 * 60 * 1000;
  const [pollInterval, setPollInterval] = useState(defaultPollInterval);
  const [timedInterval, setTimedInterval] = useState();
  const [flag, setFlag] = useState();

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  useEffect(() => {
getResponse();
  }, []);

  function getResponse() {
    if (flag === "red") {
      return;
    }
    setFlag("red");
    var t = { subject: subject };
    var thingy = { thing: null, thing_report: null };

    // TODO Call Get from Database.js and return.
    thingy = Get(t);

    console.log("Axios call " + subject);

    const webPrefix = process.env.REACT_APP_WEB_PREFIX;
    const requestedAt = Date.now();
    console.log("requestedAt", requestedAt);
    axios.get(webPrefix + subject + `.json`).then((res) => {
      let thingy = res.data;
      console.log("Thing res.data", res.data);

      // agent etime info json:null thing etc
      setData(res.data);

      const elapsedTime = Date.now() - requestedAt;
      console.log("elapsedTime", elapsedTime);

      setTimedInterval(elapsedTime);
      setFlag("green");
    });
  }

  useEffect(() => {
    // Testing at 10%.
    setPollInterval(timedInterval * 1.1 < minimumPollInterval ? minimumPollInterval : timedInterval * 1.1);
  }, [timedInterval]);

  function Create() {}

  function Forget() {}

  // Call getResponse on a Timer.
  useEffect(() => {
    // If still processing the last one,
    // Skip a beat, do not request aother.
    if (flag === "red") {
      return;
    }

    const interval = setInterval(() => {
      getResponse();
      console.log("This will run every five minutes!");
    }, pollInterval);
    console.log("interval", interval);

    return () => clearInterval(interval);
  }, [flag]);

  return (
    <>
      THING
      {flag} <br />
      TIMED INTERVAL {timedInterval}
      <br />
      wPOLL INTERVAL {pollInterval}
      {!data && <>NOT DATA</>}
      AGENT RESPONSE START
      <Agent user={null} thing={data.thing} agent_input={null} />
      AGENT RESPONSE END
      <div>Datagram</div>
      {subject}
      <div>Thing</div>
      {/* Note */}
      <div>{data && data.sms}</div>
      <div dangerouslySetInnerHTML={{ __html: data && data.web }} />
      <div>{data && data.thing && data.thing.uuid}</div>
      <div>{data && data.thing && data.thing.created_at}</div>
      <div>{data && data.thing_report && data.thing_report.sms}</div>
    </>
  );
}
