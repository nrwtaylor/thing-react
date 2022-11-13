import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { getSlug } from "./../util/text";
import { keywordsByGoogleSheet } from "./../util/gimmu";

const { REACT_APP_GOOGLE_SHEET } = process.env;
const { REACT_APP_KEYWORD } = process.env;
const { REACT_APP_SLUG } = process.env;


const useStyles = makeStyles((theme) => ({
  paperItems: {
    minHeight: "300px",
  },
  featured: {
    backgroundColor:
      theme.palette.type === "dark" ? theme.palette.action.selected : "#fdf8c2",
  },
  starFeatured: {
    color: theme.palette.warning.main,
  },

  name: {
    overflow: "hidden",
    display: "-webkit-box",
    minHeight: "50px",
    WebkitLineClamp: 10,
    WebkitBoxOrient: "vertical",
  },
}));

// From Stackr.

function Stack(props) {

  const {stack} = props;

  if (stack === undefined) {
    return "No stack";
  }

  return (
    <>
      {stack.map((k, i) => {
        return <>{stack}</>;
      })}
    </>
  );

}

export default Stack;
