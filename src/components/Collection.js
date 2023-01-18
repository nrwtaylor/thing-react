import React, { useState, useEffect } from "react";

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

function Collection({thing, agentInput}) {

  //const { thing } = props;
  const dndFlag = true;

  // This passes the reordered images back up to
  // the controlling component.
  //function handleCollectionChange(reOrderedThings) {
  //  props.onCollectionChange(reOrderedThings);
  //}

  return (
    <>
      Similar Things
      <br />
      THING UUID{' '}
      {thing && thing.uuid}
      <br />
      THING ASSOCIATIONS{' '}
      <br />
      {thing &&
        thing.associations &&
        Array.isArray(thing.associations) &&
        thing.associations.map((d) => {
          return <>{d.slice(0, 4)} </>;
        })}
      <br />
      <DndProvider backend={HTML5Backend}>
        <ThingContainer
          thing={thing}
          agentInput={{...agentInput,thingContainer:true}}
//          onCollectionChange={handleCollectionChange}
        />
      </DndProvider>
    </>
  );
}

export default Collection;
