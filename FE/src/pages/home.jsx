import { useState, useEffect } from "react";
import { useExperience } from "../hooks/useExperience";
import { useTool } from "../hooks/useTool";
import { useProject } from "../hooks/useProject";

import TiltedCard from "../components/TiltedCard";
import ScrollFloat from "../components/ScrollFloat";
import DarkVeil from "../components/DarkVeil";
import RotatingText from "../components/RotatingText";
import Ribbons from "../components/Ribbons";
import Carousel from "../components/Carousel";
import PillNav from "../components/PillNav";
import AnimatedList from "../components/AnimatedList";

//foto
import nop from "../assets/nop.jpeg";

//cv
import { motion, AnimatePresence } from "framer-motion";
import wa from "../assets/wa.png";
import linkedin from "../assets/linkedin.jpg";
import ig from "../assets/ig.png";

// lucide icons
import { MoveRight, Menu, X } from "lucide-react";

export default function Home() {
  const [showContact, setShowContact] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { experiences, loading: expLoading } = useExperience();
  const { tools } = useTool();
  const { projects } = useProject();

  // ===== SCROLL TO TOP VISIBILITY =====
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const aboutTop = aboutSection.getBoundingClientRect().top;
        // Tampilkan tombol ketika section about sudah mulai masuk viewport
        setShowScrollTop(aboutTop <= window.innerHeight * 0.8);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // cek posisi awal
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===== CAROUSEL ITEMS dari API (group by category) =====
  function toCarouselItems(category) {
    return tools
      .filter((t) => t.category === category)
      .map((t) => ({
        id: t.id,
        title: t.name,
        icon: t.image ? (
          <img
            src={t.image}
            className="h-28 w-28 object-contain"
            alt={t.name}
          />
        ) : (
          <span className="text-4xl font-bold text-[#7A1CAC]">{t.name[0]}</span>
        ),
      }));
  }

  const frontendItems = toCarouselItems("Frontend");
  const backendItems = toCarouselItems("Backend");
  const stylingItems = toCarouselItems("Styling");
  const dataItems = toCarouselItems("Database");
  const othersItems = toCarouselItems("Others");

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

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const experienceItems = experiences.map((exp) => ({
    id: exp.id,
    year: exp.year,
    title: `${exp.position} (${exp.period})`,
    company: exp.company,
    description: exp.description,
  }));

  const navItems = [
    { label: "Home", href: "home" },
    { label: "About", href: "about" },
    { label: "Experience", href: "experience" },
    { label: "Tools", href: "tools" },
    { label: "Project", href: "project" },
  ];

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      {/* ===== FIXED BACKGROUND ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <DarkVeil />
        </div>
        <div className="absolute inset-0 w-full h-full">
          <Ribbons
            baseThickness={28}
            colors={["#7A1CAC"]}
            speedMultiplier={0.25}
            enableFade={false}
            enableShaderEffect={false}
          />
        </div>
      </div>

      {/* ===== NAV ===== */}
      {/* Desktop Nav */}
      <div className="relative z-[100] hidden md:flex justify-center pt-6">
        <PillNav
          items={[
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Experience", href: "#experience" },
            { label: "Tools", href: "#tools" },
            { label: "Project", href: "#project" },
          ]}
          activeHref="#home"
          baseColor="#000"
          pillColor="#000"
          hoveredPillColor="#7A1CAC"
          pillTextColor="#7A1CAC"
          hoveredPillTextColor="#000"
        />
      </div>

      {/* Mobile Nav */}
      <div className="relative z-[100] md:hidden flex justify-between items-center px-5 pt-5">
        <span className="text-white font-extrabold text-lg tracking-wide">
          Rizki<span className="text-[#C77DFF]">.</span>
        </span>
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#7A1CAC]/20 border border-[#7A1CAC]/40 text-[#C77DFF]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="relative z-[99] md:hidden mx-4 mt-2 rounded-2xl bg-black/90 border border-white/10 backdrop-blur-md overflow-hidden"
          >
            <ul className="flex flex-col py-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="w-full text-left px-6 py-3 text-sm text-gray-300 hover:text-[#C77DFF] hover:bg-[#7A1CAC]/10 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#7A1CAC] transition-all duration-300" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== SECTION 1 (HERO) ===== */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center"
      >
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h1 className="text-[40px] sm:text-[56px] md:text-[72px] font-extrabold">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <span className="inline-flex items-center text-[#C77DFF]">
                <span className="whitespace-nowrap leading-none flex items-center">
                  <RotatingText
                    texts={["HELLO, I'M", "HALO, SAYA", "HOLA, SOY"]}
                  />
                </span>
              </span>
              <span className="text-white leading-none">Rizki</span>
            </div>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto">
            Web Developer focused on crafting modern interfaces, scalable
            backend systems, and meaningful user experiences.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={() => setShowContact((v) => !v)}
              className="bg-[#7A1CAC] text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold tracking-wide hover:scale-105 transition cursor-pointer flex items-center gap-2"
            >
              CONTACT ME <MoveRight size={16} />
            </button>

            <button
              onClick={handleDownloadCV}
              className="border border-[#7A1CAC] px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base text-[#C77DFF] font-semibold hover:bg-[#7A1CAC]/10 transition cursor-pointer"
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
                className="flex justify-center items-center gap-6"
              >
                <a
                  href="https://wa.me/62821100737645"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <img
                    src={wa}
                    className="w-10 h-10 object-contain"
                    alt="WhatsApp"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/rizki-novian-0211nz"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <img
                    src={linkedin}
                    className="w-10 h-10 rounded object-cover"
                    alt="LinkedIn"
                  />
                </a>
                <a
                  href="https://www.instagram.com/rizkii_noviann/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <img
                    src={ig}
                    className="w-10 h-10 rounded object-cover"
                    alt="Instagram"
                  />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== SECTION 2 ABOUT ===== */}
      <section id="about" className="relative z-10 py-16 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Mobile Title */}
          <div className="md:hidden text-center mb-8">
            <ScrollFloat textClassName="text-4xl font-extrabold" type="title">
              About Me
            </ScrollFloat>
          </div>

          {/* Mobile Photo */}
          <div className="md:hidden flex justify-center mb-8">
            <div className="w-56 h-56 rounded-2xl overflow-hidden border-2 border-[#7A1CAC]/40 shadow-lg shadow-[#7A1CAC]/20">
              <img
                src={nop}
                alt="Rizki Novian"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-6">
              <div className="hidden md:block">
                <ScrollFloat
                  textClassName="text-4xl font-extrabold"
                  type="title"
                >
                  About Me
                </ScrollFloat>
              </div>

              <p className="text-white leading-relaxed">
                I am a graduate of IPB University with a GPA of 3.45, majoring
                in Software Engineering Technology. I have two years of
                experience as a Web Developer, mainly focusing on Front-End
                Development, where I build responsive and user-friendly web
                interfaces. I am also a certified Software Engineer under the
                national certification issued by Badan Nasional Sertifikasi
                Profesi (BNSP).
              </p>

              <p className="text-white leading-relaxed">
                I enjoy turning designs into clean and efficient code,
                continuously learning new web technologies, and working
                collaboratively in a team. Outside of coding, I like playing
                badminton to stay active and maintain a good work–life balance.
              </p>
            </div>

            {/* Tilted Card — desktop only */}
            <div className="hidden md:flex justify-center">
              <TiltedCard
                imageSrc={nop}
                containerHeight="420px"
                containerWidth="420px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION EXPERIENCE ===== */}
      <section
        id="experience"
        className="relative z-10 min-h-screen flex items-center py-12 md:py-20"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-12 w-full cursor-default">
          <ScrollFloat
            textClassName="text-4xl font-extrabold"
            align="center"
            type="title"
          >
            Experience
          </ScrollFloat>

          {expLoading ? (
            <p className="text-center text-gray-500 py-12">Memuat data...</p>
          ) : (
            <AnimatedList
              items={experienceItems}
              showGradients={false}
              displayScrollbar={false}
              enableArrowNavigation={false}
              className="!w-full"
              renderItem={(item, index) => (
                <div className="grid grid-cols-[56px_1fr] gap-6 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#7A1CAC] flex items-center justify-center text-xs font-bold text-white shrink-0 z-10">
                      {item.year}
                    </div>
                  </div>
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
          )}
        </div>
      </section>

      {/* ===== SECTION TOOLS ===== */}
      <section id="tools" className="relative z-10 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center space-y-10 md:space-y-16">
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
      <section id="project" className="relative z-10 py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-20">
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

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-[#0E0E10] border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/10 transition"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(project.tags || []).map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full border border-[#7A1CAC] text-[#C77DFF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4">
                    <button
                      className="w-full bg-[#7A1CAC] text-black py-2 rounded-full font-semibold hover:scale-[1.02] transition disabled:opacity-40 cursor-pointer"
                      onClick={() =>
                        project.link &&
                        window.open(
                          project.link,
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                      disabled={!project.link}
                    >
                      View Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 overflow-hidden border-t border-white/10">
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
            <div className="space-y-3">
              <h3 className="text-2xl font-extrabold text-white">
                Rizki Novian
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Web Developer focused on crafting modern interfaces &amp;
                scalable backend systems.
              </p>
              <span className="inline-block text-xs border border-[#7A1CAC] text-[#C77DFF] rounded-full px-3 py-1">
                Full Stack Enthusiast
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Navigate
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Home", href: "#home" },
                  { label: "About", href: "#about" },
                  { label: "Experience", href: "#experience" },
                  { label: "Tools & Stack", href: "#tools" },
                  { label: "Projects", href: "#project" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-[#C77DFF] transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#7A1CAC] transition-all duration-300" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Get In Touch
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/62821100737645"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={wa}
                    className="w-8 h-8 object-contain"
                    alt="WhatsApp"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-[#C77DFF] transition-colors">
                    WhatsApp
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/rizki-novian-0211nz"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={linkedin}
                    className="w-8 h-8 rounded object-cover"
                    alt="LinkedIn"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-[#C77DFF] transition-colors">
                    LinkedIn
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/rizkii_noviann/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={ig}
                    className="w-8 h-8 rounded object-cover"
                    alt="Instagram"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-[#C77DFF] transition-colors">
                    Instagram
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Rizki Novian. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ===== SCROLL TO TOP ===== */}
      {/* Muncul hanya setelah melewati hero section, hilang saat di atas */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-50 w-9 h-9 md:w-12 md:h-12 bg-[#7A1CAC] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 md:w-5 md:h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
