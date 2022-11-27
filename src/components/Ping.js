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
import useSnapshot from "../useSnapshot.js";



function Ping(props) {
  const user_name = props.user_name; // TODO
  const agent_input = props.agent_input;
  const webPrefix = agent_input;
  //const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");

const [ping, setPing] = useState();

  const toSnapshot = "http://192.168.10.10/snapshot-ping.json";
  const { snapshot, flag, snapshotGetTime } = useSnapshot(toSnapshot);

useEffect(() =>{

if (props.ping) {setPing(props.ping); return;}

if (snapshot && snapshot.ping) {
setPing(snapshot.ping);
}
}, [snapshot]);



  const [data, setData] = useState({
    ping: ping,
    thing_report: { sms: "No response. Yet." },
  });

  const [pings, setPings] = useState([]);
  const [open, setOpen] = useState(false);

//  const [snapshotGetTime, setSnapshotGetTime] = useState();

  function humanTime(timestamp) {
    const ts = new Date();
    return ts.toISOString();
  }

  function timeStamp() {
    var date = Date.now();
    return date.toString();
  }

  const startTime = new Date();

  function callBack() {
    console.log("Agent callBack called.");
  }

  useEffect(() => {
    const ps = [];
    if (!ping) {
      return;
    }

console.log("Ping ping", ping);
    ping.map((p) => {
      if (!p.data) {
        return;
      }
      // Parse ping return.
      // Identity and read.
      const pingArray = p.data.split("=");
if (!pingArray[1]) {return;}
      const pingArray2 = pingArray[1].split("/");

      const measure =
        parseFloat(pingArray2[0]) +
        parseFloat(pingArray2[1]) +
        parseFloat(pingArray2[2]);
      ps.push({ host: p.host, amount: pingArray2[0], amount2:parseFloat(pingArray2[1]), amount3:parseFloat(pingArray2[2]) });
    });

    setPings(ps);
  }, [ping]);

  return (
    <>
      <div>PING</div>
      <div>
        <br />
        GET TIME {snapshotGetTime}ms {Math.round(1000 / snapshotGetTime, 1)}Hz
        <br />
        {data && data.ping && (
          <>
            PING
            <br />
          </>
        )}
        {pings &&
          pings.map((ping, index) => {
            return (
              <>
                HOST{' '}
                {ping.host}
                <Stream
                  hide={true}
quantities={[{
                    units: "ms",
                    amount: ping.amount,
                  },
{
                    units: "ms",
                    amount: ping.amount2,
                  },
{
                    units: "ms",
                    amount: ping.amount3,
                  }
]}

                  quantity={{
                    units: "ms",
                    amount: ping.amount,
                  }}
                  period={5 * 1000}
                />
                <br />
              </>
            );
          })}
      </div>
    </>
  );
}

export default Ping;
