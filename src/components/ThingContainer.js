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
import { scoreThings } from "../util/text.js";

import Button from "./Button.js";

import LazyLoad from 'react-lazyload';

const style = {
  //minHeight: 200,
  // maxWidth: 800,
  //width: '100%',
  //  display: 'flex',
  // spacing:'1'
};

export const ThingContainer = memo(function ThingContainer(props) {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;

  const { datagram } = props;
  const { username, token, getToken, setToken, deleteToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  const {
    findThing,
    moveThing,
    flipThing,
    openThing,
    foldThing,
    deleteThing,
    spawnThing,
  } = useThing(null);

  const [uuid, setUuid] = useState();
  const [subject, setSubject] = useState();
  const [scoredThings, setScoredThings] = useState();

  const { things, getThings, setThings } = useThings();

  useEffect(() => {
    console.log("ThingContainer things", things);
  }, [things]);

  useEffect(() => {
    if (datagram == null) {
      return;
    }
    if (datagram.subject) {
      setSubject(datagram.subject);
    }
    if (datagram.uuid) {
      setUuid(datagram.uuid);
    }
  }, [datagram]);

  /*
  useEffect(() => {
    console.log("ThingContainer things", things);
    const reindexedThings = things.map((image, i) => {
      return { ...image, index: i };
    });
    props.onCollectionChange(reindexedThings);
  }, [things, setThings]);
*/

  useEffect(() => {
    console.log("ThingContainer things setThings change");
  }, [things]);
  const deleteThing3 = (e) => {
    console.log("ThingContainer e", e);
    deleteThing(e);
  };

  const deleteThing2 = useCallback(
    (id, atIndex) => {
      if (things.length <= 1) {
        return;
      }

      //console.log("deleteCard id", id);
      //console.log("deleteCard atIndex", atIndex);
      const { thing, index } = findThing(id);

      setThings(
        update(things, {
          $splice: [[index, 1]],
        })
      );

      deleteThing(id);
    },
    [things]
  );

  /*
function scoreThing() {
console.log("ThingContainer props datagram", props.datagram);
if (props.datagram.subject) {

console.log("ThingContainer props subject", props.datagram.subject);


}
return 6;
}
*/

  useEffect(() => {
    if (things == null) {
      return;
    }
    //setScoredThings(things);

    //return;

    console.log("ThingContainer useEffect", things && things.length, subject);

    //if (props.datagram == null) {return;}
    //if (props.datagram.subject == null) {return;}

    const scoredThings = scoreThings(things, subject);

    //console.log("ThingContainer scoredThings", scoredThings);
    setScoredThings(scoredThings);
  }, [things, subject]);

  useEffect(() => {
    console.log("ThingContainer scoredThings", scoredThings);
  }, [scoredThings]);

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  //if (!token) {return (<>NO TOKEN</>);}

  return (
    <>
      <div ref={drop} style={style}>
        <Button
//          thing={{ subject: ("thing/"+ (uuid ==null ? "" : uuid)), agentInput: "Add Thing" }}
          thing={{ subject: "add-thing", agentInput: "Add Thing" }}
        />
        <Grid container spacing={3} direction="row">
          {scoredThings && (
            <>
              {scoredThings
                .filter((t) => {
                  //return true;
                  if (subject == null) {
                    return true;
                  }

                  return t.score > 0;
                  return t.score > 5;
                })
                .map((thing) => (
                  <Card
                    key={"card_" + thing.uuid}
                    id={`${thing.index}`}
                    card={thing}
                    text={thing && thing.text}
                    flipCard={flipThing}
                    openCard={openThing}
                    foldCard={foldThing}
                    moveCard={moveThing}
                    deleteCard={deleteThing2}
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
