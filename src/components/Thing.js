import React, { useState, useEffect } from "react";
import Agent from "../components/Agent.js";
import Snapshot from "../components/Snapshot.js";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Get } from "../components/Database.js";

//import{ Collapse} from '@mui/core';

import { styled } from "@mui/material/styles";

//import Container from '@mui/material/Container';

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
//import IconButton from '@mui/material/IconButton';

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//import ExpandMoreIcon from '@mui/icons-material/ExpandMore.js';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Thing(props) {
  const { datagram, webPrefix, subject, to } = props;

  //const subject = props.subject;
  const startAt = props.createdAt;

  const currentAt = Date.now();

  const defaultPollInterval = datagram && datagram.pollInterval ? datagram.pollInterval : 2* 60 * 1000; //ms
  const defaultTickInterval = 25; //ms
  const minimumPollInterval = 1 * 60 * 1000; //ms

  const maxBar = 20;
  const maxTick = 4;
  const [tick, setTick] = useState(0);
  const [bar, setBar] = useState(0);

  const [PNG, setPNG] = useState();

  const [pollInterval, setPollInterval] = useState(defaultPollInterval);

useEffect(()=>{

console.log("datagram", datagram);

}, [datagram]);

  const [timedInterval, setTimedInterval] = useState();
  const [timedBarInterval, setTimedBarInterval] = useState();
  const [timedTickInterval, setTimedTickInterval] = useState();

  const [tickRequestedAt, setTickRequestedAt] = useState();
  const [barRequestedAt, setBarRequestedAt] = useState();

  const [agentRequestedAt, setAgentRequestedAt] = useState();

  const [nextRunAt, setNextRunAt] = useState();

  const [totalBytesReceivedData, setTotalBytesReceivedData] = useState(0);
  //  const minimumPollInterval = 60 * 60 * 1000;

  const defaultLatencyInterval = 1000; //ms

  const [latencyInterval, setLatencyInterval] = useState(
    defaultLatencyInterval
  );

  //  const [pollInterval, setPollInterval] = useState(defaultPollInterval);
  //  const [timedInterval, setTimedInterval] = useState();

  const [timedLatencyInterval, setTimedLatencyInterval] = useState();

  const [flag, setFlag] = useState();

  const runTime = Date.now() - startAt;

  const [expanded, setExpanded] = React.useState(false);

  const [flipped, setFlipped] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Generate a UUID if not given one by App.
  const uuid = props.uuid ? props.uuid : uuidv4();
  const nuuid = uuid.substring(0, 4);
  const [error, setError] = useState();

