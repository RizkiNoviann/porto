import LiquidEther from "../components/LiquidEther";
import TextType from "../components/TextType";
import TiltedCard from "../components/TiltedCard";
import ScrollFloat from "../components/ScrollFloat";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

/* =========================
   CHROMA GRID
========================= */
const ChromaGrid = ({
  items,
  className = "",
  radius = 320,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo = [
    {
      image: "https://i.pravatar.cc/300?img=8",
      title: "React",
      subtitle: "Frontend Library",
      borderColor: "#61DAFB",
      gradient: "linear-gradient(145deg,#61DAFB,#000)",
      url: "https://react.dev",
    },
    {
      image: "https://i.pravatar.cc/300?img=11",
      title: "Tailwind CSS",
      subtitle: "Utility CSS",
      borderColor: "#38BDF8",
      gradient: "linear-gradient(210deg,#38BDF8,#000)",
      url: "https://tailwindcss.com",
    },
    {
      image: "https://i.pravatar.cc/300?img=3",
      title: "GSAP",
      subtitle: "Animation Engine",
      borderColor: "#88CE02",
      gradient: "linear-gradient(165deg,#88CE02,#000)",
      url: "https://gsap.com",
    },
    {
      image: "https://i.pravatar.cc/300?img=16",
      title: "Laravel",
      subtitle: "Backend Framework",
      borderColor: "#EF4444",
      gradient: "linear-gradient(195deg,#EF4444,#000)",
      url: "https://laravel.com",
    },
    {
      image: "https://i.pravatar.cc/300?img=25",
      title: "Figma",
      subtitle: "UI Design",
      borderColor: "#A259FF",
      gradient: "linear-gradient(225deg,#A259FF,#000)",
      url: "https://figma.com",
    },
    {
      image: "https://i.pravatar.cc/300?img=60",
      title: "GitHub",
      subtitle: "Version Control",
      borderColor: "#ffffff",
      gradient: "linear-gradient(135deg,#666,#000)",
      url: "https://github.com",
    },
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current(pos.current.x);
        setY.current(pos.current.y);
      },
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25 });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut });
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative flex flex-wrap justify-center gap-8 mt-16 ${className}`}
      style={{ "--r": `${radius}px`, "--x": "50%", "--y": "50%" }}
    >
      {data.map((c, i) => (
        <article
          key={i}
          onClick={() => window.open(c.url, "_blank")}
          className="relative w-[260px] rounded-2xl overflow-hidden border-2 cursor-pointer transition-transform hover:scale-[1.03]"
          style={{ background: c.gradient, borderColor: c.borderColor }}
        >
          <img
            src={c.image}
            alt={c.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-white">
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p className="text-sm opacity-80">{c.subtitle}</p>
          </div>
        </article>
      ))}

      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: "grayscale(1) brightness(0.75)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.75)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, black 70%)",
        }}
      />
    </div>
  );
};

/* =========================
   HOME (SECTION 1 TIDAK DIUBAH)
========================= */
export default function Home() {
  return (
    <div className="relative w-full min-h-[200vh] bg-black overflow-hidden">
      {/* ===== BACKGROUND (GLOBAL) ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={["#2E073F", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          resolution={0.5}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
        />
      </div>

      {/* ===== SECTION 1 : ABOUT ME (UTUH) ===== */}
      <section className="relative z-10 h-screen flex items-center">
        <div className="mx-auto w-full max-w-6xl px-12">
          <div className="grid grid-cols-2 items-center gap-x-28 text-white">
            {/* LEFT */}
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold leading-tight">
                <span className="block">
                  <TextType
                    text={[
                      "Hello, I'm",
                      "Halo, Saya",
                      "Hola, soy",
                      "Konnichiwa, watashidesu",
                    ]}
                    typingSpeed={80}
                    pauseDuration={1500}
                    showCursor={false}
                  />
                </span>
                <span className="block text-[#7A1CAC] font-bold">
                  Rizki Novian.
                </span>
              </h1>

              <p className="text-gray-300 max-w-md">
                Nice to meet you. I am a Software Engineering Technology
                graduate from Institut Pertanian Bogor.
              </p>

              <div className="flex gap-4 pt-4">
                <button className="rounded-full bg-[#7A1CAC] text-black px-6 py-2 font-medium">
                  Get in Touch
                </button>
                <button className="rounded-full border border-white text-[#7A1CAC] px-6 py-2">
                  View All Works
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex justify-end">
              <TiltedCard
                imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
                containerHeight="340px"
                containerWidth="340px"
                imageHeight="340px"
                imageWidth="340px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2 : TOOLS ===== */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-6xl px-12 text-white text-center">
          <ScrollFloat
            animationDuration={1}
            ease="power3.out"
            scrollStart="top 80%"
            scrollEnd="center center"
            stagger={0.04}
          >
            Tools & Stack
          </ScrollFloat>

          <ChromaGrid />
        </div>
      </section>
    </div>
  );
}
