import React, { useEffect, useState } from "react";
import * as d3 from "d3";

import useStream from "../useStream.js";
import useSnapshot from "../useSnapshot.js";

export default function MotionReference(props) {
  //const { data } = props;

  const canvasCenterX = 150;
  const canvasCenterY = 75;
  //  const { displacement } = data;

  //const y = x;
  //const z = x;

  const [interval, setInterval] = useState();

  const [data, setData] = useState();
  const [displacement, setDisplacement] = useState();

  const toSnapshot = "http://192.168.10.10/snapshot.json";
  const { snapshot, flag } = useSnapshot(toSnapshot);

  useEffect(() => {
    //console.log("Snapshot", snapshot);

    if (props.data) {
      setData(props.data);
      setDisplacement(props.data && props.data.displacement);
      return;
    }

    setData(snapshot);
    setDisplacement(snapshot && snapshot.displacement);
  }, [snapshot]);

  const { streamPoints } = useStream(displacement);

  useEffect(() => {
    d3.select(".target").style("stroke-width", 5);
    d3.select(".ring").style("stroke-width", 1);
  }, []);

  useEffect(() => {
    // console.log("MotionReference displacement", displacement);
  }, [displacement]);

  useEffect(() => {
    // console.log("MotionReference data", data);
  }, [data]);

  function shadeColor(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  }

  function shadeGreyPercent(percent) {
    //var R = parseInt(color.substring(1,3),16);
    //var G = parseInt(color.substring(3,5),16);
    //var B = parseInt(color.substring(5,7),16);

    var R = parseInt((255 * percent) / 100);
    var G = parseInt((255 * percent) / 100);
    var B = parseInt((255 * percent) / 100);

    //R = parseInt(R * (100 + percent) / 100);
    //G = parseInt(G * (100 + percent) / 100);
    //B = parseInt(B * (100 + percent) / 100);

    //R = (R<255)?R:255;
    //G = (G<255)?G:255;
    //B = (B<255)?B:255;

    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    // console.log("RGB", R, G, B, RR, GG, BB);

    return "#" + RR + GG + BB;
  }

  return (
    <div className="App">
      Motion Reference
      <svg>
        <line
          x1={canvasCenterX - 200}
          y1={canvasCenterY}
          x2={canvasCenterX + 200}
          y2={canvasCenterY}
          stroke={"black"}
          strokeWidth="1"
        />

        {streamPoints.map((pt, index) => {
          let radians = (pt.value * Math.PI) / 180 + Math.PI / 2;

          let sin = Math.sin(radians);
          let cos = Math.cos(radians);
          let length = 200;

          const ptX1 = canvasCenterX - (length / 2) * sin;
          const ptY1 = canvasCenterY - (length / 2) * cos;

          const ptX2 = canvasCenterX + (length / 2) * sin;
          const ptY2 = canvasCenterY + (length / 2) * cos;

          //var colour = "grey";
          // Grey range
          var i = (1 - index / streamPoints.length) * 35;

          // Minimum grey
          i = i + 50;
          //var colour = shadeColor('#000000', i);
          var colour = shadeGreyPercent(i);
          // console.log("MotionReference i", i, colour);

          var strokeWidth = 5;
          if (index === streamPoints.length - 1) {
            colour = "red";
            strokeWidth = 5;
          }

          if (index === streamPoints.length - 2) {
            colour = "black";
            strokeWidth = 5;
          }

          const x = displacement && displacement.x ? displacement.x : 0;
          const y = displacement && displacement.y ? displacement.y : 0;

          return (
            <circle
              class="ring"
              style={{ fill: "white" }}
              stroke="black"
              cx={canvasCenterX + x * 10}
              cy={canvasCenterY + y * 10}
              // r={1*parseFloat(90)/90}
              r={1}
            ></circle>
          );

          //return(
          //  <line x1={ptX1} y1={ptY1} x2={ptX2} y2={ptY2} stroke={colour} strokeWidth={strokeWidth} />
          //)
        })}

        {/*
        <circle
          class="ring"
          style={{ fill: "white" }}
          stroke="black"
          cx={canvasCenterX}
          cy={canvasCenterY}
          r={500*parseFloat(15)/90}
        ></circle>

        <circle
          class="ring"
          style={{ fill: "white" }}
          stroke="black"
          cx={canvasCenterX}
          cy={canvasCenterY}
          r={500*parseFloat(10)/90}
        ></circle>



        <circle
          class="ring"
          style={{ fill: "white" }}
          stroke="black"
          cx={canvasCenterX}
          cy={canvasCenterY}
          r={500*parseFloat(5)/90}
        ></circle>


        <circle
          class="target"
          style={{ fill: "grey" }}
          stroke="black"
          cx={canvasCenterX+500*parseFloat(x)/90}
          cy={canvasCenterY+500*parseFloat(y)/90}
          r={20}
        ></circle>

        <circle
          class="target"
          style={{ fill: "black" }}
          stroke="black"
          cx={canvasCenterX}
          cy={canvasCenterY}
          r={2}
        ></circle>
*/}
      </svg>
    </div>
  );
}
