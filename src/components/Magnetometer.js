import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";

import Stream from "../components/Stream.js";

export default function Magnetometer({ vector }) {
  // const {vector} = props;

  const [scalar, setScalar] = useState();

  useEffect(() => {
    if (!vector) {
      return true;
    }
    console.log("Magnetometer vector", vector);
    const { x, y, z } = vector;
    console.log("Magnetoment x y z", x, y, z);
    //if (!x) return;
    //if (!y) return;
    //if (!z) return;

    const a = Math.sqrt(
      x.amount * x.amount + y.amount * y.amount + z.amount * z.amount
    );

    setScalar(a);
  }, [vector]);

  //return (<>MAGNETOMETER</>);

  //return (<>{scalar && scalar}</>);

  return (
    <>
      MAGNETOMETER
      <br />
      {/*scalar && scalar*/}
      {/*
X{' '}{vector && vector.x}Y{' '}{vector && vector.y}Z{" "}
      {vector && vector.z}
*/}
      <Stream
        hide={true}
        quantity={{
          units: "T",
          amount: scalar,
        }}
        period={100}
      />
      <br />
      <Stream
        hide={true}
        quantity={{
          units: "T",
          amount: scalar,
        }}
        period={5 * 1000}
      />
      <br />
      <Stream
        hide={true}
        quantity={{
          units: "T",
          amount: scalar,
        }}
        period={1 * 60 * 1000}
      />
      <br />
      <br />
    </>
  );
}

Magnetometer.propTypes = {
  vector: PropTypes.func.isRequired,
};
