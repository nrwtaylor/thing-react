import React, { useState, useEffect } from "react";

//import FirebaseStorageImage from "./../components/FirebaseStorageImage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ThingContainer from "./../components/ThingContainer";
import { Box, Grid } from "@material-ui/core";

const thumb = {
  // display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 2,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};
const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Collection(props) {
  const { things } = props;
/*
  useEffect(() => {
    console.log("images");
    console.log(images);
  }, [images]);
*/
  // This passes the reordered images back up to
  // the controlling component.
  function handleCollectionChange(reOrderedThings) {
    props.onCollectionChange(reOrderedThings);
  }

  return (
    <>

      <DndProvider backend={HTML5Backend}>
     
        <ThingContainer things={things} onCollectionChange={handleCollectionChange} />
   
      </DndProvider>

    </>
  );
}

export default Collection;

