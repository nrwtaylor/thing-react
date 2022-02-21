import React, { useState, useEffect } from "react";
import axios from "axios";

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

function Agent(props) {
  const user_name = props.user_name; // TODO

  const [flag, setFlag] = useState();
  //const [requestedAt, setRequestedAt] = useState();
  const [reply, setReply] = useState("");

  const thing = props.thing;

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

/*
  useEffect(() => {
    setFlag("green");

//    getAgent();
  }, [getAgent]); // eslint-disable-line react-hooks/exhaustive-deps
*/
  const [open, setOpen] = useState(false);

  const replyAgentDialog = (thing) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
/*
  useEffect(() => {
    console.log("Agent thing", thing);
  }, [thing]);
*/

  function humanTime(timestamp) {

   const ts = new Date();
   return ts.toISOString();

  }


  function fromName() {
    if (thing === undefined) {
       return "Agent";
    }


    if (thing && thing.from === undefined) {
      return "Agent";
    }


    return thing.from;
  }

  const editAgent = () => {
    const datagram = {
      comment: reply,
      to: "merp",
      from: user_name,
      association: thing.uuid,
    };
    console.log("Datagram");
    console.log(datagram);

    /*
    db.collection("things")
      .add(
        datagram
      )
      .then(function () {
        console.log("Document succesfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
*/

    setOpen(false);
  };

  function timeStamp() {
    var date = Date.now();
    return date.toString();
    //    return date.toLocaleDateString("en-US");
    /*
    if (timestamp === undefined) {
      return "X";
    }

    if (timestamp === null) {
      return "X";
    }


//    const date = timestamp.toDate();
    const d = date.toString();

    const thing_date = new Date(d);
    const today_date = new Date();
    const seconds_diff = Math.round(
      today_date.getTime() - thing_date.getTime()
    );
    return thing_date.toLocaleDateString("en-US");
*/
  }

  // TODO Call Thing > Database.
  function getAgent(agent) {

    if (flag === 'red') {return;}
    setFlag("red");
    console.log("Axios call " + agent);
    const webPrefix = process.env.REACT_APP_WEB_PREFIX
    //setRequestedAt(Date.now());
    axios.get(webPrefix + agent + `.json`).then((res) => {

      let thingy = res.data;
      console.log("Agent res.data", res.data);
      setData(res.data);

      // dev flag available not available
      //setFlag("green");
    })
.catch((error) => {
console.log("Agent error", error);
});
  }

  function callBack() {
    console.log("Agent callBack called.");
  }

  const deleteButton = <Forget uuid={thing && thing.uuid} callBack={callBack} />;




  return (
    <>
      AGENT
{/* flag */}

      <ListItem key={thing && thing.uuid} alignItems="flex-start">
        <ListItemText
          primary={
            <Typography variant="body2">
              timestamp {timeStamp()}
<br />
              humanTime {humanTime(timeStamp())}
<br />
              from {fromName()}
<br />

            </Typography>
          }
          secondary={
            <>
              <Typography component="span" variant="body1" color="textPrimary">
                {thing && thing.subject}
                {data.etime}
                To {thing && thing.to}
              </Typography>
              <Box className="delete-button">{deleteButton}</Box>
            </>
          }
        />
      </ListItem>

      <IconButton aria-label="Edit" onClick={() => replyAgentDialog()}>
        <Edit />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth>
        uuid {thing && thing.uuid}
        from {thing && thing.from}
        to {thing && thing.to}
        user_name {user_name}
        <DialogContent>
          <TextField
            multiline
            autoFocus
            margin="normal"
            label="Type your reply here... (TODO)"
            type="text"
            fullWidth
            name="updateReply"
            value={reply}
            onChange={(event) => setReply(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editAgent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Agent;
