"use client";

import Aos from "aos";
import React, { useEffect } from "react";
import "aos/dist/aos.css";

function AOSInit() {
  useEffect(() => {
    Aos.init({
      duration: 700,
    });
  }, []);

  return null;
}

export default AOSInit;
