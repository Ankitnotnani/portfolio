import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, animate, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- EASY CONFIGURATION ---
const SITE_CONFIG = {
  profileImage: "/your-new-image-name.jpg", 
  resumeLink: "/certs/Ankit_Notnani_Resume.pdf"
};

// --- LOADING SCREEN ---
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(Math.round((currentStep / steps) * 100), 100));
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 600);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] bg-[#030409] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-[200px]">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#8b92b2] font-bold text-2xl tracking-widest"
        >
          AN.
        </motion.h1>
        
        <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#5b6cd9] via-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
        
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/40 text-xs font-mono tracking-widest"
        >
          {progress}
        </motion.span>
      </div>
    </motion.div>
  );
};

// --- REUSABLE COMPONENTS ---
const FadeIn = ({ children, delay = 0, y = 30, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const AnimatedText = ({ text, className = "" }: { text: string, className?: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start 0.9', 'end 0.4'] });
  const words = text.split(" ");
  
  return (
    <p ref={container} className={className + " flex flex-wrap gap-x-[0.4em] gap-y-2"}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const color = useTransform(scrollYProgress, [start, end], ["rgba(255,255,255,0.2)", "rgba(255,255,255,1)"]);
        return <motion.span key={i} style={{ color }}>{word}</motion.span>;
      })}
    </p>
  );
};

const SectionHeader = ({ num, title }: { num: string, title: string }) => (
  <FadeIn className="flex items-center gap-4 mb-16 md:mb-24">
    <div className="text-white/30 font-mono text-xs tracking-widest flex items-center gap-4">
      <span className="w-8 h-px bg-white/20"></span>
      {num} — {title.toUpperCase()}
    </div>
  </FadeIn>
);

const AnimatedCounter = ({ target, label, suffix = "", prefix = "" }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      animate(count, parseFloat(target), {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setDisplay(Math.round(latest).toString())
      });
    }
  }, [isInView, target, count]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="font-bold text-[clamp(4rem,8vw,6rem)] leading-none text-white flex items-start">
        {prefix}{display}
        <span className="text-[clamp(1.5rem,3vw,2.5rem)] text-[#8b92b2] mt-2 ml-1">{suffix}</span>
      </div>
      <div className="text-white/40 uppercase tracking-[0.2em] text-[10px] sm:text-xs mt-4 text-center">
        {label}
      </div>
    </div>
  );
};

// --- SECTIONS ---

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-12 lg:px-24 pt-32 pb-20" id="home">
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-[#030409]/70 border-b border-white/[0.04] z-50 flex justify-between items-center px-6 md:px-12 py-5">
        <div className="font-bold text-xl tracking-widest text-[#8b92b2]">AN.</div>
        <div className="hidden md:flex gap-8 items-center">
          {['About', 'Journey', 'Work', 'Projects', 'Certifications', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-white/60 text-xs font-medium uppercase tracking-[0.15em] hover:text-white transition-colors">
              {link}
            </a>
          ))}
          <a href={SITE_CONFIG.resumeLink} target="_blank" rel="noreferrer" className="border border-white/20 rounded-full px-6 py-2 text-white text-xs font-medium uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all flex items-center gap-2">
            Resume <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 mt-10">
        <div className="flex flex-col flex-1 relative z-10">
          <FadeIn y={10}>
            <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-8 flex flex-wrap gap-4">
              <span>CS Undergrad</span>
              <span className="text-[#8b92b2]">·</span>
              <span>AI & ML Engineer</span>
              <span className="text-[#8b92b2]">·</span>
              <span>Full-Stack Developer</span>
            </p>
          </FadeIn>
          
          <FadeIn delay={0.1} y={20} className="flex flex-col">
            <h1 className="font-black uppercase tracking-tighter leading-[0.85] text-[clamp(4.5rem,14vw,11rem)] text-white">
              ANKIT
            </h1>
            <h1 className="font-black uppercase tracking-tighter leading-[0.85] text-[clamp(4.5rem,14vw,11rem)] text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.45)' }}>
              NOTNANI
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2} y={20} className="mt-12 max-w-xl">
            <p className="text-[#8b92b2] font-light text-[clamp(1rem,1.5vw,1.1rem)] leading-relaxed">
              I find signal in the noise: turning raw data into clear decisions, one model and dashboard at a time.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3} className="flex gap-4 mt-12 flex-wrap">
            <a href="#projects" className="bg-white text-black rounded-sm px-8 py-4 text-sm font-medium flex items-center gap-3 hover:bg-gray-200 transition-colors">
              View Projects →
            </a>
            <a href={SITE_CONFIG.resumeLink} target="_blank" rel="noreferrer" className="border border-white/20 rounded-sm px-8 py-4 text-white text-sm font-medium flex items-center gap-3 hover:bg-white/5 transition-colors">
              Resume <ArrowUpRight size={16} />
            </a>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} x={20} className="hidden lg:block relative z-10">
           <div className="w-[350px] h-[450px] rounded-[2rem] overflow-hidden bg-[#0A0B10] border border-white/5 relative shadow-2xl">
              <img 
                src={SITE_CONFIG.profileImage} 
                alt="Ankit Notnani" 
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030409] via-transparent to-transparent opacity-60" />
           </div>
        </FadeIn>
      </div>
      
      <div className="absolute bottom-10 left-0 w-full flex justify-center opacity-30 uppercase tracking-widest text-[10px] text-white">
        SCROLL TO EXPLORE
      </div>
    </section>
  );
};

