import React, { lazy, useState, useEffect } from "react";
import { useParams } from "react-router";
import Agent from "../components/Agent.js";
import Snapshot from "../components/Snapshot.js";
import TextSnapshot from "../components/TextSnapshot.js";

import Datagram from "../components/Datagram.js";
import Barometer from "../components/Barometer.js";
import MotionReference from "../components/MotionReference.js";

import GlobalPositioningSystem from "../components/GlobalPositioningSystem.js";

import ToGoTime from "../components/ToGoTime.js";
import Poll from "../components/Poll.js";
import Subject from "../components/Subject.js";
import Content from "../components/Content.js";
import Message from "../components/Message.js";
import Text from "../components/Text.js";
import History from "../components/History.js";
import Power from "../components/Power.js";
import Nuuid from "../components/Nuuid.js";
import Messages from "../components/Messages.js";

import Weather from "../components/Weather.js";

import TemperatureHumidity from "../components/TemperatureHumidity.js";

import InertialReference from "../components/InertialReference.js";

import Error from "../components/Error.js";

import ThingThumbnail from "../components/ThingThumbnail.js";

import Ping from "../components/Ping.js";
import Login from "../components/Login.js";

import Token from "../components/Token.js";
import Signup from "../components/Signup.js";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { isText } from "../util/text.js";

import Associations from "../components/Associations.js";

import { v4 as uuidv4, uuid as uuidLibrary } from "uuid";
import {
//  getThingReport,
  setThing,
  txCount,
  rxCount,
  txData,
  rxData,
  rxErrorCount,
  txErrorCount,
} from "../util/database.js";
import { humanTime, zuluTime } from "../util/time.js";

import useMessages from "../useMessages";
import useThingReport from "../useThingReport";
import useThing from "../useThing";


import { getSlug } from "../util/text.js";

import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
//import UpdateIcon from "@mui/icons-material/Update";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const defaultWebPrefix = process.env.REACT_APP_WEB_PREFIX;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    // Add border that contrasts lightly with background color.
    // We use boxShadow  so that it's hidden around outer edge
    // due to container <Card> having overflow: hidden
    //    boxShadow: `1px 1px 0 0 ${emphasize(theme.palette.background.paper, 0.08)}`,
    textAlign: "center",
  },

  stripImageContainer: {
    margin: "0 auto",

    "& img": {
      // width: "100%",
      width: "80px",
      maxHeight: "125px",
      maxWidth: "100px",
    },
  },

  media: {
    // minHeight: "200px",
    height: "auto",
    // width:'100%',
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
    // height: "auto",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },

  cartImageContainer: {
    // margin: "0 auto",
    // height:'200px',
    width: "100%",
    "& img": {
      width: "100%",
      maxHeight: "100px",
      objectFit: "contain",
      // width: "100%",
      // height: "auto",
      // height:"75px",
    },
  },

  cardImageContainer: {
    margin: "0 auto",
    // maxWidth: "200px",

    "& img": {
      maxHeight: "180px",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        maxHeight: "150px",
      },
      // width: "auto",
      // height:'200px'
    },
  },
}));

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
  //  const text = props.match.params.text;

  const classes = useStyles();

  const { datagram, token, canOpen, open, canFold } = props;

  var { agentInput } = props;

  if (datagram.input) {
    agentInput = datagram.input;
  }

  const { text } = useParams();

  const variables = { poll: { interval: 20000, aggressive: "yes" } };

  const { messages, addMessage } = useMessages();

  const webPrefix = datagram.webPrefix ? datagram.webPrefix : defaultWebPrefix;
  //  const webPrefix = datagram.webPrefix ? datagram.webPrefix : "https://stackr.ca/";
const [url, setUrl] = useState();
//const u = webPrefix+ getSlug(datagram.subject) + ".json";

//  const { thingReport: data, getThingReport } = useThingReport(
//    webPrefix + datagram.subject + ".json",
//    10000
//  );
const { thing: t, spawnThing, flipThing, forgetThing } = useThing(datagram);
  const { thingReport: data, getThingReport } = useThingReport(
    url,
    10000
  );

