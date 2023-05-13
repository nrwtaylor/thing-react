import React, { memo, useState, useEffect, useCallback } from "react";
import { devFlag, debugFlag } from "../util/dev.js";

import { Card } from "./Card.js";
import { Grid, Box } from "@mui/material";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { FullscreenExitTwoTone } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

import useThings from "../useThings.js";
import useThing from "../useThing.js";

import useToken from "../useToken.js";
import useIdentity from "../useIdentity.js";
import {
  scoreThings,
  sortThingsByScore,
  sortThingsByAge,
} from "../util/text.js";

import Button from "./Button.js";
import Flag from "./Flag.js";

import LazyLoad from "react-lazyload";

const maximumStackThings = 7;

const style = {
  //minHeight: 200,
  // maxWidth: 800,
  //width: '100%',
  //  display: 'flex',
  // spacing:'1'
};

//export const ThingContainer = memo(function ThingContainer(props) {
export const ThingContainer = ({ thing }) => {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;

  //  const { thing } = props;
  const { username, token, getToken, setToken, deleteToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();

  const [flag, setFlag] = useState();

  const [lens, setLens] = useState();

  const {
    findThing,
    moveThing,
    flipThing,
    openThing,
    foldThing,
    deleteThing,
    spawnThing,
    updateThing,
  } = useThing(thing);

  const [scoredThings, setScoredThings] = useState();

  const [filteredScoredThings, setFilteredScoredThings] = useState();

  // Association things with the current thing.
  const [associations, setAssociations] = useState();
  const { things, getThings, setThings } = useThings();

  useEffect(() => {
    if (filteredScoredThings == null) {
      return;
    }

    if (
      Array.isArray(filteredScoredThings) &&
      filteredScoredThings.length === 0
    ) {
      getThings();
      return;
    }
  }, [filteredScoredThings]);

  useEffect(() => {
    console.log("ThingContainer things", things);
  }, [things]);

  useEffect(() => {
    if (thing == null) {
      return;
    }

    if (typeof thing.associations !== undefined) {
      var newAssociations = thing.associations;
      if (
        Array.isArray(thing.associations) &&
        !thing.associations.includes(thing.uuid)
      ) {
        newAssociations = thing.associations.push(thing.uuid);
      }

      setAssociations(newAssociations);
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

  useEffect(() => {
    if (things == null) {
      return;
    }

    if (thing == null) {
      return;
    }

    if (Array.isArray(things) && things.length === 0) {
      return;
    }

    console.log("ThingContainer scoredThings prescore", thing, thing.subject);

    const scoredThings = scoreThings(things, thing.subject);

    setScoredThings(scoredThings);
  }, [things, thing && thing.subject]);

  useEffect(() => {
    console.debug("ThingContainer chooseThings");
    chooseThings();
  }, [scoredThings, lens]);

  function chooseThings() {
    if (scoredThings == null) {
      return;
    }

    console.log("ThingContainer scoredThings", scoredThings);

    const priorityThings = scoredThings.filter((t) => {
      if (t.priority == null) {
        return false;
      }
      if (t.priority === "priority") {
        return true;
      }
      return false;
    });

    console.log("ThingContainer priorityThings", priorityThings);

    const f = scoredThings
      .filter((t) => {
        if (typeof t.priority !== "undefined" && t.priority === "priority") {
          return false;
        }
        if (t.from === "stack") {
          return true;
        }

        if (t.uuid === thing.uuid) {
          return false;
        }

        if (thing.subject == null) {
          return true;
        }

        if (thing.subject === "things") {
          return true;
        }

        return t.score > 0;
      })
      .slice(0, maximumStackThings);

    var s = sortThingsByScore(f);

    if (lens === "sort new") {
      s = sortThingsByAge(f, "ascending");
    }

    if (lens === "sort old") {
      s = sortThingsByAge(f, "descending");
    }

    if (lens === "sort score") {
      s = sortThingsByScore(f);
    }

    // Make sure all associated items are always shown in collection
    var a = s;

    if (Array.isArray(s) && Array.isArray(associations)) {
      const ass = associations
        .map((association) => {
          const m = things.find((t) => t.uuid === association);
          return m;
        })
        .filter((a) => {
          const m = things.find((t) => t.uuid === a);
          if (m == null) {
            return false;
          }
          return true;
        });

      a = [...s, ...ass];
    }

    a = [...a, ...priorityThings];

    console.log("ThingContainer a", a);
    setFilteredScoredThings(a);
    //setFilteredScoredThings(scoredThings);
  }

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  function handleThing(t) {
    console.debug("ThingContainer handleThing t", t);
    if (t.variables.flag) {
      setLens(t.variables.flag);
    }
  }

  const contexts = ["sort new", "sort old", "sort score"];

  return (
    <>
      <div ref={drop} style={style}>
        {debugFlag && (<>THING CONTAINER</>)}
        {/* {datagram && datagram.associations && Array.isArray(datagram.associations) && datagram.associations.join(' ')} */}
        {thing && (
          <Button
            //          thing={{ subject: ("thing/"+ (uuid ==null ? "" : uuid)), agentInput: "Add Thing" }}
            //          thing={{ subject: "add-thing", agentInput: "Add Thing" }}
            thing={{
              ...thing,
              subject: "thing/" + thing.uuid + "/",
              agentInput: "Add Thing",
            }}
          />
        )}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {contexts.map((context) => {
            const capturedLens = lens;
            return (() => {
              return (
                <Flag
                  key={"flag_" + thing.uuid + "_" + context}
                  thing={thing}
                  agentInput={{
                    channel: "button",
                    //flag:{flag:context},
                    flag: capturedLens,
                    text: context,
                    texts: [context],
                  }}
                  updateThing={(t) => handleThing(t)}
                />
              );
            })();
          })}
        </div>
        <p />
        <div>LENS {lens}</div>
        <p />
        <Grid container spacing={3} direction="row">
          {filteredScoredThings && (
            <>
              Showing {filteredScoredThings.length} of {things.length} known
              Things.
              <br />
            </>
          )}
          {filteredScoredThings &&
            filteredScoredThings.map((t) => (
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
        </Grid>
      </div>
    </>
  );
};

export default ThingContainer;
