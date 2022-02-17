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

  const [reply, setReply] = useState("");

  //const user = props.user;
//  const from = props.thing.from;
//  const to = props.thing.to;
//  const comment = props.thing.comment;
//  const timestamp = props.thing.created_at;

  const thing = props.thing;

//  const uuid = props.thing.uuid;

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  useEffect(() => {
    getAgent();
  }, [getAgent]); // eslint-disable-line react-hooks/exhaustive-deps

  const [open, setOpen] = useState(false);

  const replyAgentDialog = (thing) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("Agent thing", thing);
  }, [thing]);

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
    console.log("Axios call " + agent);
    axios.get(`https://stackr.ca/` + agent + `.json`).then((res) => {
      let thingy = res.data;
      console.log("Agent res.data", res.data);
      //      setData({ thing: thingy.thing, thing_report: thingy.thing_report });
      setData(res.data);
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
      <ListItem key={thing && thing.uuid} alignItems="flex-start">
        <ListItemText
          primary={
            <Typography variant="body2">
              timestamp {timeStamp()}
              from {fromName()}
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
