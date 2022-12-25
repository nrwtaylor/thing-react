import React, { useEffect, useState } from "react";
import Thing from "./Thing.js";
//import { getThings, createThing } from "../util/database.js";
import ThingContainer from "./ThingContainer.js";
import Token from "./Token.js";
import Identity from "./Identity.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import useToken from "../useToken";
import useIdentity from "../useIdentity";
import useInput from "../useInput";
import useThings from "../useThings";

import axios from "axios";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ThingCarousel(props) {
//  const { things } = props;
//const {token:inputToken} = props;
//const {token} = props;
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  //const testUuid0 = process.env.REACT_APP_THING_0;
  //const testUuid1 = process.env.REACT_APP_THING_1;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;

  const [uuid, setUuid] = useState();

  const pathname = window.location.pathname;

  const reg =
    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);

  const [canSwipe, setCanSwipe] = useState(true);

  const { username, token, getToken, setToken, deleteToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  const { input, setInput, deleteInput } = useInput();

  const { things, getThings } = useThings(token);

useEffect(() =>{

console.log("ThingCarousel inputToken token things", token, things);

},[things]);

useEffect(() =>{
console.log("ThingCarousel token", token);
//getToken();
getThings(token);
}, [token]);

//useEffect(()=>{
//getThings(token);
//}, []);

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
    console.log("ThingCarousel things", things);
  }, [things]);

  function handleCollectionChange(things) {
    //   setThings(things);
    if (things && things[0] && things[0].uuid) {
      console.log("App setUuid", things[0].uuid);
      setUuid(things[0].uuid);
      return;
    }

    const u = uuidv4();
    setUuid(u);
  }

  /*
  return (
    <>

<Carousel showThumbs={false} showIndicators={false} showStatus={false}>

    <ThingContainer things={things} onCollectionChange={handleCollectionChange} token={token} />



</Carousel>

    </>
  );
*/

  function handleOpenThing(t) {
    setCanSwipe(false);
  }

  function handleFoldThing(t) {
    setCanSwipe(true);
  }

  return (
    <>
      {canSwipe ? "SWIPE" : "NO SWIPING"}
<br />
      <Carousel
        useKeyBoardArrows={canSwipe}
        showArrows={canSwipe}
        swipeable={canSwipe}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        swipeScrollTolerance={100}
        preventMovementUntilSwipeScrollTolerance={true}
      >

        {things.map((thing) => (
          <div key={thing.uuid}>
            <Thing
              flavour={"item"}
              token={token}
              things={things}
              uuid={thing.uuid}
              datagram={thing}
              onFold={(t) => {
                handleFoldThing(t);
              }}
              onOpen={(t) => {
                handleOpenThing(t);
              }}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
}
