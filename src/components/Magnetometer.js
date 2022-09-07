import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

import Button from "@mui/material/Button";
import UpdateIcon from '@mui/icons-material/Update';

import Stream from "../components/Stream.js";


export default function Magnetometer({ vector }) {

const [scalar, setScalar] = useState();

useEffect(() =>{

const a = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);

setScalar(a);

  }, [vector]);

  return (
    <>
      POLL<br />
{scalar && scalar}
X {vector.x}
Y {vector.y}
Z {vector.z}

            <Stream
              hide={true}
              quantity={{
                units: "T",
                amount:
                  scalar
              }}
              period={100}
            />
            <br />
            <Stream
              hide={true}
              quantity={{
                units: "T",
                amount:
                  scalar
              }}
              period={5 * 1000}
            />
            <br />
            <Stream
              hide={true}
              quantity={{
                units: "T",
                amount:
scalar
              }}
              period={1 * 60 * 1000}
            />
            <br />


      <br />
    </>
  );
}

Magnetometer.propTypes = {
  //  token: PropTypes.func.isRequired
};
