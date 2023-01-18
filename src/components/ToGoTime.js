import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import UpdateIcon from '@mui/icons-material/Update';

import { humanTime, humanAge, humanRuntime } from "./../util/time.js";

export default function ToGoTime({ toGoTime, onRefresh }) {

  useEffect(() => {
    if (toGoTime == null) {
      return;
    }

console.log("ToGoTime toGoTime", toGoTime);

if (toGoTime < 0) {onRefresh();}

  }, [toGoTime]);

  return (
    <>
<UpdateIcon onClick={onRefresh}>REFRESH</UpdateIcon>
      TOGOTIME{' '}
 {humanRuntime(toGoTime)}

      <br />
    </>
  );
}

ToGoTime.propTypes = {
  //  token: PropTypes.func.isRequired
};
