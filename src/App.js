import React, { useEffect, useState } from "react";
import Thing from "../src/components/Thing.js";
import Login from "../src/components/Login.js";
import Logout from "../src/components/Logout.js";
import Signup from "../src/components/Signup.js";
import { getThings } from "../src/util/database.js";

import Token from "../src/components/Token.js";
import Identity from "../src/components/Identity.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "../src/components/Input.js";

import Container from "@mui/material/Container";
import ThingsContainer from "../src/components/ThingContainer.js";

import Collection from "../src/components/Collection.js";

import { v4 as uuidv4 } from "uuid";

import useToken from "./useToken";
import useIdentity from "./useIdentity";
import useInput from "./useInput";

import axios from "axios";

export default function App() {
  const pathname = window.location.pathname;

  const reg = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);
  //  const input = { uuids: matches };
  const uuid = uuidv4();

//  const [things, setThings] = useState([]);

  const { username, token, setToken, deleteToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  const { input, setInput, deleteInput } = useInput();

  //const [identity, setIdentity] = useState();
  const createdAt = Date.now();

  // dev here user supplied channels.
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const testUuid0 = process.env.REACT_APP_THING_0;
  const testUuid1 = process.env.REACT_APP_THING_1;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;

  useEffect(() => {
    if (!identity) {
      defaultThings();
      return;
    }
    if (identity === null) {
      defaultThings();
      return;
    }
    loadThings();
  }, [identity]);

  useEffect(() => {
      defaultThings();
  }, []);


  useEffect(() => {
    console.log("App identity", identity);
  }, [identity]);


  function loadThings() {
    getThings(apiPrefix, token);

    const u = apiPrefix + "things/";
    axios
      .get(u, {
        headers: {
          Authorization: "my secret token",
          "x-access-token": token,
        },
      })

      .then((res) => {
        let thingy = res.data;
        console.log("Things axios res", res);
        console.log("Things axios res.data", res.data);



        //setThings({...things, ...thingy});

        // agent etime info json:null thing etc
        //        setData(res.data);

        //        const elapsedTime = Date.now() - requestedAt;
      })
      .catch((error) => {
        console.log("Thing error", u, error);
        //        setError({ ...error, message: "Problem" });
      });
  }



  useEffect(() => {
    console.log("token", token);
    //setIdentity(token);
    //console.log("identity",identity);
  }, [token]);

  useEffect(() => {
    console.log("App identity", identity);
  }, [identity]);

  function defaultThings() {}

  const things = [
    {
      index: 8,
      to: "proxy",
      subject: pathname,
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: "http://192.168.10.10/stack/",
    },
    {
      index: 9,
      to: "proxy",
      subject: "weather",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "weather",
      webPrefix: "http://192.168.10.10/stack/",
    },
    {
      index: 10,
      to: "proxy",
      subject: "day twilight tmlr",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "day twilight tmlr",
      webPrefix: "http://192.168.10.10/stack/",
    },
    {
      index: 11,
      to: "proxy",
      subject: "roll d20",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "roll",
      webPrefix: "http://192.168.10.10/stack/",
    },

    {
      index: 12,
      to: "proxy",
      subject: "roll",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "roll",
      webPrefix: "http://192.168.10.10/stack/",
    },
    {
      index: 13,
      to: "proxy",
      subject: "card",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "card",
      webPrefix: "http://192.168.10.10/stack/",
    },
    {
      index: 14,
      to: "whitefox",
      subject: "day-twilight-tmlr",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: null,
      webPrefix: "https://stackr.ca/",
    },

    {
      index: 1,
      to: "localhost",
      subject: "weather",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "weather",
      webPrefix: "http://localhost:3000/",
      pollInterval: 5 * 60000,
    },
    {
      index: 3,
      to: "whitefox",
      subject: "weather",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "weather",
      webPrefix: webPrefix,
      pollInterval: 10 * 60000,
    },

    {
      index: 5,
      to: "192.168.10.10",
      subject: "snapshot",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: "http://192.168.10.10/",
      pollInterval: 60000,
    },
    {
      index: 6,
      to: "kokopelli",
      subject: "snapshot",
      uuid: testUuid0,
      input: "snapshot",
      webPrefix: webPrefix + "snapshot/" + testUuid0 + "/",
      pollInterval: 60000,
    },
    {
      index: 7,
      to: "coop",
      subject: "snapshot",
      uuid: testUuid1,
      input: "snapshot",
      webPrefix: webPrefix + "snapshot/" + testUuid1 + "/",
      pollInterval: 60000,
    },
  ];

//setThings(t);

//  console.log("REACT THING");
//  console.log("Started Thing ", uuid);

//}

  return (
    <>
      <Token token={token} />
      <Identity identity={identity} />
      <BrowserRouter>
        THING-REACT 3 August 2022
        {!token && (
          <>
            <Login setToken={setToken} setIdentity={setIdentity} />
            <Signup />
          </>
        )}
        <Input setInput={setInput} />
{/*
        <div key={"2"}>
          <Thing
            token={token}
            datagram={{
              to: "agent",
              subject: input,
              createdAt: 0,
              input: "web",
              webPrefix: webPrefix,
            }}
            //                      webPrefix={webPrefix}
          />
        </div>
*/}
        {token && (
          <>
            <Logout deleteToken={deleteToken} />
            <Container maxWidth="sm">
              <Collection token={token} things={things} onCollectionChange={() => {}} />

            </Container>
          </>
        )}
      </BrowserRouter>
    </>
  );
}
