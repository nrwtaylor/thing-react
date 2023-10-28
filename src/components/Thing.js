import React, { lazy, useState, useEffect } from 
"react";

import update from "immutability-helper";

import { useParams } from "react-router";
import Agent from "../components/Agent.js";

import Datagram from "../components/Datagram.js";



import ToGoTime from "../components/ToGoTime.js";
import Poll from "../components/Poll.js";
import Subject from "../components/Subject.js";
import Content from "../components/Content.js";
import Message from "../components/Message.js";
import Text from "../components/Text.js";
import History from "../components/History.js";

import Nuuid from "../components/Nuuid.js";
import Item from "../components/Item.js";
import Messages from "../components/Messages.js";
import Collection from "../components/Collection.js";

// refactor to move mui button into Button
import ThingButton from "../components/Button.js";

import Error from "../components/Error.js";

import ThingThumbnail from "../components/ThingThumbnail.js";

import Ping from "../components/Ping.js";
import Login from "../components/Login.js";

import Token from "../components/Token.js";
import Signup from "../components/Signup.js";

import Box from "@mui/material/Box";
import { makeStyles } from '@mui/styles';

import { isText } from "../util/text.js";

import Associations from "../components/Associations.js";

import Agents from "../components/Agents.js";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useTheme } from '@mui/material/styles';

import { v4 as uuidv4, uuid as uuidLibrary } from "uuid";
import {
  //  getThingReport,
  databaseStatistics,
  //  setThing,
  txCount,
  rxCount,
  rxBytes,
  txData,
  rxData,
  txBytes,
  rxErrorCount,
  txErrorCount,
} from "../util/database.js";
import { humanTime, zuluTime, humanAge } from "../util/time.js";
import { getNuuid } from "../util/uuid.js";



import useHybridEffect from "../useHybridEffect.js";


import useThingReport from "../useThingReport.js";
import useThing from "../useThing.js";
import useThings from "../useThings.js";
import useDatagram from "../useDatagram.js";
import useToken from "../useToken.js";

import { getSlug } from "../util/text.js";

import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";

import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
//import UpdateIcon from "@mui/icons-material/Update";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import { devFlag, debugFlag } from "../util/dev.js";

import LazyLoad from "react-lazyload";
import { toast } from "react-toastify";

import useDeepCompareEffect from "use-deep-compare-effect";

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
    // [theme.breakpoints.down("sm")]: {
    //   height: "auto",
    // },
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
      // [theme.breakpoints.down("sm")]: {
      //   maxHeight: "150px",
      // },
      // width: "auto",
      // height:'200px'
    },
  },
}));

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} size="large" />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));




interface WebExpandMoreProps extends IconButtonProps {
  webExpand: boolean;
}

