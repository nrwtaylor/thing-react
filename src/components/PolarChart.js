import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PolarChart = ({ data, colors, strokeWidth }) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const chartContainer = d3.select(chartRef.current);

    // Set up chart dimensions
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    // Remove any existing chart
    chartContainer.select('svg').remove();

    // Create the chart SVG element
    const svg = chartContainer
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const maxValue = d3.max(data.flat(), d => d.y);
    // Create scales
    const minValue = d3.min(data.flat(), d => d.y);
//    const angleScale = d3.scaleLinear().domain([0, data[0].length]).range([0, Math.PI * 2]);

//    const angleScale = d3.scaleLinear().domain([0, 144]).range([0, Math.PI * 2]);
console.log("PolarChart data", data);


// Determine the minimum and maximum timestamps in the data
const minTimestamp = d3.min(data.flat(), d => d.x);
const maxTimestamp = d3.max(data.flat(), d => d.x);

// Calculate the offset in milliseconds from the start of the day
//const offset = new Date(minTimestamp).setUTCHours(0, 0, 0, 0);

// Get the current local timezone offset in minutes
const timezoneOffset = new Date().getTimezoneOffset();

// Calculate the offset in milliseconds from the start of the day
const offset = new Date(minTimestamp).setUTCHours(timezoneOffset / 60, timezoneOffset % 60, 0, 0);


// Convert POSIX timestamp to angle in radians
const angleScale = d3
  .scaleTime()
  .domain([new Date(offset), new Date(offset + 24 * 60 * 60 * 1000)]) // 24 hours in milliseconds
  .range([Math.PI * 2, 0]);

const minRadius = radius / 4;
    const radiusScale = d3.scaleLinear().domain([minValue, maxValue]).range([minRadius, radius]);

    // Create concentric circles
    const circleData = [maxValue / 2, maxValue / 4, maxValue / 8];
    svg.selectAll('.circle')
      .data(circleData)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', d => radiusScale(d))
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('opacity', 0.5);

    // Create the radial axes
    const axes = svg.selectAll('.axis')
      .data(data[0])
      .enter()
      .append('g')
      .attr('class', 'axis');

    axes.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => radius * Math.cos(angleScale(i)))
      .attr('y2', (d, i) => radius * Math.sin(angleScale(i)))
      .style('stroke', '#ccc');

    // Plot the data
    data.forEach((series, seriesIndex) => {
      const line = d3.lineRadial()
//        .angle((d, i) => angleScale(i))
        .angle((d, i) => angleScale(new Date(d.x)))
        .radius(d => radiusScale(d.y));

      svg.append('path')
        .datum(series)
        .attr('class', 'line')
        .attr('d', line)
        .style('stroke', colors[seriesIndex])
        .style('fill', 'none')
        .style('stroke-width', strokeWidth);
    });
  }, [data, colors]);

  return <div ref={chartRef} />;
};

export default PolarChart;
