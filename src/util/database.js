import axios from "axios";
const apiPrefix = process.env.REACT_APP_API_PREFIX;

export function Get(thing) {
  console.log("Axios call " + thing.subject);

    const webPrefix = process.env.REACT_APP_WEB_PREFIX;

  axios.get(webPrefix + thing.subject + `.json`).then((res) => {
    let thingy = res.data;
    return thingy;
  }).catch((error)=>{
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

export function getSnapshot(webPrefix, token) {


    const u = webPrefix + 'snapshot.json';
console.log("database getSnapshot webPrefix", webPrefix);
  return axios.get(u, {
        headers: {
 'Authorization': 'my secret token',
'x-access-token':token,
'Content-Type': 'application/json',

        }
      }).then((res) => {
    let thingy = res.data;
console.log("database getSnapshot", u, thingy);
    return thingy;
  }).catch((error)=>{
    console.log("database getSnapshot u error", u, error);
  });
}


export function getThingReport(datagram, token) {

console.log("database getThingReport datagram", datagram);

    const u = 'https://stackr.ca/api/whitefox/message';

  return axios.post(u, datagram, {
        headers: {
 'Authorization': 'my secret token',
'x-access-token':token,
'Content-Type': 'application/json',

        }
      }).then((res) => {
    let thingy = res.data;
console.log("database getThingReport", u, datagram, thingy);
    return thingy;
  }).catch((error)=>{
    console.log("database getThingReport error", u, datagram, error);
  });
}


export function getThings(prefix = null, token = null) {

var u = apiPrefix + 'things/';
if (prefix !== null) {

u = prefix + 'things/';

}
    return axios
      .get(u, {
        headers: {
 'Authorization': 'my secret token',
'x-access-token':token,
'Content-Type': 'application/json',
        }
      })

      .then((res) => {
        let thingy = res.data;
        console.log("Things axios res", res);
        console.log("Things axios res.data", res.data);
return thingy;
        // agent etime info json:null thing etc
//        setData(res.data);

//        const elapsedTime = Date.now() - requestedAt;

      })
      .catch((error) => {

        console.log("Thing error", u, error);
//        setError({ ...error, message: "Problem" });
      });


}
//}
