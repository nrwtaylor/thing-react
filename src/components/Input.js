import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';

import { createThing, forgetThing } from "../util/database.js";
import useToken from "../useToken.js";

import { v4 as uuidv4 } from "uuid";



const { REACT_APP_CLIENT_SECRET } = process.env;
const { REACT_APP_API_PREFIX } = process.env;

const defaultWebPrefix = process.env.REACT_APP_WEB_PREFIX;


export default function Input({thing, agentInput, onThingReport}) {

//const {thing, agentInput, onThingReport} = props;

const webPrefix = defaultWebPrefix;

const {token, isValidToken} = useToken();
const [inputText, setInputText] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState(false);
const [status, setStatus] = React.useState('idle');
const [response, setResponse] = React.useState('');
const sendText= () =>{

    if (inputText.trim() !== '') {
setStatus('sending');

console.log("InputText sendText text", inputText);
console.log("InputText sendText token", token);
   const datagram = {
          index: 20,
          to: "localhost",
          from: "null",
          subject: inputText,
          priority: "routine",
//          createdAt: Date.now(),
//          uuid: uuidv4(),
          input: "InputText",
        };

let tokent = null;
    if (isValidToken === true) {
tokent = token;
}
      createThing(defaultWebPrefix, datagram, tokent).then((response)=>{
console.log("Input createThing response", response);
        setInputText(''); // Clear the input field
setStatus('idle');
setResponse((response) => {return response + 'Text sent successfully. '});
//if (updateThingreport) {
//        updateThingreport({input:'Text sent successfully'});
//}

})
.catch((error)=>{
setStatus('error');
console.error("Input createThing error", error);

});




      // Simulate a successful action with a delay
//      setTimeout(() => {
//if (updateThingreport) {
//        updateThingreport({input:'Text sent successfully'});
//}
//        setInputText(''); // Clear the input field
//      }, 1000); // Display success message for 1 second
    }

}

React.useEffect(() =>{

if (response == null) {return;}

if (onThingReport) {
        onThingReport({input:response});
}



}, [response]);

const handleInputEvent = (event) =>{

if (event.key==='Enter') {
event.preventDefault();
sendText();

}

}



 const handleInputChange = (event) => {
event.preventDefault();

    setInputText(event.target.value);
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
{/*
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
*/}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Log text"
        inputProps={{ 'aria-label': 'File text message' }}

onKeyDown={handleInputEvent}
        value={inputText}
        onChange={handleInputChange}

      />
{/*
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>*/}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton disabled={
// true is disable
//false is not disabled
(status!=='idle')
} color="primary" sx={{ p: '10px' }} aria-label="directions"
onClick={sendText}>
        <SendIcon />
      </IconButton>
{/*
      {successMessage && (
        <div style={{ color: 'green', marginLeft: '10px' }}>
          {successMessage}
        </div>
      )}
*/}
    </Paper>
  );
}
