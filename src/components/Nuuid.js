import React, { useState, useEffect, useRef } from "react";
import { IconButton, Typography, Box } from "@material-ui/core";
import useThing from  "../useThing.js";

  var style = {
    whiteSpace: "pre-line",
    fontWeight: "500",
    color: "#ffffff",
    background: "#0c387194",
    borderRadius: "7px",
    padding: "5px 10px 5px 10px",
    marginBottom: "2px",
  };


export default function Nuuid(props) {
//  var { message } = props;

const {thing} = useThing({subject:props.subject});

  return (
    <>
{props.subject}
    </>
  );
}
