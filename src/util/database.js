import axios from "axios";
import { zuluTime, zuluTimeDifferenceMilliseconds } from "./time.js";
import { getSlug, extractUuid } from "./text.js";

import { readToken } from "./../useToken.js";

const apiPrefix = process.env.REACT_APP_API_PREFIX;

const defaultSnapshotInterval = process.env.REACT_APP_SNAPSHOT_INTERVAL;

const snapshotCacheTimeMilliseconds = defaultSnapshotInterval; //1;

axios.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

export var txData = 0;
export var rxData = 0;
export var rxErrorCount = 0;

export var txCount = 0;
export var rxCount = 0;
export var txErrorCount = 0;

export var txBytes = 0;
export var rxBytes = 0;

export var databaseStatistics = {};
const isRunning = false;
const quotaBytes = 200000;

function analyzeChannel(r, channel) {
  const bytes = getSizeInBytes(r.data + r.headers);

  if (channel === "tx") {
    txCount += 1;
    txBytes += bytes;
  }

  if (channel === "rx") {
    rxCount += 1;
    rxBytes += bytes;
  }

  if (r && r.data && r.data.uuid) {
    if (databaseStatistics[r.data.uuid] == null) {
      databaseStatistics[r.data.uuid] = {
        txCount: 0,
        txBytes: 0,
        rxCount: 0,
        rxBytes: 0,
        rxErrorCount: 0,
        txErrorCount: 0,
      };
    }

    if (channel === "tx") {
      databaseStatistics[r.data.uuid].txCount =
        databaseStatistics[r.data.uuid].txCount + 1;
      databaseStatistics[r.data.uuid].txBytes =
        databaseStatistics[r.data.uuid].txBytes + bytes;
    }

    if (channel === "rx") {
      databaseStatistics[r.data.uuid].rxCount =
        databaseStatistics[r.data.uuid].rxCount + 1;
      databaseStatistics[r.data.uuid].rxBytes =
        databaseStatistics[r.data.uuid].rxBytes + bytes;
    }
  }
}