const WebExpandMore = styled((props: WebExpandMoreProps) => {
  const { webExpand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, webExpand }) => ({
  transform: !webExpand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const engineState = process.env.REACT_APP_ENGINE_STATE;

// Either a datagram, or a uuid.
// datagram - to, from, subject, agentInput
function Thing({thing:inputThing, agentInput, canOpen, open, createdAt, canFold,onChange, onForget, onFlip, onSpawn, onOpen, onFold, onThingReport}) {



  //  const text = props.match.params.text;
  const theme = useTheme();
  const classes = useStyles(theme);

//  const { thing: inputThing, canOpen, open, canFold } = props;

  const { datagram, setDatagram } = useDatagram(inputThing);

//  var { agentInput } = props;

  //  if (datagram && datagram.input) {
  //    agentInput = datagram.input;
  //  }

  const webPrefix =
    datagram && datagram.webPrefix ? datagram.webPrefix : defaultWebPrefix;

  const [subject, setSubject] = useState();

  /*
  useEffect(() => {
    if (thing == null) {
      return;
    }
    console.debug("Thing thing", thing);

    if (thing.uuid) {
      console.log("Thing thing uuid", thing.uuid);
    }
  }, [thing]);
*/
  useHybridEffect(() => {
    if (inputThing == null) {
      return;
    }
/*
    if (Array.isArray(inputThing) && inputThing.length === 0) {
      return;
    }
*/
    console.log("Thing inputThing", inputThing);
    // Don't let the datagram be reset.
    if (typeof datagram !== "undefined") {
      return;
    }

    console.debug("Thing inputThing changed", inputThing);
    console.debug("Thing inputThing prior datagram", datagram);
    setDatagram(inputThing);
  }, [inputThing]);

  const { text } = useParams();

// This sets the overall poll interval which is experienced by Trace.
// Affects data consumption.

// Todo: Make a definable quantity user side.

  const variables = { poll: { interval: 1000, aggressive: "yes" } };


  const [url, setUrl] = useState();

  // This hook will get or create a Thing, given as minimum a datagram.
  // When provided with uuid, this hook will look for that Thing, returning false if not found.

  const {
    thing,
    spawnThing,
    flag: flagThing,
    flipThing,
    forgetThing,
    getThing,
   // setThing,
    updateThing,
  } = useThing(datagram);

  // This needs to be considered as to thingReport, datagram and data.

  // First off a use hook should return the thing you are using. Given a thing you are using.

  // In PHP agents are passed thing and agentInput (agent_input).

  // A datagram is defined by to, from, subject no more.
  // A thing is defined by to, from, subject, agentInput, createdAt, variables

  // In the case below this becomes useThingReport(thing, agentInput);
  // url > setSubject(url);
  // pollIntervale > setAgentInput({poll:{requestedInterval:pollInterval}});

  const {
    thingReport: data,
    flag: flagThingReport,
    getThingReport,
  } = useThingReport(url, open ? pollInterval : 60000);

  const { things, setThings } = useThings();
  const { token } = useToken();

  const startAt = createdAt;

  const currentAt = Date.now();

  const defaultPollInterval =
    datagram && datagram.pollInterval ? datagram.pollInterval : 0.5 * 60 * 1000; //ms
  const defaultTickInterval = 25; //ms
  const defaultTimerInterval = 25;
  //  const minimumPollInterval = 2 * 60 * 1000; //ms

const [webExpanded, setWebExpanded] = useState(false);

useEffect(() =>{

console.log("Thing webExpanded", webExpanded);

}, [webExpanded]);

  const [minimumPollInterval, setMinimumPollInterval] = useState(100);

  const maxBar = 20;
  const maxTick = 4;
  const [tick, setTick] = useState(0);
  const [bar, setBar] = useState(0);

  const [PNG, setPNG] = useState();

  var pollInterval =
    datagram && datagram.pollInterval
      ? datagram.pollInterval
      : defaultPollInterval;
  //  const [pollInterval, setPollInterval] = useState(defaultPollInterval);

  function setPollInterval(d) {
    datagram.pollInterval = d;
    setDatagram({ ...datagram });
  }

  useEffect(() => {
    if (datagram == null) {
      return;
    }

    console.debug("Thing " + nuuidText + " datagram", datagram);
    console.log("Thing " + nuuidText + " datagram uuid", uuid, datagram.subject);

    updateThing(datagram);

    if (typeof datagram.subject !== "undefined") {
      setSubject(inputThing.subject);
      console.log("Thing " + nuuidText + " inputThing setSubject", inputThing.subject);
      const u = webPrefix + getSlug(inputThing.subject) + ".json";
      console.log("Thing " + nuuidText + " inputThing setUrl", u);
      setUrl(u);
    }

    if (typeof datagram.pollInterval !== "undefined") {
      setTimedInterval(datagram.pollInterval);
    }
  }, [datagram]);

  useEffect(() => {
    if (datagram == null) {
      return;
    }

    if (datagram.pollInterval) {
      setTimedInterval(datagram.pollInterval);
    }

    console.log("Thing " + nuuidText + " datagram uuid", uuid);

    updateThing(datagram);
  }, [datagram]);

  function processFlag(flagName, flagState) {
    if (thing == null) {
      return true;
    }

    //const d = thing;
    const d = {};
    if (d.variables == null) {
      d["variables"] = {};
    }
    if (d.variables.flag == null) {
      d.variables["flag"] = {};
    }

    d.variables.flag[flagName] = flagState;
    console.log("Thing processFlag", flagName, flagState, d, datagram, thing);
    updateThing(d);
  }

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

  const [runTime, setRunTime] = useState();

  function updateTimer() {
    const runTime = Date.now() - startAt;

    setRunTime(runTime);
  }
  //const { open: initialExpanded } = props.datagram;

  //  const [expanded, setExpanded] = React.useState(initialExpanded === "open");
  //const [expanded, setExpanded] = React.useState(props.datagram.expanded);
  const [expanded, setExpanded] = useState(open);

  const [flipped, setFlipped] = React.useState();

  useHybridEffect(() => {

if (thing == null) {return;}

if (thing.uuid) {
    setUuid(thing.uuid);
}


    if (thing.pollInterval) {
      setTimedInterval(thing.pollInterval);
    }


  }, [thing]);

  useEffect(() => {
    if (data == null) {
      return;
    }

    const requestedAt = Date.now();
    setAgentRequestedAt(requestedAt);

    console.log(
      "Thing " + nuuidText + " thingReport data url",
      data && data.datagram && data.datagram.text,
      data,
      url
    );

    if (data) {
      console.log("Thing " + nuuidText + " thingReport data", data);
    }

    //setData(thingReport);
    if (
      data.thingReport &&
      data.thingReport.error &&
      data.thingReport.error.message
    ) {
      //console.log("Thing getThingReport", result.thingReport.error.message);
      console.error("Thing " + nuuidText + " getThingReport error", data.thingReport.error);
      setError(data.thingReport.error.message);
    }

    const elapsedTime = Date.now() - requestedAt;

    if (data && data.thingReport && data.thingReport.png) {
      var base64Icon = "data:image/png;base64," + data.thingReport.png;
      setPNG(base64Icon);
    }

    if (data && data.png) {
      var base64Icon = "data:image/png;base64," + data.png;
      setPNG(base64Icon);
    }

    setTimedInterval(elapsedTime);

    const p = requestedAt + pollInterval;
    setNextRunAt(p);
    console.log("nextRunAt p", p, zuluTime(new Date(p)));

    setFlag("green");
  }, [data]);

  const handleExpandClick = () => {
    console.log("Thing " + nuuidText + " handleExpandClick expanded");
    setExpanded(true);
  };

  const handleFoldClick = () => {
    setExpanded(false);
  };

  // Generate a UUID if not given one by App.
  //  const uuid = props.uuid ? props.uuid : uuidv4();

  const [uuid, setUuid] = useState();
  //const [nuuid, setNuuid] = useState();

const nuuidText = uuid ? getNuuid(uuid) : "none";

  useEffect(() => {
    console.log("Thing " + nuuidText + " start");
  }, []);

  useEffect(() => {
    console.log("Thing "+ nuuidText + " expanded uuid", expanded, datagram && datagram.uuid);
  }, [expanded]);

/*
  useEffect(() => {
    if (props.uuid === undefined) {
      //return;
    }
    console.log("Thing props.uuid", props.uuid);
    const u = props.uuid ? props.uuid : uuidv4();

    //    const u = props.uuid;
    const n = u.substring(0, 4);

    setUuid(u);
   // setNuuid(n.toUpperCase());
  }, [props.uuid]);
*/
  const [error, setError] = useState();

  useEffect(() => {
    console.info("Thing "+ nuuidText + " started");
    //getUuid();
    //getResponse(webPrefix);
  }, []);

  useEffect(() => {
    if (!uuid) {
      return;
    }
    console.info("Thing uuid", uuid);
    /*
var ass = datagram.associations;
if (ass == null) {ass = [];};
ass.push(uuid);
console.log("Thing uuid ass", uuid, ass);
    setDatagram({ ...datagram, associations:ass});
*/
  }, [uuid]);

  useEffect(() => {
    if (subject == null) {
      return;
    }
    console.log("Thing "+ nuuidText + " subject changed", subject);
    //setFlag('green');
    //   getResponse(webPrefix, true);

    //console.log("Thing datagram ", datagram);
    if (subject) {
      const u = webPrefix + getSlug(subject) + ".json";
      console.log("Thing "+ nuuidText + " datagram setUrl u", u);
      setUrl(u);
    }

    setDatagram({ ...datagram, subject: subject });
  }, [subject]);

  // refactor out
  //function getUuid() {
  //  return uuid;
  //}

  function handleRefresh() {
    if (flag === "red") {
      return;
    }
    setFlag("red");
    console.log("Thing handleRefresh");
    //    getResponse(webPrefix, true);
    getThingReport();
    //getThing();
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
    //forgetThing(e);
    //getThings();
    //return;
    if (onChange) {
      onChange("forget");
    }

    if (onForget) {
      onForget(e);
    }
    //getThings();
  };

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
  //}, []);
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
      //dev
      //return;

      console.log("Thing tickInterval");
      incrementTick();
    }, defaultTickInterval);

    return () => clearInterval(tickInterval);
  }, []);

  useEffect(() => {
    //dev
    //return;

    // If still processing the last one,
    // Skip a beat, do not request aother.
    if (flag === "red") {
      return;
    }

    const timerInterval = setInterval(() => {
      //      incrementTick();
      console.log("Thing timerInterval");
      updateTimer();
    }, defaultTimerInterval);

    return () => clearInterval(timerInterval);
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
    if (onChange) {
      onChange("flip");
    }

    if (onFlip) {
      onFlip(e);
    }
  };

  useEffect(() => {
    if (!error) {
      return;
    }
    handleSpawnThing({ subject: "error " + error.message });
  }, [error]);

  const handleSpawnThing = (e) => {
    console.log("Thing handleSpawnThing e", e);
    spawnThing();

    return;
    if (onChange) {
      onChange("spawn");
      return;
    }

    if (onSpawn) {
      onSpawn(e);
    }
  };

  const handleWebExpandClick = () => {
console.log("Thing handleWebExpandClick webExpanded", webExpanded);
    setWebExpanded(!webExpanded);
  };

  const handleAddThing = (e) => {
    console.log("Thing handleAddThing", datagram);

    // Passing getThing with null, will create an empty thing.
    getThing(null);
  };

  const handleOpenThing = (e) => {
    //setExpanded(true);
    handleExpandClick(e);
    //   setExpanded(true);
    if (onChange) {
      onChange("open");
    }

    if (onOpen) {
      onOpen(e);
    }
  };

const handleThingReport = (a) => {
onThingReport(a);

}

  const handleFoldThing = (e) => {
    handleFoldClick();
    //setExpanded(false);
    if (onChange) {
      onChange("fold");
    }

    if (onFold) {
      onFold(e);
    }
  };

  useEffect(() => {
    console.log("Thing databaseStatistics", databaseStatistics);
  }, [databaseStatistics]);
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
    if (!databaseStatistics[uuid]) {
      return null;
    }
    const txCountThing = databaseStatistics[uuid].txCount;
    //const rxCountThing = databaseStatistics[uuid].rxCount + databaseStatistics[uuid].rxErrorCount;
    const rxCountThing = databaseStatistics[uuid].rxCount;

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
            RXBYTES {rxBytes} estimated
            <br />
            TXBYTES {txBytes} estimated
            <br />
          </>
        )}

        {!expanded && (
          <>
            {/*
PACKETS {databaseStatistics[uuid] && databaseStatistics[uuid].txCount}
{"/"}
{databaseStatistics[uuid] && databaseStatistics[uuid].rxCount + databaseStatistics[uuid] && databaseStatistics[uuid].rxErrorCount}
<br />*/}
            PACKETS {txCountThing}
            {"/"}
            {rxCountThing}
            <br />
          </>
        )}
      </>
    );
  };

