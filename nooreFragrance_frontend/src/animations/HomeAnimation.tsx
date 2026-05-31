
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);
}

const getElementPosition = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2,
  };
};


// Text coming animation----------------------------------------------------------------------
interface HeroAnimationProps {
  badgeRef: React.RefObject<HTMLElement | null>;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  secondHeadingRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  buttonsRef: React.RefObject<HTMLDivElement | null>;
}

export const useHeroAnimation = ({
  badgeRef,
  headingRef,
  secondHeadingRef,
  subtitleRef,
  buttonsRef,
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

      return () => {
        splitHeading?.revert();
      };
    },
    { scope: headingRef },
  );
};


// Text Fade On Scroll animation ---------------------------------------------------------------------------
interface TextFadeOutProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  textContainerRef: React.RefObject<HTMLDivElement | null>;
  searchbarRef: React.RefObject<HTMLDivElement | null>;
}

export const useTextFadeOnScroll = ({
  containerRef,
  textContainerRef,
  searchbarRef,
}: TextFadeOutProps) => {
  useGSAP(
    () => {
      if (!containerRef.current || !textContainerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600",
          scrub: 1,
        },
      });

      // Fade out the entire text container as user scrolls
      tl.to(textContainerRef.current, {
        opacity: 0,
        y: -80, // Move up while fading
        ease: "power2.out",
      });

      // Fade in the searchbar
      tl.fromTo(
        searchbarRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: "power2.out",
        },
        "<",
      );

      return () => {
        tl.scrollTrigger?.kill(); 
        tl.kill(); 
        tl.revert(); 
      };
    },
    { dependencies: [containerRef, textContainerRef, searchbarRef] },
  );
};

//  Floating Images animation for perfume images ------------------------------------------------------------
interface ElegantFloatProps {
  refs: React.RefObject<(HTMLDivElement | null)[]>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
}

export const useElegantFloat = ({ refs, containerRef, disabled  }: ElegantFloatProps) => {
  useGSAP(() => {
    if (!containerRef.current) return;
    if (disabled) return;
    let animations: gsap.core.Tween[] = [];

    const createAnimations = () => {
      animations = [];

      refs.current.forEach((img, index) => {
        if (!img) return;

        const tween = gsap.to(img, {
          y: ["+=8", "-=6", "+=10", "-=7", "+=5", "-=9"][index % 6],
          duration: [1.5, 2, 3, 2, 4.5, 1.2][index % 6],
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        animations.push(tween);
      });
    };

    createAnimations();

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",

      onUpdate: (self) => {
        if (self.progress > 0.02) {
          // HARD KILL (not pause)
          animations.forEach((anim) => anim.kill());
          animations = [];
        }

        if (self.progress <= 0.02 && animations.length === 0) {
          // recreate when back to top
          createAnimations();
        }
      },
    });

    return () => {
      animations.forEach((anim) => anim.kill());
      st.kill();
    };
  }, []);
};

// ScrollTrigger animation for floating perfume images ------------------------------------------------------------
interface FloatingImagesProps {
  frontImageRefs: React.RefObject<(HTMLDivElement | null)[]>;
  backImageRefs: React.RefObject<(HTMLDivElement | null)[]>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
}

