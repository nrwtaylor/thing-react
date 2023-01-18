import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  getThing as getThingy,
  forgetThing as forgetThingy,
  setThing as setThingy,
  createThing as createThingy,
  makeObservable,
} from "./util/database.js";

import { getSlug } from "./util/text.js";

import { v4 as uuidv4 } from "uuid";
import useToken from "./useToken.js";
import useThings from "./useThings.js";

import update from "immutability-helper";

const userThing = makeObservable({ thing: [], count: 0 });

const apiPrefix = process.env.REACT_APP_API_PREFIX;

const webPrefix = process.env.REACT_APP_WEB_PREFIX;

const defaultThing = {
  index: 20,
  to: "localhost",
  subject: "Please Log In",
  createdAt: Date.now(),
  uuid: uuidv4(),
  input: "Login",
};

export default function useThing(datagram) {
  const { token } = useToken();
  const priorDatagram = usePrior(datagram);

  const { things, getThings, setThings } = useThings();

  const [flag, setFlag] = useState();

  useEffect(() => {
    if (things == null) {return;}
    console.log("useThing things", things);
  }, [things]);

  //  useEffect(() =>{
  //console.log("useThing datagram", datagram);
  //getThing();

  //  }, [datagram]);

  const getThing = () => {
    if (token == null) {
      return;
    }

    if (flag === "red") {
      return;
    }

    if (datagram == null) {
      return;
    }

    console.log("useThing getThing token datagram", token, datagram);

    // If there is a uuid then get that Thing, returning false if not found.
    if (datagram.uuid) {
      setFlag("red");

      getThingy(datagram, token)
        .then((result) => {
          console.log("useThing getThing result", datagram.uuid, result);

          var combinedThing = defaultThing;

          if (result && result.thing) {
            combinedThing = mergeObjectsInUnique(
              [...thing, ...result.thing],
              "uuid"
            );
          }

          const uuids = combinedThing.uuid;
          const conditionedThing = combinedThing;
          console.log("useThing getThing conditionedThing", conditionedThing);
          setFlag("green");
          setThing(conditionedThing);
        })
        .catch((error) => {
          setFlag("yellow");
          // Add an error card in. Up front and center?
          setThing(false);

          console.log("useThing getThing error", datagram.uuid, error);
        });
      return;
    }

    console.log("useThing createThing event");

    // Don't create duplicates

    const x = getSlug(datagram.subject);
    const subjects = things.map((t) => {
      return getSlug(t.subject);
    });

    console.log("useThing createThing subjects", subjects);

    if (subjects.includes(x)) {
      return;
    }

    if (datagram.to === "stack") {
      return;
    }

    //    return;
    // No uuid provided. SO create thing.
    setFlag("red");
    const doNotWait = createThingy(webPrefix, datagram, token)
      .then((result) => {
        setFlag("green");
        console.log("useThing createThingy datagram result", datagram, result);

        const newThing = datagram;
        newThing.associations = {
          ...newThing.associations,
          uuid: result.uuid,
        };

        setThing(newThing);
        console.log("useThing createThingy setThing newThing");
        setThings(
          update(things, {
            $splice: [[0, 0, newThing]],
          })
        );
        console.log("useThing createThingy setThings");
        //getThings();
        //          props.onCollectionChange(things);
      })
      .catch((error) => {
        setFlag("yellow");
        console.log("spawnThing createThing error", error);
      });
  };

  var deepDiffMapper = (function () {
    return {
      VALUE_CREATED: "created",
      VALUE_UPDATED: "updated",
      VALUE_DELETED: "deleted",
      VALUE_UNCHANGED: "unchanged",
      map: function (obj1, obj2) {
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
          throw "Invalid argument. Function given, object expected.";
        }
        if (this.isValue(obj1) || this.isValue(obj2)) {
          return {
            type: this.compareValues(obj1, obj2),
            data: obj1 === undefined ? obj2 : obj1,
          };
        }

        var diff = {};
        for (var key in obj1) {
          if (this.isFunction(obj1[key])) {
            continue;
          }

          var value2 = undefined;
          if (obj2[key] !== undefined) {
            value2 = obj2[key];
          }

          diff[key] = this.map(obj1[key], value2);
        }
        for (var key in obj2) {
          if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
            continue;
          }

          diff[key] = this.map(undefined, obj2[key]);
        }

        return diff;
      },
      compareValues: function (value1, value2) {
        if (value1 === value2) {
          return this.VALUE_UNCHANGED;
        }
        if (
          this.isDate(value1) &&
          this.isDate(value2) &&
          value1.getTime() === value2.getTime()
        ) {
          return this.VALUE_UNCHANGED;
        }
        if (value1 === undefined) {
          return this.VALUE_CREATED;
        }
        if (value2 === undefined) {
          return this.VALUE_DELETED;
        }
        return this.VALUE_UPDATED;
      },
      isFunction: function (x) {
        return Object.prototype.toString.call(x) === "[object Function]";
      },
      isArray: function (x) {
        return Object.prototype.toString.call(x) === "[object Array]";
      },
      isDate: function (x) {
        return Object.prototype.toString.call(x) === "[object Date]";
      },
      isObject: function (x) {
        return Object.prototype.toString.call(x) === "[object Object]";
      },
      isValue: function (x) {
        return !this.isObject(x) && !this.isArray(x);
      },
    };
  })();

  /*
var result = deepDiffMapper.map({
  a: 'i am unchanged',
  b: 'i am deleted',
  e: {
    a: 1,
    b: false,
    c: null
  },
  f: [1, {
    a: 'same',
    b: [{
      a: 'same'
    }, {
      d: 'delete'
    }]
  }],
  g: new Date('2017.11.25')
}, {
  a: 'i am unchanged',
  c: 'i am created',
  e: {
    a: '1',
    b: '',
    d: 'created'
  },
  f: [{
    a: 'same',
    b: [{
      a: 'same'
    }, {
      c: 'create'
    }]
  }, 1],
  g: new Date('2017.11.25')
});
*/
  function usePrior(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const [thing, setThing] = useState(userThing.get().thing);

  useEffect(() => {
    //console.log("useThing getThing datagram changed", priorDatagram, datagram, deepDiffMapper.map([priorDatagram, datagram]) );

    if (priorDatagram == null) {
      return;
    }
    if (datagram == null) {
      return;
    }

    var hasDatagramChanged = false;
    if (priorDatagram.subject !== datagram.subject) {
      hasDatagramChanged = true;
    }

    if (priorDatagram.to !== datagram.to) {
      hasDatagramChanged = true;
    }

    if (priorDatagram.from !== datagram.from) {
      hasDatagramChanged = true;
    }

    if (priorDatagram.agentInput !== datagram.agentInput) {
      hasDatagramChanged = true;
    }

    if (hasDatagramChanged === false) {
      return;
    }

    console.log(
      "useThing getThing datagram changed",
      priorDatagram,
      datagram,
      deepDiffMapper.map([priorDatagram, datagram])
    );

    getThing();
  }, [datagram, priorDatagram]);

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
    getThings();
    return userThing.subscribe(setThing);
  }, []);

  const actions = useMemo(() => {
    return {
      setThing: (ts) => userThing.set({ ...thing, ts }),
    };
  }, [thing]);

  // Expect part of a thing.
  const updateThing = (t) => {
    //  const updateThing = useCallback(
    //    (id, atIndex) => {
    //console.log("deleteCard id", id);
    //console.log("deleteCard atIndex", atIndex);
    //      const { thing, index } = findThing(id);

    console.log("useThing updateThing t", t);
    console.log("useThing updatething thing", thing);
    const newThing = { ...thing, ...t };
    console.log("useThing updateThing request saveThing", newThing);
    saveThing(newThing);

    return Promise.resolve(true);
  };

  const saveThing = (t) => {
    console.log("useThing saveThing userThing", t);
    setThing(t);
    setThingy(t.uuid, t, token)
      .then((result) => {
        console.log("useThing saveThing result", result);
      })
      .catch((error) => {
        console.log("useThing saveThing error", error);
      });
  };

  const deleteThing = useCallback(
    (id, atIndex) => {
      if (things.length <= 1) {
        return;
      }

      console.log("useThing deleteCard id", id);
      console.log("useThing deleteCard atIndex", atIndex);
      const { thing, index } = findThing(id);

      console.log("useThing deleteCard thing index", thing, index);

      setThings(
        update(things, {
          $splice: [[index, 1]],
        })
      );

      // Call delete Thing api
      forgetThingy(thing, token)
        .then((res) => {
          console.log("ThingContainer forgot uuid", thing.uuid);
          //getThings();
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

  function testThing() {
    console.log("useThing testThing");
  }

  const spawnThing = useCallback(
    (id, atIndex) => {
      //console.log("deleteCard id", id);
      //console.log("deleteCard atIndex", atIndex);
      //const { thing, index } = findThing(id);
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
              $splice: [[0, 0, newThing]],
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

  // We need a function in the client to merge things client side.

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
    //    saveThing:saveThing,
    updateThing: updateThing,
    setThing: saveThing,
    testThing: testThing,
    setThing: setThing,
    getThing: getThing,
    findThing: findThing,
    flipThing: flipThing,
    deleteThing: deleteThing,
    forgetThing: deleteThing,
    spawnThing: spawnThing,
    openThing: openThing,
    foldThing: foldThing,
    moveThing: moveThing,
    flag: flag,
    thing,
  };
}