// Create a local non-persistent session cache.
// To track requests and responses.
const stack = {};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    //const dataSize = JSON.stringify(config.data).length;
    //const headerSize = JSON.stringify(config.headers).length;

    //txData += dataSize + headerSize;
    txCount += 1;
    const bytes = getSizeInBytes(config.data + config.headers);
    txBytes += bytes;

    if (config && config.data && config.data.uuid) {
      if (databaseStatistics[config.data.uuid] == null) {
        databaseStatistics[config.data.uuid] = {
          txCount: 0,
          txBytes: 0,
          rxCount: 0,
          rxBytes: 0,
          rxErrorCount: 0,
          txErrorCount: 0,
        };
      }

      databaseStatistics[config.data.uuid].txCount =
        databaseStatistics[config.data.uuid].txCount + 1;
      databaseStatistics[config.data.uuid].txBytes =
        databaseStatistics[config.data.uuid].txBytes + bytes;
    }
    console.log("database request config", config);
    // Do something before request is sent
    return config;
  },
  function (error) {
    console.error("database request error", error);

    txErrorCount += 1;

    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    //    console.log("database response", response);
    //    console.log("database response.data.uuid", response.data.uuid);

    //rxData += response.data.length + response.headers.length;

    //if (response && response.data && response.headers) {
    //const dataSize = JSON.stringify(response.data).length;
    //const headerSize = JSON.stringify(response.headers).length;

    //rxData += dataSize + headerSize;
    //}

    rxCount += 1;
    const bytes = getSizeInBytes(response.data + response.headers);
    rxBytes += bytes;

    if (response && response.data && response.data.uuid) {
      if (databaseStatistics[response.data.uuid] == null) {
        databaseStatistics[response.data.uuid] = {
          txCount: 0,
          txBytes: 0,
          rxCount: 0,
          rxBytes,
          rxErrorCount: 0,
          txErrorCount: 0,
        };
      }
      databaseStatistics[response.data.uuid].rxCount =
        databaseStatistics[response.data.uuid].rxCount + 1;
      databaseStatistics[response.data.uuid].rxBytes =
        databaseStatistics[response.data.uuid].rxBytes + bytes;
    }

    console.log("database response response", response);

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    rxErrorCount += 1;
    console.error("database response error", error);

    //if (response && response.data && response.data.uuid) {
    //if (databaseStatistics[response.data.uuid] == null) {databaseStatistics[response.data.uuid] = {txCount:0, txBytes:0, rxCount:0, rxBytes, rxErrorCount:0, txErrorCount:0};}
    //databaseStatistics[response.data.uuid].rxErrorCount = databaseStatistics[response.data.uuid].rxErrorCount + 1;

    //}

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const getSizeInBytes = (obj) => {
  let str = null;
  if (typeof obj === "string") {
    // If obj is a string, then use it
    str = obj;
  } else {
    // Else, make obj into a string
    str = JSON.stringify(obj);
  }
  // Get the length of the Uint8Array
  const bytes = new TextEncoder().encode(str).length;
  return bytes;
};

export function Get(thing) {
  if (thing == null) {
    return Promise.resolve({ error: { message: "No Thing provided." } });
  }
  if (thing.subject == null) {
    return Promise.resolve({ error: { message: "No subject provided." } });
  }
  if (txBytes + rxBytes > quotaBytes) {
    return Promise.resolve({ error: { message: "Quota exceeded." } });
  }

  console.debug("Axios call " + thing.subject);

  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;

  axios
    .get(webPrefix + thing.subject + `.json`)
    .then((res) => {
      let thingy = res.data;
      console.log("database Get thingy", thing);
      return thingy;
    })
    .catch((error) => {
      console.error("Database error", error);
    });
}

/*

    var u = webPrefix + subject + `.json`;
    // Do we need to get a snapshot?
    if (to === "snapshot") {
      u = webPrefix + "snapshot.json";
    }

*/

export function createThing(webPrefix, datagram, token) {
  if (datagram == null) {
    return Promise.resolve({ error: "No datagram provided." });
  }
  if (datagram.subject == null) {
    return Promise.resolve({ error: "No subject provided." });
  }
  if (txBytes + rxBytes > quotaBytes) {
    return Promise.resolve({ error: { message: "Quota exceeded." } });
  }

  console.debug("database createThing datagram", datagram);

  // Set createThing browndog endpoint
  const u = apiPrefix + "/thing/";
  console.debug("database createThing u", u);
  return axios
    .post(u, datagram, {
      headers: {
        Authorization: "my secret token",
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      let thingy = res.data;
      console.log("database createThing", u, thingy);
      return thingy;
    })
    .catch((error) => {
      //return {error:true, message:error.data.message};
      console.error("database createThing u error", u, error);
      var apiErrorMessage = "Problem creating Thing.";
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        apiErrorMessage = error.response.data.message;
      }
      return { error: { message: apiErrorMessage } };
    });
}

export function setThing(uuid, datagram, token) {
  if (datagram == null) {
    return Promise.resolve({ error: { message: "No datagram provided." } });
  }
  if (uuid == null) {
    return Promise.resolve({ error: { message: "No uuid provided." } });
  }
  if (txBytes + rxBytes > quotaBytes) {
    return Promise.resolve({
      error: { message: "Client default quota exceeded." },
    });
  }

  const tokenResponse = readToken(token);
  console.log("database token tokenResponse", token, tokenResponse);

  if (tokenResponse.isValidToken === false) {
    return Promise.resolve({ error: { message: "Token not valid." } });
  }

  console.debug("database setThing datagram", datagram);
  console.debug("database setThing token", token);

  const u = apiPrefix + "/thing/" + uuid;

  console.debug("database setThing u", u);

  return axios
    .put(u, datagram, {
      headers: {
        Authorization: "my secret token",
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      //let thingy = data;
      console.log("database setThing", u, res);
      return res;
    })
    .catch((error) => {
      console.error("database setThing u error", u, error);
      return { thingReport: { error: error } };
    });
}

// Not tested.
export function getThing(datagram, token) {
  if (datagram == null) {
    return Promise.resolve({ error: { message: "No datagram provided." } });
  }
  if (datagram.uuid == null) {
    return Promise.resolve({ error: { message: "No uuid provided." } });
  }
  if (txBytes + rxBytes > quotaBytes) {
    return Promise.resolve({ error: { message: "Quota exceeded." } });
  }

  const tokenResponse = readToken(token);
  if (tokenResponse.isValidToken === false) {
    return Promise.resolve({ error: { message: "Token not valid." } });
  }

  console.debug("database getThing datagram", datagram);
  console.debug("database getThing token", token);

  const u = apiPrefix + "/thing/" + datagram.uuid;

  console.debug("database getThing u", u);

  return axios
    .get(u, {
      headers: {
        Authorization: "my secret token",
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      //let thingy = data;
      console.log("database getThing", u, res);
      return res;
    })
    .catch((error) => {
      console.error("database getThing u error", u, error);
      return { thingReport: { error: error } };
    });
}

export function forgetThing(datagram, token) {
  if (datagram == null) {
    return Promise.resolve({ error: { message: "No datagram provided." } });
  }
  console.debug("database forgetThing datagram", datagram);
  if (txBytes + rxBytes > quotaBytes) {
    return Promise.resolve({ error: { message: "Quota exceeded." } });
  }

  const u = apiPrefix + "/thing/" + datagram.uuid;
  return axios
    .delete(u, {
      headers: {
        Authorization: "my secret token",
        "x-access-token": token,
        //        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      //let thingy = res.data;
      console.log("database forgetThing", res);
      return res.data;
      //     return thingy;
    })
    .catch((error) => {
      console.error("database forgetThing error", error);
    });
}

export function getWebJson(webPrefix, token) {
  console.debug("database getWebJson", webPrefix, token);
  if (txBytes + rxBytes > quotaBytes) {
    return Promise.resolve({ error: { message: "Quota exceeded." } });
  }

  return getSnapshot(webPrefix, token);
}

export function getSnapshot(webPrefix, token) {
  if (!webPrefix) {
    return Promise.reject();
  }
  if (txBytes + rxBytes > quotaBytes) {
    return Promise.resolve({ error: { message: "Quota exceeded." } });
  }

  var u = webPrefix;

  //if (!u.endsWith('snapshot.json')) {
  // u = webPrefix + "snapshot.json";
  //}
  const slug = getSlug(u);

  if (stack[slug]) {
    const nowAt = zuluTime();
    const age = zuluTimeDifferenceMilliseconds(stack[slug].refreshedAt, nowAt);

    if (age < snapshotCacheTimeMilliseconds) {
      console.info(
        "database getSnapshot slug cache valid",
        u,
        slug,
        age + "ms",
        stack[slug].refreshedAt,
        stack[slug]
      );
      return Promise.resolve(stack[slug]);
    }
  }

  console.info("database getSnapshot slug cache stale", u, slug);

  return axios
    .get(u, {
      headers: {
        //  'Access-Control-Allow-Origin': '*',
        //  'Access-Control-Allow-Headers': '*',
        Authorization: "my secret token",
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      let thingy = res.data;

      stack[slug] = { ...thingy, error: null, refreshedAt: zuluTime() };

      console.log("database getSnapshot result", u, thingy);
      return thingy;
    })
    .catch((error) => {
      stack[slug] = { error: error, refreshedAt: zuluTime() };

      console.error("database getSnapshot u error", u, webPrefix, error);
    });
}

export function getThingReport(datagram, token) {
  if (txBytes + rxBytes > quotaBytes) {
    return Promise.resolve({ error: { message: "Quota exceeded." } });
  }

  console.log("database getThingReport datagram", datagram);
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;

  const u = webPrefix + "/api/whitefox/message";
  console.log("database getThingReport stack", stack);
  if (stack[datagram.uuid]) {
    console.debug(
      "database getThingReport cache",
      stack[datagram.uuid].refreshedAt
    );
  }

  return axios
    .post(u, datagram, {
      headers: {
        Authorization: "my secret token",
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      let thingy = res.data;

      stack[thingy.uuid] = { ...thingy, refreshedAt: zuluTime() };

      console.log("database getThingReport", u, datagram, thingy);
      return thingy;
    })
    .catch((error) => {
      console.error("database getThingReport error", u, datagram, error);
      return { thingReport: { message: "message", error: error } };
    });
}

// https://kollox.com/cancel-axios-request-very-quick-solution/

export function getThings(prefix = null, token = null) {
  console.log("database getThings called");
  if (txBytes + rxBytes > quotaBytes) {
    return Promise.resolve({ error: { message: "Quota exceeded." } });
  }

  const tokenResponse = readToken(token);
  console.log("database getThings tokenResponse", tokenResponse);
  if (tokenResponse.isValidToken === false) {
    return Promise.resolve({ error: { message: "Token not valid." } });
  }

  console.debug("database getThings prefix token", prefix, token);
  var u = apiPrefix + "things/";
  if (prefix !== null) {
    u = prefix + "things/";
  }
  return axios
    .get(u, {
      headers: {
        Authorization: "my secret token",
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    })

    .then((res) => {
      let thingy = res.data;
      console.log("database getThings axios res", u, res);
      console.log("database getThings axios res.data", u, res.data);
      return thingy;
      // agent etime info json:null thing etc
      //        setData(res.data);

      //        const elapsedTime = Date.now() - requestedAt;
    })
    .catch((error) => {
      console.error("database getThings axios error", u, error);
      return { things: [] };
      //        setError({ ...error, message: "Problem" });
    });
}
//}

export function makeObservable(target) {
  let listeners = []; // initial listeners can be passed an an argument aswell
  let value = target;

  function get() {
    return value;
  }

  function set(newValue) {
    if (value === newValue) return;
    value = newValue;
    listeners.forEach((l) => l(value));
  }

  function subscribe(listenerFunc) {
    listeners.push(listenerFunc);
    return () => unsubscribe(listenerFunc); // will be used inside React.useEffect
  }

  function unsubscribe(listenerFunc) {
    listeners = listeners.filter((l) => l !== listenerFunc);
  }

  return {
    get,
    set,
    subscribe,
  };
}
