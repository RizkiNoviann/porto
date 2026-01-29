import { useState } from "react";

import TiltedCard from "../components/TiltedCard";
import ScrollFloat from "../components/ScrollFloat";
import DarkVeil from "../components/DarkVeil";
import RotatingText from "../components/RotatingText";
import Ribbons from "../components/Ribbons";
import Carousel from "../components/Carousel";
import PillNav from "../components/PillNav";
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";
import CardSwap, { Card } from "../components/CardSwap";

// ===== LOGOS =====
// FE
import reactlogo from "../assets/react.png";
import vuelogo from "../assets/vue.png";
import nuxtlogo from "../assets/nuxt.png";

// BE
import laravellogo from "../assets/laravel.png";
import nestlogo from "../assets/nest.png";

// Styling
import tailwindlogo from "../assets/tailwind.png";
import bosstraplogo from "../assets/bosstrap.png";

// DB
import phpmyadminlogo from "../assets/phpmyadmin.png";
import mongodblogo from "../assets/mongodb.png";

// Others
import pythonlogo from "../assets/python.png";
import clogo from "../assets/c++.png";
import figmalogo from "../assets/figma.png";
import githublogo from "../assets/github.png";

// Video
import video from "../assets/video.mp4";

//cv
import { motion, AnimatePresence } from "framer-motion";
import wa from "../assets/wa.png";
import linkedin from "../assets/linkedin.jpg";