const [url, setUrl] = useState();

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  useEffect(() => {
    getUuid();
    getResponse(webPrefix);
  }, []);

  function humanTime(timestamp) {
    const ts = new Date(timestamp);
    return ts.toISOString();
  }

  // refactor out
  function getUuid() {
    return uuid;
  }

  function getResponse(webPrefix = null) {
    if (webPrefix === null) {
      webPrefix = process.env.REACT_APP_WEB_PREFIX;
    }

    if (flag === "red") {
      return;
    }
    setFlag("red");
    var t = { subject: subject };
    var thingy = { thing: null, thing_report: null };

    // TODO Call Get from Database.js and return.
    thingy = Get(t);

    console.log("Thing " + uuid + " making axios call " + subject);

    //    const webPrefix = process.env.REACT_APP_WEB_PREFIX;
    const requestedAt = Date.now();
    setAgentRequestedAt(requestedAt);
    // console.log("requestedAt", requestedAt);

var u = webPrefix + subject + `.json`;
// Do we need to get a snapshot?
if (to === 'snapshot') {
u = webPrefix + "snapshot.json";
}

    axios
      .get(u, {
        headers: {
          Authorization: "my secret token",
        },
      })
      .then((res) => {
        setUrl(u);
        let thingy = res.data;
        console.log("Thing axios res", res);
        console.log("Thing axios res.data", res.data);

        // agent etime info json:null thing etc
        setData(res.data);

        const bytesReceivedData = JSON.stringify(res.data).length;
        console.log("bytes", bytesReceivedData);

        setTotalBytesReceivedData(
          (prevTotalBytesReceivedData) =>
            prevTotalBytesReceivedData + bytesReceivedData
        );

        const elapsedTime = Date.now() - requestedAt;

        var base64Icon = "data:image/png;base64," + res.data.thingReport.png;
        setPNG(base64Icon);

        setTimedInterval(elapsedTime);
        setFlag("green");
      })
      .catch((error) => {
        setError({ ...error, message: "Problem" });
      });
    //=======
    //      setTimedInterval(elapsedTime);
    //      return elapsedTime;
    //      setFlag("green");
    //    });
    //>>>>>>> Stashed changes
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
  // Check if the flag has changed.
  useEffect(() => {
    // If still processing the last one,
    // Skip a beat, do not request another.
    if (flag === "red") {
      return;
    }

    // First time flag is green.

    console.log("nextRunAt pollInterval", pollInterval);
    const t = currentAt + pollInterval;

    setNextRunAt(t);
    //getResponse(webPrefix);

    const interval = setInterval(() => {
      //<<<<<<< Updated upstream
      getResponse(webPrefix);
      console.log("This will run every: " + pollInterval);
      //=======
      //    const webPrefix = process.env.REACT_APP_WEB_PREFIX;
      //    const path = subject + `.json`;

      //      getResponse(path);
      console.log("This will run every five minutes!");
      //>>>>>>> Stashed changes
    }, pollInterval);
    console.log("interval", interval);

    return () => clearInterval(interval);
  }, [flag]);

  useEffect(() => {
    // If still processing the last one,
    // Skip a beat, do not request aother.
    if (flag === "green") {
      return;
    }

    // Do some work?
    console.log("Thing " + nuuid + " check-in.");
    /*
https://www.reddit.com/r/reactjs/comments/p7ky46/is_react_synchronous_with_respect_to_function/
https://developer.mozilla.org/en-US/docs/Tools/Performance/Scenarios/Intensive_JavaScript
*/
  }, [tick]);

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
      incrementTick();
    }, defaultTickInterval);

    return () => clearInterval(tickInterval);
  }, []);

  useEffect(() => {
    if (tick === 0) {
      const elapsedTime = Date.now() - tickRequestedAt;

      setTimedTickInterval(elapsedTime);
      setTickRequestedAt(Date.now());
    }

    if (tick >= maxTick - 1) {
      incrementBar();
    }
  }, [tick]);

  const handleFlipThing = (e) => {
    setFlipped(!flipped);

    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleOpenThing = (e) => {
    handleExpandClick();
    if (props.onChange) {
      props.onChange(e);
    }
  };

  // Reference
  //  {PNG && <img src={PNG} onError={(event) => event.target.style.display = 'none'}
  useEffect(() => {
    if (bar === 0) {
      const elapsedTime = Date.now() - barRequestedAt;

      setTimedBarInterval(elapsedTime);
      setBarRequestedAt(Date.now());
    }
  }, [bar]);

  return (
    <>
      <Card style={{ maxWidth: "100%" }}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
        />
        {!expanded && <Button onClick={handleFlipThing}>FLIP</Button>}

        <Button onClick={handleOpenThing}>OPEN</Button>
        {/*<div onClick={handleExpandClick} >*/}
        <div>
          {!expanded && flipped && (
            <>
              <Typography>UUID {uuid}</Typography>
              <Typography>TO {to}</Typography>
              <Typography>SUBJECT {subject}</Typography>

              <Typography>CREATED AT {startAt}</Typography>
                <div>
                  CREATED AT {data && data.thing && data.thing.created_at}
                </div>

             TIMED LATENCY INTERVAL {timedLatencyInterval}
                <br />
                TIMED INTERVAL {timedInterval}
                <br />
                POLL INTERVAL {pollInterval}
                <br />
                <RequestedAt />
                <br />


              NEXT RUN AT {nextRunAt}
              <br />
              CURRENT AT {currentAt}
              <br />
              TOTAL CHARACTERS RECEIVED DATA {totalBytesReceivedData}
              <br />
URL {url}
<br />
              {error && error.message}
              <br />
            </>
          )}

          {!expanded && !flipped && (
            <>
              {PNG && (
                <img
                  height="140"
                  src={PNG}
                  onError={(event) => (event.target.style.display = "none")}
                />
              )}
              <div>{data && data.sms}</div>
{/*
              <div>{data && data.thingReport && data.thingReport.sms}</div>*/}
              <Typography>{nuuid}</Typography>
              <Typography>TOGOTIME {nextRunAt - currentAt}</Typography>
               {flag} <br />
          message{' '}

          <div
            dangerouslySetInnerHTML={{
              __html: data && data.thingReport && data.thingReport.message,
            }}
          />


            </>
          )}

          {expanded && (
            <CardMedia
              component="img"
              src={PNG}
              onError={(event) => (event.target.style.display = "none")}
            />
          )}
{/*          <div>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
*/}
          {expanded && (
            <>
              Last edited: 12 June 2022
              <div>
                THING {uuid}
                <br />
                TOTAL CHARACTERS RECEIVED DATA {totalBytesReceivedData}
                <br />
                {error && error.message}
                <br />
                TICK {tick} {timedTickInterval}
                <br />
                BAR {bar} {timedBarInterval}
                <br />
                <Typography>RUNTIME {runTime}</Typography>
                {!data && <>NOT DATA</>}
              </div>
              {subject && (subject === "snapshot") && (
                <div>
                  <Snapshot
                    user={null}
                    thing={data.thing}
                    agent_input={webPrefix}
                  />
                </div>
              )}
              <div>
                <br />
                {/*      <Agent user={null} thing={data.thing} agent_input="http://localhost" />*/}
                <Agent user={null} thing={data.thing} agent_input={webPrefix} />

                <br />
              </div>
              <div>
                {/* Note */}
                <div dangerouslySetInnerHTML={{ __html: data && data.web }} />
                <div>UUID {data && data.thing && data.thing.uuid}</div>
              </div>
            </>
)}

          {/*https://www.designcise.com/web/tutorial/how-to-hide-a-broken-image-in-react*/}
        </div>
      </Card>
    </>
  );
}
