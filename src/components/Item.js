import React, { useState, useEffect } from "react";
import { devFlag, debugFlag } from "../util/dev.js";

import { Link } from "react-router-dom";
import { setThing } from "../util/database.js";

import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Switch,
} from "@mui/material";

import { replaceUuids } from "../util/text.js";
import useThing from "../useThing.js";
import useMessages from "../useMessages.js";

import { useNavigate } from "react-router-dom";

import useHybridEffect from "../useHybridEffect.js";

const blue = {
  500: "#007FFF",
};

const grey = {
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
};

export default function Item({ thing: inputThing, agentInput }) {
  const { thing, updateThing } = useThing(inputThing);

  const [item, setItem] = useState();

  const [status, setStatus] = useState();

  const [disabled, setDisabled] = useState();
  const [response, setResponse] = useState("");
  const { addMessage } = useMessages();

  const [syncState, setSyncState] = useState();

  //const itemSyncState = (item !== undefined) && (item === (thing && thing.variables && thing.variables.item))
  //  ? "Synced"
  //  : "Not synced";
  //const itemSyncState = syncState();

  const getSyncState = () => {
    var itemSyncState = "Not synced";

    if (thing == null && inputThing == null) {
      return "No thing or inputThing.";
    }

    if (thing == null) {
      itemSyncState =
        item !== undefined &&
        item ===
          (inputThing && inputThing.variables && inputThing.variables.item)
          ? "Synced with inputThing thing null"
          : "Not synced with inputThing thing null";
      return itemSyncState;
    }

    if (thing.hasOwnProperty("variables")) {
      if (thing.variables.hasOwnProperty("item")) {
        itemSyncState =
          item !== undefined &&
          item === (thing && thing.variables && thing.variables.item)
            ? "Synced with thing"
            : "Not synced with Thing";

        return itemSyncState;
      }
    }

    return "No variables found.";
  }

  useHybridEffect(() => {
    if (inputThing == null) {
      return;
    }

    console.debug("Item inputThing", inputThing);
    /*
      if (thing.subject) {
        // pre-recognition
        //setSubject(inputThing.subject);
        //setText(replaceUuids(inputThing.agentInput));
      }
*/
    if (inputThing && inputThing.variables && inputThing.variables.item) {
      console.log("Item Thing variables", inputThing.variables);

      if (item == null) {
        setItem(inputThing.variables.item);
      }
    }
  }, [inputThing]);

  function handleToggleItem(e) {
    console.log("Item handleToggleItem e target checked", e.target.checked);
    console.debug("Item handleToggleItem thing", thing);

    setItem(e.target.checked);

    // Review this
    // May not need to use the useThing hook.
    setStatus("saving");
    return updateThing({ ...inputThing, variables: { item: e.target.checked } })
      .then((result) => {
        //addMessage("Item handleToggleItem update thing " + inputThing.subject);

        if (result && result.error && result.error.message) {
          setResponse((response) => {
            return response + result.error.message;
          });

          return;
        }
        setStatus("synced");
        setResponse((response) => {
          return response + "Update thing. ";
        });

        console.debug(
          "Item handleToggleItem updateThing result data",
          result.data
        );
        console.debug("Item handleToggleItem updateThing result", result);
      })
      .catch((error) => {
        setResponse((response) => {
          return response + "Error";
        });
        //setError(error.message);
        console.error("Item handleToggleItem updateThing error", error);
      });
  }
  if (thing == null) {
    return null;
  }

  return (
    <>
      <div>
{debugFlag &&(<>        UUID {thing && thing.uuid}
        THING {JSON.stringify(thing)}
        THING VARIABLES {JSON.stringify(thing.variables)}
        <br />
</>)}
        <Switch checked={item} onChange={handleToggleItem} color="primary" />
        {getSyncState()}
        <br />
        {response}
        <br />
      </div>
    </>
  );
}