const TextMarqueeSection = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full py-6 border-y border-white/[0.05] bg-transparent">
      <motion.div
        className="flex gap-12 items-center w-max"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex gap-12 items-center uppercase tracking-widest text-xs text-white/40 font-semibold">
            <span className="text-[#5b6cd9] text-[10px]">✦</span>
            <span>COMMUNITY BUILDER</span>
            <span className="text-[#5b6cd9] text-[10px]">✦</span>
            <span>DATA ANALYST</span>
            <span className="text-[#5b6cd9] text-[10px]">✦</span>
            <span>ML ENGINEER</span>
            <span className="text-[#5b6cd9] text-[10px]">✦</span>
            <span>DASHBOARD ARCHITECT</span>
            <span className="text-[#5b6cd9] text-[10px]">✦</span>
            <span>TECHNICAL LEADER</span>
            <span className="text-[#5b6cd9] text-[10px]">✦</span>
            <span>SYSTEMS THINKER</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const AboutSection = () => (
  <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent" id="about">
    <div className="max-w-7xl mx-auto">
      <SectionHeader num="01" title="About" />
      
      <div className="max-w-5xl">
        <AnimatedText 
          text="I've always been drawn to the space between raw data and real decisions, the moment when noise becomes signal."
          className="font-bold text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] tracking-tight mb-20" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-white/50 font-light leading-relaxed text-sm md:text-base border-t border-white/[0.05] pt-16">
          <FadeIn>
            <p>
              Most people see data as numbers on a screen. I see it as narrative, patterns waiting to be uncovered, systems waiting to be understood, problems waiting for someone curious enough to solve them. Alpha Batch at UPES — selected for top DSA tier.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex gap-6 items-start">
              <span className="text-[#5b6cd9] font-mono text-xs tracking-widest mt-1">01</span>
              <div>
                <h4 className="text-white font-medium mb-2">Analytical Rigor</h4>
                <p className="text-xs">I measure, model, and validate. No guessing.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      
      <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 border-y border-white/[0.05] py-24">
        <AnimatedCounter target="2" label="National Finals" suffix="+" />
        <AnimatedCounter target="8" label="Major Projects" />
        <AnimatedCounter target="94" label="NLP Model Accuracy" suffix="%" />
        <AnimatedCounter target="50" label="Audience Uplift" suffix="%" />
      </div>
    </div>
  </section>
);

