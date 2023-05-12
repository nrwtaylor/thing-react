import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PolarChart = ({ data, colors }) => {
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

    // Create scales
    const maxValue = d3.max(data.flat(), d => d.y);
    const angleScale = d3.scaleLinear().domain([0, data[0].length]).range([0, Math.PI * 2]);
    const radiusScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

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
        .angle((d, i) => angleScale(i))
        .radius(d => radiusScale(d.y));

      svg.append('path')
        .datum(series)
        .attr('class', 'line')
        .attr('d', line)
        .style('stroke', colors[seriesIndex])
        .style('fill', 'none');
    });
  }, [data, colors]);

  return <div ref={chartRef} />;
};

export default PolarChart;
