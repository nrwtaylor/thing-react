import React, { useEffect, useState } from "react";

import { devFlag, debugFlag } from "../util/dev.js";

import Thing from "./Thing.js";
import ThingContainer from "./ThingContainer.js";
import ThingButton from "./Button.js";

import Token from "./Token.js";
import Identity from "./Identity.js";
import Button from "./Button.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import useToken from "../useToken.js";
import useIdentity from "../useIdentity.js";
import useInput from "../useInput.js";
import useThings from "../useThings.js";
import useThing from "../useThing.js";

import { extractUuid, extractNuuid, getSlug } from "../util/text.js";
import { isValidUUID } from "../util/uuid.js";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import useHybridEffect from "../useHybridEffect.js";


export default function ThingPage(props) {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;

  const [uuid, setUuid] = useState();

  const pathname = window.location.pathname.replace(/\//, "");

  const reg =
    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const uuids = pathname.match(reg);

  const { username, token, isValidToken, getToken, setToken, deleteToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  const { input, setInput, deleteInput } = useInput();

  const { thing, setThing } = useThing();
  const { things } = useThings();

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
console.log("ThingPage pathnameEffect things", things);
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
//    console.debug("ThingPage nuuidPathname", nuuidPathname);

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


    const d = {
uuid:uuidPathname,
      //to: "agent",
//      subject: pathname,
      //webPrefix: webPrefix,
    };

console.log("ThingPage uuidPathname", uuidPathname);
if (isValidUUID(uuidPathname)) {
    console.debug("ThingPage using provided url");
d.uuid = uuidPathname;
} else {
    console.debug("ThingPage using provided url");
d.uuid= uuidv4(); // local stack can assign uuids. Other stacks will accept them on trust.
d.subject = pathname;


}




    //    getThing(d);
//getThing(uuidPathname);


    //setDatagram(d);
    setThing(d);
    setPlay(false);
  }, [pathname, things]);


/*
  useHybridEffect(() => {
    console.debug("ThingPage thing", thing);
console.debug("ThingPage thing pathname", pathname);


if (getSlug(thing.subject) !== getSlug(pathname)) {
console.log("ThingPage thing update url");

window.history.replaceState(null, null, getSlug(thing.subject));

}


  }, [thing]);
*/

function handleThingReport(t) {
console.log("ThingPage handleThingReport",t);


}

  if (pathname == null) {
    return null;
  }

  return (
    <>
      THING PAGE {debugFlag && (<>DEBUG</>)}{' '}{devFlag && (<>DEV</>)}
{' '}{isValidToken ? "VALID TOKEN" : "FALSE TOKEN"}

      {/*
      <Button
        thing={{
          subject: play ? "play" : "stop",
          agentInput: play ? "Play" : "Stop",
        }}
      />
*/}
      {/*{thing && thing.subject*/}

          <ThingButton
            //          thing={{ subject: ("thing/"+ (uuid ==null ? "" : uuid)), a>
            //          thing={{ subject: "add-thing", agentInput: "Add Thing" }}
            thing={{
              ...thing
//              subject: "thing/" + thing.uuid + "/",
//              agentInput: "Add Thing",
            }}
agentInput={{text:"Start New Thing",link:webPrefix + "thing"}}
          />



      {thing && (
        <Thing
          key={thing.uuid}
          flavour={"item"}
          //            uuid={thing.uuid}
          thing={thing}
          //        datagram={{...thing, pollInterval:20000}}
          canOpen={false}
          canFold={false}
          open={true}
          play={play}
          variables={{
            agent: "channel-token",
            variable: "hello",
            open: { isOpen: true, canOpen: false },
            fold: { canFold: false },
            play: play,
          }}
          agentInput={{ collection: true }}
          onThingReport={(t)=>handleThingReport(t)}
        />
      )}
      <br />
    </>
  );
}