if (thing && thing.variables && thing.variables.card && thing.variables.card.visble === false) {

return (<>THING NOT VISIBLE</>);

}

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
        raised={flag === "red"}
      >
        <CardHeader
          action={
            <>
          {!flipped && <Subject thing={thing} agentInput={{edit:expanded}} setSubject={setSubject} onThingReport={(a)=>handleThingReport(a)} />}

              <Typography>{getNuuid(uuid)}</Typography>

              {/*            <IconButton>
              <MoreVertIcon />
            </IconButton>
*/}
            </>
          }
        />
{debugFlag && (<>JSONTHING {JSON.stringify(thing)}<br/></>)}

        {debugFlag && (<>{expanded ? "EXPANDED" : "NOT EXPANDED"}<br /></>) }
        {debugFlag && (
          <>
            pollInterval {pollInterval}
            <br />
          </>
        )}
        {debugFlag && (
          <>
            flag {flag && <>{flag}</>}
            <br />
          </>
        )}
        {debugFlag && (
          <>
            flagThing {flagThing && <>{flagThing}</>}
            <br />
          </>
        )}
        {debugFlag && (
          <>
            flagThingReport {flagThingReport && <>{flagThingReport}</>}
            <br />
          </>
        )}
        {/*<Item thing={{...datagram, uuid:uuid}} />*/}

        <Item thing={{...thing, uuid:uuid}} agentInput={null} updateThing={updateThing} />
{/*
<Typography className={classes.overlayNumber} >

        {debugFlag && datagram && datagram.score}
</Typography>*/}
        {token && token.message}
        {/*
        {expanded ? "expanded" : "not expanded"}
        {flipped ? "flipped" : "not flipped"}
        */}
        {error && <Error error={error} agentInput={data.thingReport} />}
        {/*expanded && <Button onClick={handleSpawnThing}>SPAWN</Button>*/}
        {!expanded && <Button  variant="irreversible" onClick={handleForgetThing}>FORGET</Button>}
        {/*expanded && (
          <Button onClick={handleFlipThing}>
            {flipped ? "MESSAGE" : "SOURCE"}
          </Button>
        )*/}
        {!expanded && (
          <ThingButton
            thing={thing} agentInput={{text: "Open", link: webPrefix + "thing/" + uuid}}
          />
        )}

