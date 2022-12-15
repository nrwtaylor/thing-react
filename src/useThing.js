import { useState, useEffect, useMemo } from "react";
import { Get as getThingy, createThing as createThingy, makeObservable } from "./util/database.js";

import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";

const userThing = makeObservable({ thing: [], count: 0 });

const apiPrefix = process.env.REACT_APP_API_PREFIX;


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



export default function useThing(datagram, token) {


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


  useEffect(() => {
    return userThing.subscribe(setThing);
  }, []);

  const actions = useMemo(() => {
    return {
      setThing: (ts) => userThing.set({ ...thing, ts }),
    }
  }, [thing])

  const saveThing = (userThing) => {
    console.log("useThing saveThing userThing", userThing);
    setThing(userThing);
  };

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
    state:thing,
    setThing: saveThing,
    getThing: getThing,
    thing,
  };
}
