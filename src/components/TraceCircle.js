import React, { useState, useEffect } from "react";

import * as d3 from "d3";
import PolarChart from "../components/PolarChart.js";

import "../index.css";
import {
  Typography,
  //  Avatar,
  //  ListItemAvatar,
  Box,
} from "@mui/material";

/*
import {
  Button,
  TextField,
  IconButton,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
*/
//import Frequency from "../components/Frequency.js";

//import useThing from "../useThing.js";

import { humanTime, humanRuntime, zuluTextSpread } from "../util/time.js";

function TraceCircle(props) {
  const { data } = props;
  const canSwipe = true;
//  const shade = true;

  const [conditionedData, setConditionedData] = useState();

  //const now = new Date().getTime();

  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    if (data == null) {
      return;
    }
    if (data.length === 0) {
      return;
    }

    // Convert raw data to the desired format
    // Little bit hairy this, because the first key
    // is amount. So has no index.

    const newData = [];
    data.forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (key.startsWith("amount")) {
          var seriesIndex = parseInt(key.replace("amount", ""));

          if (key === "amount") {
            seriesIndex = 0;
          }

          if (!newData[seriesIndex]) {
            newData[seriesIndex] = [];
          }

          const t = new Date(obj.at).getTime();
          newData[seriesIndex].push({ x: t, y: value });
        }
      });
    });

    setConditionedData(newData.reverse());
  }, [data]);

  useEffect(() => {
    updateTime();

    const interval = setInterval(() => {
      updateTime();
    }, 10000); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, []);

  function updateTime() {
    const x = new Date().getTime();
    setCurrentTime(x);
  }

  const colors =
    conditionedData &&
    conditionedData
      .map((c, index) => {
        if (index === 0) {
          return "#ff0000";
        }
        return hexShade(index, 1);
      })
      .reverse();

  if (conditionedData == null) {
    return;
  }

  return (
    <>
      <PolarChart data={conditionedData} colors={colors} strokeWidth={4} />
    </>
  );
}

function hexShade(n, maxN) {
  //const percent = n / maxN;
  const darkestShade = 60;
  const lightestShade = 180;
  const factorShade = 20;
  var conditionN = n * factorShade + darkestShade;

  if (conditionN > lightestShade) {
    conditionN = lightestShade;
  }
  //conditionN = 0; // balck
  //conditionN = 125; //grey
  //conditionN = 255; //clear/white
  //conditionN = 180;

  const hexString = conditionN.toString(16);
  return "#" + hexString + hexString + hexString;
}

export default TraceCircle;
