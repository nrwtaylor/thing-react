import axios from "axios";
const apiPrefix = process.env.REACT_APP_API_PREFIX;

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
      console.log("database createThing u error", u, error);
    });
}

export function setThing(uuid, datagram, token) {

console.log("database setThing datagram", datagram);
console.log("database setThing token", token);

  const u = apiPrefix + "/thing/" + uuid;
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
      return {thingReport:{error:error}};

    });
}


export function forgetThing(datagram, token) {
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
if (!webPrefix) {return Promise.reject();}
  var u = webPrefix;

//if (!u.endsWith('snapshot.json')) {
// u = webPrefix + "snapshot.json";
//}
  console.log("database getSnapshot u", u);
  console.log("database getSnapshot webPrefix", webPrefix);

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
      console.log("database getSnapshot", u, thingy);
      return thingy;
    })
    .catch((error) => {
      console.log("database getSnapshot u error", u, webPrefix, error);
    });
}

export function getThingReport(datagram, token) {
  console.log("database getThingReport datagram", datagram);
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;


  const u = webPrefix + "/api/whitefox/message";

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
      console.log("database getThingReport", u, datagram, thingy);
      return thingy;
    })
    .catch((error) => {
      console.log("database getThingReport error", u, datagram, error);
      return { thingReport: { message: "message", error: error } };
    });
}

export function getThings(prefix = null, token = null) {
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
      console.log("database getThings axios res", res);
      console.log("database getThings axios res.data", res.data);
      return thingy;
      // agent etime info json:null thing etc
      //        setData(res.data);

      //        const elapsedTime = Date.now() - requestedAt;
    })
    .catch((error) => {
      console.log("database getThings axios error", u, error);
      return {things:[]};
      //        setError({ ...error, message: "Problem" });
    });
}
//}
