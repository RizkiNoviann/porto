import LiquidEther from "../components/LiquidEther";
import TextType from "../components/TextType";
import TiltedCard from "../components/TiltedCard";
import StaggeredMenu from "../components/StaggeredMenu";

export default function Home() {
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "/about" },
    { label: "Services", ariaLabel: "View our services", link: "/services" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div style={{ height: "100vh", background: "#1a1a1a" }}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={["#B19EEF", "#5227FF"]}
          accentColor="#ff6b6b"
          onMenuOpen={() => console.log("Menu opened")}
          onMenuClose={() => console.log("Menu closed")}
        />
      </div>
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={["#2E073F", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 h-full flex items-center">
        <div className="mx-auto w-full max-w-6xl px-12">
          <div className="grid grid-cols-2 items-center gap-x-28 text-white">
            {/* LEFT TEXT */}
            <div className="space-y-6">
              {/* TITLE */}
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

              {/* DESCRIPTION */}
              <p className="text-gray-300 max-w-md">
                Nice to meet you. I am a Software Engineering Technology
                graduate from Institut Pertanian Bogor. I have a strong interest
                in front-end development and UI/UX design.
              </p>

              {/* BUTTONS */}
              <div className="flex gap-4 pt-4">
                <button className="rounded-full bg-white text-black px-6 py-2 font-medium">
                  Get in Touch
                </button>
                <button className="rounded-full border border-white px-6 py-2">
                  View All Works
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-end">
              <TiltedCard
                imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
                containerHeight="340px"
                containerWidth="340px"
                imageHeight="340px"
                imageWidth="340px"
                rotateAmplitude={12}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
