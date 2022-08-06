import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

import Button from "@mui/material/Button";
import UpdateIcon from '@mui/icons-material/Update';

import { humanTime } from "./../util/time.js";

export default function ToGoTime({ toGoTime, onRefresh }) {

  useEffect(() => {
    if (!toGoTime) {
      return;
    }

    if (toGoTime === null) {
      return;
    }
  }, [toGoTime]);

  return (
    <>
      TOGOTIME
{toGoTime}
<UpdateIcon onClick={onRefresh}>REFRESH</UpdateIcon>

      <br />
    </>
  );
}

ToGoTime.propTypes = {
  //  token: PropTypes.func.isRequired
};
