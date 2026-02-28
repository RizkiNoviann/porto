import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  type = "title",
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  align = "start",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "top 80%",
  scrollEnd = "bottom 40%",
  stagger = 0.03,
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    if (typeof children !== "string") return null;
    return children.split("").map((char, i) => (
      <span className="char inline-block" key={i}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".char");
    const scroller = scrollContainerRef?.current ?? window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: animationDuration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true, // ← boleh true setelah fix
          },
        },
      );
    }, el);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
  ]);

  const typeStyle =
    type === "title"
      ? "text-4xl font-extrabold"
      : "text-base md:text-lg font-normal text-gray-300";

  return (
    <div
      ref={containerRef}
      className={`
        my-4
        ${align === "center" ? "flex justify-center" : ""}
        ${containerClassName}
      `}
    >
      <span
        className={`
          inline-block
          leading-relaxed
          ${align === "center" ? "text-center" : "text-left"}
          ${typeStyle}
          ${textClassName}
        `}
      >
        {splitText}
      </span>
    </div>
  );
};

export default ScrollFloat;