export default function Home() {
  const [showContact, setShowContact] = useState(false);

  const [openVideo, setOpenVideo] = useState(null);

  // ===== CAROUSEL ITEMS =====
  const frontendItems = [
    {
      id: "react",
      title: "React",
      icon: <img src={reactlogo} className="h-28 w-28 object-contain" />,
    },
    {
      id: "vue",
      title: "Vue",
      icon: <img src={vuelogo} className="h-28 w-28 object-contain" />,
    },
    {
      id: "nuxt",
      title: "Nuxt",
      icon: <img src={nuxtlogo} className="h-28 w-28 object-contain" />,
    },
  ];

  const backendItems = [
    {
      id: "laravel",
      title: "Laravel",
      icon: <img src={laravellogo} className="h-28 w-28 object-contain" />,
    },
    {
      id: "nest",
      title: "Nest",
      icon: <img src={nestlogo} className="h-28 w-28 object-contain" />,
    },
  ];

  const stylingItems = [
    {
      id: "tailwind",
      title: "Tailwind",
      icon: <img src={tailwindlogo} className="h-28 w-28 object-contain" />,
    },
    {
      id: "bootstrap",
      title: "Bootstrap",
      icon: <img src={bosstraplogo} className="h-28 w-28 object-contain" />,
    },
  ];

  const dataItems = [
    {
      id: "phpmyadmin",
      title: "PHPMyAdmin",
      icon: <img src={phpmyadminlogo} className="h-28 w-28 object-contain" />,
    },
    {
      id: "mongodb",
      title: "MongoDB",
      icon: <img src={mongodblogo} className="h-28 w-28 object-contain" />,
    },
  ];

  const othersItems = [
    {
      id: "python",
      title: "Python",
      icon: <img src={pythonlogo} className="h-28 w-28 object-contain" />,
    },
    {
      id: "cpp",
      title: "C++",
      icon: <img src={clogo} className="h-28 w-28 object-contain" />,
    },
    {
      id: "figma",
      title: "Figma",
      icon: <img src={figmalogo} className="h-28 w-28 object-contain" />,
    },
    {
      id: "github",
      title: "Github",
      icon: <img src={githublogo} className="h-28 w-28 object-contain" />,
    },
  ];

  // ===== SCROLL STACK =====
  const projectStackItems = [
    {
      id: "intro-video",
      title: "Project Overview",
      type: "video",
      src: video,
    },
    {
      id: "backend",
      title: "Back End Stack",
      description: "Laravel & NestJS untuk API dan sistem backend",
      images: [laravellogo, nestlogo],
    },
    {
      id: "styling",
      title: "Styling Stack",
      description: "Framework styling untuk UI konsisten",
      images: [tailwindlogo, bosstraplogo],
    },
    {
      id: "database",
      title: "Data Management",
      description: "Database & data tools",
      images: [phpmyadminlogo, mongodblogo],
    },
  ];

  const stackColors = ["bg-[#7A1CAC]"];

  //download cv
  const handleDownloadCV = () => {
    window.open("/Rizki Novian-resume.pdf", "_blank");

    const link = document.createElement("a");
    link.href = "/Rizki Novian-resume.pdf";
    link.download = "Rizki Novian-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      {/* ===== FIXED BACKGROUND ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DarkVeil />
        <Ribbons
          baseThickness={28}
          colors={["#7A1CAC"]}
          speedMultiplier={0.25}
          enableFade={false}
          enableShaderEffect={false}
        />
      </div>

      {/* ===== NAV ===== */}
      <div className="relative z-100 flex justify-center pt-6">
        <PillNav
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
          ]}
          activeHref="/"
          baseColor="#000"
          pillColor="#000"
          hoveredPillColor="#7A1CAC"
          pillTextColor="#7A1CAC"
          hoveredPillTextColor="#000"
        />
      </div>

      {/* ===== SECTION 1 ===== */}
      <section className="relative z-10 h-screen flex items-center">
        <div className="mx-auto max-w-6xl px-12 grid grid-cols-2 gap-24 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-semibold flex flex-wrap gap-3">
              <RotatingText
                texts={["Hi, My Name", "Halo, Nama Saya", "Hola, Soy"]}
                mainClassName="text-[#C77DFF]"
              />
              <span className="font-bold">Rizki Novian</span>
            </h1>

            <p className="text-gray-300 max-w-md">
              Software Engineering Technology graduate from Institut Pertanian
              Bogor.
            </p>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setShowContact((prev) => !prev)}
                className="rounded-full bg-[#7A1CAC] text-black px-6 py-2 cursor-pointer"
              >
                Get in Touch
              </button>

              <button
                onClick={handleDownloadCV}
                className="rounded-full bg-[#7A1CAC] text-black px-6 py-2 cursor-pointer"
              >
                My CV
              </button>
            </div>

            <AnimatePresence>
              {showContact && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex"
                >
                  {/* WhatsApp */}
                  <motion.a
                    href="https://wa.me/62821100737645"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                  >
                    <img src={wa} alt="WhatsApp" className="w-10 h-10" />
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    href="https://www.linkedin.com/in/rizki-novian-0211nz"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                  >
                    <img
                      src={linkedin}
                      alt="LinkedIn"
                      className="w-10 h-10 object-contain"
                    />
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-end">
            <TiltedCard
              imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
              containerHeight="340px"
              containerWidth="340px"
            />
          </div>
        </div>
      </section>

      {/* ===== SECTION 2 ===== */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-12 text-center space-y-16">
          <ScrollFloat>Tools & Stack</ScrollFloat>

          <div className="flex flex-wrap justify-evenly gap-y-16">
            <Carousel
              title="Front End"
              width={280}
              items={frontendItems}
              autoplay
              loop
            />
            <Carousel
              title="Back End"
              width={280}
              items={backendItems}
              autoplay
              loop
            />
            <Carousel
              title="Styling"
              width={280}
              items={stylingItems}
              autoplay
              loop
            />
            <Carousel
              title="Database"
              width={280}
              items={dataItems}
              autoplay
              loop
            />
            <Carousel
              title="Others"
              width={280}
              items={othersItems}
              autoplay
              loop
            />
          </div>
        </div>
      </section>

      {/* ===== SECTION 3 (FIXED SCROLLSTACK) ===== */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-12 flex gap-16 items-start">
          {/* LEFT (STICKY, NO TRANSFORM) */}
          <div className="w-[35%] sticky top-32 space-y-4">
            <ScrollFloat>Projects</ScrollFloat>
            <p className="text-gray-300">Project yang pernah saya kerjakan.</p>
          </div>

          {/* RIGHT (SCROLL CONTAINER) */}
          <div className="w-[65%] h-[70vh] pr-4">
            <ScrollStack className="no-scrollbar">
              {projectStackItems.map((item, index) => (
                <ScrollStackItem
                  key={item.id}
                  itemClassName={`
                    ${stackColors[index % stackColors.length]}
                    text-white
                    max-h-[420px]
                    transform-gpu
                    will-change-transform
                    [backface-visibility:hidden]
                  `}
                >
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                  {item.description && (
                    <p className="opacity-80 mt-2">{item.description}</p>
                  )}

                  {item.type === "video" ? (
                    <div
                      onClick={() => setOpenVideo(item.src)}
                      className="relative mt-6 cursor-pointer rounded-2xl overflow-hidden border border-white/10 group"
                    >
                      {/* Thumbnail Video */}
                      <video
                        src={item.src}
                        muted
                        preload="metadata"
                        className="w-full h-[220px] object-cover  transition-opacity duration-300 group-hover:opacity-90"
                      />

                      {/* Overlay gelap */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center
                      scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl"
                        >
                          ▶
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-6 pt-6 flex-wrap">
                      {item.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          className="h-20 w-20 object-contain"
                        />
                      ))}
                    </div>
                  )}
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4 (ABOUT ME) ===== */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-12 flex gap-16 items-start">
          {/* LEFT (STICKY) */}
          <div className="w-[35%] sticky top-32 space-y-4">
            <ScrollFloat>About Me</ScrollFloat>
            <p className="text-gray-300 leading-relaxed">
              Saya adalah lulusan Teknologi Rekayasa Perangkat Lunak dengan
              ketertarikan pada pengembangan web modern, UI/UX interaktif, dan
              integrasi sistem. Terbiasa membangun aplikasi end-to-end
              menggunakan React, Vue, Laravel, dan NestJS, serta fokus pada
              clean code dan user experience.
            </p>
          </div>

          {/* RIGHT (CARD SWAP) */}
          <div className="w-[65%] h-[70vh] relative">
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={2500}
              pauseOnHover
            >
              <Card>
                <h3 className="text-xl font-semibold mb-2">Background</h3>
                <p className="opacity-80">
                  Lulusan Institut Pertanian Bogor dengan fokus pada Software
                  Engineering dan pengembangan aplikasi berbasis web.
                </p>
              </Card>

              <Card>
                <h3 className="text-xl font-semibold mb-2">What I Do</h3>
                <p className="opacity-80">
                  Membangun frontend interaktif, backend API, serta integrasi
                  database dengan pendekatan scalable dan maintainable.
                </p>
              </Card>

              <Card>
                <h3 className="text-xl font-semibold mb-2">Mindset</h3>
                <p className="opacity-80">
                  Continuous learning, problem solving, dan detail-oriented
                  dalam setiap proses development.
                </p>
              </Card>
            </CardSwap>
          </div>
        </div>
      </section>

      {/* ===== VIDEO MODAL ===== */}
      {openVideo && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur flex items-center justify-center"
          onClick={() => setOpenVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 z-10 bg-black/60 rounded-full w-8 h-8"
              onClick={() => setOpenVideo(null)}
            >
              ✕
            </button>
            <video
              src={openVideo}
              controls
              autoPlay
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