export const useFloatingPerfumeImages = ({
  frontImageRefs,
  backImageRefs,
  containerRef,
  disabled
}: FloatingImagesProps) => {
  useGSAP(
    () => {
      if (!containerRef.current || disabled) return;

      // Pre-calculate ALL positions BEFORE creating timeline
      const calculatePositions = () => {
        const positions = {
          // Front images
          front0: null as { x: number; y: number } | null,
          front1: null as { x: number; y: number } | null,
          front2: null as { x: number; y: number } | null,
          front3: null as { x: number; y: number } | null,
          front4: null as { x: number; y: number } | null,
          front5: null as { x: number; y: number } | null,
          // Back images
          back0: null as { x: number; y: number } | null,
          back1: null as { x: number; y: number } | null,
          back2: null as { x: number; y: number } | null,
          back3: null as { x: number; y: number } | null,
        };

        const img0 = frontImageRefs.current[0];
        if (img0) {
          const rect = getElementPosition(img0);
          positions.front0 = { x: 250 - rect.left, y: 200 - rect.top };
        }

        const img1 = frontImageRefs.current[1];
        if (img1) {
          const rect = getElementPosition(img1);
          const centerX = window.innerWidth / 2;
          positions.front1 = { x: centerX - rect.left, y: 20 - rect.top };
        }

        const img2 = frontImageRefs.current[2];
        if (img2) {
          const rect = getElementPosition(img2);
          const rightPosition = window.innerWidth - rect.width - 250;
          positions.front2 = { x: rightPosition - rect.left, y: 200 - rect.top };
        }

        const img3 = frontImageRefs.current[3];
        if (img3) {
          const rect = getElementPosition(img3);
          const bottomPosition = window.innerHeight - rect.height - 150;
          positions.front3 = { x: 350 - rect.left, y: bottomPosition - rect.top };
        }

        const img4 = frontImageRefs.current[4];
        if (img4) {
          positions.front4 = { x: 0, y: 0 }; // Opacity only, no movement
        }

        const img5 = frontImageRefs.current[5];
        if (img5) {
          const rect = getElementPosition(img5);
          const rightPosition = window.innerWidth - rect.width - 20;
          const bottomPosition = window.innerHeight - rect.height - 100;
          positions.front5 = { x: rightPosition - rect.left, y: bottomPosition - rect.top };
        }

        // Back images
        const back0 = backImageRefs.current[0];
        if (back0) {
          const rect = getElementPosition(back0);
          positions.back0 = { x: 20 - rect.left, y: 20 - rect.top };
        }

        const back1 = backImageRefs.current[1];
        if (back1) {
          const rect = getElementPosition(back1);
          const centerX = window.innerWidth / 2 - 200;
          positions.back1 = { x: centerX - rect.left, y: 1 - rect.top };
        }

        const back2 = backImageRefs.current[2];
        if (back2) {
          const rect = getElementPosition(back2);
          const rightPosition = window.innerWidth - rect.width - 20;
          positions.back2 = { x: rightPosition - rect.left, y: 20 - rect.top };
        }

        const back3 = backImageRefs.current[3];
        if (back3) {
          const rect = getElementPosition(back3);
          const bottomPosition = window.innerHeight - rect.height;
          positions.back3 = { x: 20 - rect.left, y: bottomPosition - rect.top };
        }

        return positions;
      };

      const positions = calculatePositions();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1300",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          snap: {
            snapTo: [0, 1],
            duration: 0.4,
            ease: "power1.inOut",
          },
        },
      });

      // Use pre-calculated positions
      if (positions.front0) {
        tl.from(frontImageRefs.current[0], {
          x: positions.front0.x,
          y: positions.front0.y,
          duration: 1,
        });
      }

      if (positions.front1) {
        tl.from(frontImageRefs.current[1], {
          x: positions.front1.x,
          y: positions.front1.y,
          duration: 1,
        }, "<");
      }

      if (positions.front2) {
        tl.from(frontImageRefs.current[2], {
          x: positions.front2.x,
          y: positions.front2.y,
          duration: 1,
        }, "<");
      }

      if (positions.front3) {
        tl.from(frontImageRefs.current[3], {
          x: positions.front3.x,
          y: positions.front3.y,
          duration: 1,
        }, "<");
      }

      tl.from(frontImageRefs.current[4], {
        opacity: 0,
        duration: 1,
      }, "<");

      if (positions.front5) {
        tl.from(frontImageRefs.current[5], {
          x: positions.front5.x,
          y: positions.front5.y,
          duration: 1,
        }, "<");
      }

      // Back images
      if (positions.back0) {
        tl.from(backImageRefs.current[0], {
          x: positions.back0.x,
          y: positions.back0.y,
          duration: 1,
          opacity: 0.3,
          scale: 0.9,
        }, "<");
      }

      if (positions.back1) {
        tl.from(backImageRefs.current[1], {
          x: positions.back1.x,
          y: positions.back1.y,
          duration: 1,
          opacity: 0.15,
          scale: 0.85,
        }, "<");
      }

      if (positions.back2) {
        tl.from(backImageRefs.current[2], {
          x: positions.back2.x,
          y: positions.back2.y,
          duration: 1,
          opacity: 0.2,
          scale: 0.9,
        }, "<");
      }

      if (positions.back3) {
        tl.from(backImageRefs.current[3], {
          x: positions.back3.x,
          y: positions.back3.y,
          duration: 1,
          opacity: 0.35,
          scale: 0.75,
        }, "<");
      }

      tl.from(backImageRefs.current[4], {
        opacity: 0.4,
        duration: 1,
        scale: 0.6,
      }, "<");

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        frontImageRefs.current.forEach((img) => {
          if (img) gsap.killTweensOf(img);
        });
        backImageRefs.current.forEach((img) => {
          if (img) gsap.killTweensOf(img);
        });
      };
    },
    { dependencies: [disabled, containerRef] }, // Recalculate when disabled changes
  );
};


// ScrollTrigger animation for Features Perfumes ------------------------------------------------------------

interface FeaturesAnimationProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  itemRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

export const useFeaturesAnimation = ({
  containerRef,
  itemRefs,
}: FeaturesAnimationProps) => {
  useGSAP(() => {
    if (!containerRef.current) return;

    const items = itemRefs.current.filter(Boolean);

    // initial state (soft + elegant)
    gsap.set(items, {
      opacity: 0,
      y: 60,
      scale: 0.95,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        amount: 0.8,
        from: "random", // gives natural luxury feel
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};

interface ParallaxProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  itemRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

export const useFeaturesParallax = ({
  containerRef,
  itemRefs,
}: ParallaxProps) => {
  useGSAP(() => {
    if (!containerRef.current) return;

    const items = itemRefs.current.filter(Boolean);

    items.forEach((el, index) => {
      if (!el) return;

     
      const depth = (index % 5) + 1; 
      const movement = depth * 15; 

      gsap.fromTo(
        el,
        {
          y: 0,
        },
        {
          y: movement,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1 + index * 0.1, 
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};



