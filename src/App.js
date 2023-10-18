import React, { useEffect, useState, lazy, Suspense } from "react";

import theme from "./util/theme.js";

import Thing from "../src/components/Thing.js";

import ThingPage from "../src/components/ThingPage.js";

import Login from "../src/components/Login.js";
import TokenLogin from "../src/components/TokenLogin.js";

import Logout from "../src/components/Logout.js";
import Signup from "../src/components/Signup.js";
import ThingCards from "../src/components/ThingCards.js";

//import { getThings } from "../src/util/database.js";

import ZuluTime from "../src/components/ZuluTime.js";

import Token from "../src/components/Token.js";
import Identity from "../src/components/Identity.js";

// For the snapshot and history routes.
// Refactor to do this programatically.
import Snapshot from "../src/components/Snapshot.js";
import History from "../src/components/History.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "../src/components/Input.js";

import { Container } from "@mui/material";
import ThingsContainer from "../src/components/ThingContainer.js";

import Collection from "../src/components/Collection.js";
import Host from "../src/components/Host.js";

import MetaStack from "../src/components/MetaStack.js";
import ThingCarousel from "../src/components/ThingCarousel.js";

import { v4 as uuidv4 } from "uuid";

import useToken from "./useToken.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ componentName, ...props }) {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;
  const stack0Prefix = process.env.REACT_APP_STACK_0;

  const [uuid, setUuid] = useState();

  const pathname = window.location.pathname;

  const reg =
    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);

  const { username, token, setToken, deleteToken, isValidToken } = useToken();

  return (
    <>
      THING-REACT 17 October 2023 cce7
      <br />
      {/*identity && <Identity identity={identity} />*/}
      {/*token && token.message*/}
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
{/*<ThingCarousel />*/}
                <ThingPage />
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
                <ThingPage />
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

          <Route exact path="/thing/:text" element={<ThingPage />}>
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
            path="/history-:text"
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
                <ThingCarousel />
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
                <ThingCarousel />
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
      {isValidToken ? "VALID TOKEN" : "NOT VALID TOKEN"}
      <br />
      End.
    </>
  );
}
