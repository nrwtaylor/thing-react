import axios from "axios";

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

