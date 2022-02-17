import axios from "axios";

export function Get(thing) {
  console.log("Axios call " + thing.subject);
  axios.get(`https://stackr.ca/` + thing.subject + `.json`).then((res) => {
    let thingy = res.data;
    //setData({ thing: thingy.thing, thing_report: thingy.thing_report });
    return thingy;
  }).catch((error)=>{
console.log("Database error");
});
}