{/*
          <ThingButton
            //          thing={{ subject: ("thing/"+ (uuid ==null ? "" : uuid)), a>
            //          thing={{ subject: "add-thing", agentInput: "Add Thing" }}
            thing={{
              ...thing
//              subject: "thing/" + thing.uuid + "/",
//              agentInput: "Add Thing",
            }}
agentInput={{text:"Start New Thing",link:webPrefix + "thing"}}
          />

*/}{/*
       {expanded && <Button  variant="default" onClick={handleAddThing}>ADD</Button>}
*/}
        {data &&
          data.thing &&
          data.thing.associations &&
          data.thing.associations.includes(uuid) && (
            <ThingButton
              thing={{
                ...datagram,
                subject: "thing/" + uuid + "/associate",
                agentInput: "Associate uuid",
              }}
            />
          )}
        {canFold && expanded && <Button  variant="default" onClick={handleFoldThing}>FOLD</Button>}
        {canOpen && !expanded && (
          <Button  variant="default" onClick={handleOpenThing}>OPEN</Button>
        )}
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
              {/*{TOTAL CHARACTERS RECEIVED DATA {totalBytesReceivedData}
              <br />*/}
              <Associations thing={datagram} />
              {error && error.message}
              <br />
            </>
          )}

<Typography variant="note" sx={{ fontSize: '14px', color: 'grey' }} >
          {thing && thing.createdAt && <>{humanAge(thing.createdAt)}</>}
