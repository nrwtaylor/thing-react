import { useState, useEffect, useMemo } from "react";
import {
  getThings as getThingies,
  createThing,
  makeObservable,
} from "./util/database.js";

import useHybridEffect from "./useHybridEffect.js";

import { v4 as uuidv4 } from "uuid";

import useToken from "./useToken.js";
const userThings = makeObservable({ things: [], count: 0 });

const apiPrefix = process.env.REACT_APP_API_PREFIX;
const webPrefix = process.env.REACT_APP_WEB_PREFIX;

// Basically a list of the minimum suite for your 'application'
// to run.

// Took out the first one to isolate the new item creation behaviour.

const defaultThings = [
/*
  {
    to: "localhost",
    subject: window.location.pathname.replace(/^\/|\/$/g, ""),
    createdAt: Date.now(),
    uuid: uuidv4(),
    input: null,
  },
*/
  {
    index: 20,
    to: "localhost",
    from: "stack",
    subject: "Log Out",
    createdAt: Date.now(),
    uuid: uuidv4(),
    input: "Logout",
  },

  {
    index: 20,
    to: "localhost",
    from: "stack",
    subject: "Token",
    createdAt: Date.now(),
    uuid: uuidv4(),
    input: "Token",
  },

  {
    index: 20,
    to: "localhost",
    from: "stack",
    subject: "Data Monitor",
    createdAt: Date.now(),
    uuid: uuidv4(),
    input: "DataMonitor",
  },


  {
    index: 20,
    to: "localhost",
    from: "stack",
    subject: "Please Log In",
    createdAt: Date.now(),
    uuid: uuidv4(),
    input: "Login",
  },
  {
    index: 21,
    to: "localhost",
    from: "stack",
    subject: "Reauthorize",
    createdAt: Date.now(),
    uuid: uuidv4(),
    input: "Reauthorize",
  },
  {
    index: 21,
    to: "localhost",
    from: "stack",
    subject: "Please Sign Up",
    createdAt: Date.now(),
    uuid: uuidv4(),
    input: "Signup",
  },
  {
    index: 21,
    to: "localhost",
    from: "stack",
    subject: "Privacy",
    createdAt: Date.now(),
    uuid: uuidv4(),
    input: "Privacy",
  },
  {
    index: 21,
    to: "localhost",
    from: "stack",
    subject: "Terms of Use",
    createdAt: Date.now(),
    uuid: uuidv4(),
    input: "TermsOfUse",
  },
];

const errorThing = {
  index: 20,
  to: "localhost",
  from: "stack",
  subject: "Error",
  createdAt: Date.now(),
  uuid: uuidv4(),
  input: "Error",
};

export default function useThings() {
  const { token } = useToken();
  const [count, setCount] = useState();
  //  const [things, setThings] = useState(userThings.get().things);

  const [things, setThings] = useState();

  useEffect(() => {
    console.log("useThings token", token);
    getThings();
  }, [token]);

  const getThings = () => {
    console.log("useThings getThings token", token);
    if (token == null) {

// If the token is null, it means there is no access
// to the forward stack pointer.

// No need to set default.
// But need to establish a hook to monitor changes in [things].

      setThings(defaultThings);


      console.log("useThings saw null token");
      return;
    }

    const tempThings = userThings.get().things;
    setThings(tempThings);

    getThingies(apiPrefix, token)
      .then((result) => {
        console.log("useThings getThings getThingies things", things);
        console.log("useThings getThings getThingies result", result);

        var combinedThings = [];
        if (result && result.things && result.things.length !== 0) {
          combinedThings = mergeObjectsInUnique(
            [...tempThings, ...result.things],
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

        console.log(
          "useThings loadThings conditionedThings",
          conditionedThings
        );

        setThings(conditionedThings);
        //return conditionedThings;
      })
      .catch((error) => {
        // Add an error card in. Up front and center?
        //setThings(defaultThings);
        //webPrefix, defaultThings[1], token
        createThing(webPrefix, errorThing, token);
        console.log("useThings loadThings error", error);
      });

    //    const things = getThings();
    //    return things;
  };

  useEffect(() => {
    //    getThings();
    return userThings.subscribe(setThings);
  }, []);

  useHybridEffect(() => {
    //if (things == null) {return;}
    console.log("useThings things", things);
  }, [things]);

  useEffect(() => {
    console.log("useThings setThings");
  }, [setThings]);

  useEffect(() => {
    //console.log("useThings getThings");
  }, [getThings]);

  useEffect(() => {
    getThings();
  }, []);

  const actions = useMemo(() => {
    return {
      setThings: (ts) => userThings.set({ ...things, ts }),
      incrementCount: () =>
        userThings.set({ ...things, count: things.count + 1 }),
      decrementCount: () =>
        userThings.set({ ...things, count: things.count - 1 }),
    };
  }, [things]);

  const saveThings = (userThings) => {
    if (userThings.length === 0) {
      return;
    } // never allow zero cards.
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
    //    state: things,
    setThings: saveThings,
    getThings: getThings,
    things,
  };
}
