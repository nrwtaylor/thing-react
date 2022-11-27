import React, { useEffect, useState, lazy, Suspense } from "react";
import Thing from "../src/components/Thing.js";
import Login from "../src/components/Login.js";
import TokenLogin from "../src/components/TokenLogin.js";

import Logout from "../src/components/Logout.js";
import Signup from "../src/components/Signup.js";
import ThingCards from "../src/components/ThingCards.js";

import { getThings, createThing } from "../src/util/database.js";

import ZuluTime from "../src/components/ZuluTime.js";

import Token from "../src/components/Token.js";
import Identity from "../src/components/Identity.js";

// For the snapshot and history routes.
// Refactor to do this programatically.
import Snapshot from "../src/components/Snapshot.js";
import History from "../src/components/History.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "../src/components/Input.js";

import Container from "@mui/material/Container";
import ThingsContainer from "../src/components/ThingContainer.js";

import Collection from "../src/components/Collection.js";
import Host from "../src/components/Host.js";

import MetaStack from "../src/components/MetaStack.js";
import ThingCarousel from "../src/components/ThingCarousel.js";

import { v4 as uuidv4 } from "uuid";

import useToken from "./useToken";
import useIdentity from "./useIdentity";
import useInput from "./useInput";

import axios from "axios";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

//export default function App() {
/*
const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
};
*/
export default function App({ componentName, ...props }) {
  const DynamicComponent = lazy(() => import(`./components/${componentName}`));

  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const testUuid0 = process.env.REACT_APP_THING_0;
  const testUuid1 = process.env.REACT_APP_THING_1;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;
  const stack0Prefix = process.env.REACT_APP_STACK_0;

  const [uuid, setUuid] = useState();

  const defaultThings = [
    {
      index: 20,
      to: "localhost",
      subject: "Please Log In",
      createdAt: Date.now(),
      uuid: uuidv4(),
      input: "Login",
      //      webPrefix: "http://192.168.10.10/snapshot.json",
    },
    {
      index: 21,
      to: "localhost",
      subject: "Please Sign Up",
      createdAt: Date.now(),
      uuid: testUuid0,
      input: "Signup",
      //      webPrefix: "http://192.168.10.10/snapshot.json",
    },
    {
      index: 21,
      to: "localhost",
      subject: "Privacy",
      createdAt: Date.now(),
      uuid: uuidv4(),
      input: "Privacy",
      //      webPrefix: "http://192.168.10.10/snapshot.json",
    },
    {
      index: 21,
      to: "localhost",
      subject: "Terms of Use",
      createdAt: Date.now(),
      uuid: uuidv4(),
      input: "TermsOfUse",
      //      webPrefix: "http://192.168.10.10/snapshot.json",
    },
  ];

  const pathname = window.location.pathname;

  const reg = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);

  const [things, setThings] = useState([]);

  const { username, token, setToken, deleteToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  const { input, setInput, deleteInput } = useInput();

  const createdAt = Date.now();

  const [devStack, setDevStack] = useState();

  useEffect(() => {
    if (!identity) {
      //      defaultThings();
      return;
    }
    if (identity === null) {
      //      defaultThings();
      return;
    }

    //    loadThings();
  }, [identity]);

  useEffect(() => {
    loadThings();
  }, []);

  useEffect(() => {
    console.log("App things", things);
  }, [things]);

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

  const merge = (a1, a2) => {
    return a1
      .map((x) => {
        const y = a2.find((item) => x.uuid === item.uuid);
        if (y) {
          return Object.assign({}, x, y);
        } else return x;
      })
      .concat(a2.filter((item) => a1.every((x) => x.name !== item.uuid)));
  };

  function loadThings() {
    console.log("App loadThings token", token);
    console.log("App loadThings apiPrefix", apiPrefix);
    getThings(apiPrefix, token)
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
            //      webPrefix: "http://192.168.10.10/snapshot.json",
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
      })
      .catch((error) => {
        setThings(defaultThings);

        console.log("App loadThings error", error);
      });
  }

  useEffect(() => {
    console.log("App token", token);
    loadThings();
  }, [token]);

  useEffect(() => {
    console.log("App identity", identity);
  }, [identity]);

  function handleCollectionChange(things) {
    //   setThings(things);
    if (things && things[0] && things[0].uuid) {
      console.log("App setUuid", things[0].uuid);
      setUuid(things[0].uuid);
      return;
    }

    const u = uuidv4();
    setUuid(u);

    loadThings();
  }

  return (
    <>
      THING-REACT 26 November 2022 0156
      <br />
      {identity && <Identity identity={identity} />}
      {token && token.message}
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <ThingCarousel token={token} things={things} />
              </>
            }
          ></Route>

          <Route
            exact
            path="/things"
            element={
              <>
                <ThingCards
                  token={token}
                  things={things}
                  onCollectionChange={(c) => {
                    handleCollectionChange(c);
                  }}
                />
              </>
            }
          ></Route>

          <Route exact path="/snapshot/:text" element={<Snapshot />}></Route>

          <Route
            exact
            path="/history/:text"
            element={
              <History
                datagram={{
                  to: "agent",
                  subject: pathname.replace("/history/", ""),
                  webPrefix: webPrefix,
                }}
              />
            }
          ></Route>

          <Route
            exact
            path="/:text"
            element={
              <>
                <ThingCarousel
                  token={token}
                  things={[
                    { to: "agent", subject: pathname, webPrefix: webPrefix },
                    ...things,
                  ]}
                />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <ZuluTime />
      <Host />
      <MetaStack />
      {devStack} ms End.
    </>
  );
}
