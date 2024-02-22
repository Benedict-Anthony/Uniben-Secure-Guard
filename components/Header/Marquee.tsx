"use client";
import { securityInfoMarquee } from "@/data/securityInfoMarquee";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const MarqueeSlide = () => {
  const [qoute, setQoute] = useState(securityInfoMarquee[0]);
  // function shuffleQoute() {
  //   const randomNumber = Math.floor(Math.random() * 10);
  //   setQoute(securityInfoMarquee[randomNumber]);
  // }
  // setInterval(() => {
  //   shuffleQoute();
  // }, 10000);

  return (
    <Marquee className="bg-darkRed py-1">
      <h1 className="text-sm md:text-xl  text-light">{qoute}</h1>
    </Marquee>
  );
};

export default MarqueeSlide;
