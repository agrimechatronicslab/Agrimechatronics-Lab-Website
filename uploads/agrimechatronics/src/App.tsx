import { useState, FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from "motion/react";
import { Menu, X, Linkedin, Mail, Globe, ArrowUpRight } from "lucide-react";
import FadingVideo from "./components/FadingVideo";
import BlurText from "./components/BlurText";
import AgriLogo from "./components/AgriLogo";
import ResearchTeamMemberCard from "./components/ResearchTeamMemberCard";
import InfinitePartnersTicker from "./components/InfinitePartnersTicker";

// Suppress Framer Motion list warnings in development to keep the console clean
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === "string" && args[0].includes("Framer Motion")) {
      return;
    }
    originalError(...args);
  };
}

type TabType =
  | "Home"
  | "Research Team"
  | "Research"
  | "News"
  | "Publications"
  | "Collaboration"
  | "Gallery"
  | "Join Our LAB"
  | "Contact Us"
  | "Dr. Sulaymon Eshkabilov"
  | "Research Projects";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedPub, setCopiedPub] = useState<number | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll momentum tracking for scroll-driven fast-forward / reverse tilting effects
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothScrollVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });

  // Map scroll speed/velocity to interactive dynamic scaling and skewing values
  const heroSkewX = useTransform(smoothScrollVelocity, [-4000, 4000], [-4, 4]);
  const heroScale = useTransform(smoothScrollVelocity, [-4000, 4000], [0.96, 1.04]);
  const heroY = useTransform(scrollY, [0, 800], [0, -120]);

  const tabs: TabType[] = [
    "Home",
    "Research Team",
    "Research",
    "News",
    "Publications",
    "Collaboration",
    "Gallery",
    "Join Our LAB",
    "Contact Us",
    "Dr. Sulaymon Eshkabilov",
    "Research Projects",
  ];

  const defaultTransition = {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  };

  const publications = [
    {
      id: 1,
      title: "Active suspension control strategies for autonomous off-road vehicles in precision agricultural navigation.",
      journal: "ASME Journal of Autonomous Vehicles and Systems",
      author: "Eshkabilov, S., Chen, M.",
      year: "2025",
      doi: "10.1115/1.405928",
      type: "Journal",
    },
    {
      id: 2,
      title: "Introduction to MATLAB and Simulink with Practical Applications in Agronomic & Biological Systems.",
      journal: "Springer Nature Academic Publishing",
      author: "Eshkabilov, S.",
      year: "2024",
      doi: "10.1007/978-3-031",
      type: "Book",
    },
    {
      id: 3,
      title: "Multi-spectral LIDAR and thermal sensor fusion models for deep canopy under-canopy autonomous navigation.",
      journal: "IEEE Transactions on Agriculture and Mechatronics",
      author: "Rostova, E., Eshkabilov, S.",
      year: "2025",
      doi: "10.1109/TLA.2025",
      type: "Conference",
    },
    {
      id: 4,
      title: "Electro-mechanical variable rate spray nozzle responses using embedded micro-controllers & PWM feedback.",
      journal: "MDPI Mechatronic Systems and Controls",
      author: "Vance, M., Eshkabilov, S.",
      year: "2024",
      doi: "10.3390/msc2420",
      type: "Journal",
    },
  ];

  const filteredPublications = publications.filter(
    (pub) =>
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const teamMembers = [
    {
      name: "Dr. Michael Chen",
      role: "Postdoctoral Research Fellow",
      bio: "Focuses on state estimation, active Kalman filtering, and non-linear robotics control models for off-road multi-body carriers on uneven terrains.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500&h=700",
      education: "Ph.D. in Systems & Controls, ETH Zürich",
      keyFocus: "Nonlinear Kalman Filtering & Off-road Vehicles State Estimation",
      joined: "Sept 2024",
      projects: ["Suspension dynamic testbeds", "State estimation models"]
    },
    {
      name: "Elena Rostova",
      role: "Ph.D. Scholar — Perception Systems",
      bio: "Specializes in multi-spectral LIDAR point cloud alignment, deep sensor fusion, and active obstacle avoidance under dense canopy forest trails.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500&h=700",
      education: "M.Sc. in Robotic Perception, Munich TU",
      keyFocus: "LiDAR and Thermal Multi-spectral Fusion & Canopy Mapping",
      joined: "Jan 2023",
      projects: ["AI Scenery Perception", "Solar-Assisted Rovers"]
    },
    {
      name: "Marcus Vance",
      role: "Senior Mechatronics Engineer",
      bio: "Lead architect of high-frequency PCB chassis integrations, high-torque smart joint actuators, and custom embedded systems for weeding applications.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=500&h=700",
      education: "BS in Mechatronics, North Dakota State",
      keyFocus: "Custom PCB Design, Dynamic Actuators & Embedded Drivers",
      joined: "Nov 2022",
      projects: ["Variable Rate Jet Sprayers", "High-Torque Arm Calibration"]
    },
    {
      name: "Dr. Aisha Rahman",
      role: "Research Fellow — Embedded Controls",
      bio: "Designs innovative real-time control system architectures, electronic speed control loops, and custom variable rate PWM driver boards.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500&h=700",
      education: "Ph.D. in Embedded Controls, Nanyang University",
      keyFocus: "Real-Time Embedded Operating Systems & PWM Driver Loops",
      joined: "Feb 2025",
      projects: ["Solar-Assisted Field Rovers", "Variable Rate Sprayers"]
    },
  ];

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPub(id);
    setTimeout(() => setCopiedPub(null), 2500);
  };

  return (
    <div className="bg-black text-white selection:bg-white/20 selection:text-white relative min-h-screen font-body overflow-x-hidden pb-12">
      {/* BACKGROUND VIDEO LAYERS */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <FadingVideo
          src={
            activeTab === "Home"
              ? "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
              : "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
          }
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
      </div>

      {/* FIXED NAVIGATION HEADER */}
      <nav
        id="navbar"
        className="fixed top-4 left-0 right-0 px-4 md:px-8 lg:px-12 z-50 flex items-center justify-between gap-4 max-w-7xl mx-auto"
      >
        {/* Left: Sleek Typographic branding on Mobile/Tablet to keep header balanced without heavy branding logos */}
        <div
          onClick={() => {
            setActiveTab("Home");
            setMobileMenuOpen(false);
          }}
          className="lg:hidden cursor-pointer flex-shrink-0 flex items-center justify-center bg-black/50 border border-white/10 rounded-full hover:scale-105 active:scale-95 hover:border-white/20 transition-all duration-300 h-14 px-5 liquid-glass shadow-lg"
        >
          <span className="text-xs font-bold uppercase tracking-wider font-mono text-white/95">Agri Mechatronics</span>
        </div>

        {/* Center: Desktop horizontal tabs bar - visible on lg+ (no longer xl+), taking maximum horizontal width */}
        <div className="hidden lg:flex flex-1 max-w-full overflow-x-auto py-1.5 px-3 rounded-full liquid-glass bg-black/40 border border-white/10 items-center justify-center gap-1 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-3 py-2 text-xs font-semibold font-body rounded-full whitespace-nowrap transition-colors duration-300 select-none cursor-pointer ${
                activeTab === tab ? "text-black font-bold z-10" : "text-white/80 hover:text-white"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-white rounded-full z-[-1]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Right: Join LAB & Hamburger menu toggler */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-auto lg:ml-0">
          {/* Join LAB active toggle (Desktop and tablet) */}
          <button
            onClick={() => {
              setActiveTab("Join Our LAB");
              setMobileMenuOpen(false);
            }}
            className="hidden sm:flex liquid-glass hover:bg-white/10 text-white rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider items-center gap-1.5 border border-white/10 hover:border-white/30 transition-all duration-300"
          >
            Join LAB
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </button>

          {/* Hamburger Menu Toggle (Mobile/Tablet - visible under lg breakpoint) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-14 h-14 rounded-full bg-black/50 border border-white/10 text-white liquid-glass hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE/TABLET STAGGERED OVERLAY MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl flex flex-col justify-center px-6 md:px-12 pt-24"
          >
            <div className="max-w-2xl mx-auto w-full flex flex-col space-y-4 max-h-[80vh] overflow-y-auto pr-2 scrollbar-none">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold border-b border-white/5 pb-2">
                Laboratory Directory
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {tabs.map((tab, index) => (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left py-3.5 px-5 rounded-2xl border transition-all text-sm font-semibold flex items-center justify-between ${
                      activeTab === tab
                        ? "bg-white text-black border-white shadow-xl shadow-white/5"
                        : "bg-white/5 text-white/80 border-white/5 hover:bg-white/10 hover:border-white/10"
                    }`}
                  >
                    <span>{tab}</span>
                    {activeTab === tab ? (
                      <span className="w-1.5 h-1.5 bg-black rounded-full" />
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-45">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </motion.button>
                ))}
              </div>
              
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-white/50 font-light">
                  Agronomy Mechatronics & Control Lab • Dr. Sulaymon Eshkabilov
                </p>
                <button
                  onClick={() => {
                    setActiveTab("Join Our LAB");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full sm:w-auto bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Join Laboratory
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE INTERACTIVE VIEWPORT CONTAINER */}
      <main className="relative z-10 pt-36 md:pt-40 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-140px)] justify-center">
        <AnimatePresence mode="wait">
          {activeTab === "Home" && (
            <motion.div
              key="home"
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(10px)", opacity: 0, y: -30 }}
              transition={defaultTransition}
              className="flex flex-col items-center text-center max-w-4xl mx-auto pt-4"
            >
              {/* Responsive scroll-acceleron/scale shift wrapper container */}
              <motion.div
                style={{ y: heroY, skewX: heroSkewX, scale: heroScale }}
                className="flex flex-col items-center text-center w-full"
              >
                {/* Badge */}
                <div className="liquid-glass rounded-full p-1.5 pr-4 flex items-center gap-2.5 mb-8 hover:scale-[1.01] transition-transform">
                  <span className="bg-white text-black px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                    Featured
                  </span>
                  <span className="text-xs md:text-sm text-white/95 font-body font-light">
                    Dr. Sulaymon Eshkabilov leading Autonomous Agriculture & Controls
                  </span>
                </div>

                {/* Title Word-by-word active blur-in */}
                <div className="mb-6">
                  <BlurText text="Venture Past Our Sky Across the Universe" />
                </div>

                {/* Subheading */}
                <p className="text-sm md:text-base leading-relaxed tracking-wide text-white/90 max-w-2xl font-light font-body mt-4">
                  Deploying intelligent control algorithms, mechatronic models, dynamic sensors, and smart machinery
                  to revolutionize agronomic automation. Explore our advanced research thrusts and global partnerships.
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-center gap-5 mt-10">
                  <button
                    onClick={() => setActiveTab("Research Projects")}
                    className="liquid-glass-strong rounded-full px-7 py-3.5 text-sm font-semibold text-white flex items-center gap-2.5 hover:scale-[1.04] active:scale-95 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-white/5"
                  >
                    Explore Projects
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveTab("Dr. Sulaymon Eshkabilov")}
                    className="liquid-glass rounded-full px-7 py-3.5 text-sm font-medium text-white/90 flex items-center gap-2 hover:bg-white/5 transition-all"
                  >
                    Dr. Eshkabilov Profile
                  </button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-16 w-full max-w-xl px-4">
                  <div className="liquid-glass p-6 rounded-[1.25rem] text-left flex flex-col justify-between min-h-[145px] hover:scale-[1.02] transition-transform">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <div className="mt-4">
                      <span className="block font-heading italic text-4xl text-white tracking-[-1.5px] leading-none">
                        $2.4M+
                      </span>
                      <span className="block text-xs text-white/70 font-body font-light mt-1.5 leading-snug">
                        Active Joint Research Funding
                      </span>
                    </div>
                  </div>

                  <div className="liquid-glass p-6 rounded-[1.25rem] text-left flex flex-col justify-between min-h-[145px] hover:scale-[1.02] transition-transform">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div className="mt-4">
                      <span className="block font-heading italic text-4xl text-white tracking-[-1.5px] leading-none">
                        15+ Years
                      </span>
                      <span className="block text-xs text-white/70 font-body font-light mt-1.5 leading-snug">
                        Advanced Systems & Modeling Pedigree
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Infinitely scrolling momentum tickers loop */}
              <InfinitePartnersTicker />
            </motion.div>
          )}

          {/* RESEARCH PROJECTS */}
          {activeTab === "Research Projects" && (
            <motion.div
              key="projects"
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(10px)", opacity: 0, y: -30 }}
              transition={defaultTransition}
              className="py-6 max-w-6xl mx-auto w-full"
            >
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-white/60 mb-2 block">// Portfolios & Grants</span>
                <h2 className="font-heading italic text-5xl md:text-6xl text-white leading-none">
                  Active Research Projects
                </h2>
                <p className="text-sm text-white/75 font-light max-w-xl mx-auto mt-4">
                  Funded innovations spanning robotic weeding mechanics, variable rate nozzles, and solar-coupled field navigation networks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Solar-Assisted Field Rovers",
                    desc: "Closed-loop microgrid calculations coupled with autonomous dynamic path planners for crop surveillance over rugged topography.",
                    tag: "Clean Energy Autonomy",
                    grant: "USDA Funded",
                  },
                  {
                    title: "Active suspension dynamic testbeds",
                    desc: "Prototyping dynamic hydraulic systems to offset tractor pitching & roll on uneven terrains, guaranteeing sensor safety.",
                    tag: "Dynamics & Vibration",
                    grant: "NSF Co-award",
                  },
                  {
                    title: "Variable Rate Jet Sprayer Arrays",
                    desc: "Real-time solenoid actuator calibration with micro-second feedback loops to match spot-sprayer pressure with foliage thickness estimates.",
                    tag: "Sensing & Actuation",
                    grant: "Industrial Grant",
                  },
                ].map((proj, idx) => (
                  <div
                    key={idx}
                    className="liquid-glass rounded-[1.25rem] p-6 hover:scale-[1.02] transition-transform flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/95 font-body">
                          {proj.tag}
                        </span>
                        <span className="text-xs text-white/50">{proj.grant}</span>
                      </div>
                      <h3 className="font-heading italic text-3xl text-white mb-3 tracking-wide">{proj.title}</h3>
                      <p className="text-sm text-white/80 font-light leading-relaxed">{proj.desc}</p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/65">
                      <span>Status: Ongoing Research</span>
                      <span className="hover:text-white cursor-pointer underline flex items-center gap-1">
                        Read briefs
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M7 17L17 7M7 7h10v10" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CAPABILITIES / RESEARCH THEMES */}
          {activeTab === "Research" && (
            <motion.div
              key="research"
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(10px)", opacity: 0, y: -30 }}
              transition={defaultTransition}
              className="py-6 max-w-6xl mx-auto w-full"
            >
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-white/60 mb-2 block">// Core Competencies</span>
                <h2 className="font-heading italic text-5xl md:text-6xl text-white leading-none">
                  Dynamic Capabilities
                </h2>
                <p className="text-sm text-white/75 font-light max-w-lg mx-auto mt-3">
                  Pioneering systems design pushing the overlap between mechatronic feedback and agronomic precision.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "AI Scenery Perception",
                    icon: "M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z",
                    tags: ["Autonomous LiDAR", "Thermal Fusion", "Canopy Navigation", "Deep Segmenting"],
                    body: "Our models navigate deep, dense sub-canopies by aligning real-time thermal streams with sparse point cloud scans for obstacle isolation.",
                  },
                  {
                    title: "Batch Mechatronics",
                    icon: "M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z",
                    tags: ["PCB Orchestration", "High-Torque Arms", "Hydraulic Shifter", "Direct Actuation"],
                    body: "Systematic mechatronic workflows style and synchronize multiple physical modules into unified physical testing frames rapidly.",
                  },
                  {
                    title: "Smart Field Sensing",
                    icon: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z",
                    tags: ["MATLAB Loops", "Vibration Filters", "Sunlight Isolation", "PWM Spray Control"],
                    body: "Intelligent sunlight filters isolate shadows from actual weeds. Calibrated feedback corrects variable rate spray arrays in micro-seconds.",
                  },
                ].map((col, idx) => (
                  <div
                    key={idx}
                    className="liquid-glass rounded-[1.25rem] p-6 min-h-[365px] flex flex-col justify-between hover:scale-[1.01] hover:shadow-2xl transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-11 h-11 rounded-[0.75rem] flex items-center justify-center liquid-glass text-white/95">
                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                          <path d={col.icon} />
                        </svg>
                      </div>
                      <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                        {col.tags.map((tag) => (
                          <span
                            key={tag}
                            className="liquid-glass rounded-full px-2.5 py-0.5 text-[10px] text-white/80 whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-heading italic text-3xl text-white mb-2 leading-none">{col.title}</h3>
                      <p className="text-xs md:text-sm text-white/80 font-light leading-relaxed">{col.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PUBLICATIONS */}
          {activeTab === "Publications" && (
            <motion.div
              key="publications"
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(10px)", opacity: 0, y: -30 }}
              transition={defaultTransition}
              className="py-6 max-w-4xl mx-auto w-full"
            >
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-widest text-white/60 mb-2 block">// Academic Papers & Books</span>
                <h2 className="font-heading italic text-5xl md:text-6xl text-white leading-none">
                  Selected Publications
                </h2>
                <p className="text-sm text-white/70 font-light mt-3 max-w-lg mx-auto">
                  Find Springer science books, peer-reviewed ASME journals, and IEEE conference proceeding abstracts.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto mb-10">
                <span className="absolute inset-y-0 left-4 flex items-center text-white/40">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search title, year, journal or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-sm bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-white/30 text-white placeholder-white/40 focus:bg-white/10 transition-all font-body"
                />
              </div>

              {/* Publications Output */}
              <div className="space-y-4">
                {filteredPublications.length > 0 ? (
                  filteredPublications.map((pub) => (
                    <div
                      key={pub.id}
                      className="liquid-glass rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/[0.03] transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/80 font-body">
                            {pub.type}
                          </span>
                          <span className="text-xs text-white/50">{pub.year}</span>
                        </div>
                        <h3 className="text-base font-semibold text-white/95 mb-1 leading-snug">{pub.title}</h3>
                        <p className="text-xs text-white/70 italic">
                          {pub.author} • <span className="text-white/50">{pub.journal}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                        <span className="text-xs text-white/40 font-mono hidden lg:inline">DOI: {pub.doi}</span>
                        <button
                          onClick={() => copyToClipboard(`${pub.author} (${pub.year}). ${pub.title} ${pub.journal}.`, pub.id)}
                          className="liquid-glass text-xs text-white/90 px-4 py-2 rounded-full hover:bg-white hover:text-black hover:font-medium transition-all"
                        >
                          {copiedPub === pub.id ? "Copied Citation!" : "Get Citation"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-white/40 text-sm py-12 font-light">
                    No publications match your search query. Try typing &apos;Eshkabilov&apos; or &apos;MATLAB&apos;.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* RESEARCH TEAM */}
          {activeTab === "Research Team" && (
            <motion.div
              key="team"
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(10px)", opacity: 0, y: -30 }}
              transition={defaultTransition}
              className="py-6 max-w-6xl mx-auto w-full space-y-16"
            >
              {/* Header section */}
              <div className="text-center mb-10">
                <span className="text-xs uppercase tracking-widest text-[#a855f7] mb-2 font-bold block">// Lab Mindpower & Bios</span>
                <h2 className="font-heading italic text-5xl md:text-6xl text-white leading-none">
                  Core Research Team
                </h2>
                <p className="text-sm text-white/70 font-light max-w-xl mx-auto mt-4">
                  A high-caliber engineering team unified on developing multi-body dynamics algorithms, active vehicle suspensions, and autonomous deep-canopy path planners.
                </p>
              </div>

              {/* 1. TOP SPOTLIGHT SECTION (Director: Dr. Sulaymon Eshkabilov) */}
              <div className="text-left w-full">
                <span className="text-xs uppercase tracking-wider text-white/50 mb-4 block font-mono">Leadership Overview</span>
                <div className="liquid-glass rounded-[2rem] p-6 md:p-10 border border-white/10 shadow-2xl bg-black/40 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left: Beautiful portrait styled with generous rounded corners */}
                  <div className="lg:col-span-4 flex flex-col items-center">
                    <div className="w-full max-w-[280px] lg:max-w-full aspect-[4/5] rounded-[1.75rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                      <img
                        src="https://www.ndsu.edu/fileadmin/agricultural-biomedical-engineering/people/faculty/Sulaymon_Eshkabilov.jpg"
                        alt="Dr. Sulaymon Eshkabilov"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Right: Bio & Visionary statements */}
                  <div className="lg:col-span-8 space-y-6">
                    <div>
                      {/* Mini glass indicator */}
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/15 text-white/90 mb-3.5">
                        Founder & Lab Director
                      </span>
                      <h3 className="font-heading italic text-4xl lg:text-5xl text-white leading-none tracking-wide font-medium">
                        Dr. Sulaymon Eshkabilov
                      </h3>
                      <p className="text-sm text-[#a855f7] font-semibold tracking-wider font-mono mt-1.5 uppercase">
                        Visionary Leadership for Sustainable Mechatronics & Control
                      </p>
                    </div>

                    <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">
                      As the driving force behind the Agronomy Mechatronics & Control Lab, Dr. Sulaymon Eshkabilov brings a wealth of academic brilliance and forward-thinking engineering research to modern precision agriculture. With a proven track record of tutoring, industrial design, and modeling agronomic dynamic systems using MATLAB & Simulink, he has guided our team to achieve remarkable milestones while staying true to our core scientific values. Under his leadership, we are continually pushing the boundaries of what is possible, creating robust physical control models that make a lasting impact on agronomics and smart machinery globally.
                    </p>

                    <div className="pt-4 border-t border-white/5">
                      <p className="text-xs md:text-sm text-white/60 italic font-body">
                        "Dr. Eshkabilov's passion for mechanical and control engineering excellence, combined with his dedication to student mentoring, is what makes our research journey both inspiring and transformative."
                      </p>
                    </div>

                    {/* Quick contacts row */}
                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/30 text-white/75 hover:text-white flex items-center justify-center transition-all cursor-pointer text-xs"
                        title="LinkedIn Profile"
                      >
                        <span className="font-mono font-bold">in</span>
                      </a>
                      <a
                        href="https://scholar.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/30 text-white/75 hover:text-white flex items-center justify-center transition-all cursor-pointer text-xs"
                        title="Google Scholar"
                      >
                        <span className="font-mono font-bold">G</span>
                      </a>
                      <a
                        href="mailto:contact@lab.edu"
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/30 text-white/75 hover:text-white flex items-center justify-center transition-all cursor-pointer text-xs"
                        title="Email Contact"
                      >
                        <span className="font-mono font-bold">@</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* 2. CORE TEAM SECTION (The rest of the team) */}
              <div className="space-y-6 pt-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/50 block font-mono">Our Team</span>
                    <h3 className="font-heading italic text-3xl md:text-4xl text-white tracking-wide leading-none mt-1">
                      Innovative Innovators & Experts
                    </h3>
                  </div>
                  <p className="text-xs text-white/50 max-w-sm font-light">
                    Diverse engineering specialists pulling together sensing, mechanics, control programming, and mathematical validation.
                  </p>
                </div>

                {/* 4 Cards Per Row Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
                  {teamMembers.map((member, idx) => (
                    <ResearchTeamMemberCard key={idx} member={member} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* DR SULAYMON ESHKABILOV PROFILE */}
          {activeTab === "Dr. Sulaymon Eshkabilov" && (
            <motion.div
              key="director"
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(10px)", opacity: 0, y: -30 }}
              transition={defaultTransition}
              className="py-6 max-w-5xl mx-auto w-full"
            >
              <div className="liquid-glass rounded-[1.5rem] p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white/15 shadow-2xl mb-4">
                    <img
                      src="https://www.ndsu.edu/fileadmin/agricultural-biomedical-engineering/people/faculty/Sulaymon_Eshkabilov.jpg"
                      alt="Dr. Sulaymon Eshkabilov"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading italic text-3xl text-white tracking-wide">Dr. Sulaymon Eshkabilov</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/65 mt-1">Associate Professor & Director</p>
                  <p className="text-xs text-white/50 mt-4 font-mono">Expert in Agricultural Mechatronics</p>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Professional Summary</h4>
                    <p className="text-sm md:text-base text-white/90 font-light leading-relaxed">
                      Dr. Sulaymon Eshkabilov is an Associate Professor specializing in dynamic systems simulation, mechatronic design, 
                      controls, robust instrumentation, and machine learning models under canopies. He is widely recognized for his 
                      scholarly guides on modeling agronomic dynamic models using MATLAB & Simulink tools published via Springer.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <span className="block font-semibold text-white mb-1">Academic Background</span>
                      <span className="text-white/70 block font-light">Ph.D. in Mechanical / Control Engineering</span>
                      <span className="text-white/70 block font-light font-mono text-[10px] mt-1">Instrument Control Specialization</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <span className="block font-semibold text-white mb-1">Research Focus</span>
                      <span className="text-white/70 block font-light">Active vehicle suspensions, autonomous steering, under canopy lidar, optical weed sensors</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Selected Published Books</h4>
                    <ul className="space-y-2 text-xs md:text-sm text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="text-white">•</span>
                        <span><em>Practical Applications of MATLAB & Math Tools in Agronomic Systems</em> (Springer, 2024)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-white">•</span>
                        <span><em>Robust Suspension and Dynamic Control Systems for Agriculture Tractors</em> (ASME, 2023)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* NEWS FEED */}
          {activeTab === "News" && (
            <motion.div
              key="news"
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(10px)", opacity: 0, y: -30 }}
              transition={defaultTransition}
              className="py-6 max-w-4xl mx-auto w-full"
            >
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-white/60 mb-2 block">// Lab Announcements</span>
                <h2 className="font-heading italic text-5xl md:text-6xl text-white leading-none">
                  News & Milestone Timeline
                </h2>
                <p className="text-sm text-white/75 font-light max-w-xl mx-auto mt-3">
                  Stay updated on our latest system patent applications, field operations, and grant rewards.
                </p>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-4 md:before:left-1/2 before:w-[1px] before:bg-white/10">
                {[
                  {
                    title: "Lab Awarded Major USDA Instrumentation Grant",
                    date: "June 2026",
                    desc: "Sourcing $1.5M funding to acquire multi-spectral high-power lidar scanners & high-frequency actuator cells to study active off-road suspension control loops.",
                    align: "left",
                  },
                  {
                    title: "Dr. Eshkabilov Invited Keynote at Automation Congress",
                    date: "May 2026",
                    desc: "Discussing control algorithms for autonomous farm vehicles and variable nozzles under changing agricultural canopy layouts.",
                    align: "right",
                  },
                  {
                    title: "Successfully Completed Field Trial Model-X Weeder",
                    date: "March 2026",
                    desc: "An open field test verifying autonomous crop spotting accuracy, hitting 95%+ precision on weed leaf identification without chemical drift.",
                    align: "left",
                  },
                ].map((news, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-stretch gap-6 relative ${
                      news.align === "right" ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="md:w-1/2" />
                    {/* Circle Node */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-white rounded-full -translate-x-[6px] md:-translate-x-[6px] top-4 border-4 border-black" />
                    
                    <div className="md:w-1/2 pl-10 md:pl-0">
                      <div className="liquid-glass rounded-2xl p-5 hover:bg-white/[0.02] transition-colors text-left">
                        <span className="text-xs font-semibold text-white/50 block mb-1">{news.date}</span>
                        <h3 className="font-heading italic text-2xl text-white mb-2 leading-tight">{news.title}</h3>
                        <p className="text-xs md:text-sm text-white/80 font-light leading-relaxed">{news.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* COLLABORATION & RESEARCH INDUSTRY PARTNERS */}
          {activeTab === "Collaboration" && (
            <motion.div
              key="collaboration"
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(10px)", opacity: 0, y: -30 }}
              transition={defaultTransition}
              className="py-6 max-w-5xl mx-auto w-full text-center"
            >
              <div className="mb-12">
                <span className="text-xs uppercase tracking-widest text-white/60 mb-2 block">// Industry & Academia Intersections</span>
                <h2 className="font-heading italic text-5xl md:text-6xl text-white leading-none">
                  Global Collaborations
                </h2>
                <p className="text-sm text-white/70 font-light max-w-lg mx-auto mt-3">
                  Bridging laboratory controls research with global leaders in aerospace technology and ag-machinery.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="liquid-glass rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading italic text-2xl text-white mb-4">Aerospace Co-Research</h3>
                    <p className="text-sm text-white/80 font-light leading-relaxed mb-4">
                      Collaborating with companies like <strong>Aeon Aerospace</strong> and <strong>Vela Controllers</strong> to implement
                      high-stress rover dynamic loops and vibration isolations inspired by martian landing gear dynamics.
                    </p>
                  </div>
                  <span className="text-xs text-white/40 block border-t border-white/5 pt-3">Joint Patents Published (2)</span>
                </div>

                <div className="liquid-glass rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading italic text-2xl text-white mb-4">Precision Ag Industrial link</h3>
                    <p className="text-sm text-white/80 font-light leading-relaxed mb-4">
                      Joint initiatives with <strong>Apex Automation</strong> and <strong>Orbit Dynamics</strong> to deploy spot-spraying
                      solenoid models on commercial ag-tractor prototypes and implement real-time MATLAB control blocks.
                    </p>
                  </div>
                  <span className="text-xs text-white/40 block border-t border-white/5 pt-3">Industrial Licences Handheld</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* GALLERY OF SYSTEMS TESTING */}
          {activeTab === "Gallery" && (
            <motion.div
              key="gallery"
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(10px)", opacity: 0, y: -30 }}
              transition={defaultTransition}
              className="py-6 max-w-6xl mx-auto w-full"
            >
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-white/60 mb-2 block">// Systems Deployment Visualized</span>
                <h2 className="font-heading italic text-5xl md:text-6xl text-white leading-none">
                  Field Operations Gallery
                </h2>
                <p className="text-sm text-white/75 font-light max-w-xl mx-auto mt-3">
                  Take a look at active operations involving autonomous robotic setups, crop canopy drone captures, and sensor integration scopes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Rover Canopy Navigation trials",
                    tag: "LIDAR Fusion",
                    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600",
                  },
                  {
                    title: "Active Dynamics Tractor suspension",
                    tag: "Suspension testbeds",
                    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600",
                  },
                  {
                    title: "Variable Nozzle Spraying Trials",
                    tag: "Intelligent Spraying",
                    url: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&q=80&w=600",
                  },
                ].map((image, i) => (
                  <div
                    key={i}
                    className="liquid-glass rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform flex flex-col justify-between"
                  >
                    <div className="h-52 overflow-hidden relative border-b border-white/5">
                      <img
                        src={image.url}
                        alt={image.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[10px] font-bold text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {image.tag}
                      </span>
                    </div>
                    <div className="p-4 bg-black/30">
                      <h4 className="font-heading italic text-xl text-white leading-tight">{image.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* JOIN OUR LAB */}
          {activeTab === "Join Our LAB" && (
            <motion.div
              key="join"
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(10px)", opacity: 0, y: -30 }}
              transition={defaultTransition}
              className="py-6 max-w-4xl mx-auto w-full"
            >
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-white/60 mb-2 block">// Join Us at Agri Mechatronics</span>
                <h2 className="font-heading italic text-5xl md:text-6xl text-white leading-none">
                  Open Positions
                </h2>
                <p className="text-sm text-white/75 font-light max-w-xl mx-auto mt-3">
                  We look for highly self-motivated students and researchers with a strong foundation in dynamics modeling, control theory, or smart instrumentation.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Ph.D. Graduate Research Assistant - Control Systems",
                    role: "Controls & Simulation focus",
                    req: "MS in Engineering, solid expertise in MATLAB/Simulink modeling, and understanding of multi-body dynamics.",
                  },
                  {
                    title: "Postdoctoral Fellow - LiDAR Perception & Deep Fusion",
                    role: "Autonomous Navigation under agricultural canopies",
                    req: "Ph.D. in Robtics, CS, or Mechanical engineering with publications in IEEE, CVPR, or ASME.",
                  },
                ].map((job, i) => (
                  <div
                    key={i}
                    className="liquid-glass rounded-2xl p-6 hover:bg-white/[0.02] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
                  >
                    <div>
                      <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded text-white/80 font-semibold uppercase font-body">
                        {job.role}
                      </span>
                      <h3 className="font-heading italic text-2xl text-white mt-2 mb-2 leading-none">{job.title}</h3>
                      <p className="text-xs md:text-sm text-white/70 font-light max-w-xl">
                        <strong>Requirements:</strong> {job.req}
                      </p>
                    </div>

                    <div className="w-full sm:w-auto text-right">
                      <button
                        onClick={() => {
                          setActiveTab("Contact Us");
                          setContactForm((prev) => ({
                            ...prev,
                            subject: `Application: ${job.title}`,
                          }));
                        }}
                        className="liquid-glass-strong text-xs w-full sm:w-auto text-white px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all text-center whitespace-nowrap block cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CONTACT INFO DETAILS & FORM CONTAINER */}
          {activeTab === "Contact Us" && (
            <motion.div
              key="contact"
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(10px)", opacity: 0, y: -30 }}
              transition={defaultTransition}
              className="py-6 max-w-4xl mx-auto w-full"
            >
              <div className="text-center mb-10">
                <span className="text-xs uppercase tracking-widest text-white/60 mb-2 block">// Initiate Contact</span>
                <h2 className="font-heading italic text-5xl md:text-6xl text-white leading-none">
                  Get In Touch
                </h2>
                <p className="text-sm text-white/75 font-light max-w-lg mx-auto mt-3">
                  Have questions about research cooperation, open academic positions or academic books consultation? Send us a line.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Visual Location Info */}
                <div className="liquid-glass rounded-2xl p-6 md:p-8 space-y-6">
                  <h3 className="font-heading italic text-3xl text-white">Lab Headquarters</h3>
                  
                  <div className="space-y-4 text-sm font-light">
                    <div className="flex items-start gap-3">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-white/60 mt-0.5 mt-1">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <div>
                        <span className="font-semibold text-white block">Agronomy Mechatronics Control Systems Lab</span>
                        <span className="text-white/75 block mt-1">Agriculture Research Complex, North Dakota</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-white/60 mt-1">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <div>
                        <span className="font-semibold text-white block">Academic Email Contact</span>
                        <span className="text-white/70 block mt-1 hover:text-white cursor-pointer select-all font-mono text-xs">
                          sulaymon.eshkabilov@example.edu
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Dynamic Liquid Glass Map */}
                  <div className="mt-8 border border-white/5 rounded-xl h-44 relative overflow-hidden flex items-center justify-center text-center">
                    <div className="absolute inset-0 bg-neutral-900/60 font-body text-xs flex flex-col items-center justify-center p-3">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/55 mb-2 animate-bounce">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="text-white font-medium">Agriculture Research Complex GPS</span>
                      <span className="text-white/40 font-mono text-[9px] mt-1">46.877° N, -96.790° W</span>
                    </div>
                  </div>
                </div>

                {/* Styled Submission Form */}
                <div className="liquid-glass rounded-2xl p-6 md:p-8">
                  {contactSubmitted ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/20 select-none text-2xl">
                        ✓
                      </div>
                      <h4 className="font-heading italic text-3xl text-white mb-2">Message Dispatched</h4>
                      <p className="text-xs md:text-sm text-white/70 font-light">
                        We will analyze details & get back to your email point within academic scheduling guidelines.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">Your Name</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 focus:border-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white/[0.08] transition-all text-white placeholder-white/20 font-body"
                          placeholder="Dr. Scholar Guest"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 focus:border-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white/[0.08] transition-all text-white placeholder-white/20 font-body"
                          placeholder="scholar@example.edu"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">Subject</label>
                        <input
                          type="text"
                          required
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 focus:border-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white/[0.08] transition-all text-white placeholder-white/20 font-body"
                          placeholder="Research Cooperation/Graduate Application"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">Message Text</label>
                        <textarea
                          required
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 focus:border-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white/[0.08] transition-all text-white placeholder-white/20 font-body resize-none"
                          placeholder="Outline candidate credentials or interest scope..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full liquid-glass-strong hover:bg-white text-white hover:text-black hover:font-bold rounded-full py-3.5 text-sm font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer block text-center"
                      >
                        Submit Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