const JourneySection = () => {
  const journey = [
    { year: "2021", title: "Foundation Set", desc: "Class X ICSE — 91%. First encounter with structured learning and problem-solving at St. George's College, Agra." },
    { year: "2023", title: "Found My Edge", desc: "B.Tech CSE (AI & ML) at UPES Dehradun. Python, data structures, and the realization that code is a tool for understanding and not just building. Selected for Alpha Batch programming tier." },
    { year: "2024", title: "First Real Impact", desc: "Built ExamHub online platform. Completed a Social Internship at Chhanv Foundation, digitizing records and supporting campaigns for acid attack survivors." },
    { year: "2025", title: "Community & Leadership", desc: "Associate Secretary at Avishkarnam Literary Club. Managed a 100-member team and led end-to-end execution of the Ukti fest for 5,000+ students. Former PR Head at Pratibimb Photography Club." },
    { year: "2026", title: "Building Forward", desc: "AI & ML Project Intern at Empyrean Consultancy Services designing CV models. Appointed SEE Ambassador at UPES, acting as a bridge for 10,000+ students." },
    { year: "NEXT →", title: "What's Ahead", desc: "Seeking full-time roles where data, engineering, and impact intersect. Ready to contribute at scale." }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent" id="journey">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="02" title="Journey" />
        
        <FadeIn>
          <h2 className="font-bold text-[clamp(4rem,8vw,7rem)] tracking-tighter text-white mb-24 leading-none">The path so far.</h2>
        </FadeIn>
        
        <div className="max-w-3xl relative ml-4 md:ml-12">
          <div className="absolute left-[3px] top-4 bottom-4 w-px bg-white/10" />
          
          <div className="flex flex-col gap-16">
            {journey.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} y={20} className="relative pl-12 md:pl-20 group">
                <div className="absolute left-[1px] top-1.5 w-[5px] h-[5px] rounded-full border border-white/40 bg-[#030409] group-hover:bg-[#5b6cd9] group-hover:border-[#5b6cd9] transition-colors" />
                <div className="text-[#5b6cd9] font-mono text-[10px] tracking-[0.2em] uppercase mb-4">{item.year}</div>
                <h3 className="text-white font-bold text-xl md:text-2xl mb-4 tracking-tight">{item.title}</h3>
                <p className="text-[#8b92b2] font-light text-sm md:text-base leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WorkSection = () => {
  const roles = [
    {
      date: "2026", type: "INTERNSHIP",
      title: "AI & ML Project Intern", company: "Empyrean Consultancy Services",
      points: [
        "Designing computer vision models for automated object readiness detection.",
        "Developing real-time inference software utilizing drone imagery.",
        "End-to-end ML pipeline optimization and evaluation."
      ],
      link: "/certs/empyrean-offer-letter.pdf"
    },
    {
      date: "2025", type: "INTERNSHIP",
      title: "Tech & Social Media Intern", company: "Binary Keeda",
      points: [
        "Scaled audience engagement via data-backed content mapping strategies.",
        "Achieved a 50% uplift in core engagement metrics.",
        "Managed cross-platform media distribution and analytics."
      ],
      link: "/certs/binarykeeda-internship-certificate.pdf"
    },
    {
      date: "2024", type: "INTERNSHIP",
      title: "Social Intern", company: "Chhanv Foundation",
      points: [
        "Digitized critical records and developed streamlined data management.",
        "Supported organizational campaigns at Sheroes Hangout Cafe.",
        "Maintained structured reporting workflows."
      ],
      link: "/certs/chhanv-internship-certificate.pdf"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent" id="work">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="03" title="Work" />
        
        <FadeIn>
          <h2 className="font-bold text-[clamp(4rem,8vw,7rem)] tracking-tighter text-white mb-24 leading-none">Where I've delivered.</h2>
        </FadeIn>
        
        <div className="flex flex-col gap-8">
          {roles.map((role, i) => (
            <FadeIn key={i} delay={i * 0.1} y={20}>
              <a href={role.link} target="_blank" rel="noreferrer" className="block bg-white/[0.02] backdrop-blur-sm rounded-[2rem] p-8 md:p-12 hover:bg-white/[0.04] transition-colors group cursor-pointer border border-white/[0.05]">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-white/40 font-mono text-[10px] tracking-widest">{role.date}</span>
                  <span className="text-[#5b6cd9] font-mono text-[10px] tracking-widest uppercase border border-[#5b6cd9]/30 px-3 py-1 rounded">{role.type}</span>
                </div>
                <h3 className="text-white font-bold text-2xl md:text-3xl tracking-tight mb-2 group-hover:text-[#8b92b2] transition-colors">{role.title}</h3>
                <div className="text-[#5b6cd9] font-medium text-sm md:text-base mb-8">{role.company}</div>
                
                <ul className="flex flex-col gap-4">
                  {role.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-4 text-[#8b92b2] font-light text-sm md:text-base">
                      <span className="text-[#5b6cd9] text-[10px] mt-1.5">▸</span> {point}
                    </li>
                  ))}
                </ul>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ToolsSection = () => {
  const categories = [
    {
      name: "PROGRAMMING",
      skills: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "HTML/CSS"]
    },
    {
      name: "ML / AI",
      skills: ["TensorFlow/Keras", "OpenCV", "MobileNetV2", "Scikit-learn", "NLP", "Pandas", "NumPy"]
    },
    {
      name: "WEB & BACKEND",
      skills: ["React.js", "FastAPI", "Spring Boot", "Flask", "Tailwind CSS", "REST APIs"]
    },
    {
      name: "TOOLS & HARDWARE",
      skills: ["Git/GitHub", "Docker", "MongoDB", "MySQL", "Raspberry Pi", "Coral Edge TPU", "ESP8266"]
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-transparent">
      <div className="max-w-7xl mx-auto border-t border-white/[0.05] pt-32">
        <FadeIn>
          <h2 className="font-bold text-[clamp(2.5rem,5vw,4rem)] tracking-tight text-white mb-20">Tools of the trade.</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-12 relative">
           <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/[0.05] -translate-y-1/2" />

          {categories.map((cat, i) => (
            <FadeIn key={i} delay={i * 0.1} className="relative z-10 bg-transparent py-4">
              <h3 className="text-[#5b6cd9] font-mono text-xs tracking-[0.2em] uppercase mb-8">{cat.name}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, j) => (
                  <span key={j} className="px-5 py-2.5 rounded-full border border-white/10 text-[#a3adc2] text-xs tracking-wide bg-white/[0.02] backdrop-blur-sm hover:bg-white/10 hover:text-white transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const projects = [
    { num: "01", status: "COMPLETED", tech: "MobileNetV2 · FastAPI · React", title: "BananaSense AI", desc: "Multi-class banana ripeness classifier built with MobileNetV2 transfer learning on a custom image dataset. Served via FastAPI REST API with a React frontend.", metric: "End-to-end pipeline from dataset curation to deployed inference.", link: "https://github.com/Ankitnotnani/banana-sense-ai" },
    { num: "02", status: "COMPLETED", tech: "NLP · FastAPI · React · MongoDB", title: "IDEACT", desc: "AI platform mapping hackathon problem statements to all 17 UN SDGs using NLP. Outputs feasibility-scored project ideas with tech stack recommendations.", metric: "94.12% F1-Macro score across all 17 UN SDG categories.", link: "https://github.com/Ankitnotnani/IDEACT" },
    { num: "03", status: "NASA FINALS", tech: "React · TypeScript · IoT · FastAPI", title: "ChronoClime", desc: "Designed the Adverse Condition Impact Score (ACIS) — a personalised activity-centric weather risk metric. Integrated ESP8266 IoT gateway and AI chatbot.", metric: "Grand Finalist — NASA Space Apps Challenge 2025.", link: "https://github.com/Ankitnotnani/ChronoClime" },
    { num: "04", status: "SIH FINALS", tech: "Raspberry Pi · React · Firebase", title: "KASA Track System", desc: "AI-powered laser QR marking system for Indian Railways. Built full lifecycle traceability syncing with UDM & TMS portals. Architected cloud backend.", metric: "Grand Finalist — Smart India Hackathon 2025.", link: "https://github.com/Ankitnotnani" },
    { num: "05", status: "COMPLETED", tech: "IoT · Python · Machine Learning", title: "SIMM", desc: "Real-time Smart Industrial Machine Monitoring system leveraging predictive analytics to detect anomalies and forecast maintenance needs.", metric: "Enhanced operational efficiency through predictive maintenance.", link: "https://github.com/Ankitnotnani/Smart-Industrial-Machine-Monitoring" },
    { num: "06", status: "COMPLETED", tech: "Spring Boot · Microservices · JWT", title: "ExamHub", desc: "Distributed online exam system with 5 Spring Boot microservices (Auth, Exam, Result, API Gateway, Eureka). Implemented JWT-based role-based access control.", metric: "Production-grade microservices architecture.", link: "https://github.com/Ankitnotnani/Examhub" }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent" id="projects">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="04" title="Projects" />
        
        <FadeIn>
          <h2 className="font-bold text-[clamp(4rem,8vw,7rem)] tracking-tighter text-white mb-20 pb-12 border-b border-white/[0.05] leading-none">Selected work.</h2>
        </FadeIn>
        
        <div className="flex flex-col">
          {projects.map((proj, i) => (
            <FadeIn key={i} y={20}>
              <a href={proj.link} target="_blank" rel="noreferrer" className="relative block py-16 border-b border-white/[0.05] flex flex-col md:flex-row gap-8 md:gap-24 group hover:bg-white/[0.02] transition-colors -mx-6 px-6 md:-mx-12 md:px-12 rounded-lg cursor-pointer">
                <div className="font-bold text-[clamp(4rem,6vw,5rem)] text-white/10 leading-none group-hover:text-white/20 transition-colors">
                  {proj.num}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6 flex-wrap">
                    <span className="text-[#5b6cd9] font-mono text-[10px] tracking-[0.2em] uppercase bg-[#5b6cd9]/10 px-3 py-1 rounded">{proj.status}</span>
                    <span className="text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase">{proj.tech}</span>
                  </div>
                  
                  <h3 className="text-white font-bold text-2xl md:text-3xl tracking-tight mb-4 group-hover:text-white transition-colors">{proj.title}</h3>
                  <p className="text-[#a3adc2] font-light leading-relaxed mb-6 max-w-2xl text-sm md:text-base">
                    {proj.desc}
                  </p>
                  <p className="text-[#5b6cd9] font-medium text-sm md:text-base mb-4 md:mb-0">
                    {proj.metric}
                  </p>
                  
                  <div className="mt-6 flex md:absolute md:top-16 md:right-12 items-center gap-2 text-white/30 group-hover:text-white/80 transition-colors text-xs font-mono tracking-widest uppercase">
                    Tap to view on GitHub <ArrowUpRight size={14} />
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const CertificationsSection = () => {
  const certs = [
    { title: "AWS Foundations of Prompt Engineering", issuer: "Amazon Web Services", link: "/certs/aws-prompt.pdf" },
    { title: "Data Analytics Job Simulation", issuer: "Deloitte via Forage", link: "/certs/deloitte-analytics.pdf" },
    { title: "SQL & Relational Databases 101", issuer: "IBM Skills Network", link: "/certs/ibm-sql.pdf" },
    { title: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn", link: "/certs/microsoft-genai.pdf" }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent" id="certifications">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="05" title="Certifications" />
        
        <FadeIn>
          <h2 className="font-bold text-[clamp(4rem,8vw,7rem)] tracking-tighter text-white mb-24 leading-none">Verified skills.</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((cert, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <a href={cert.link} target="_blank" rel="noreferrer" className="block bg-white/[0.02] backdrop-blur-sm rounded-[2rem] p-8 md:p-10 hover:bg-white/[0.04] transition-colors group border border-white/[0.05]">
                <div className="text-[#5b6cd9] font-mono text-[10px] tracking-widest uppercase mb-4">{cert.issuer}</div>
                <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight mb-8 group-hover:text-white transition-colors">{cert.title}</h3>
                <div className="text-white/40 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                  View Credential <ArrowUpRight size={14} />
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent" id="contact">
    <div className="max-w-7xl mx-auto">
      <SectionHeader num="06" title="Contact" />
      
      <div className="flex flex-col md:flex-row justify-between gap-16 mt-12">
        <div className="flex-1 max-w-2xl">
          <FadeIn>
            <h2 className="font-bold text-[clamp(3.5rem,8vw,6.5rem)] leading-[1] tracking-tighter text-white mb-10">
              Let's build something<br/>that matters.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[#8b92b2] font-light text-base md:text-lg leading-relaxed mb-16">
              I'm actively seeking AI/ML and backend software engineering opportunities. Whether it's a role, a collaboration, or just a good technical discussion—reach out. The best opportunities start with a simple message.
            </p>
          </FadeIn>
        </div>
        
        <div className="w-full md:w-[450px] flex flex-col gap-0 border-t border-white/[0.05] pt-4">
          <FadeIn delay={0.2}>
            <a href="mailto:ankitnotnani6497@gmail.com" className="flex justify-between items-center py-8 border-b border-white/[0.05] group cursor-pointer block">
              <span className="text-white/30 font-mono text-[10px] tracking-[0.2em] uppercase">Email</span>
              <span className="text-[#8b92b2] group-hover:text-white transition-colors text-sm font-medium">ankitnotnani6497@gmail.com</span>
            </a>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a href="https://linkedin.com/in/ankit-notnani" target="_blank" rel="noreferrer" className="flex justify-between items-center py-8 border-b border-white/[0.05] group cursor-pointer block">
              <span className="text-white/30 font-mono text-[10px] tracking-[0.2em] uppercase">LinkedIn</span>
              <span className="text-[#8b92b2] group-hover:text-white transition-colors text-sm font-medium">in/ankit-notnani</span>
            </a>
          </FadeIn>
          <FadeIn delay={0.4}>
            <a href="https://github.com/Ankitnotnani" target="_blank" rel="noreferrer" className="flex justify-between items-center py-8 border-b border-white/[0.05] group cursor-pointer block">
              <span className="text-white/30 font-mono text-[10px] tracking-[0.2em] uppercase">Github</span>
              <span className="text-[#8b92b2] group-hover:text-white transition-colors text-sm font-medium">Ankitnotnani</span>
            </a>
          </FadeIn>
        </div>
      </div>
      
      <div className="mt-32 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/[0.02]">
        <div className="text-white font-bold text-xl tracking-widest">AN.</div>
        <div className="text-white/20 font-mono text-[10px] uppercase tracking-[0.2em]">Designed & Built by Ankit Notnani · 2026</div>
      </div>
    </div>
  </section>
);

// --- MAIN LAYOUT ---

export default function App() {
  const [loading, setLoading] = useState(true);

  // Custom Cursor
  const cursorDotX = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const cursorDotY = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const cursorRingX = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const cursorRingY = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorDotX.set(e.clientX - 4);
      cursorDotY.set(e.clientY - 4);
      cursorRingX.set(e.clientX - 20);
      cursorRingY.set(e.clientY - 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorDotX, cursorDotY, cursorRingX, cursorRingY]);

  return (
    <div className="relative min-h-screen overflow-x-clip selection:bg-[#5b6cd9]/30 selection:text-white text-white font-sans bg-[#030409]">
      <style>{`html { scroll-behavior: smooth; }`}</style>
      
      {/* --- AMBIENT BACKGROUND GLOW --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top left indigo glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 blur-[120px]" />
        {/* Bottom right teal glow */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-600/5 blur-[120px]" />
      </div>

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div className="hidden md:block fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]" style={{ x: cursorDotX, y: cursorDotY, mixBlendMode: 'difference' }} />
      <motion.div className="hidden md:block fixed w-10 h-10 border border-white/10 rounded-full pointer-events-none z-[9998]" style={{ x: cursorRingX, y: cursorRingY }} />

      {!loading && (
        <main className="w-full relative z-10">
          <HeroSection />
          <TextMarqueeSection />
          <AboutSection />
          <JourneySection />
          <WorkSection />
          <ToolsSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </main>
      )}
    </div>
  );
}