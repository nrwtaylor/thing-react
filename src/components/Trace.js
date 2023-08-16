import React, { useState, useEffect } from "react";
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
//import { humanRuntime } from "../util/time.js";

//import { Carousel } from "react-responsive-carousel";
//import "react-responsive-carousel/lib/styles/carousel.min.css";

/*

      <Carousel
        useKeyBoardArrows={canSwipe}
        showArrows={canSwipe}
        swipeable={canSwipe}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        swipeScrollTolerance={100}
        preventMovementUntilSwipeScrollTolerance={true}
      >
        {things.map((thing) => (
          <div key={thing.uuid}>

*/

function Trace(props) {
  const { data } = props;
  //  const [canSwipe, setCanSwipe] = useState();
  const canSwipe = true;
  const shade = true;

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
//const maxTickSpacing = 1000 * 60;
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

    /*
const m = calculateMean(t);
console.log("Trace calculateMean m t", m, t);

const t2 = t.filter((tThing)=>{
//return false;
if (tThing>100) {return false;}
return true;
});
*/

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

  useEffect(() => {
    updateTime();

    const interval = setInterval(() => {
      updateTime();
    }, 10000); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, []);

  function calculateMean(grades) {
    if (grades == null) {
      return true;
    }

    const total = grades.reduce((acc, c) => acc + c, 0);
    return total / grades.length;
  }

  function updateTime() {
    const x = new Date().getTime();
    setCurrentTime(x);
    //setXMax=
  }
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

  //return (<>NOTHING</>);
  //        <LineChart data={data} margin={{ right: 300 }}>
  // https://stackoverflow.com/questions/50078787/recharts-set-y-axis-range
  // <YAxis type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} />

  // https://github.com/recharts/recharts/issues/956
  function formatXAxis(tickItem) {
    const ts = new Date(tickItem);
    //const x = ts.toLocaleDateString();
    const x = ts.toJSON();
    return "";
    //return x;
  }

  //  return <>Blank Trace 2</>;

  if (xSeriesData == null) {
    return null;
  }
  return (
    <>
      <br />
      {zuluTextSpread(firstAt, lastAt)}
      <br />

      <Box>
        <div style={{ width: "100%" }}>
          {/*        <ResponsiveContainer width="100%" aspect={3}> */}
          <ResponsiveContainer aspect={3}>
            <LineChart data={timeSeriesData}>
              <XAxis
                interval={0}
                ticks={xSeriesData.sort()}
                dataKey="time"
                domain={["dataMin", currentTime]}
                //           domain={["dataMin", "dataMax"]}

                type="number"
                tick={true}
                tickFormatter={formatXAxis}
              />{" "}
              }{/*   <CartesianGrid /> */}
              {props.domain && (
                <YAxis
                  interval={0}
                  tick={true}
                  ticks={ySeriesData.sort()}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en", {
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(value)
                  }
                  domain={props.domain}
                ></YAxis>
              )}
              {props.domain === undefined && (
                <YAxis
                  interval={0}
                  tick={true}
                  ticks={ySeriesData.sort()}
                  type="number"
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en", {
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(value)
                  }
                  domain={[
                    (dataMin) => {
                      return 1.0 * dataMin; // With large numbers this can be a problem.
                    },
                    (dataMax) => {
                      return 1.0 * dataMax;
                    },
                  ]}
                ></YAxis>
              )}
              {/*    <Legend /> */}
              {/*   <Tooltip /> */}
              {/*  <Line type="monotone" stroke="#8884d8" dataKey="amount" strokeWidth={2}
                        stroke="black" activeDot={{ r: 8 }} /> */}
              {false &&
                data &&
                data[0] &&
                data[0].amounts &&
                data[0].amounts[0] && (
                  <Line
                    isAnimationActive={false}
                    dataKey="amount2"
                    stroke="grey"
                    strokeWidth={4}
                    dot={false}
                  />
                )}
              {false &&
                data &&
                data[0] &&
                data[0].amounts &&
                data[0].amounts[2] && (
                  <Line
                    isAnimationActive={false}
                    dataKey="amount3"
                    stroke="grey"
                    strokeWidth={4}
                    dot={false}
                  />
                )}
              {Object.keys(data[0]).map((q) => {
                if (q.startsWith("amount")) {
                  const x = q.replace("amount", "");

                  if (x === "") {
                    return;
                  }
                  if (!Number.isInteger(parseInt(x))) {
                    return;
                  }

                  return (
                    <Line
                      key={"trace_" + x}
                      isAnimationActive={false}
                      dataKey={"amount" + x}
                      stroke="grey"
                      strokeWidth={4}
                      dot={false}
                    />
                  );

                  console.log("Trace q", data[0][q]);
                }
                //return (<>x</>);
              })}
              <Tooltip />
              {cycles.reverse().map((n) => {
                return (
                  <Line
                    key={"trace" + "_" + "cycle" + "_" + n}
                    isAnimationActive={false}
                    dataKey={"amount" + n}
                    stroke={hexShade(n, 1)}
                    //        stroke="grey"
                    strokeWidth={4}
                    dot={false}
                  />
                );
              })}
              <Line
                isAnimationActive={false}
                dataKey="amount"
                stroke="red"
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/*
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
*/}
        {humanRuntime(spread)}
        <br />
        <p />
      </Box>
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

export default Trace;
