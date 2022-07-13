import React, { PureComponent, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "../index.css";
import {
  Typography,
  //  Avatar,
  //  ListItemAvatar,
  Box,
} from "@material-ui/core";

import {
  Button,
  TextField,
  IconButton,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import Frequency from "../components/Frequency.js";


function Trace(props) {
  const { data } = props;

  useEffect(() => {}, [data]);

  //return (<>NOTHING</>);

  return (
    <>
<Box>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={data} margin={{ right: 300 }}>
          {/*   <CartesianGrid /> */}
          <YAxis ></YAxis>
          {/*    <Legend /> */}
          {/*   <Tooltip /> */}
          {/*  <Line type="monotone" stroke="#8884d8" dataKey="amount" strokeWidth={2}
                        stroke="black" activeDot={{ r: 8 }} /> */}
          <Line
            dataKey="amount"
            stroke="red"
            strokeWidth={4}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/*
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
*/}
      <br />
      <p />
</Box>
    </>
  );
}

export default Trace;
