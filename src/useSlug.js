import { useState, useEffect } from "react";

export default function useSlug(inputToken) {
  const getSlug = () => {
    const slugString = localStorage.getItem("slug");

    var userToken = null;

    try {
      userToken = JSON.parse(slugString);
    } catch (e) {
      console.log("Problem with localStorage slug");
      return null;
    }

    if (userToken && userToken.accessToken) {
      return userToken.accessToken;
      //return {token:userToken};
    }

    return null;
  };
  useEffect(() => {
    console.log("useToken slug", slug);
    //    if (props.token) {props.token = token;}
  }, [slug]);

  const [slug, setSlug] = useState(getSlug());
  const [username, setUsername] = useState();

  const saveSlug = (userSlug) => {
    if (!userSlug) {
      return false;
    }
    console.log("useSlug saveSlug slugToken", userSlug);

    localStorage.setItem("slug", JSON.stringify(userSlug));

    //    setUsername(userToken.username);
    setSlug(userSlug.slug);
  };

  const deleteSlug = (userSlug) => {
    // Leave no rubbish behind.

    localStorage.clear();
    setSlug(false);
  };

  return {
    deleteSlug: deleteSlug,
    setSlug: saveSlug,
    slug,
    username,
  };
}
