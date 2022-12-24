import { useState, useEffect, useMemo } from "react";
import { getThings as getThingies, createThing, makeObservable } from "./util/database.js";

import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";

const userThings = makeObservable({ things: [], count: 0 });

const apiPrefix = process.env.REACT_APP_API_PREFIX;
const webPrefix = process.env.REACT_APP_WEB_PREFIX;

  const defaultThings = [
    {
      index: 20,
      to: "localhost",
      subject: "Please Log In",
      createdAt: Date.now(),
      uuid: uuidv4(),
      input: "Login",
    },
    {
      index: 21,
      to: "localhost",
      subject: "Please Sign Up",
      createdAt: Date.now(),
      uuid: uuidv4(),
      input: "Signup",
    },
    {
      index: 21,
      to: "localhost",
      subject: "Privacy",
      createdAt: Date.now(),
      uuid: uuidv4(),
      input: "Privacy",
    },
    {
      index: 21,
      to: "localhost",
      subject: "Terms of Use",
      createdAt: Date.now(),
      uuid: uuidv4(),
      input: "TermsOfUse",
    },
  ];

  const errorThing = 
    {
      index: 20,
      to: "localhost",
      subject: "Error",
      createdAt: Date.now(),
      uuid: uuidv4(),
      input: "Error",
    };


export default function useThings(token) {


  const getThings = (token) => {
if (token === undefined) {
  return;
}
    getThingies(apiPrefix, token)
      .then((result) => {
        console.log("App loadThings result", result);

        var combinedThings = [];
        if (result && result.things && result.things.length !== 0) {
          combinedThings = mergeObjectsInUnique(
            [...things, ...result.things],
            "uuid"
          );
        }

        if (combinedThings.length === 0) {
          combinedThings = defaultThings;
        } else {
          combinedThings.push({
            index: 21,
            to: "localhost",
            subject: "Token",
            createdAt: Date.now(),
            uuid: uuidv4(),
            input: "Token",
          });
        }

        const uuids = combinedThings.map((o) => o.uuid);
        const deduplicatedThings = combinedThings.filter(
          ({ uuid }, index) => !uuids.includes(uuid, index + 1)
        );

        const conditionedThings = deduplicatedThings.map((thing, index) => {
          return { ...thing, index: index };
        });

        //const deduplicatedThings = combinedThings.filter((value, index, self) =>
        //  index === self.findIndex((t) => (
        //    t.uuid === value.uuid
        //  ))
        //)

        console.log("App loadThings conditionedThings", conditionedThings);

setThings(conditionedThings);
//return conditionedThings;
      })
      .catch((error) => {

// Add an error card in. Up front and center?
        //setThings(defaultThings);
//webPrefix, defaultThings[1], token
createThing(webPrefix, errorThing, token);
        console.log("App loadThings error", error);
      });










//    const things = getThings();
//    return things;
  };

  const [things, setThings] = useState(userThings.get().things);


  useEffect(() => {
    return userThings.subscribe(setThings);
  }, []);

  const actions = useMemo(() => {
    return {
      setThings: (ts) => userThings.set({ ...things, ts }),
      incrementCount: () => userThings.set({ ...things, count: things.count + 1 }),
      decrementCount: () => userThings.set({ ...things, count: things.count - 1 }),
    }
  }, [things])

  const saveThings = (userThings) => {
if (userThings.length === 0) {return;} // never allow zero cards.
    console.log("useThings saveThings userThings", userThings);
    setThings(userThings);
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
    state:things,
    setThings: saveThings,
    getThings: getThings,
    things,
  };
}
