import React, { useState, useEffect } from "react";

import "../index.css";
import {
  Typography,
  //  Avatar,
  //  ListItemAvatar,
  Box,
} from "@mui/material";

import {
  Button,
  TextField,
  IconButton,
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
import Stream from "../components/Stream.js";
import BubbleLevel from "../components/BubbleLevel.js";

function Error(props) {
  const { error } = props;
  const { agentInput } = props;
  const user_name = props.user_name; // TODO
  var agent_input = props.agent_input;
  if (props.agent_input == null) {
    agent_input = agentInput;
  }

  //  const agent_input = props.agent_input;
  //  const agent _input = props.agentInput;
  const webPrefix = agent_input;
  const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");

  const ping = props.ping;

  const [data, setData] = useState({
    ping: ping,
    thing_report: { status:"loading", sms: "No response. Yet." },
  });

  const [pings, setPings] = useState([]);
  const [open, setOpen] = useState(false);

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
    ping.map((p) => {
      if (!p.data) {
        return;
      }
      // Parse ping return.
      // Identity and read.
      const pingArray = p.data.split("=");
      if (!pingArray[1]) {
        return;
      }
      const pingArray2 = pingArray[1].split("/");

      const measure =
        parseFloat(pingArray2[0]) +
        parseFloat(pingArray2[1]) +
        parseFloat(pingArray2[2]);
      ps.push({
        host: p.host,
        amount: pingArray2[0],
        amount2: parseFloat(pingArray2[1]),
        amount3: parseFloat(pingArray2[2]),
      });
    });

    setPings(ps);
  }, [ping]);

  useEffect(() => {
    console.log("Error agentInput", agentInput);
  }, [agentInput]);
  if (error == null) {
    return null;
  }

  return (
    <>
      {error && <div>ERROR</div>}

      {error && <div style={{ backgroundColor: "red" }}>{error}</div>}

      {error.toLowerCase() === "network error" &&
        "What now? Add Access-Control-Allow-Headers and Access-Control-Allow-Credentials in browser CORS control"}
      {/*
{agentInput.thingReport.error.message}
*/}

      {agentInput &&
        agentInput.error &&
        agentInput.error.config &&
        agentInput.error.config.url}
      <div>
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
                HOST {ping.host}
                <Stream
                  hide={true}
                  cquantities={[
                    {
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
                    },
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

export default Error;
