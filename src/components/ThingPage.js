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

import { extractUuid, extractNuuid, getSlug } from "../util/text.js";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ThingPage(props) {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;

  const [uuid, setUuid] = useState();

  const pathname = window.location.pathname.replace(/\//, "");

  const reg =
    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const uuids = pathname.match(reg);

  const { username, token, getToken, setToken, deleteToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  const { input, setInput, deleteInput } = useInput();

  const { thing, setThing } = useThing();
  const { things, getThings } = useThings();

  const createdAt = Date.now();

  const [devStack, setDevStack] = useState();

  const [play, setPlay] = useState();

  function handleCollectionChange(things) {
    return;
    //   setThings(things);
    if (things && things[0] && things[0].uuid) {
      console.debug("App setUuid", things[0].uuid);
      setUuid(things[0].uuid);
      return;
    }

    const u = uuidv4();
    setUuid(u);
  }

//useEffect(() =>{

//const variables={{agent:"channel-token", variable:"hello",open:{isOpen:true,canOpen:false},fold:{canFold:false},play:play}}


//}, []);

  useEffect(() => {
    if (uuids == null) {
      return;
    }
    console.debug("ThingPage uuids", uuids);
  }, [uuids]);

  useEffect(() => {
    console.debug("ThingPage pathname", pathname);

    if (things == null) {
      return;
    }
    //const conditionedPathname = pathname.replace(/\//, "");
    //if (pathname == null) {return;}
    const uuidPathname = extractUuid(pathname);
    console.debug("ThingPage uuidPathname", uuidPathname);

    var uuidMatch = null;
    things.forEach((t) => {
      if (t.uuid == null) {
        return;
      }
      if (t.uuid === uuidPathname) {
        uuidMatch = t;
      }
    });

    if (uuidMatch !== null) {
      console.debug("ThingPage matched uuid", uuidMatch);
      setThing(uuidMatch);
      setPlay(false);
      return;
    }

    const nuuidPathname = extractNuuid(pathname);
    console.debug("ThingPage nuuidPathname", nuuidPathname);

    var nuuidMatch = null;
    things.forEach((t) => {
      if (t.uuid == null) {
        return;
      }
      if (t.uuid.slice(0, 4) === nuuidPathname) {
        nuuidMatch = t;
      }
    });

    if (nuuidMatch !== null) {
      console.debug("ThingPage matched nuuid", nuuidMatch);
      setThing(nuuidMatch);
      setPlay(false);
      return;
    }

    const subjectPathname = pathname;
    console.debug("ThingPage nuuidPathname", nuuidPathname);

    var subjectMatch = null;
    things.forEach((t) => {
      if (t.subject == null) {
        return;
      }
      if (getSlug(t.subject) === getSlug(pathname)) {
        subjectMatch = t;
      }
    });

    if (subjectMatch !== null) {
      console.debug("ThingPage matched subject", subjectMatch);
      setThing(subjectMatch);
      setPlay(false);
      return;
    }

    console.debug("ThingPage using provided url");
    const d = {
      to: "agent",
      subject: pathname,
      webPrefix: webPrefix,
    };
    //    getThing(d);

    //setDatagram(d);
    setThing(d);
    setPlay(false);
  }, [pathname, things]);

  useEffect(() => {
    console.debug("ThingPage thing", thing);
  }, [thing]);

  if (pathname == null) {
    return null;
  }

  return (
    <>
      THING PAGE
{/*
      <Button
        thing={{
          subject: play ? "play" : "stop",
          agentInput: play ? "Play" : "Stop",
        }}
      />
*/}
{/*{thing && thing.subject*/}

      {thing && (
        <div key={thing.uuid}>
          <Thing
            key={thing.uuid}
            flavour={"item"}
//            uuid={thing.uuid}
            datagram={thing}
            //        datagram={{...thing, pollInterval:20000}}
            canOpen={false}
            canFold={false}
            open={true}
            play={play}
            variables={{agent:"channel-token", variable:"hello",open:{isOpen:true,canOpen:false},fold:{canFold:false},play:play}}

          />
        </div>
      )}
      <br />
    </>
  );
}
