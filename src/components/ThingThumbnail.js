import React, { useCallback, useRef, useState, useEffect } from "react";
import { emphasize } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { Skeleton } from '@mui/material';

//import { propTypes } from "react-markdown";
import brokenImage from "../images/brokenImage.png";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

const useStyles = makeStyles((theme) => ({
  gridItem: {
    // Add border that contrasts lightly with background color.
    // We use boxShadow so that it's hidden around outer edge
    // due to container <Card> having overflow: hidden
    boxShadow: `1px 1px 0 0 ${emphasize(theme.palette.background.paper, 0.08)}`,
    textAlign: "center",
  },
  imageContainer: {
    margin: "0 auto",
    maxWidth: "200px",
    marginBottom: "30px",
    "& img": {
      width: "100%",
    },
  },
}));
function ThingThumbnail(props) {
  const RETRY_COUNT = 1;
  const RETRY_DELAY = 5000;

  const [error, setError] = useState(false);

  const [loadingContext, setLoadingContext] = useState(true);

  const { allowDelete, image, onStatus } = props;
  const classes = useStyles();

  const componentRef = useRef();

  const { src } = props;
  const handleLoad = useCallback(() => {
    setError(false);
    setLoadingContext(false);
  }, []);

  useEffect(() => {
    componentRef.current = RETRY_COUNT;
  }, []);

  const handleError = useCallback(({ currentTarget }) => {
    setError(true);
    if (componentRef && componentRef.current && componentRef.current > 0) {
      setTimeout(() => {
        currentTarget.onerror = null;
        currentTarget.src = src;
        componentRef.current =
          componentRef && componentRef.current && componentRef.current - 1;
      }, RETRY_DELAY);
    } else {
      currentTarget.onerror = null; // prevents looping
      currentTarget.src = brokenImage;

      setLoadingContext(false);
    }
  }, []);

  // https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror
  return <>
    <Skeleton
      variant="rectangular"
      //  width="100%"

      style={{
        display: loadingContext ? "block" : "none",
        width: "100%",
        aspectRatio: "1/1",
        height: "auto",
      }}
    />

    <div style={{ display: loadingContext ? "none" : "block" }}>
      <img
        src={src}
        alt={"image"}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>

    {allowDelete ? (
      <IconButton
        edge="end"
        //          onClick={() => deleteItemImage(location)}
        aria-label="delete"
        size="large">
        <DeleteIcon />
      </IconButton>
    ) : null}
  </>;
}

export default ThingThumbnail;
