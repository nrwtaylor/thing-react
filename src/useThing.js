import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Get as getThingy,
  forgetThing as forgetThingy,
  setThing as setThingy,
  createThing as createThingy,
  makeObservable,
} from "./util/database.js";

import { v4 as uuidv4 } from "uuid";
import useToken from "./useToken.js";
import useThings from "./useThings.js";

import update from "immutability-helper";

const userThing = makeObservable({ thing: [], count: 0 });

const apiPrefix = process.env.REACT_APP_API_PREFIX;

const webPrefix = process.env.REACT_APP_WEB_PREFIX;

const defaultThing = [
  {
    index: 20,
    to: "localhost",
    subject: "Please Log In",
    createdAt: Date.now(),
    uuid: uuidv4(),
    input: "Login",
  },
];

export default function useThing(datagram) {
  const { token } = useToken();

  const { things, getThings, setThings } = useThings();

  useEffect(() => {
    console.log("useThing things", things);
  }, [things]);

  const getThing = (token) => {
    if (token === undefined) {
      return;
    }
    getThingy(datagram, token)
      .then((result) => {
        console.log("App loadThing result", result);

        var combinedThing = defaultThing;
        if (result && result.thing) {
          combinedThing = mergeObjectsInUnique(
            [...thing, ...result.thing],
            "uuid"
          );
        }

        const uuids = combinedThing.uuid;
        const conditionedThing = combinedThing;
        console.log("App loadThing conditionedThing", conditionedThing);

        setThing(conditionedThing);
      })
      .catch((error) => {
        // Add an error card in. Up front and center?
        setThing(defaultThing);

        console.log("App loadThing error", error);
      });
  };

  const [thing, setThing] = useState(userThing.get().thing);

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

        setThingy(t.uuid, newT, token).then((result) => {
          console.log(result);
        });
      });

      // dev?
    },
    [findThing, things, setThings]
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
      setThingy(newThing.uuid, newThing, token).then((result) => {
        console.log(result);
      });

      //props.onCollectionChange(things);
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
      setThingy(newThing.uuid, newThing, token).then((result) => {
        console.log("ThingContainer setThing result", result);
      });

      //props.onCollectionChange(things);
    },
    [things]
  );

  useEffect(() => {
    return userThing.subscribe(setThing);
  }, []);

  const actions = useMemo(() => {
    return {
      setThing: (ts) => userThing.set({ ...thing, ts }),
    };
  }, [thing]);

  const saveThing = (t) => {
    console.log("useThing saveThing userThing", t);
    setThing(t);
  };

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
      forgetThingy(thing, token)
        .then((res) => {
          console.log("ThingContainer forgot uuid", thing.uuid);
          //          props.onCollectionChange(things);
        })
        .catch((error) => {
          console.error("error", error);
        });
      //      props.onCollectionChange(things);
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
      setThingy(newThing.uuid, newThing, token).then((result) => {
        console.log(result);
      });

      //           setThings(update(things, {
      //               $splice: [[index,1]],
      ///           }));
      //      props.onCollectionChange(things);
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

      const doNotWait = createThingy(webPrefix, thing, token)
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
//getThings();
          //          props.onCollectionChange(things);
        })
        .catch((error) => {
          console.log("spawnThing createThing error", error);
        });
    },
    [things]
  );

  function mergeObjectsInUnique<T>(array: T[], property: any): T[] {
    const newArray = new Map();

    array.forEach((item: T) => {
      const propertyValue = item[property];
      newArray.has(propertyValue)
        ? newArray.set(propertyValue, {
            ...item,
            ...newArray.get(propertyValue),
          })
        : newArray.set(propertyValue, item);
    });

    return Array.from(newArray.values());
  }

  //  const deleteIdentity = (userIdentity) => {
  // Leave no rubbish behind.
  //    setIdentity(false);
  //  };

  return {
    //    deleteIdentity: deleteIdentity,
//    state: thing,
//    saveThing: setThing,
    setThing: saveThing,
    getThing: getThing,
    findThing: findThing,
    flipThing: flipThing,
    deleteThing: deleteThing,
    forgetThing: deleteThing,
    spawnThing: spawnThing,
    openThing: openThing,
    foldThing: foldThing,
    moveThing: moveThing,
    thing,
  };
}
