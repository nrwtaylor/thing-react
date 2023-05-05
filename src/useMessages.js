import { useState, useEffect } from "react";
const messages = [];

export default function useMessages(inputToken) {
  //  const messages = [];
  const getMessage = () => {
    return null;
  };

  const [message, setMessage] = useState(getMessage());
  const [username, setUsername] = useState();

  const saveMessage = (message) => {
    setMessage(message);
  };

  const deleteMessage = (message) => {
    // Leave no rubbish behind.
    //    localStorage.clear();
    //    setToken(false);
  };

  const addMessage = (message) => {
    // Leave no rubbish behind.
    console.log("useMessages addMessage message", message);
    messages.push(message);
    //    localStorage.clear();
    //    setToken(false);
  };

  useEffect(() => {
    console.log("useMessage message", message);
    //    if (props.token) {props.token = token;}
  }, [message]);

  return {
    addMessage: addMessage,
    deleteMessage: deleteMessage,
    setMessage: saveMessage,
    messages,
    message,
    username,
  };
}
