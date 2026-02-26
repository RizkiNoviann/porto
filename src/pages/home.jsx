import { useState } from "react";

import TiltedCard from "../components/TiltedCard";
import ScrollFloat from "../components/ScrollFloat";
import DarkVeil from "../components/DarkVeil";
import RotatingText from "../components/RotatingText";
import Ribbons from "../components/Ribbons";
import Carousel from "../components/Carousel";
import PillNav from "../components/PillNav";
import AnimatedList from "../components/AnimatedList";

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

//foto
import nop from "../assets/nop.jpeg";

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

  const experienceItems = [
    {
      year: "2025",
      title: "IT Development (Oct-Apr)",
      company: "Airnav Indonesia",
      description:
        "I work at AirNav Indonesia in the IT Development division. My role involves developing and maintaining internal applications that are used to support business processes and operational needs within the company. I collaborate with teams to design, build, and improve systems to ensure they are reliable, efficient, and aligned with organizational requirements.",
    },
    {
      year: "2025",
      title: "Front End Developer (Mar-Aug)",
      company: "Ijendev.id",
      description:
        "I worked at Ijendev.id, a software house specializing in IoT-based website development. During my time there, I developed a web-based inventory and asset borrowing management system using React. I was responsible for building responsive and reusable UI components to support item tracking and borrowing workflows, ensuring a smooth and user-friendly experience. I also collaborated closely with the team to implement features that aligned with business and system requirements.",
    },
    {
      year: "2024",
      title: "Front End Developer (Feb-Jul)",
      company: "Dicoding",
      description:
        "During my internship, I developed PureLipuran, a tourism website for Penglipuran Village. The website features vacation package booking and user review functionality, built using React and Tailwind CSS. I focused on creating responsive UI components and ensuring a smooth, consistent user experience across various devices.",
    },
    {
      year: "2024",
      title: "Fullstack Developer",
      company: "PT Ratu Bio Indonesia",
      description:
        "I worked at PT Ratu Bio Indonesia, a manufacturing company specializing in maklon services. In this role, I was involved in developing the company profile website. I built using React and Tailwind CSS as Front End tools and Laravel as Back End tools, implemented payment gateway integration, and developed product review features. I also integrated RESTful APIs to manage dynamic data and support seamless user interactions across the application.",
    },
  ];

  const projects = [
    {
      title: "Arsipku",
      image:
        "https://images.unsplash.com/photo-1612831455543-4e63f1b70d88?q=80&w=1200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      tech: ["Nuxt", "Nest", "Tailwind CSS"],
    },
    {
      title: "NavEvent",
      image:
        "https://images.unsplash.com/photo-1612831455543-4e63f1b70d88?q=80&w=1200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      tech: ["React", "Laravel", "Tailwind CSS"],
    },
    {
      title: "PT Ratu Bio Indonesia",
      image:
        "https://images.unsplash.com/photo-1612831455543-4e63f1b70d88?q=80&w=1200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      tech: ["Laravel", "MySQL", "Tailwind CSS"],
    },
    {
      title: "Purelipuran",
      image:
        "https://images.unsplash.com/photo-1612831455543-4e63f1b70d88?q=80&w=1200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      tech: ["HTML", "Tailwind CSS", "JS Vanila"],
    },
    {
      title: "Nopflix",
      image:
        "https://images.unsplash.com/photo-1612831455543-4e63f1b70d88?q=80&w=1200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      tech: ["Laravel", "MySQL", "Bootstrap CSS"],
    },
    {
      title: "Sanoebari",
      image:
        "https://images.unsplash.com/photo-1612831455543-4e63f1b70d88?q=80&w=1200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      tech: ["HTML", "Tailwind CSS", "JS Vanila"],
    },
  ];

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
      {/* ===== SECTION 1 (HERO) ===== */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <h1 className="text-[56px] md:text-[72px] font-extrabold">
            <div className="flex items-center justify-center gap-3 whitespace-nowrap">
              {/* Rotating text (FORCED SINGLE LINE) */}
              <span className="inline-flex items-center text-[#C77DFF]">
                <span className="whitespace-nowrap leading-none flex items-center">
                  <RotatingText
                    texts={["HELLO, I'M", "HALO, SAYA", "HOLA, SOY"]}
                  />
                </span>
              </span>

              {/* Name */}
              <span className="text-white leading-none">Rizki</span>
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Web Developer focused on crafting modern interfaces, scalable
            backend systems, and meaningful user experiences.
          </p>

          {/* CTA (TETAP LAMA) */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              onClick={() => setShowContact((v) => !v)}
              className="bg-[#7A1CAC] text-black px-8 py-4 rounded-full font-semibold tracking-wide hover:scale-105 transition"
            >
              CONTACT ME →
            </button>

            <button
              onClick={handleDownloadCV}
              className="border border-[#7A1CAC] px-8 py-4 rounded-full text-[#C77DFF] font-semibold hover:bg-[#7A1CAC]/10 transition"
            >
              MY CV
            </button>
          </div>

          {/* CONTACT ICONS */}
          <AnimatePresence>
            {showContact && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex justify-center gap-4 pt-4"
              >
                <a href="https://wa.me/62821100737645" target="_blank">
                  <img src={wa} className="w-10 h-10" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rizki-novian-0211nz"
                  target="_blank"
                >
                  <img src={linkedin} className="w-10 h-10 rounded" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      {/* ===== SECTION 2 ABOUT ===== */}
      <section className="relative z-10 py-32">
        <div className="max-w-6xl mx-auto px-12 grid md:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div className="space-y-6">
            <ScrollFloat textClassName="text-4xl font-extrabold" type="title">
              About Me
            </ScrollFloat>

            <p className="text-white leading-relaxed">
              I am a graduate of IPB University with a GPA of 3.45, majoring in
              Software Engineering Technology. I have two years of experience as
              a Web Developer, mainly focusing on Front-End Development, where I
              build responsive and user-friendly web interfaces. I am also a
              certified Software Engineer under the national certification
              issued by Badan Nasional Sertifikasi Profesi (BNSP).
            </p>

            <p className="text-whitex leading-relaxed">
              I enjoy turning designs into clean and efficient code,
              continuously learning new web technologies, and working
              collaboratively in a team. Outside of coding, I like playing
              badminton to stay active and maintain a good work–life balance.
            </p>
          </div>

          {/* Tilted Card */}
          <div className="flex justify-center">
            <TiltedCard
              imageSrc={nop}
              containerHeight="420px"
              containerWidth="420px"
            />
          </div>
        </div>
      </section>
      {/* ===== SECTION EXPERIENCE ===== */}
      <section className="relative z-10 min-h-screen flex items-center py-20">
        <div className="max-w-5xl mx-auto px-12 w-full">
          {/* Title */}

          <ScrollFloat
            textClassName="text-4xl font-extrabold"
            align="center"
            type="title"
          >
            Experience
          </ScrollFloat>

          <AnimatedList
            items={experienceItems}
            showGradients={false}
            displayScrollbar={false}
            enableArrowNavigation={false}
            className="!w-full"
            renderItem={(item, index) => (
              <div className="grid grid-cols-[56px_1fr] gap-6 items-start">
                {/* Left: dot + line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#7A1CAC] flex items-center justify-center text-xs font-bold text-white shrink-0 z-10">
                    {item.year}
                  </div>
                </div>

                {/* Right: card */}
                <div className="bg-[#0E0E10] border border-white/10 rounded-2xl p-8 mb-12">
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-[#C77DFF] text-sm mt-1">
                    at {item.company}
                  </p>
                  <p className="text-gray-300 mt-4 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            )}
          />
        </div>
      </section>
      {/* ===== SECTION 3 ===== */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-12 text-center space-y-16">
          <ScrollFloat
            textClassName="text-4xl font-extrabold"
            align="center"
            type="title"
          >
            Tools & Stack
          </ScrollFloat>
          <ScrollFloat
            textClassName="text-4xl font-extrabold"
            align="center"
            type="desc"
          >
            Tools and stacks I use while working
          </ScrollFloat>

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
      {/* ===== SECTION PROJECTS ===== */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-12">
          {/* Title */}
          <div className="text-center mb-20">
            <ScrollFloat
              textClassName="text-4xl font-extrabold"
              align="center"
              type="title"
            >
              My Projects
            </ScrollFloat>
            <ScrollFloat
              textClassName="text-4xl font-extrabold"
              align="center"
              type="desc"
            >
              A collection of projects I've worked on
            </ScrollFloat>
          </div>

          {/* Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-[#0E0E10] border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/10 transition"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full border border-[#7A1CAC] text-[#C77DFF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <div className="pt-4">
                    <button className="w-full bg-[#7A1CAC] text-black py-2 rounded-full font-semibold hover:scale-[1.02] transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
