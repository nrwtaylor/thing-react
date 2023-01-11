import React, { useEffect, useState, lazy, Suspense } from "react";
import Thing from "../src/components/Thing.js";

import ThingPage from "../src/components/ThingPage.js";

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

import TemperatureHumidity from "../src/components/TemperatureHumidity.js";

import Collection from "../src/components/Collection.js";
import Host from "../src/components/Host.js";

import MetaStack from "../src/components/MetaStack.js";
import ThingCarousel from "../src/components/ThingCarousel.js";

import { v4 as uuidv4 } from "uuid";

import useThings from "./useThings";
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
  const apiPrefix = process.env.REACT_APP_API_PREFIX;
  const stack0Prefix = process.env.REACT_APP_STACK_0;

  const [uuid, setUuid] = useState();

  const pathname = window.location.pathname;

  const reg =
    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);

  const { things, getThings, setThings } = useThings();

  const { username, token, setToken, deleteToken, isValidToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  const { input, setInput, deleteInput } = useInput();

  const createdAt = Date.now();

  const [devStack, setDevStack] = useState();
  const [slug, setSlug] = useState();

  useEffect(() => {
    console.log("App pathname", pathname);
    setSlug(pathname);
  }, [pathname]);

  useEffect(() => {
    if (things == null) {
      return;
    }

    // Do not create things.
    // Consider: condition for when to create a thing.
    console.log("App pathname", pathname);
    if (pathname == null) {
      return;
    }
    if (pathname === "/things") {
      return;
    }
    if (pathname === "/") {
      return;
    }

    //const { thing, index } = findThing(id);
    const newThing = {};
    const uuid = uuidv4();
    newThing.uuid = uuid;
    newThing.subject = pathname;
    newThing.createdAt = createdAt;

    //console.log("ThingContainer spawnThing thing", thing);
    console.log("App pathname createThing token", token);


// Do not spawn a thing. Test.
return;

    // Spawn thing on designated stack.

    const doNotWait = createThing(webPrefix, newThing, token)
      .then((result) => {
        if (result == null) {
          return;
        }

        console.log("App pathname createThing result", result);

        newThing.associations = {
          ...newThing.associations,
          uuid: result.uuid,
        };

        //          setThings(
        //            update(things, {
        //              $splice: [[index, 0, newThing]],
        //            })
        //          );

        //          props.onCollectionChange(things);
      })
      .catch((error) => {
        console.log("spawnThing createThing error", error);
      });
  }, [slug, things, token]);

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

  //  useEffect(() => {
  //    console.log("App [] start");
  //    loadThings();
  //    getThings(token);
  //  }, []);

  useEffect(() => {
    console.log("App things", things);
  }, [things]);

  function handleCollectionChange(things) {
    //   setThings(things);
    if (things && things[0] && things[0].uuid) {
      console.log("App setUuid", things[0].uuid);
      setUuid(things[0].uuid);
      return;
    }

    if (things.length === 0) {
      return;
    }

    const u = uuidv4();
    setUuid(u);
    setThings(things);
    getThings(token);
    //    loadThings();
  }

  return (
    <>
      THING-REACT 11 January 2023 82e2
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
                <ThingCarousel />
              </>
            }
          >
            SLASH THINGCAROUSEL
          </Route>

          <Route
            exact
            path="/things"
            element={
              <>
                <ThingCards
     //             onCollectionChange={(c) => {
     //               handleCollectionChange(c);
     //             }}
                />
              </>
            }
          >
            THING CARDS
          </Route>

          <Route
            exact
            path="/snapshot/:uuid/temperature-humidity"
            element={
              <Snapshot
                datagram={{
                  to: "agent",
                  subject: pathname
                    .replace("/snapshot/", "")
                    .replace("/temperature-humidity/", ""),
                  webPrefix: webPrefix,
                }}
              />
            }
          >
            SNAPSHOT
          </Route>

          <Route
            exact
            path="/thing/:text"
            element={
              <ThingPage
              />
            }
          >
            SNAPSHOT
          </Route>


          <Route
            exact
            path="/snapshot/:text"
            element={
              <Snapshot
                datagram={{
                  to: "agent",
                  subject: pathname,
                  webPrefix: webPrefix,
                }}
              />
            }
          >
            SNAPSHOT
          </Route>
{/*
          <Route
            exact
            path="/history/:text"
            element={
              <History
                datagram={{
                  to: "agent",
                  subject: pathname.replace("/history/", ""),
//                  subject: pathname,
                  webPrefix: webPrefix,
                }}
              />
            }
          >
            HISTORY
          </Route>
*/}

          <Route
            exact
            path="/history/:text"
            element={
              <>
                <ThingPage />
              </>
            }
          >
            THINGPAGE
          </Route>


          <Route
            exact
            path="/:channel/:uuid/:text"
            element={
              <>
                <ThingCarousel
                />
              </>
            }
          >
            THINGCAROUSEL
          </Route>

          <Route
            exact
            path="/:uuid/:text"
            element={
              <>
                <ThingCarousel
                />
              </>
            }
          >
            THINGCAROUSEL
          </Route>

          <Route
            exact
            path="/:text"
            element={
              <>
                <ThingPage />
              </>
            }
          >
            THINGPAGE
          </Route>

        </Routes>
      </BrowserRouter>
      <ZuluTime />
      <Host />
      <MetaStack />
      {devStack} ms
      <br />
      {/*token*/}
      <br />
      {isValidToken ? "VALID TOKEN" : "NOT VALID TOKEN"}
      <br />
      End.
    </>
  );
}
