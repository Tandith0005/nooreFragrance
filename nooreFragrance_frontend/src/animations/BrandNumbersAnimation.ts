"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BrandNumbersProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  numberRefs: React.RefObject<(HTMLSpanElement | null)[]>;
}

export const useBrandNumbersAnimation = ({
  containerRef,
  numberRefs,
}: BrandNumbersProps) => {
  useGSAP(() => {
    if (!containerRef.current) return;

    const numbers = numberRefs.current.filter(Boolean);

    const counters = {
      customers: 0,
      perfumes: 0,
      countries: 0,
      satisfaction: 0,
    };

    const targets = [10000, 50, 15, 98];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 40%",
        toggleActions: "play none none reverse",
      },
    });

    // Fade in section
    tl.from(containerRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
    });

    // Animate numbers smoothly
    numbers.forEach((el, i) => {
      if (!el) return;

      const obj = { value: 0 };

      tl.to(
        obj,
        {
          value: targets[i],
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (!el) return;

            const val = Math.floor(obj.value);

            if (i === 0) el.textContent = `${val.toLocaleString()}+`;
            if (i === 1) el.textContent = `${val}+`;
            if (i === 2) el.textContent = `${val}+`;
            if (i === 3) el.textContent = `${val}%`;
          },
        },
        "<"
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};