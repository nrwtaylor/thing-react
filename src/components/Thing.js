import React, { useState, useEffect } from "react";
import Agent from "../components/Agent";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Get } from "../components/Database";

export default function Thing(props) {
  const subject = props.subject;
  const defaultPollInterval = 10 * 1000; //ms
  const defaultTickInterval = 25; //ms
  const minimumPollInterval = 1 * 10 * 1000; //ms

  const maxBar = 20;
  const maxTick = 4;
  const [tick, setTick] = useState(0);
  const [bar, setBar] = useState(0);

  const [pollInterval, setPollInterval] = useState(defaultPollInterval);
  const [timedInterval, setTimedInterval] = useState();
  const [timedBarInterval, setTimedBarInterval] = useState();
  const [timedTickInterval, setTimedTickInterval] = useState();

  const [tickRequestedAt, setTickRequestedAt] = useState();
  const [barRequestedAt, setBarRequestedAt] = useState();

  const [agentRequestedAt, setAgentRequestedAt] = useState();

  const [flag, setFlag] = useState();

  const [uuid, setUuid] = useState();

  const [error, setError] = useState();

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  useEffect(() => {
    getUuid();
    getResponse();
  }, []);

  function humanTime(timestamp) {
    const ts = new Date(timestamp);
    return ts.toISOString();
  }

  function getUuid() {
    setUuid(uuidv4());
  }

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
    setAgentRequestedAt(requestedAt);
    console.log("requestedAt", requestedAt);
    axios
      .get(webPrefix + subject + `.json`)
      .then((res) => {
        let thingy = res.data;
        console.log("Thing res.data", res.data);

        // agent etime info json:null thing etc
        setData(res.data);

        const elapsedTime = Date.now() - requestedAt;
        //console.log("elapsedTime", elapsedTime);

        setTimedInterval(elapsedTime);
        setFlag("green");
      })
      .catch((error) => {
        setError({ ...error, message: "Problem" });
      });
  }

  useEffect(() => {
    // Testing at 10%.
    setPollInterval(
      timedInterval * 1.1 < minimumPollInterval
        ? minimumPollInterval
        : timedInterval * 1.1
    );
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

  const incrementTick = () => {
    setTick((tick) => (tick + 1) % maxTick);
    //if (tick >=2) {incrementBar();}
  };

  const incrementBar = () => {
    setBar((bar) => (bar + 1) % maxBar);
  };

  const RequestedAt = () => {
    if (!agentRequestedAt) {
      return null;
    }
    const ts = agentRequestedAt;
    const x = new Date(ts);
    const i = x.toISOString();

    return <>REQUESTED AT {i}</>;
  };
  useEffect(() => {
    // If still processing the last one,
    // Skip a beat, do not request aother.
    if (flag === "red") {
      return;
    }

    const tickInterval = setInterval(() => {
      //getResponse();
      //console.log("Tick", tick);

      incrementTick();
    }, defaultTickInterval);
    //console.log("tickInterval", tickInterval);

    return () => clearInterval(tickInterval);
  }, []);

  useEffect(() => {
    //console.log("tick", tick);

    if (tick === 0) {
      const elapsedTime = Date.now() - tickRequestedAt;
      //console.log("elapsedTime", elapsedTime);

      setTimedTickInterval(elapsedTime);
      setTickRequestedAt(Date.now());
    }

    if (tick >= maxTick - 1) {
      incrementBar();
    }
  }, [tick]);

  useEffect(() => {
    if (bar === 0) {
      const elapsedTime = Date.now() - barRequestedAt;
      //console.log("elapsedTime", elapsedTime);

      setTimedBarInterval(elapsedTime);
      setBarRequestedAt(Date.now());
    }
  }, [bar]);

  return (
    <>
      THING {uuid}
      <br />
      {error && error.message}
      <br />
      TICK {tick} {timedTickInterval}
      <br />
      BAR {bar} {timedBarInterval}
      <br />
      {flag} <br />
      TIMED INTERVAL {timedInterval}
      <br />
      POLL INTERVAL {pollInterval}
      <br />
      <RequestedAt />
      <br />
      {!data && <>NOT DATA</>}
      AGENT RESPONSE START
      <br />
      <Agent user={null} thing={data.thing} agent_input={null} />
      <br />
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
