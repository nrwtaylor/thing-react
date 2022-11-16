import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

import Button from "@mui/material/Button";
import UpdateIcon from '@mui/icons-material/Update';

import { humanTime, humanAge, humanRuntime,zuluTime } from "./../util/time.js";
import { zuluTime as zuluTimeF } from "./../util/time.js";

export default function ZuluTime({ zulutime, onRefresh }) {

const [zuluTime, setZuluTime] = useState();

const d = new Date();
const ts = d.getTime();

  useEffect(() => {
    if (!zuluTime) {
      return;
    }

    if (zuluTime === null) {
      return;
    }
  }, [zuluTime]);



  return (
    <>
      ZULUTIME{' '}
 {zuluTimeF()}
<br />POSIX{' '}{ts}
      <br />
    </>
  );
}

zuluTime.propTypes = {
  //  token: PropTypes.func.isRequired
};
