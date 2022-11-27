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

import {humanRuntime} from "../util/time.js";


function Trace(props) {
  const { data } = props;

  const [timeSeriesData, setTimeSeriesData] = useState();

  const [spread, setSpread] = useState();

  const [firstAt, setFirstAt] = useState();
  const [lastAt, setLastAt] = useState();

  useEffect(() => {
if (data === undefined) {return;}
if (Array.isArray(data) && data.length === 0) {return;}

//console.log("Trace data", data);



const first= new Date(data[0].at);
const last = new Date(data[data.length - 1].at);
const spreadEvent = last - first;
setFirstAt(data[0].at);
setLastAt(data[data.length - 1].at);

const t = data.map((d)=>{

return {...d, at:(new Date(d.at))}

})

setTimeSeriesData(t);
setSpread(spreadEvent);
//}
  }, [data]);

  //return (<>NOTHING</>);
  //        <LineChart data={data} margin={{ right: 300 }}>
  // https://stackoverflow.com/questions/50078787/recharts-set-y-axis-range
  // <YAxis type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} />

//return (<>HEY</>);

  return (
    <>
<br />
{lastAt}{' to '}
{firstAt}
<br />
      <Box>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={data}>
{/* <XAxis scale={'time'} />  */}
          {/*   <CartesianGrid /> */}
            {props.domain && (
              <YAxis
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
                type="number"
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                }
                domain={[
                  (dataMin) => {
                    return 0.9 * dataMin;
                  },
                  (dataMax) => {
                    return 1.1 * dataMax;
                  },
                ]}
              ></YAxis>
            )}

            {/*    <Legend /> */}
            {/*   <Tooltip /> */}
            {/*  <Line type="monotone" stroke="#8884d8" dataKey="amount" strokeWidth={2}
                        stroke="black" activeDot={{ r: 8 }} /> */}
            {data && data[0] && data[0].amount2 && (
              <Line
                isAnimationActive={false}
                dataKey="amount2"
                stroke="grey"
                strokeWidth={4}
                dot={false}
              />
            )}

            {data && data[0] && data[0].amount3 && (
              <Line
                isAnimationActive={false}
                dataKey="amount3"
                stroke="grey"
                strokeWidth={4}
                dot={false}
              />
            )}
            <Line
              isAnimationActive={false}
              dataKey="amount"
              stroke="red"
              strokeWidth={4}
              dot={false}
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
{humanRuntime(spread)}
        <br />
        <p />
      </Box>
    </>
  );
}

export default Trace;
