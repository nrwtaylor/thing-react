import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import UpdateIcon from '@mui/icons-material/Update';

import { humanTime, humanAge, humanRuntime } from "./../util/time.js";

export default function Host({ host, onRefresh }) {

  useEffect(() => {
    if (!host) {
      return;
    }

    if (host === null) {
      return;
    }
  }, [host]);

  return (
    <>

<div class="host">
Hosted in Canada
<br />
Stackr Interactive Ltd
<br />201-3701 Hastings Street, Burnaby, BC V5C 2H6
<br />
<br />
</div>
    </>
  );
}

Host.propTypes = {
  //  token: PropTypes.func.isRequired
};