</Typography>

         {!expanded && !flipped && (
            <>
{debugFlag && (<>LAZY LOAD</>)}
              <LazyLoad height={400} offset={200} once>
                <div>
{debugFlag && (<>AGENTS</>)}
                  <Agents
                    thing={thing}
                    agentInput={{
                      stack: { url: webPrefix },
                      snapshot: false,
                      agents: { maximum: 1 },
                    }}
                    onThingReport={(t)=>handleThingReport(t)}
                  />
                </div>
              </LazyLoad>

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

          {!flipped && (
            <>
              <ToGoTime
                thing={thing}
                agentInput={agentInput}
                toGoTime={nextRunAt - currentAt}
                onRefresh={handleRefresh}
              />
            </>
          )}
          {expanded && (
 <div style={{ maxHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center' }}>
    <CardMedia
      component="img"
      src={PNG}
      onError={(event) => (event.target.style.display = 'none')}
      style={{ maxHeight: '100%', objectFit: 'contain' }}
    />
  </div>
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

          {expanded && data && data.thingReport && data.thingReport.log && (
            <div
              dangerouslySetInnerHTML={{ __html: data && data.thingReport.log }}
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
          {/*
              <div>
                <Login token={token} datagram={datagram} flavour={"card"} />
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
                <Token thing={datagram} flavour={"card"} />
              </div>
            )}

          {expanded && (
            <>
              <Content thing={thing} agentInput={data && data.thingReport} />
              <br />
              {error && error.message}
              <br />
              {debugFlag && <Typography>RUNTIME {runTime}</Typography>}
              {!data && <>NOT DATA</>}
              <Agents
                thing={{...thing, uuid:uuid}}
                agentInput={{ ...agentInput, stack: { url: webPrefix } }}
                onThingReport={(t)=>handleThingReport(t)}
              />
              {subject && subject.toLowerCase().indexOf("ping") !== -1 && (
                <div>
                  <Ping
                    user={null}
                    //thing={data.thing}
                    variables={{ ping: { uuid: data.ping } }}
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

                {/*                <Agent
                  user={null}
                  thing={data && data.thing}
                  agent_input={webPrefix}
                />
*/}
                {data && data.thingReport && data.thingReport.agent}
              </div>
              <div>
                {/* Note */}


        <WebExpandMore
          webExpand={webExpanded}
          onClick={handleWebExpandClick}
          aria-expanded={webExpanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </WebExpandMore>
      <Collapse in={webExpanded} timeout="auto" unmountOnExit>
                <div dangerouslySetInnerHTML={{ __html: data && data.web }} />
</Collapse>
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
        ASSOCIATIONS
        <div>
          {/*          {thing && thing.variables && thing.variables.collection && (thing.variables.collection !== false) && expanded  && ( */}

          {/*{thing && thing.agentInput && thing.agentInput.collection ? "COLLECTION IS TRUE" : "COLLECTION IS FALSE"} */}

          {/*          {thing && thing.agentInput && thing.agentInput.collection && (thing.agentInput.collection === true) && expanded && ( */}
          {true && thing && expanded && expanded === true && (
            <Collection
              thing={{ ...thing, variables: { ...thing.variables } }}
              agentInput={{ ...agentInput, collection: false }}
              onThingReport={(r)=>{handleThingReport(r)}}
            />
          )}
        </div>
        <div>
          <DataReport />
        </div>
      </Card>
    </>
  );
}

export default Thing;
