"use client";

import { useState, useEffect } from "react";
import Loader from "../../components/load-spinner";

const Loading = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false); // hide loader after 3 sec
    }, 3000);

    return () => clearTimeout(timer); // clear after unmount component
  }, []);

  return showLoader ? <Loader /> : null; 
};

export default Loading;
