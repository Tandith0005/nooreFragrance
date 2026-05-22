// src/animations/HomeAnimation.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

interface HeroAnimationProps {
  badgeRef: React.RefObject<HTMLElement | null>;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  secondHeadingRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  buttonsRef: React.RefObject<HTMLDivElement | null>;
  scrollHintRef: React.RefObject<HTMLDivElement | null>;
}

export const useHeroAnimation = ({
  badgeRef,
  headingRef,
  secondHeadingRef,
  subtitleRef,
  buttonsRef,
  scrollHintRef,
}: HeroAnimationProps) => {
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      let splitHeading: SplitText | null = null;

      // Split heading (including the gradient span)
      if (headingRef.current) {
        splitHeading = new SplitText(headingRef.current, {
          type: "words,chars",
          wordsClass: "word overflow-hidden inline-block",
          charsClass: "char inline-block",
        });

        gsap.set(splitHeading.chars, {
          opacity: 0,
          y: 80,
          rotateX: -20,
          willChange: "transform, opacity",
        });
      }

      // 1. Badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.2)" },
          0,
        );
      }

      // 2. Heading - Full animation (including "Before You Do")
      if (splitHeading?.chars) {
        tl.fromTo(
          splitHeading.chars,
          { opacity: 0, y: 80, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.65,
            stagger: { amount: 0.75, from: "start" },
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      if (secondHeadingRef?.current) {
        tl.fromTo(
          secondHeadingRef.current,
          { opacity: 0, y: 80, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      // 3. Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4",
        );
      }

      // 4. Buttons Container (including Link > button)
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.4",
        );
      }

      // 5. Scroll Hint
      if (scrollHintRef.current) {
        tl.fromTo(
          scrollHintRef.current,
          { opacity: 0, y: 25 },
          { opacity: 0.75, y: 0, duration: 0.7 },
          "-=0.3",
        );
      }

      return () => {
        splitHeading?.revert();
      };
    },
    { scope: headingRef },
  );
};

export const useScrollHintBounce = (
  scrollHintRef: React.RefObject<HTMLElement | null>,
) => {
  useGSAP(() => {
    if (scrollHintRef.current) {
      gsap.to(scrollHintRef.current, {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2.8,
      });
    }
  }, [scrollHintRef]);
};

interface FloatingImagesProps {
  frontImageRefs: React.RefObject<(HTMLDivElement | null)[]>;
  backImageRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

export const useFloatingPerfumeImages = ({
  frontImageRefs,
  backImageRefs,
}: FloatingImagesProps) => {
  useGSAP(
    () => {
      // Different movement configurations for each front image
      const frontMovements = [
        { y: 25, duration: 6, delay: 0 },
        { y: -20, duration: 7, delay: 0.5 },
        { y: 30, duration: 5.5, delay: 1 },
        { y: -25, duration: 6.5, delay: 0.3 },
        { y: 22, duration: 7.5, delay: 0.8 },
        { y: -28, duration: 5.8, delay: 1.2 },
      ];

      // Different movement configurations for back images (slower, more subtle)
      const backMovements = [
        { y: 15, duration: 11, delay: 0 },
        { y: -12, duration: 13, delay: 0.7 },
        { y: 18, duration: 10.5, delay: 1.2 },
        { y: -14, duration: 12, delay: 0.4 },
        { y: 16, duration: 11.5, delay: 0.9 },
      ];

      // Animate front images (6 images)
      frontImageRefs.current.forEach((img, index) => {
        if (!img) return;

        const movement = frontMovements[index % frontMovements.length];

        // Create a master timeline for each image
        gsap.to(img, {
          y: movement.y,
          duration: movement.duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: movement.delay,
        });
      });

      // Animate back images (5 images) - slower, more subtle
      backImageRefs.current.forEach((img, index) => {
        if (!img) return;
        const movement = backMovements[index % backMovements.length];
        
        gsap.to(img, {
          y: movement.y,
          duration: movement.duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: movement.delay,
        });
      });

      // Cleanup function
      return () => {
        // Kill all animations on unmount
        frontImageRefs.current.forEach((img) => {
          if (img) gsap.killTweensOf(img);
        });
        backImageRefs.current.forEach((img) => {
          if (img) gsap.killTweensOf(img);
        });
      };
    },
    { dependencies: [frontImageRefs, backImageRefs] },
  );
};
