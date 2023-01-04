import React, { lazy, useState, useEffect } from "react";
import { useParams } from "react-router";
import Agent from "../components/Agent.js";
import Snapshot from "../components/Snapshot.js";
import TextSnapshot from "../components/TextSnapshot.js";

import Datagram from "../components/Datagram.js";
import Barometer from "../components/Barometer.js";
import MotionReference from "../components/MotionReference.js";

import GlobalPositioningSystem from "../components/GlobalPositioningSystem.js";

import ToGoTime from "../components/ToGoTime.js";
import Poll from "../components/Poll.js";
import Subject from "../components/Subject.js";
import Content from "../components/Content.js";
import Message from "../components/Message.js";
import Text from "../components/Text.js";
import History from "../components/History.js";
import Power from "../components/Power.js";
import Nuuid from "../components/Nuuid.js";

import Weather from "../components/Weather.js";

import TemperatureHumidity from "../components/TemperatureHumidity.js";

import InertialReference from "../components/InertialReference.js";

import Error from "../components/Error.js";

import ThingThumbnail from "../components/ThingThumbnail.js";

import Ping from "../components/Ping.js";
import Login from "../components/Login.js";

import Token from "../components/Token.js";
import Signup from "../components/Signup.js";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { isText } from "../util/text.js";

import Associations from "../components/Associations.js";

//import useDatagram from "./useDatagram";

import { v4 as uuidv4, uuid as uuidLibrary } from "uuid";
import {
  getThingReport,
  setThing,
  txCount,
  rxCount,
  txData,
  rxData,
  rxErrorCount,
  txErrorCount,
} from "../util/database.js";
import { humanTime, zuluTime } from "../util/time.js";

import useMessages from "../useMessages";

//import{ Collapse} from '@mui/core';

import { styled } from "@mui/material/styles";

//import Container from '@mui/material/Container';

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

//import CardContent from "@mui/material/CardContent";
//import CardActions from "@mui/material/CardActions";
//import Collapse from "@mui/material/Collapse";
//import Avatar from "@mui/material/Avatar";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
//import UpdateIcon from "@mui/icons-material/Update";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
//import FavoriteIcon from "@mui/icons-material/Favorite";
//import ShareIcon from "@mui/icons-material/Share";

//import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//import MoreVertIcon from "@mui/icons-material/MoreVert";

//import ExpandMoreIcon from '@mui/icons-material/ExpandMore.js';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const useStyles = makeStyles((theme) => ({
  gridItem: {
    // Add border that contrasts lightly with background color.
    // We use boxShadow  so that it's hidden around outer edge
    // due to container <Card> having overflow: hidden
    //    boxShadow: `1px 1px 0 0 ${emphasize(theme.palette.background.paper, 0.08)}`,
    textAlign: "center",
  },

  stripImageContainer: {
    margin: "0 auto",

    "& img": {
      // width: "100%",
      width: "80px",
      maxHeight: "125px",
      maxWidth: "100px",
    },
  },

  media: {
    // minHeight: "200px",
    height: "auto",
    // width:'100%',
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
    // height: "auto",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },

  cartImageContainer: {
    // margin: "0 auto",
    // height:'200px',
    width: "100%",
    "& img": {
      width: "100%",
      maxHeight: "100px",
      objectFit: "contain",
      // width: "100%",
      // height: "auto",
      // height:"75px",
    },
  },

  cardImageContainer: {
    margin: "0 auto",
    // maxWidth: "200px",

    "& img": {
      maxHeight: "180px",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        maxHeight: "150px",
      },
      // width: "auto",
      // height:'200px'
    },
  },
}));

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Messages(props) {
  //  const text = props.match.params.text;

  const classes = useStyles();

  const { text } = useParams();

  const { messages, addMessage } = useMessages();

  return (
    <>
      <div>
        MESSAGES
        <br />
        {messages &&
          messages.map((message) => {
            return (
              <>
                <Message message={{ subject: message }} />
                <br />
              </>
            );
          })}
        <br />
      </div>
    </>
  );
}
