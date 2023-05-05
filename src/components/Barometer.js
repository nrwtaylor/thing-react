import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Barometer(props) {
  const { data } = props;

  const canvasCenterX = 150;
  const canvasCenterY = 75;
  //const {x,y,z} = data;
  const { pressure } = props;
  const x = 0;
  const y = 0;

  useEffect(() => {
    console.log("Data", data);
  }, [data]);

  useEffect(() => {
    d3.select(".target").style("stroke-width", 5);
    d3.select(".ring").style("stroke-width", 1);
  }, []);

  const tickSet = [800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250];

  const Ticks = () => {
    {
      tickSet.map((pt, index) => {
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
        var i = (1 - index / tickSet.length) * 35;

        // Minimum grey
        i = i + 50;
        //var colour = shadeColor('#000000', i);
        //var colour = shadeGreyPercent(i);
        var colour = "#000000";

        var strokeWidth = 5;
        if (index === tickSet.length - 1) {
          colour = "red";
          strokeWidth = 5;
        }

        if (index === tickSet.length - 2) {
          colour = "black";
          strokeWidth = 5;
        }

        return (
          <>
            <line
              x1={ptX1}
              y1={ptY1}
              x2={ptX2}
              y2={ptY2}
              stroke={colour}
              strokeWidth={strokeWidth}
            />
          </>
        );
      });
    }
  };

  return <>{pressure}</>;

  return (
    <div className="App">
      {pressure}
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

        <Ticks />
      </svg>
    </div>
  );
}
