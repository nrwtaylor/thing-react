import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";


import useToken from "../useToken.js";
import { setThing } from "../util/database.js";

import { humanTime } from "./../util/time.js";

export default function Datagram({ datagram, setDatagram }) {
  const [subject, setSubject] = useState(datagram.subject);
  const [to, setTo] = useState(datagram.to);
  const [pollInterval, setPollInterval] = useState(datagram.pollInterval);

  const {token} = useToken();

  // Display token.

  function subjectChange(e) {
    console.log("datagram subjectChange", datagram);
    var d = e.target.value;
    setSubject(d);
    datagram.subject = d;
    setDatagram({ ...datagram });

    console.log("datagram uuid", datagram.uuid);

    setThing(datagram.uuid, { subject: d }, token);
  }

  function toChange(e) {
    console.log("datagram toChange", datagram);
    var d = e.target.value;
    setTo(d);
    datagram.to = d;
    setDatagram({ ...datagram });

    console.log("datagram uuid", datagram.uuid);

    setThing(datagram.uuid, { to: d }, token);
  }

  function pollIntervalChange(e) {
    console.log("datagram toChange", datagram);

    var d = parseFloat(e.target.value);

    if (isNaN(d)) {
      d = 1;
    }

    //        if(parseInt(value) !== 0) {
    //            this.setState({ value });
    //        }
    if (d === 0) {
      d = 1;
    }

    setPollInterval(d);
    datagram.pollInterval = d;
    setDatagram({ ...datagram });

    console.log("datagram uuid", datagram.uuid);

    setThing(datagram.uuid, { pollInterval: d }, token);
  }

  useEffect(() => {
    console.log("Token token", datagram);
    if (!datagram) {
      return;
    }

    if (datagram === null) {
      return;
    }
  }, [datagram]);

  return (
    <>
      {/*
            <TextField
//              error = {validation.validator(variableType,subject)}
              variant="filled"
              margin="normal"
              label={'subject'}
              type="text"
              fullWidth
              name="updateSubject"
              value={subject}
              onChange={subjectChange}
            />
*/}
      <TextField
        //              error = {validation.validator(variableType,subject)}
        variant="filled"
        margin="normal"
        label={"to"}
        type="text"
        fullWidth
        name="updateTo"
        value={to}
        onChange={toChange}
      />

      <TextField
        //              error = {pollInterval<1}
        variant="filled"
        margin="normal"
        label={"pollInterval"}
        type="text"
        fullWidth
        name="updatePollInterval"
        value={pollInterval}
        onChange={pollIntervalChange}
      />

      <Typography>CREATED AT {datagram && datagram.createdAt}</Typography>
    </>
  );
}

Datagram.propTypes = {
  //  token: PropTypes.func.isRequired
};