useEffect(()=>{
if (url == null) {return;}
console.log("Thing url", url);
},[url]);

  const { to, subject } = datagram;

  const startAt = props.createdAt;

  const currentAt = Date.now();

  const defaultPollInterval =
    datagram && datagram.pollInterval ? datagram.pollInterval : 2 * 60 * 1000; //ms
  const defaultTickInterval = 25; //ms
  //  const minimumPollInterval = 2 * 60 * 1000; //ms

  const [minimumPollInterval, setMinimumPollInterval] = useState(100);

  const maxBar = 20;
  const maxTick = 4;
  const [tick, setTick] = useState(0);
  const [bar, setBar] = useState(0);

  const [PNG, setPNG] = useState();

useEffect(()=>{

if (datagram == null) {return;}

if (datagram && datagram.subject) {
const u = webPrefix+ getSlug(datagram.subject) + ".json";

  setUrl(u);
}

}, [datagram]);

  var pollInterval =
    datagram && datagram.pollInterval
      ? datagram.pollInterval
      : defaultPollInterval;
  //  const [pollInterval, setPollInterval] = useState(defaultPollInterval);

  function setPollInterval(d) {
    datagram.pollInterval = d;
    setDatagram({ ...datagram });
  }

  function setSubject(d) {
    datagram.subject = d;
    setDatagram({ ...datagram });
    //refreshThingReport();
  }

  function setDatagram(d) {
    if (!d) return;

    console.log("Thing setDatagram d", d);
    if (!d.pollInterval) return;

    //setPollInterval(d.pollInterval);
  }

  useEffect(() => {
    console.log(
      "Thing datagram changed",
      datagram && datagram.subject,
      datagram
    );
    if (!datagram) return;
    setTimedInterval(datagram.pollInterval);

    //refreshThingReport();

    console.log("Thing datagram uuid", uuid);

    setThing(datagram.uuid, datagram, token)
      .then((result) => {
        addMessage("Set thing " + datagram.subject);

        console.log("Thing setThing result", result);
      })
      .catch((error) => {
        setError(error.message);
        console.log("Thing setThing error", error);
      });
  }, [datagram]);

  const [aggressivePoll, setAggressivePoll] = useState();

  const [timedInterval, setTimedInterval] = useState();
  const [timedBarInterval, setTimedBarInterval] = useState();
  const [timedTickInterval, setTimedTickInterval] = useState();

  const [tickRequestedAt, setTickRequestedAt] = useState();
  const [barRequestedAt, setBarRequestedAt] = useState();

  const [agentRequestedAt, setAgentRequestedAt] = useState();

  const [nextRunAt, setNextRunAt] = useState(Date.now() + pollInterval);

  const [totalBytesReceivedData, setTotalBytesReceivedData] = useState(0);
  //  const minimumPollInterval = 60 * 60 * 1000;

  const defaultLatencyInterval = 1000; //ms

  const [latencyInterval, setLatencyInterval] = useState(
    defaultLatencyInterval
  );

  useEffect(() => {
    if (variables && variables.poll && variables.poll.aggressive) {
      //setAggressivePoll(variables.poll.aggressive);
    }
  }, [variables]);

  const [timedLatencyInterval, setTimedLatencyInterval] = useState();

  const [flag, setFlag] = useState();

  const runTime = Date.now() - startAt;

  //const { open: initialExpanded } = props.datagram;

  //  const [expanded, setExpanded] = React.useState(initialExpanded === "open");
  //const [expanded, setExpanded] = React.useState(props.datagram.expanded);
  const [expanded, setExpanded] = useState(open);

  const [flipped, setFlipped] = React.useState();

  useEffect(() => {
    const requestedAt = Date.now();
    setAgentRequestedAt(requestedAt);

    console.log(
      "Thing thingReport data",
      data && data.datagram && data.datagram.text,
      data
    );
    //setData(thingReport);
    if (
      data.thingReport &&
      data.thingReport.error &&
      data.thingReport.error.message
    ) {
      //console.log("Thing getThingReport", result.thingReport.error.message);
      console.error("Thing getThingReport error", data.thingReport.error);
      setError(data.thingReport.error.message);
    }

    const elapsedTime = Date.now() - requestedAt;

    if (data && data.thingReport && data.thingReport.png) {
      var base64Icon = "data:image/png;base64," + data.thingReport.png;
      setPNG(base64Icon);
    }

    setTimedInterval(elapsedTime);

    const p = requestedAt + pollInterval;
    setNextRunAt(p);
    console.log("nextRunAt p", p, zuluTime(new Date(p)));

    setFlag("green");
  }, [data]);

  const handleExpandClick = () => {
    console.log("Thing handleExpandClick expanded");
    setExpanded(true);
  };

  const handleFoldClick = () => {
    setExpanded(false);
  };

  // Generate a UUID if not given one by App.
  //  const uuid = props.uuid ? props.uuid : uuidv4();

  const [uuid, setUuid] = useState();
  const [nuuid, setNuuid] = useState();

  useEffect(() => {
    console.log("Thing start uuid", datagram.uuid);
  }, []);

  useEffect(() => {
    console.log("Thing expanded uuid", expanded, datagram.uuid);
  }, [expanded]);

  useEffect(() => {
    if (props.uuid === undefined) {
      //return;
    }
    if (text === undefined) {
    }
    console.log("Thing props.uuid", props.uuid);
    const u = props.uuid ? props.uuid : uuidv4();
    //    const u = props.uuid;
    const n = u.substring(0, 4);

    setUuid(u);
    setNuuid(n);
  }, [props.uuid, text]);

  const [error, setError] = useState();

  /*
  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });
*/

  useEffect(() => {
    console.info("Thing started");
    getUuid();
    //getResponse(webPrefix);
  }, []);

  useEffect(() => {
    if (!uuid) {
      return;
    }
    console.info("Thing uuid", uuid);
  }, [uuid]);

  useEffect(() => {
    console.log("Thing subject changed", subject);
    //setFlag('green');
    //   getResponse(webPrefix, true);
    setDatagram({ ...datagram, subject: subject });
  }, [subject]);

  // refactor out
  function getUuid() {
    return uuid;
  }

  function handleRefresh() {
    //    getResponse(webPrefix, true);
    getThingReport();
  }

  function handlePollIntervalButton() {
    if (aggressivePoll === "yes") {
      setAggressivePoll("no");
    } else if (aggressivePoll === "no") {
      setAggressivePoll("yes");
    } else {
      // Broken. So fix safe.
      setAggressivePoll("no");
    }
  }

  useEffect(() => {
    console.log("Thing aggressivePoll", aggressivePoll);
  }, [aggressivePoll]);

  useEffect(() => {
    // This sets the polling rate to the maximum achievable.
    //if (aggressivePoll === true) {
    if (!datagram) return;
    //if (!aggressivePoll) return;

    //if (datagram && datagram.pollInterval && datagram.pollInterval
    if (aggressivePoll) {
      const p = (
        timedInterval * 1.1 < minimumPollInterval
          ? minimumPollInterval
          : timedInterval * 1.1
      ).toFixed(0);

      // Testing at 10%.
      setPollInterval(p);
    }

    if (!aggressivePoll) {
      setPollInterval(datagram.pollInterval);
    }
    //}
  }, [timedInterval, aggressivePoll]);

  useEffect(() => {
    if (!pollInterval) return;
    console.log("Thing pollInterval", pollInterval);
    setNextRunAt(Date.now() + pollInterval);
  }, [pollInterval]);

  function Create() {}

  function Forget() {}

  const handleForgetThing = (e) => {
//    forgetThing();
//return;
    if (props.onChange) {
      props.onChange("forget");
    }

    if (props.onForget) {
      props.onForget(e);
    }
  };

  // Call getResponse on a Timer.
  // Check if the flag has changed.

  /*
  useEffect(() => {
    // If still processing the last one,
    // Skip a beat, do not request another.
    //    if (flag === "red") {
    //      return;
    //    }
    setFlag("green");
    // First time flag is green.

    console.log("Thing nextRunAt pollInterval", pollInterval);
    //const t = currentAt + pollInterval;

    //setNextRunAt(t);
    getResponse(webPrefix);

    const interval = setInterval(() => {

      getResponse(webPrefix);
      console.log("This will run every: " + pollInterval);

    }, pollInterval);
    console.log("interval", interval);

    return () => clearInterval(interval);
    //  }, [flag]);
  }, [datagram]);
*/

  useEffect(() => {
    // If still processing the last one,
    // Skip a beat, do not request aother.
    if (flag === "green") {
      return;
    }

    // Do some work?
    //    console.log("Thing " + nuuid + " check-in.");
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

  // Test dynamic loading
  async function load() {
    let say = await import("./Snapshot.js");
    //    say.hi(); // Hello!
    //    say.bye(); // Bye!
    //    say.default(); // Module loaded (export default)!
  }

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
flipThing();
return;
    if (props.onChange) {
      props.onChange("flip");
    }

    if (props.onFlip) {
      props.onFlip(e);
    }
  };

  useEffect(() => {
    if (!error) {
      return;
    }
    handleSpawnThing({ subject: error.message });
  }, [error]);

  const handleSpawnThing = (e) => {
    spawnThing();
return;
    if (props.onChange) {
      props.onChange("spawn");
      return;
    }

    if (props.onSpawn) {
      props.onSpawn(e);
    }

    //spawnThing(webPrefix, thing, token);
  };

  const handleOpenThing = (e) => {
    //setExpanded(true);
    handleExpandClick(e);
    //   setExpanded(true);
    if (props.onChange) {
      props.onChange("open");
    }

    if (props.onOpen) {
      props.onOpen(e);
    }
  };

  const handleFoldThing = (e) => {
    handleFoldClick();
    //setExpanded(false);
    if (props.onChange) {
      props.onChange("fold");
    }

    if (props.onFold) {
      props.onFold(e);
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

  const bRed = "#ff000080";
  const bGreen = "#00ff0000";

  const DataReport = () => {
    //const expanded =true;
    return (
      <>
        {expanded && (
          <>
            TXPACKETS {txCount}
            <br />
            RXPACKETS {rxCount + rxErrorCount}
            <br />
            TXDATA {txData}
            <br />
            RXDATA {rxData}
            <br />
            RXERRORCOUNT {rxErrorCount}
            <br />
            TXERRORCOUNT {txErrorCount}
            <br />
          </>
        )}

        {!expanded && (
          <>
            PACKETS {txCount}
            {"/"}
            {rxCount + rxErrorCount}
            <br />
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Card
        disableGutters={true}
        //sx={{ borderColor: flag }}
        style={{
          maxWidth: "100%",
          borderColor: flag === "red" ? bRed : bGreen,
          borderWidth: "10px",
          borderStyle: "solid",
          //          border: "10px solid",
          //          backgroundColor: flag === "red" ? bRed : bGreen,
        }}
        raised={flag === "red" ? true : false}
      >
        <CardHeader
          action={
            <>
              <Typography>{nuuid}</Typography>

              {/*            <IconButton>
              <MoreVertIcon />
            </IconButton>
*/}
            </>
          }
        />
        {token && token.message}
{expanded ? "expanded" : "not expanded"}
{flipped ? "flipped" : "not flipped"}

        {error && <Error error={error} agentInput={data.thingReport} />}

        <Button onClick={handleSpawnThing}>SPAWN</Button>

        <Button onClick={handleForgetThing}>FORGET</Button>
        {!expanded && (
          <Button onClick={handleFlipThing}>
            {flipped ? "MESSAGE" : "SOURCE"}
          </Button>
        )}

        {canFold && expanded && <Button onClick={handleFoldThing}>FOLD</Button>}
        {canOpen && !expanded && <Button onClick={handleOpenThing}>OPEN</Button>}

        {/*<div onClick={handleExpandClick} >*/}
        <div>
          {!expanded && flipped && (
            <>
              <Datagram
                datagram={datagram}
                setDatagram={setDatagram}
                token={token}
              />
              WEBPREFIX {datagram.webPrefix}
              <br />
              ERROR {error}
              <br />
              TIMED LATENCY INTERVAL {timedLatencyInterval}
              <br />
              TIMED INTERVAL {timedInterval}
              <br />
              <Poll
                variables={variables && variables.poll}
                poll={{ interval: pollInterval, aggressive: aggressivePoll }}
                onPoll={handlePollIntervalButton}
              />
              <br />
              <RequestedAt />
              <br />
              NEXT RUN AT {humanTime(nextRunAt)}
              <br />
              CURRENT AT {humanTime(currentAt)}
              <br />
              TOTAL CHARACTERS RECEIVED DATA {totalBytesReceivedData}
              <br />
              <Associations datagram={datagram} />
              {error && error.message}
              <br />
            </>
          )}
          {!flipped && (
            <Subject subject={subject} setSubject={setSubject} token={token} />
          )}
          {!expanded && !flipped && (
            <>
              {PNG && (
                <Box className={classes.cardImageContainer}>
                  <div className={classes.media}>
                    <ThingThumbnail src={PNG} />
                  </div>
                </Box>
              )}
            </>
          )}
          {!flipped && (
            <>
                <Message message={{ subject: data.sms }} />
                <br />

          {/*    <div>{data && data.sms}</div>*/}


              {/*
              <div>{data && data.thingReport && data.thingReport.sms}</div>*/}
              {/*             <Typography>TOGOTIME {nextRunAt - currentAt}</Typography> */}
            </>
          )}

          <Message
            message={{
              subject: data && data.thingReport && data.thingReport.sms,
            }}
          />

          {data && data.thingReport && data.thingReport.link && (
            <>
              <a href={data.thingReport.link}>{data.thingReport.link}</a>
              <br />
            </>
          )}

          {!expanded && !flipped && (
            <>
              <ToGoTime
                toGoTime={nextRunAt - currentAt}
                onRefresh={handleRefresh}
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
          {/*
          {expanded && data && data.thingReport && data.thingReport.snippet && (
<>{data.thingReport.snippet}</>
          )}

          {expanded && data && data.thingReport && data.thingReport.text && (
<>{data.thingReport.text}</>
          )}
*/}
          {expanded && data && data.thingReport && data.thingReport.web && (
            <div
              dangerouslySetInnerHTML={{ __html: data && data.thingReport.web }}
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
          {agentInput &&
            isText(agentInput) &&
            agentInput.toLowerCase().indexOf("login") !== -1 && (
              <div>
                <Login token={token} datagram={datagram} flavour={"card"} />
              </div>
            )}
          {agentInput &&
            isText(agentInput) &&
            agentInput.toLowerCase().indexOf("signup") !== -1 && (
              <div>
                <Signup token={token} datagram={datagram} flavour={"card"} />
              </div>
            )}
          {/*
            <Token
              token={token}
              setToken={setToken}
              setIdentity={setIdentity}
            />
*/}
          {agentInput &&
            isText(agentInput) &&
            agentInput.toLowerCase().indexOf("token") !== -1 && (
              <div>
                <Token token={token} datagram={datagram} flavour={"card"} />
              </div>
            )}

          {expanded && (
            <>
              <Content thingReport={data && data.thingReport} />
              <br />
              TOTAL CHARACTERS RECEIVED DATA {totalBytesReceivedData}
              <br />
              {error && error.message}
              <br />
              <Typography>RUNTIME {runTime}</Typography>
              {!data && <>NOT DATA</>}
              {subject && subject.toLowerCase().indexOf("error") !== -1 && (
                <div>
                  <Error
                    user={null}
                    //thing={data.thing}
                    datagram={datagram}
                    agent_input={webPrefix}
                  />
                </div>
              )}
              {subject &&
                subject.toLowerCase().indexOf("text-snapshot") !== -1 && (
                  <div>
                    <TextSnapshot
                      user={null}
                      //thing={data.thing}
                      datagram={datagram}
                      agent_input={webPrefix}
                    />
                  </div>
                )}
              {subject &&
                subject.toLowerCase().indexOf("global-positioning-system") !==
                  -1 && (
                  <div>
                    <GlobalPositioningSystem
                      user={null}
                      //thing={data.thing}
                      datagram={datagram}
                      agent_input={webPrefix}
                    />
                  </div>
                )}
              {subject && subject.toLowerCase().indexOf("barometer") !== -1 && (
                <div>
                  <Barometer
                    user={null}
                    //thing={data.thing}
                    datagram={datagram}
                    agent_input={webPrefix}
                  />
                </div>
              )}
              {subject && subject.toLowerCase().indexOf("snapshot") !== -1 && (
                <div>
                  <Snapshot
                    user={null}
                    //thing={data.thing}
                    datagram={datagram}
                    agent_input={webPrefix}
                  />
                </div>
              )}
              {subject && subject.toLowerCase().indexOf("weather") !== -1 && (
                <div>
                  <Weather
                    user={null}
                    //thing={data.thing}
                    datagram={datagram}
                    agent_input={webPrefix}
                  />
                </div>
              )}
              {subject &&
                subject.toLowerCase().indexOf("motion-reference") !== -1 && (
                  <div>
                    <MotionReference
                      user={null}
                      //thing={data.thing}
                      datagram={datagram}
                      agent_input={webPrefix}
                    />
                  </div>
                )}
              {subject && subject.toLowerCase().indexOf("history") !== -1 && (
                <div>
history test
                  <History
                    user={null}
                    //thing={data.thing}
                    datagram={datagram}
                    agent_input={webPrefix}
                  />
                </div>
              )}
              {subject && subject.toLowerCase().indexOf("ping") !== -1 && (
                <div>
                  <Ping
                    user={null}
                    //thing={data.thing}
                    variables={{ping:{uuid:data.ping}}}
                    datagram={datagram}
                    agent_input={webPrefix}
                  />
                </div>
              )}
              {subject &&
                subject.toLowerCase().indexOf("inertial-reference") !== -1 && (
                  <div>
                    <InertialReference
                      user={null}
                      //thing={data.thing}
                      datagram={datagram}
                      agent_input={webPrefix}
                    />
                  </div>
                )}
              {subject && subject.toLowerCase().indexOf("power") !== -1 && (
                <div>
                  <Power
                    user={null}
                    //thing={data.thing}
                    datagram={datagram}
                    agent_input={webPrefix}
                  />
                </div>
              )}
              {subject && subject.toLowerCase().indexOf("messages") !== -1 && (
                <div>
                  <Messages
                    user={null}
                    //thing={data.thing}
                    datagram={datagram}
                    agent_input={webPrefix}
                  />
                </div>
              )}
              {subject &&
                subject.toLowerCase().indexOf("temperature-humidity") !==
                  -1 && (
                  <div>
                    <TemperatureHumidity
                      user={null}
                      //thing={data.thing}
                      datagram={datagram}
                      agent_input={webPrefix}
                    />
                  </div>
                )}
              {subject &&
                subject.toLowerCase().indexOf("humidity-temperature") !==
                  -1 && (
                  <div>
                    <TemperatureHumidity
                      user={null}
                      //thing={data.thing}
                      datagram={datagram}
                      agent_input={webPrefix}
                    />
                  </div>
                )}
              {subject && subject.toLowerCase().indexOf("text") !== -1 && (
                <div>
                  <Text
                    setText={(t) => {
                      const a = { text: { value: t, refreshedAt: zuluTime() } };

                      console.log("Thing text a", a);

                      setDatagram({
                        ...datagram,
                        variables: { ...datagram.variables, a },
                      });
                    }}
                    user={null}
                    //thing={data.thing}
                    datagram={datagram}
                    agent_input={webPrefix}
                  />
                </div>
              )}
              {subject && subject.toLowerCase().indexOf("b97f") !== -1 && (
                <div>
                  <Nuuid
                    user={null}
                    //thing={data.thing}
                    datagram={datagram}
                    agent_input={webPrefix}
                  />
                </div>
              )}
              <div>
                <br />
                {/*      <Agent user={null} thing={data.thing} agent_input="http://localhost" />*/}
                <Agent
                  user={null}
                  thing={data && data.thing}
                  agent_input={webPrefix}
                />
                {data && data.thingReport && data.thingReport.agent}

              </div>
              <div>
                {/* Note */}
                <div dangerouslySetInnerHTML={{ __html: data && data.web }} />
                <div>UUID {data && data.thing && data.thing.uuid}</div>
              </div>
              TICK {tick} {timedTickInterval} ms
              <br />
              BAR {bar} {timedBarInterval} ms
              <br />
            </>
          )}
          {/*https://www.designcise.com/web/tutorial/how-to-hide-a-broken-image-in-react*/}
        </div>
        <DataReport />
      </Card>
    </>
  );
}
