import React, { useState, useEffect } from "react";
import Agent from "../components/Agent.js";
import Snapshot from "../components/Snapshot.js";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Get } from "../components/Database.js";

//import{ Collapse} from '@mui/core';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';


import IconButton, { IconButtonProps } from '@mui/material/IconButton';
//import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//import ExpandMoreIcon from '@mui/icons-material/ExpandMore.js';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}


const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Thing(props) {
  const { webPrefix, subject, to } = props;

  //const subject = props.subject;
  const startAt = props.createdAt;

  const currentAt = Date.now();

  const defaultPollInterval = 10 * 1000; //ms
  const defaultTickInterval = 25; //ms
  const minimumPollInterval = 1 * 60 * 1000; //ms

  const maxBar = 20;
  const maxTick = 4;
  const [tick, setTick] = useState(0);
  const [bar, setBar] = useState(0);

  const [PNG, setPNG] = useState();

  const [pollInterval, setPollInterval] = useState(defaultPollInterval);
  const [timedInterval, setTimedInterval] = useState();
  const [timedBarInterval, setTimedBarInterval] = useState();
  const [timedTickInterval, setTimedTickInterval] = useState();

  const [tickRequestedAt, setTickRequestedAt] = useState();
  const [barRequestedAt, setBarRequestedAt] = useState();

  const [agentRequestedAt, setAgentRequestedAt] = useState();

  const [nextRunAt, setNextRunAt] = useState();

  const [totalBytesReceivedData, setTotalBytesReceivedData] = useState(0);

  const [flag, setFlag] = useState();

  const runTime = Date.now() - startAt;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Generate a UUID if not given one by App.
  const uuid = props.uuid ? props.uuid : uuidv4();
  const [error, setError] = useState();

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
    axios
      .get(webPrefix + subject + `.json`, {
        headers: {
          Authorization: "my secret token",
        },
      })
      .then((res) => {
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

    const interval = setInterval(() => {
      getResponse(webPrefix);
      console.log("This will run every: " + pollInterval);
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
    console.log("Thing " + uuid + " asking for work.");
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
    //console.log("tick", tick);

    if (tick === 0) {
      const elapsedTime = Date.now() - tickRequestedAt;

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

      setTimedBarInterval(elapsedTime);
      setBarRequestedAt(Date.now());
    }
  }, [bar]);

  return (
    <>
    <Card>
<div>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
<Typography>TO {to}</Typography>
<Typography>SUBJECT {subject}</Typography>

</div>
{expanded && (<>

      Last edited: 12 June 2022
      <div>
        THING {uuid}
        <br />
        RUNTIME {runTime}
        <br />
        NEXT RUN AT {nextRunAt}
        <br />
        CURRENT AT {currentAt}
        <br />
        TOGOTIME {nextRunAt - currentAt}
        <br />
        TOTAL CHARACTERS RECEIVED DATA {totalBytesReceivedData}
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
      </div>

{subject && subject === 'snapshot' && (
      <div>
        {/*<Snapshot user={null} thing={data.thing} agent_input="https://stackr.ca" />*/}
        <Snapshot user={null} thing={data.thing} agent_input={webPrefix} />
      </div>)}
      <div>
        <br />
        {/*      <Agent user={null} thing={data.thing} agent_input="http://localhost" />*/}
        <Agent user={null} thing={data.thing} agent_input={webPrefix} />

        <br />
      </div>
      <div>
        <div>DATAGRAM</div>
        {subject}
      </div>
      <div>
        <div>THING</div>
        {/* Note */}
        <div>SMS {data && data.sms}</div>
        <div dangerouslySetInnerHTML={{ __html: data && data.web }} />
        <div>UUID {data && data.thing && data.thing.uuid}</div>
        <div>CREATED AT {data && data.thing && data.thing.created_at}</div>
      </div>

</>)}
        <div>SMS {data && data.thingReport && data.thingReport.sms}</div>

        {PNG && <img width="800px" src={PNG} />}
</Card>
    </>
  );
}
