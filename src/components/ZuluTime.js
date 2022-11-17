import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";

import { humanTime, humanAge, humanRuntime, zuluTime } from "./../util/time.js";
import { zuluTime as zuluTimeF } from "./../util/time.js";

export default function ZuluTime({ zulutime, onRefresh }) {
  const [zuluTime, setZuluTime] = useState();
  const [posixTime, setPosixTime] = useState();

  useEffect(() => {
    updateZuluTime();
    const interval = setInterval(() => {
      updateZuluTime();
    }, 1); // 1ms

    return () => clearInterval(interval);
  }, []);

  function updateZuluTime() {
    const d = new Date();
    const ts = d.getTime();

    setZuluTime(zuluTimeF());
    setPosixTime(ts);
  }

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
      ZULUTIME {zuluTime}
      <br />
      POSIX {posixTime}
      <br />
    </>
  );
}

zuluTime.propTypes = {
  //  token: PropTypes.func.isRequired
};
