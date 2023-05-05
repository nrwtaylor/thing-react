import React, { useEffect } from "react";
import * as d3 from "d3";

export default function BubbleLevel(props) {
  const { data } = props;

  const canvasCenterX = 150;
  const canvasCenterY = 75;
  const { x, y, z } = data;
  useEffect(() => {
    d3.select(".target").style("stroke-width", 5);
    d3.select(".ring").style("stroke-width", 1);
  }, []);

  return (
    <div className="App">
      <svg>
        <circle
          class="ring"
          style={{ fill: "white" }}
          stroke="black"
          cx={canvasCenterX}
          cy={canvasCenterY}
          r={(500 * parseFloat(15)) / 90}
        ></circle>

        <circle
          class="ring"
          style={{ fill: "white" }}
          stroke="black"
          cx={canvasCenterX}
          cy={canvasCenterY}
          r={(500 * parseFloat(10)) / 90}
        ></circle>

        <circle
          class="ring"
          style={{ fill: "white" }}
          stroke="black"
          cx={canvasCenterX}
          cy={canvasCenterY}
          r={(500 * parseFloat(5)) / 90}
        ></circle>

        <circle
          class="target"
          style={{ fill: "grey" }}
          stroke="black"
          cx={canvasCenterX + (500 * parseFloat(x)) / 90}
          cy={canvasCenterY + (500 * parseFloat(y)) / 90}
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
      </svg>
    </div>
  );
}
