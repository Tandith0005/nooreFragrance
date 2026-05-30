"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Deletee = () => {
  const container = useRef<HTMLDivElement>(null);

  const box = useRef<HTMLDivElement>(null);
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const box4 = useRef<HTMLDivElement>(null);
  const box5 = useRef<HTMLDivElement>(null);
  const box6 = useRef<HTMLDivElement>(null);


  useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.current,
      start: "top top",
      end: "+=1000",
      scrub: 1,
      pin: true,
    },
  });

  // Box 0 - Top Left
  tl.from(box.current, { 
    x: (i, el) => {
      const rect = el.getBoundingClientRect();
      return 20 - rect.left;
    },
    y: (i, el) => {
      const rect = el.getBoundingClientRect();
      return 20 - rect.top;
    },
    duration: 1 
  });
  
  // Box 1 - Top Center
  tl.from(
    box1.current,
    {
      x: (i, el) => {
        const rect = el.getBoundingClientRect();
        const centerX = window.innerWidth / 2 - rect.width / 2;
        return centerX - rect.left;
      },
      y: (i, el) => {
        const rect = el.getBoundingClientRect();
        return 20 - rect.top;
      },
      duration: 1,
    },
    "<",
  );
  
  // Box 2 - Top Right
  tl.from(
    box2.current,
    {
      x: (i, el) => {
        const rect = el.getBoundingClientRect();
        const rightPosition = window.innerWidth - rect.width - 20;
        return rightPosition - rect.left;
      },
      y: (i, el) => {
        const rect = el.getBoundingClientRect();
        return 20 - rect.top;
      },
      duration: 1,
    },
    "<",
  );
  
  // Box 3 - Bottom Left
  tl.from(
    box3.current,
    {
      x: (i, el) => {
        const rect = el.getBoundingClientRect();
        return 20 - rect.left;
      },
      y: (i, el) => {
        const rect = el.getBoundingClientRect();
        const bottomPosition = window.innerHeight - rect.height - 20;
        return bottomPosition - rect.top;
      },
      duration: 1,
    },
    "<",
  );
  
  // Box 4 - Bottom Center
  tl.from(
    box4.current,
    {
      x: (i, el) => {
        const rect = el.getBoundingClientRect();
        const centerX = window.innerWidth / 2 - rect.width / 2;
        return centerX - rect.left;
      },
      y: (i, el) => {
        const rect = el.getBoundingClientRect();
        const bottomPosition = window.innerHeight - rect.height - 20;
        return bottomPosition - rect.top;
      },
      duration: 1,
    },
    "<",
  );
  
  // Box 5 - Bottom Right
  tl.from(
    box5.current,
    {
      x: (i, el) => {
        const rect = el.getBoundingClientRect();
        const rightPosition = window.innerWidth - rect.width - 20;
        return rightPosition - rect.left;
      },
      y: (i, el) => {
        const rect = el.getBoundingClientRect();
        const bottomPosition = window.innerHeight - rect.height - 20;
        return bottomPosition - rect.top;
      },
      duration: 1,
    },
    "<",
  );
  // Box 6 - Bottom Right
  tl.from(
    box6.current,
    {
     
      duration: 1,
      opacity: 0
    },
    "<",
  );
});
  return (
    // <div ref={container} className="relative h-[200vh]">
    //   <div
    //     ref={box}
    //     className="absolute top-40 left-10 w-40 h-40 bg-red-500 will-change-transform"
    //   />
    //   <div
    //     ref={box1}
    //     className="absolute top-10 left-1/2 -translate-x-1/2  w-40 h-40 bg-blue-500 will-change-transform"
    //   />
    //   <div
    //     ref={box2}
    //     className="absolute top-60 left-[90%] w-40 h-40 bg-green-500 will-change-transform"
    //   />
    //   <div
    //     ref={box3}
    //     className="absolute bottom-1/2 left-10 w-40 h-40 bg-yellow-500 will-change-transform"
    //   />
    //   <div
    //     ref={box4}
    //     className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-40 h-40 bg-pink-500 will-change-transform"
    //   />
    //   <div
    //     ref={box5}
    //     className="absolute bottom-1/2 left-[90%] w-40 h-40 bg-purple-500 will-change-transform"
    //   />
    // </div>
    <div ref={container} className="relative h-[200vh]">
      <div
        ref={box}
        className="absolute top-50 left-80 w-40 h-40 bg-red-500 will-change-transform"
        
      />
      <div
        ref={box1}
        className="absolute top-50 left-220 -translate-x-1/2  w-40 h-40 bg-blue-500 will-change-transform"
      />
      <div
        ref={box2}
        className="absolute top-50 left-320 w-40 h-40 bg-green-500 will-change-transform"
      />
      <div
        ref={box3}
        className="absolute top-50 left-140 w-40 h-40 bg-yellow-500 will-change-transform"
      />
      <div
        ref={box4}
        className="absolute top-50 left-280 -translate-x-1/2 w-40 h-40 bg-pink-500 will-change-transform"
      />
      <div
        ref={box5}
        className="absolute top-50 left-380 w-40 h-40 bg-purple-500 will-change-transform"
      />
      <div
        ref={box6}
        className="absolute top-100 left-[25%] w-[50%] h-20 bg-amber-500 will-change-transform"
      />
    </div>
  );
};

export default Deletee;
