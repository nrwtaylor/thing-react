import React, { useState, useEffect } from "react";

import * as d3 from "d3";
import PolarChart from "../components/PolarChart.js";

import "../index.css";

import { humanTime, humanRuntime, zuluTextSpread } from "../util/time.js";

import { minMaxData, minMaxTicks } from "../util/data.js";

function TraceCircle({ thing, agentInput, onThingReport }) {
  const { data } = agentInput;

  const [circleRanging, setCircleRanging] = useState();
  const [conditionedData, setConditionedData] = useState();
  const [colors, setColors] = useState();

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

newData.reverse();

const newArray = newData.map((n)=>{

return insertNullObjects(n);

});
console.log("TraceCircle newArray", newArray);
//    setConditionedData(newData);

    setConditionedData(newArray);

  }, [data]);

function insertNullObjects(data) {
//return data;
  const newArray = [];
//console.log("insertNullObjects data", data);
  for (let i = 0; i < data.length; i++) {
console.log("TraceCircle insertNullObjects data[i]", data[i]);
    newArray.push(data[i]);


    if (i > 0 && data[i+1]) {
      const currentTime = data[i].x;
      const nextTime = data[i + 1].x;

      const timeDifference = currentTime - nextTime;
//console.log("timeDifference data[i]", timeDifference, data[i]);

      if (timeDifference > 3600000) { // 1 hour in milliseconds
        const averageTime = (currentTime + nextTime) / 2;
        newArray.push({ x: averageTime, y: null });
      }

    }

  }

//newArray.push(data[data.length]);

  return newArray;
}

  useEffect(() => {
    if (conditionedData == null) {
      return;
    }

    const mergedArray = [].concat(...conditionedData);

    //console.log("TraceCircle mergedArray", mergedArray);
    //const mergedArray = conditionedData.slice(-1);

    console.log("TraceCircle mergedArray", mergedArray);

    const [min, max] = minMaxData(mergedArray, "y");
    const a = minMaxTicks(min, max, 5);

    console.log("TraceCircle circleRanging", a);
    setCircleRanging(a);
  }, [conditionedData]);

  useEffect(() => {
    updateTime();

    const interval = setInterval(() => {
      updateTime();
    }, 10000); // 20 Hz was 200.ircleRangin

    return () => clearInterval(interval);
  }, []);

  function updateTime() {
    const x = new Date().getTime();
    setCurrentTime(x);
  }

  useEffect(() => {
    if (conditionedData == null) {
      return;
    }
    const c =
      conditionedData &&
      conditionedData
        .map((c, index) => {
          if (index === 0) {
            return "#ff0000";
          }
          return hexShade(index, 1);
        })
        .reverse();
    setColors(c);
  }, [conditionedData]);

  useEffect(() => {
    console.log("TraceCircle data", data);
  }, [conditionedData]);

  if (conditionedData == null) {
    return;
  }

  if (colors == null) {
    return;
  }

  return (
    <>
      <PolarChart
        agentInput={{
          circleData: circleRanging,
          data: conditionedData,
          colors: colors,
          strokeWidth: 4,
        }}
      />
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
