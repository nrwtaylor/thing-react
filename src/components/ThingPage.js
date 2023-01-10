import React, { useEffect, useState } from "react";
import Thing from "./Thing.js";
import ThingContainer from "./ThingContainer.js";
import Token from "./Token.js";
import Identity from "./Identity.js";
import Button from "./Button.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import useToken from "../useToken";
import useIdentity from "../useIdentity";
import useInput from "../useInput";
import useThings from "../useThings";
import useThing from "../useThing";

import {extractUuid, extractNuuid} from "../util/text.js";

import axios from "axios";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ThingPage(props) {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;

  const [uuid, setUuid] = useState();

  const pathname = window.location.pathname.replace(/\//, "");

  const reg =
    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);

  const { username, token, getToken, setToken, deleteToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  const { input, setInput, deleteInput } = useInput();

  const { thing, openThing, getThing, setThing } = useThing();

  const { things, getThings } = useThings();

  const createdAt = Date.now();

  const [devStack, setDevStack] = useState();

  const [play, setPlay] = useState();

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

  function handleCollectionChange(things) {
    return;
    //   setThings(things);
    if (things && things[0] && things[0].uuid) {
      console.log("App setUuid", things[0].uuid);
      setUuid(things[0].uuid);
      return;
    }

    const u = uuidv4();
    setUuid(u);
  }

  useEffect(() => {
    if (matches == null) {
      return;
    }
    console.log("ThingPage matches", matches);
    /*
{matches.map((match)=>{return (<>{match}</>) })
}
*/
  }, [matches]);

  useEffect(() => {
    console.log("ThingPage pathname", pathname);


if (things == null) {return;}
    //const conditionedPathname = pathname.replace(/\//, "");
    //if (pathname == null) {return;}
const uuidPathname = extractUuid(pathname);
console.log("ThingPage uuidPathname", uuidPathname);

var match = null;
things.forEach((t)=>{

if (t.uuid === uuidPathname) {match = t;}

});

if (match !== null) {setThing(match); setPlay(false); return;}


const nuuidPathname = extractNuuid(pathname);
console.log("ThingPage nuuidPathname", nuuidPathname);

var nuuidMatch = null;
things.forEach((t)=>{
console.log("ThingPage merp", t.uuid.slice(0,4));
if (t.uuid.slice(0,4) === nuuidPathname) {nuuidMatch = t;}

});



if (nuuidMatch !== null) {setThing(nuuidMatch); setPlay(false); return;}




    const d = {
      to: "agent",
      subject: pathname,
      webPrefix: webPrefix,
    };
    getThing(d);



    //setDatagram(d);
    setThing(d);
    setPlay(false);
  }, [pathname, things]);






  useEffect(() => {
    console.log("ThingPage thing", thing);
  }, [thing]);

  if (pathname == null) {
    return null;
  }
  return (
    <>
      THING PAGE
      <Button
        thing={{
          subject: play ? "play" : "stop",
          agentInput: play ? "Play" : "Stop",
        }}
      />
      <div key={thing.uuid}>
        <Thing
          key={thing.uuid}
          flavour={"item"}
          uuid={thing.uuid}
          datagram={thing}
//        datagram={{...thing, pollInterval:20000}}
          canOpen={false}
          canFold={false}
          open={true}
          play={play}
        />
      </div>
    </>
  );
}
