import React, { memo, useState, useEffect, useCallback } from "react";
import { Card } from "./Card.js";
import { Grid, Box } from "@material-ui/core";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { FullscreenExitTwoTone } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";

import useThings from "../useThings.js";
import useThing from "../useThing.js";

import useToken from "../useToken.js";
import useIdentity from "../useIdentity.js";

const style = {
  //minHeight: 200,
  // maxWidth: 800,
  //width: '100%',
  //  display: 'flex',
  // spacing:'1'
};

export const ThingContainer = memo(function ThingContainer(props) {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;

  const { username, token, getToken, setToken, deleteToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  const {findThing, moveThing, flipThing ,openThing,foldThing,deleteThing, spawnThing} = useThing(null);

const {things, getThings, setThings} = useThings();

useEffect(()=>{

console.log("ThingContainer things", things);

}, [things]);

/*
  useEffect(() => {
    console.log("ThingContainer things", things);
    const reindexedThings = things.map((image, i) => {
      return { ...image, index: i };
    });
    props.onCollectionChange(reindexedThings);
  }, [things, setThings]);
*/

useEffect(() =>{

console.log("ThingContainer things setThings change");

}, [things]);

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  //if (!token) {return (<>NO TOKEN</>);}

  return (
    <>
      <div ref={drop} style={style}>
        <Grid container spacing={3} direction="row">
          {things && (
            <>
              {things.map((thing) => (
                <Card
                  key={"card_" + thing.uuid}
                  id={`${thing.index}`}
                  card={thing}
                  text={thing && thing.text}
                  flipCard={flipThing}
                  openCard={openThing}
                  foldCard={foldThing}
                  moveCard={moveThing}
                  deleteCard={deleteThing}
                  spawnCard={spawnThing}
                  findCard={findThing}
                  token={token}
                />
              ))}
            </>
          )}
        </Grid>
      </div>
    </>
  );
});

export default ThingContainer;
