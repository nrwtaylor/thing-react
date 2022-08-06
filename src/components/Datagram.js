import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { humanTime } from "./../util/time.js";

export default function Datagram({ datagram, setDatagram }) {
  const [subject, setSubject] = useState(datagram.subject);
  // Display token.

  function subjectChange(e) {
    var d = e.target.value;
    setSubject(d);
    datagram.subject = d;
    setDatagram({...datagram});
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
              <Typography>UUID {datagram && datagram.uuid}</Typography>
              <Typography>TO {datagram && datagram.to}</Typography>
{/*              <Typography>SUBJECT {datagram && datagram.subject}</Typography> */}


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





              <Typography>CREATED AT {datagram && datagram.createdAt}</Typography>
    </>
  );
}

Datagram.propTypes = {
  //  token: PropTypes.func.isRequired
};
