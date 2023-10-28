import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PolarChart = ({ agentInput }) => {

const {data, colors, strokeWidth, circleData} = agentInput;
  const chartRef = useRef(null);

  useEffect(() => {
    console.debug("PolarChart data", data);
    const chartContainer = d3.select(chartRef.current);

    // Function to update chart dimensions
    const updateChartDimensions = () => {
      // Get the width of the container element
      const containerWidth = chartContainer
        .node()
        .getBoundingClientRect().width;

      // Set up chart dimensions
      const width = containerWidth;
      const height = containerWidth;
      const radius = Math.min(width, height) / 2;

      // Remove any existing chart
      chartContainer.select("svg").remove();

      // Create the chart SVG element
      const svg = chartContainer
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        //      .style('width', "100%")
        //      .style('height', "100%")
        .style("max-width", "100%")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const maxValue = d3.max(data.flat(), (d) => d.y);
      const minValue = d3.min(data.flat(), (d) => d.y);

      // Determine the minimum and maximum timestamps in the data
      const minTimestamp = d3.min(data.flat(), (d) => d.x);
      const maxTimestamp = d3.max(data.flat(), (d) => d.x);

      // Get the current local timezone offset in minutes
      const timezoneOffset = new Date().getTimezoneOffset();

      // Calculate the offset in milliseconds from the start of the day
      const offset = new Date(minTimestamp).setUTCHours(
        timezoneOffset / 60,
        timezoneOffset % 60,
        0,
        0
      );

      // Convert POSIX timestamp to angle in radians
      const angleScale = d3
        .scaleTime()
        .domain([new Date(offset), new Date(offset + 24 * 60 * 60 * 1000)]) // 24 hours in milliseconds
        .range([0, Math.PI * 2]);

      const minRadius = radius / 4;

      // Create concentric circles
      const radiusScale = d3
        .scaleSqrt()
        .domain([minValue, maxValue])
        .range([minRadius, radius]);
      //const circleData = [10, 11, 12, 13, 14, 15, 16];

      svg
        .selectAll(".circle")
        .data(circleData)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", (d) => radiusScale(d))
        .style("fill", "none")
        .style("stroke", "#ccc")
        .style("opacity", 0.5);

      // Create the radial axes
      const axes = svg
        .selectAll(".axis")
        .data(d3.range(0, 24)) // Create an array from 0 to 23
        .enter()
        .append("g")
        .attr("class", "axis");

      axes
        .append("line")
        .attr("x1", (d) => {
          const angle = angleScale(new Date(offset + d * 60 * 60 * 1000));
          const stopRadius = 0.05 * radius; // Subtract strokeWidth to stop short of the hub
          return stopRadius * Math.cos(angle);
        })
        .attr("y1", (d) => {
          const angle = angleScale(new Date(offset + d * 60 * 60 * 1000));
          const stopRadius = 0.05 * radius; // Subtract strokeWidth to stop short of the hub
          return stopRadius * Math.sin(angle);
        })

        .attr("x2", (d) => {
          const angle = angleScale(new Date(offset + d * 60 * 60 * 1000));
          const stopRadius = radius; // Subtract strokeWidth to stop short of the hub
          return stopRadius * Math.cos(angle);
        })
        .attr("y2", (d) => {
          const angle = angleScale(new Date(offset + d * 60 * 60 * 1000));
          const stopRadius = radius; // Subtract strokeWidth to stop short of the hub
          return stopRadius * Math.sin(angle);
        })
        .style("stroke", "#ccc");

      // Plot the data

      data.forEach((series, seriesIndex) => {
        const line = d3
          .lineRadial()
          .angle((d, i) => angleScale(new Date(d.x)))
          .radius((d) => radiusScale(d.y));

        svg
          .append("path")
          .datum(series)
          .attr("class", "line")
          .attr("d", line)
          .style("stroke", colors[seriesIndex])
          .style("fill", "none")
          .style("stroke-width", strokeWidth);
      });
    };

    // Update chart dimensions on initial render
    updateChartDimensions();

    // Update chart dimensions on window resize
    window.addEventListener("resize", updateChartDimensions);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateChartDimensions);
    };
  }, [data, colors]);

  return <div ref={chartRef} />;
};

export default PolarChart;
