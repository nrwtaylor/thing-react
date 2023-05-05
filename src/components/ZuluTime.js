import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import { UpdateIcon } from "@mui/icons-material/Update";

import { humanTime, humanAge, humanRuntime, zuluTime } from "./../util/time.js";
import {
  zuluTime as zuluTimeF,
  humanTime as humanTimeF,
} from "./../util/time.js";

export default function ZuluTime({ zulutime, onRefresh }) {
  const [zuluTime, setZuluTime] = useState();
  const [posixTime, setPosixTime] = useState();
  const [humanTime, setHumanTime] = useState();

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
    setHumanTime(humanTimeF());
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
      HUMANTIME {humanTime}
    </>
  );
}

zuluTime.propTypes = {
  //  token: PropTypes.func.isRequired
};
