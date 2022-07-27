import { useState } from 'react';

export default function useToken() {


  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

//return true;
if (Array.isArray(userToken)) {
    return userToken.token;
}
return null;

  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {

console.log("useToken saveToken userToken", userToken);

    localStorage.setItem('token', JSON.stringify(userToken));


    setToken(userToken.token);


  };

  const deleteToken = userToken => {

// Leave no rubbish behind.


    localStorage.clear();
    setToken(false);


  };


  return {
    deleteToken: deleteToken,
    setToken: saveToken,
    token
  }
}


