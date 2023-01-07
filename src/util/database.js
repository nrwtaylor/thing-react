import axios from "axios";
import { zuluTime, zuluTimeDifferenceMilliseconds } from "./time.js";
import { getSlug, extractUuid } from "./text.js";
const apiPrefix = process.env.REACT_APP_API_PREFIX;

const snapshotCacheTimeMilliseconds = 60000;

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

    // Do something before request is sent
    return config;
  },
  function (error) {
    console.log("database request error", error);

    txErrorCount += 1;
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log("database response", response);
    //rxData += response.data.length + response.headers.length;

    //if (response && response.data && response.headers) {
    //const dataSize = JSON.stringify(response.data).length;
    //const headerSize = JSON.stringify(response.headers).length;

    //rxData += dataSize + headerSize;
    //}

    rxCount += 1;

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    rxErrorCount += 1;
    console.log("database response error", rxErrorCount, error);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export function Get(thing) {
  console.log("Axios call " + thing.subject);

  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;

  axios
    .get(webPrefix + thing.subject + `.json`)
    .then((res) => {
      let thingy = res.data;
      return thingy;
    })
    .catch((error) => {
      console.log("Database error", error);
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
  const u = apiPrefix + "/thing/";
  console.log("database createThing u", u);
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
      console.log("database createThing u error", u, error);
      const apiErrorMessage = error.response.data.message;
      return { error: { message: apiErrorMessage } };
    });
}

export function setThing(uuid, datagram, token) {
  console.log("database setThing datagram", datagram);
  console.log("database setThing token", token);

  const u = apiPrefix + "/thing/" + uuid;

  console.log("database setThing u", u);

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
      console.log("database setThing u error", u, error);
      return { thingReport: { error: error } };
    });
}

export function forgetThing(datagram, token) {
  if (datagram == null) {
    return Promise.resolve({ error: { message: "No datagram provided." } });
  }
  console.log("database forgetThing datagram", datagram);

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
      console.log("database forgetThing error", error);
    });
}

export function getWebJson(webPrefix, token) {
  return getSnapshot(webPrefix, token);
}

export function getSnapshot(webPrefix, token) {
  if (!webPrefix) {
    return Promise.reject();
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
    console.log(
      "database getSnapshot slug cache valid",
      u,
      slug,
      age,
      stack[slug].refreshedAt
    );
      return Promise.resolve(stack[slug]);
    }


  }

    console.log(
      "database getSnapshot slug cache stale",
      u,
      slug,
    );

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

      console.log("database getSnapshot u error", u, webPrefix, error);
    });
}

export function getThingReport(datagram, token) {
  console.log("database getThingReport datagram", datagram);
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;

  const u = webPrefix + "/api/whitefox/message";
  console.log("database getThingReport stack", stack);
  if (stack[datagram.uuid]) {
    console.log(
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
      console.log("database getThingReport error", u, datagram, error);
      return { thingReport: { message: "message", error: error } };
    });
}

// https://kollox.com/cancel-axios-request-very-quick-solution/

export function getThings(prefix = null, token = null) {
  console.log("database getThings prefix token", prefix, token);
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
      console.log("database getThings axios error", u, error);
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
