import React, { memo, useState, useEffect, useCallback } from "react";
import { Card } from "./Card.js";
import { Grid, Box } from "@material-ui/core";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { FullscreenExitTwoTone } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import {
  forgetThing,
  createThing,
  getThingReport,
  setThing,
} from "../util/database.js";

import useThings from "../useThings.js";
import useToken from "../useToken.js";
import useIdentity from "../useIdentity.js";



//import { wrap } from "analytics/lib/analytics.cjs";

const style = {
  //minHeight: 200,
  // maxWidth: 800,
  //width: '100%',
  //  display: 'flex',
  // spacing:'1'
};

export const ThingContainer = memo(function ThingContainer(props) {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;

//  const { token } = props;

  const { username, token, getToken, setToken, deleteToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
//  const { input, setInput, deleteInput } = useInput();

  const [ modifiedThings, setModifiedThings ] = useState();

//  const { things, getThings } = useThings(token);

  useEffect(() => {
    console.log("ThingCarousel token", token);
    //getToken();
    getThings(token);
  }, [token]);



  //  const [things, setThings] = useState(props.things);


  const { things, getThings, setThings } = useThings();

useEffect(() =>{
console.log("ThingContainer token", token);
}, [token]);

useEffect(()=>{

console.log("ThingContainer things", things);

}, [things]);

  //const {dragAndDrop} = props;
  const findThing = useCallback(
    (id) => {
      const thing = things.filter((c) => `${c.index}` === id)[0];
      return {
        thing,
        index: things.indexOf(thing),
      };
    },
    [things]
  );

  useEffect(() => {
    setThings(props.things);
  }, [props.things]);

  const moveThing = useCallback(
    (id, atIndex) => {
      const { thing, index } = findThing(id);
      setThings(
        update(things, {
          $splice: [
            [index, 1],
            [atIndex, 0, thing],
          ],
        })
      );

      things.map((t, index) => {
        const newT = { ...t, index: index };

        setThing(t.uuid, newT, token).then((result) => {
          console.log(result);
        });
      });

      // dev?
    },
    [findThing, things, setThings]
  );

  const deleteThing = useCallback(
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

      // Call delete Thing api
      forgetThing(thing, token)
        .then((res) => {
          console.log("ThingContainer forgot uuid", thing.uuid);
          props.onCollectionChange(things);
        })
        .catch((error) => {
          console.error("error", error);
        });
      //      props.onCollectionChange(things);
    },
    [things]
  );

  const openThing = useCallback(
    (id, atIndex) => {
      const { thing, index } = findThing(id);

      //           setThings(update(things, {
      //               $splice: [[index,1]],
      ///           }));
      const newThing = { ...thing };

      //          newThing.associations = {
      //            ...newThing.associations,
      //            uuid: result.uuid,
      //          };

      newThing.open = "open";

      setThings(
        update(things, {
          $splice: [[index, 1, newThing]],
        })
      );

      // dev?
      setThing(newThing.uuid, newThing, token).then((result) => {
        console.log("ThingContainer setThing result", result);
      });

      props.onCollectionChange(things);
    },
    [things]
  );

  const foldThing = useCallback(
    (id, atIndex) => {
      const { thing, index } = findThing(id);

      const newThing = { ...thing };

      newThing.open = "folded";

      setThings(
        update(things, {
          $splice: [[index, 1, newThing]],
        })
      );

      // dev?
      setThing(newThing.uuid, newThing, token).then((result) => {
        console.log(result);
      });

      props.onCollectionChange(things);
    },
    [things]
  );

  const spawnThing = useCallback(
    (id, atIndex) => {
      //console.log("deleteCard id", id);
      //console.log("deleteCard atIndex", atIndex);
      const { thing, index } = findThing(id);
      const newThing = { ...thing };
      const uuid = uuidv4();
      newThing.uuid = uuid;
      console.log("ThingContainer spawnThing thing", thing);
      console.log("ThingContainer spawnThing token", token);

      // Spawn thing on designated stack.

      const doNotWait = createThing(webPrefix, thing, token)
        .then((result) => {
          console.log("spawnThing createThing result", result);

          newThing.associations = {
            ...newThing.associations,
            uuid: result.uuid,
          };

          setThings(
            update(things, {
              $splice: [[index, 0, newThing]],
            })
          );

          props.onCollectionChange(things);
        })
        .catch((error) => {
          console.log("spawnThing createThing error", error);
        });
    },
    [things]
  );

  const flipThing = useCallback(
    (id, atIndex) => {
      //console.log("deleteCard id", id);
      //console.log("deleteCard atIndex", atIndex);
      const { thing, index } = findThing(id);

      const newThing = { ...thing };

      //          newThing.associations = {
      //            ...newThing.associations,
      //            uuid: result.uuid,
      //          };
      if (newThing && newThing.side === "back") {
        newThing.side = "front";
      } else if (newThing && newThing.side === "front") {
        newThing.side = "back";
      } else {
        // broken
        newThing.side = "front";
      }

      setThings(
        update(things, {
          $splice: [[index, 1, newThing]],
        })
      );

      // dev?
      setThing(newThing.uuid, newThing, token).then((result) => {
        console.log(result);
      });

      //           setThings(update(things, {
      //               $splice: [[index,1]],
      ///           }));
      props.onCollectionChange(things);
    },
    [things]
  );

  useEffect(() => {
    console.log("ThingContainer things", things);
    const reindexedThings = things.map((image, i) => {
      return { ...image, index: i };
    });
    props.onCollectionChange(reindexedThings);
  }, [things, setThings]);

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
