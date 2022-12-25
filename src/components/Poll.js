import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import UpdateIcon from '@mui/icons-material/Update';

import { humanTime } from "./../util/time.js";

export default function Poll({ poll, pollInterval, variables, onPoll }) {

  useEffect(() => {
    if (!poll) {
      return;
    }

//    if (pollInterval === null) {
//      return;
//    }

  }, [poll]);

  return (
    <>
      POLL<br />
INTERVAL{' '}{poll && poll.interval}
<br />
AGGRESSIVE{' '}<Button onClick={onPoll}>{poll && poll.aggressive}</Button>

      <br />
    </>
  );
}

Poll.propTypes = {
  //  token: PropTypes.func.isRequired
};
