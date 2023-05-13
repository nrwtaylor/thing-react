import React, { useState, useEffect } from "react";

import * as d3 from "d3";
import PolarChart from "../components/PolarChart.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import "../index.css";
import {
  Typography,
  //  Avatar,
  //  ListItemAvatar,
  Box,
} from "@mui/material";

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

import Frequency from "../components/Frequency.js";

import useThing from "../useThing.js";

import { humanTime, humanRuntime, zuluTextSpread } from "../util/time.js";

import { useSwipeable } from "react-swipeable";

function TraceCircle(props) {
  const { data } = props;
  //  const [canSwipe, setCanSwipe] = useState();
  const canSwipe = true;
  const shade = true;

const [conditionedData, setConditionedData] = useState();

  //const now = new Date().getTime();
  const [timeSeriesData, setTimeSeriesData] = useState();
  const [xSeriesData, setXSeriesData] = useState();
  const [ySeriesData, setYSeriesData] = useState();

  const [yMean, setYMean] = useState();

  const [ySeriesMax, setYSeriesMax] = useState(30);

  const [currentTime, setCurrentTime] = useState();
  const [spread, setSpread] = useState();

  const [firstAt, setFirstAt] = useState();
  const [lastAt, setLastAt] = useState();

  const availableWindows = ["", "1m", "2m", "10m", "15m", "30m", "1h"];

  // This will get the twilight times.
  //const { thing } = useThing({ subject: "day twilight" });

  const maxCycles = 100;
  const cycles = Array.from(Array(maxCycles), (_, x) => x);

  useEffect(() => {
    if (data == null) {
      return;
    }

console.log("TraceCircle data", data);
    if (Array.isArray(data) && data.length === 0) {
      return;
    }
    //console.log("Trace data", data);

    const first = new Date(data[0].at);
    const last = new Date(data[data.length - 1].at);

    //console.log("first last", first, last);
    //return;
    const spreadEvent = last - first > 0 ? last - first : first - last;

    setFirstAt(data[0].at);
    setLastAt(data[data.length - 1].at);

    const t = data.map((d) => {
      var cycle = 1; // 1 day
      //const milliseconds = new Date(d.at).getTime() -  new Date().getTime();
      //const cycleCount = (milliseconds / (cycle * 60 * 60 * 24 * 1000));

      //
      //d['amount'+cycleCount] = d;

      return { ...d, time: new Date(d.at).getTime() };
    });
    //return;
    //    const x = t.map((d) => {
    //      return d.time;
    //    });

    const numberOfTicks = 4;
    //const maxTickSpacing = spreadEvent / numberOfTicks;
    const maxTickSpacing = 1000 * 60 * 60 * 4;
    var x = [];
    //for (let i = 0; i < numberOfTicks; i++) {
    var d2 = 0;
    var i = 0;

    while (d2 < last.getTime()) {
      if (d2 > last.getTime()) {
        //        console.log("while break");
        break;
      }
      //console.log("while loop");
      d2 = first.getTime() + i * maxTickSpacing;
      //if (d2 > last.getTime()) {brea
      i = i + 1;
      x.push(d2);
    }
    //return;
    //if (x.length > 1) {
    setXSeriesData(x);
    //} else {
    //setXSeriesData([]);
    //}
    console.log("Trace xSeriesData x", x);


    const filteredT = t.filter((tThing) => {
      if (t.amount > 20) {
        return false;
      }
      if (t.amount2 > 20) {
        return false;
      }
      if (t.amount3 > 20) {
        return false;
      }
      return true;
    });

    console.log("Trace timeSeriesData t", t);
    //   setTimeSeriesData(t);
    setTimeSeriesData(filteredT);
    setSpread(spreadEvent);

    var yVals = data.map(function (val) {
      return val.amount;
    });
    var minY = Math.min.apply(Math, yVals);
    var maxY = Math.max.apply(Math, yVals);
    console.log("Trace miny maxy", minY, maxY);
    const maxYTickSpacing = 1;

    var y = [];
    //for (let i = 0; i < numberOfTicks; i++) {
    var d3 = 0;
    var i = 0;
    const numberOfYTicks = 4;
    var increment = Math.ceil((maxY - minY) / numberOfYTicks);
    if (increment <= 0) {
      increment = 1;
    }
    console.log("d3 ceil maxY increment", d3, Math.ceil(maxY), maxY, increment);
    //return;
    while (d3 <= Math.ceil(maxY)) {
      if (i > 10) {
        //      if (d3 > Math.ceil(maxY)) {
        console.log("while loop break d3 > maxY");
        break;
      }
      console.log("while loop");
      d3 = Math.floor(minY) + i * maxYTickSpacing;
      //if (d2 > last.getTime()) {brea
      i = i + increment;
      y.push(d3);
    }
    //if (y.length > 4) {
    //}

    //const yy = y.filter((yData)=>{

    //if (yData > 20) {return false;}
    //return true;

    //});
    console.log("Trace ySeriesData y", y);
    setYSeriesData(y);
    //}
  }, [data]);

useEffect(() =>{

if (data == null) {return;}
if (data.length === 0) {return;}

  // Convert raw data to the desired format

console.log("newData data", data);



const newData = [];
data.forEach(obj => {
  const amountKeys = Object.keys(obj).filter(key => key.startsWith('amount'));
  amountKeys.forEach(key => {
    const seriesIndex = parseInt(key.slice(6));
    const timestamp = new Date(obj.at).getTime() / 1000;
    
    if (!newData[seriesIndex]) {
      newData[seriesIndex] = [];
    }

    newData[seriesIndex].push({ x: timestamp, y: obj[key] });
  });
});

setConditionedData(newData);



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
    //setXMax=
  }




//  const colors = ['#ff0000', '#00ff00', '#0000ff'];
//const colors= [hexShade(0,1),hexShade(1,1), hexShade(2,1)];

const colors = conditionedData && conditionedData.reverse().map((c, index)=>{
//console.log("TraceCircle conditionedData index", index);
if (index === conditionedData.length - 1 ) {return '#ff0000';}
return hexShade(index,1);
});


//const colors = colorsTemp && colorsTemp.push('#ff0000');

//  if (xSeriesData == null) {
//    return null;
//  }


if (conditionedData == null) {return;}
//if (colors == null) {return;}
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
