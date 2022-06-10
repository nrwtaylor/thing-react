import React, { PureComponent, useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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


function Trace(props) {

const {data} = props;



  return (
    <>

TRACE START


           <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data} margin={{ right: 300 }}>
                    <CartesianGrid />
                 {/*   <XAxis dataKey="name" 
                        interval={'preserveStartEnd'} /> */}
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line type="monotone" stroke="#8884d8" dataKey="amount" strokeWidth={2}
                        stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="amount"
                        stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>

{/*
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
*/}
TRACE END
    </>
  );


}

export default Trace;
