/*
 * ============================================
 *  PORTFOLIO CONFIGURATION FILE
 *  Edit this file to customize your portfolio!
 * ============================================
 */

const CONFIG = {

  // ─── Personal Info ───────────────────────────
  personal: {
    firstName: "Nithis",
    lastName: "Varun K",
    taglines: [
      "Passionate about Problem Solving",
      "Learning New Technologies",
    ],
    avatar: "", // path to your photo, e.g. "assets/avatar.jpg"
    resumeLink: "./assets/Nithis_Varun_Resume.pdf", // fixed extension
  },

  // ─── About Section ──────────────────────────
  about: {
    heading: "About Me",
    description: `Highly motivated and detail-focused individual with a B.E in Artificial Intelligence and Machine Learning. Skilled in programming, problem solving, and building efficient solutions. Committed to delivering quality results, learning new technologies, and contributing meaningfully to organizational goals.`,
    highlights: [
      { label: "Degree", value: "B.E CSE (AIML)" },
      { label: "Location", value: "Coimbatore" },
      { label: "Email", value: "nithisvarun1408@gmail.com" },
      { label: "Phone", value: "7538890810" },
    ],
  },

  // ─── Skills ─────────────────────────────────
  skills: [
    { name: "Python", icon: "fab fa-python", category: "language" },
    { name: "Java", icon: "fab fa-java", category: "language" },
    { name: "MySQL", icon: "fas fa-database", category: "database" },
    { name: "PostgreSQL", icon: "fas fa-database", category: "database" },
    { name: "HTML5/CSS3", icon: "fab fa-html5", category: "frontend" },
    { name: "AWS", icon: "fab fa-aws", category: "cloud" },
    { name: "Git & GitHub", icon: "fab fa-github", category: "tools" },
  ],

  // ─── Projects ───────────────────────────────
  projects: [
    {
      title: "Smart Medicine Remainder System",
      description:
        "Developed an intelligent healthcare assistant application for medicine scheduling. Implemented prescription tracking, voice-enabled reminders, and an AI-powered chatbot for instant healthcare guidance. Designed a secure and responsive dashboard with authentication.",
      techStack: ["Frontend", "Backend", "AI Chatbot", "Authentication"],
      liveLink: "#",
      repoLink: "#",
      image: "", // optional project screenshot
      featured: true,
    },
    {
      title: "Bus Booking System",
      description: "Developed a comprehensive bus booking application for all Tamil Nadu districts, including inter-state routes to Bengaluru and Hyderabad. Integrated real-time seat selection, location swapping, and secure payment processing with Razorpay.",
      techStack: ["Flask", "SQLite", "Razorpay", "JavaScript"],
      liveLink: "#",
      repoLink: "#",
      image: "",
      featured: true,
    }
  ],

  // ─── Hackathons ─────────────────────────────
  hackathons: [
    {
      title: "SMART INDIA HACKATHON",
      project: "Blockchain-based Supply Chain Tracking",
      description: "Proposed a solution leveraging distributed ledger technology for transparency, traceability, and fraud prevention in supply chains. Demonstrated innovation, technical design, and teamwork in presenting the idea.",
    }
  ],

  // ─── Certifications ─────────────────────────
  certifications: [
    {
      title: "Introduction to Python",
      issuer: "Datacamp",
      date: "",
      icon: "fab fa-python",
      link: "#",
    },
    {
      title: "Claude 101 - AI Basics",
      issuer: "Anthropic",
      date: "",
      icon: "fas fa-robot",
      link: "#",
    },
  ],

  // ─── Experience / Education Timeline ────────
  timeline: [
    {
      type: "education",
      title: "B.E CSE(AIML)",
      organization: "RATHINAM TECHNICAL CAMPUS",
      period: "2023 - Present",
      description: "CGPA: 8.14 | Coimbatore",
    },
    {
      type: "education",
      title: "HSC",
      organization: "AKSHAYA ACADEMY SENIOR SECONDARY SCHOOL",
      period: "2022 - 2023",
      description: "81% | Dindigul",
    }
  ],

  // ─── Contact & Social Links ─────────────────
  social: {
    phone: "7538890810",
    email: "nithisvarun1408@gmail.com",
    linkedin: "https://www.linkedin.com/in/nithis-varun-k-771261296/",
    github: "https://github.com/Nithis1414",
    twitter: "",  // leave empty to hide
    website: "",
  },

  // ─── Theme / Customization ──────────────────
  theme: {
    primaryColor: "#6C63FF",   // Main accent (purple)
    secondaryColor: "#00D4AA", // Secondary accent (teal)
    bgDark: "#0a0a1a",         // Dark background
    bgCard: "rgba(255,255,255,0.04)", // Card background
    textPrimary: "#EAEAEA",
    textSecondary: "#A0A0B0",
    fontFamily: "'Inter', sans-serif",
    enableParticles: true,
    enableTypingEffect: true,
  },
};
