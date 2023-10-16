import React, { memo, useState, useEffect } from "react";

import { devFlag, debugFlag } from "../util/dev.js";


import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ThingContainer from "./../components/ThingContainer.js";

import { getNuuid } from "./../util/uuid.js";

import { Box, Grid, Chip } from "@mui/material";

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

function Collection({ thing, agentInput }) {
  const dndFlag = true;

  // This passes the reordered images back up to
  // the controlling component.
  //function handleCollectionChange(reOrderedThings) {
  //  props.onCollectionChange(reOrderedThings);
  //}

  //return null;

  return (
    <>
      Similar Things
      <br />
{debugFlag && (<>
      THING UUID {thing && thing.uuid}
      <br />
</>)}
{debugFlag && (<>
      THING ASSOCIATIONS <br />
</>)}

{thing &&
  thing.associations &&
  Array.isArray(thing.associations) &&
  thing.associations.map((d) => (
    <Chip
      key={"association_" + thing.uuid + "_" + d}
      label={getNuuid(d)}
      color="default"
      variant="outlined"
      sx={{ backgroundColor: '#888', color: '#fff', borderRadius: '4px' }}
    />
  ))}
      <br />
      <DndProvider backend={HTML5Backend}>
        <ThingContainer
          thing={thing}
          agentInput={{ ...agentInput, thingContainer: true }}
          //          onCollectionChange={handleCollectionChange}
        />
      </DndProvider>
    </>
  );
}

export default memo(Collection);
//export default Collection;
