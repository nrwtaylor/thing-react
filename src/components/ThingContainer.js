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
import { scoreThings, sortThingsByScore } from "../util/text.js";

import Button from "./Button.js";

import LazyLoad from "react-lazyload";

const maximumStackThings = 7;

const style = {
  //minHeight: 200,
  // maxWidth: 800,
  //width: '100%',
  //  display: 'flex',
  // spacing:'1'
};

export const ThingContainer = memo(function ThingContainer(props) {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;

  const { thing } = props;
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
  } = useThing(thing);

  const [scoredThings, setScoredThings] = useState();

  const [filteredScoredThings, setFilteredScoredThings] = useState();


// Association things with the current thing.
  const [associations, setAssociations] = useState();
  const { things, getThings, setThings } = useThings();

  useEffect(() => {
    console.log("ThingContainer things", things);
  }, [things]);


  useEffect(() => {
    if (thing == null) {
      return;
    }
//    if (thing.subject) {
//      setSubject(thing.subject);
//    }
//    if (thing.uuid) {
//      setUuid(thing.uuid);
//    }

console.log("ThingContainer thing x", thing);

    if (thing.associations) {

if (Array.isArray(thing.associations) && !thing.associations.includes(thing.uuid)) {
      const newAssociations = thing.associations.push(thing.uuid);
      setAssociations(newAssociations);
}
    }
  }, [thing]);


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

    if (Array.isArray(things) && things.length === 0) {return;}

console.log("ThingContainer scoredThings prescore", thing, thing.subject);

    const scoredThings = scoreThings(things, thing.subject);



    setScoredThings(scoredThings);

  }, [things, thing]);

  useEffect(() => {
//    console.log("ThingContainer subject", subject);

console.log("ThingContainer scoredThings", scoredThings);
    if (scoredThings == null) {
      return;
    }

//    console.log("ThingContainer subject", subject);
    const f = scoredThings
      .filter((t) => {
console.log("ThingContainer t", t);
if (t.from === 'stack') {return true;}

        if (thing.subject == null) {
          return true;
        }

        if (thing.subject === "things") {
          return true;
        }

        return t.score > 0;
        //return t.score > 5;
      })
      .slice(0, maximumStackThings);

    const s = sortThingsByScore(f);

// Make sure all associated items are always shown in collection
var a = s;
if (Array.isArray(s) && Array.isArray(associations)) {
    a = [...s, ...associations];
}
    setFilteredScoredThings(a);
//setFilteredScoredThings(scoredThings);
  }, [scoredThings]);


useEffect(() =>{

console.log("ThingContainer filteredScoredThings", filteredScoredThings);

}, [filteredScoredThings])

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  return (
    <>
      <div ref={drop} style={style}>
        {/* {datagram && datagram.associations && Array.isArray(datagram.associations) && datagram.associations.join(' ')} */}

{thing && (        <Button
          //          thing={{ subject: ("thing/"+ (uuid ==null ? "" : uuid)), agentInput: "Add Thing" }}
//          thing={{ subject: "add-thing", agentInput: "Add Thing" }}
          thing={{...thing, subject: thing.uuid, agentInput: "Add Thing" }}

        />)}
        <Grid container spacing={3} direction="row">
          {filteredScoredThings && (
            <>Showing {filteredScoredThings.length} of {things.length} known Things.<br/></>
          )}
          {filteredScoredThings && (
            <>
              {filteredScoredThings.map((t) => (
                <Card
                  key={"card_" + t.uuid}
                  id={`${t.index}`}
                  //datagram={datagram}
                  card={{ ...t, associations: associations }}
                  text={t && thing.text}
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
