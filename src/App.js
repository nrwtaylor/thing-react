import React from "react";
import Thing from "../src/components/Thing.js";
import Login from "../src/components/Login.js";
import Logout from "../src/components/Logout.js";
import Token from "../src/components/Token.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "../src/components/Input.js";

import Container from '@mui/material/Container';
import ThingsContainer from "../src/components/ThingContainer.js";

import Collection from "../src/components/Collection.js";

import { v4 as uuidv4 } from "uuid";

import useToken from "./useToken";

export default function App() {
  const pathname = window.location.pathname;

  const reg = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);
  const input = { uuids: matches };
  const uuid = uuidv4();

  const { token, setToken, deleteToken } = useToken();

  const createdAt = Date.now();

  const things = [
    {
      index: 0,
      to: "coop",
      subject: pathname,
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: "http://localhost:3000/",
    },
    {
      index: 1,
      to: "coop",
      subject: "weather",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "weather",
      webPrefix: "http://localhost:3000/",
    },

    {
      index: 2,
      to: "whitefox",
      subject: pathname,
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: webPrefix,
    },
    {
      index: 3,
      to: "whitefox",
      subject: "weather",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "weather",
      webPrefix: webPrefix,
    },

    {
      index: 4,
      to: "kokopelli",
      subject: pathname,
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: "http://192.168.10.10/",
    },
    {
      index: 5,
      to: "kokopelli",
      subject: "snapshot",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: "http://192.168.10.10/",
    },
  ];

  const webPrefix = process.env.REACT_APP_WEB_PREFIX;

  console.log("REACT THING");
  console.log("Started Thing ", uuid);

  return (
    <>
      <Token token={token} />

      <BrowserRouter>
        THING-REACT 29 July 2022
        {!token && <Login setToken={setToken} />}
        <Input />
        {token && (
          <>
            <Logout deleteToken={deleteToken} />
<Container maxWidth="sm" >
<Collection things={things} onCollectionChange={()=>{}}/>

{/*
            {things &&
              things.map((thing) => {
                return (
                  <div key={thing.uuid} >
                    <Thing
                      to={thing.to}
                      subject={thing.subject}
                      createdAt={thing.createdAt}
                      uuid={thing.uuid}
                      input={thing.input}
                      webPrefix={thing.webPrefix}
                    />
                  </div>
                );
              })}
*/}
</Container>
          </>
        )}
      </BrowserRouter>
    </>
  );
}
