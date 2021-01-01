import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../index.css";
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
  Edit
} from '@material-ui/icons'; 


//import firebase, { firestore } from "../../firebase";

import Forget from "../../components/Forget/Forget.js";

function Agent(props) {


  const user_name = props.user_name; // TODO rename this stuff so it isn't c>

  const [reply, setReply] = useState("");

  //const user = props.user;
  const from = props.thing.from;
  const to = props.thing.to;
  const comment = props.thing.comment;
  const timestamp = props.thing.created_at;

  const uuid = props.thing.uuid;

//  const db = firebase.firestore();

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



  function fromName() {
    if (from === undefined) {
      return "Agent";
    }
    return from;
  }

  const editAgent = () => {

  //   const db = firebase.firestore();

    const datagram = {
      comment: reply,
      to: "merp",
      from: user_name,
      association: uuid, 
//      created_at: firebase.firestore.FieldValue.serverTimestamp(),
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

    if (timestamp === undefined) {
      return "X";
    }

    if (timestamp === null) {
      return "X";
    }


    const date = timestamp.toDate();
    const d = date.toString();

    const thing_date = new Date(d);
    const today_date = new Date();
    const seconds_diff = Math.round(
      today_date.getTime() - thing_date.getTime()
    );
    return thing_date.toLocaleDateString("en-US");
  }

  // TODO Call Thing > Database.
  function getAgent(agent) {
    console.log("Axios call " + agent);
    axios.get(`https://stackr.ca/` + agent + `.json`).then((res) => {
      let thingy = res.data;
      setData({ thing: thingy.thing, thing_report: thingy.thing_report });
    });
  }


  function callBack() {
    console.log("Thing callBack called.");
  }

  const deleteButton = (<Forget uuid={uuid} callBack={callBack} />)

  return (
    <>

      <ListItem key={uuid} alignItems="flex-start">
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
                {comment}
              </Typography>
              <Box className="delete-button">{deleteButton}</Box>
            </>
          }
        />

      </ListItem>

            <IconButton
              aria-label="Edit"
              onClick={() => replyAgentDialog()}
              
            ><Edit /></IconButton>

        <Dialog open={open} onClose={handleClose} fullWidth>
            uuid {uuid} 
            from {from} 
            to {to} 
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
