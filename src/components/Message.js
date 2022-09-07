import React, { useState, useEffect, useRef } from "react";
import { IconButton, Typography, Box } from "@material-ui/core";


  var style = {
    whiteSpace: "pre-line",
    fontWeight: "500",
    color: "#ffffff",
    background: "#0c387194",
    borderRadius: "7px",
    padding: "5px 10px 5px 10px",
    marginBottom: "2px",
  };


export default function Message(props) {
  var { message } = props;

  return (
    <>
{message && message.subject && (<>

      <Typography variant="subtitle1">
        <div style={style}>
          <div> {message && message.subject && message.subject.replace('|','\n')}</div>
          {/*<div>{humanAge(message.createdAt)}</div>*/}
        </div>
      </Typography>
      <Typography
        variant="body2"
        style={{
          padding: "0px 10px 0px 10px",
          textAlign: "right",
          marginBottom: "10px",
        }}
      >
        {/*message.id*/}
        {/*timeText*/}
      </Typography>
</>)}
    </>
  );
}

