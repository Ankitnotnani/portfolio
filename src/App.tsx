import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, animate, useMotionValue } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// --- REUSABLE COMPONENTS ---

const FadeIn = ({ children, delay = 0, y = 30, x = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "50px", amount: 0 }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const AnimatedText = ({ text, className = "" }: { text: string, className?: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start 0.8', 'end 0.2'] });
  const words = text.split(" ");
  
  return (
    <p ref={container} className={className + " flex flex-wrap justify-center gap-x-2 gap-y-1"}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        return <motion.span key={i} style={{ opacity }}>{word}</motion.span>;
      })}
    </p>
  );
};

const AnimatedCounter = ({ target, label, suffix = "", prefix = "" }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      const isFloat = target.toString().includes(".");
      animate(count, parseFloat(target), {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setDisplay(isFloat ? latest.toFixed(1) : Math.round(latest).toString())
      });
    }
  }, [isInView, target, count]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="hero-heading font-black text-[clamp(2.5rem,6vw,5rem)] leading-none">
        {prefix}{display}{suffix}
      </div>
      <div className="text-textMuted uppercase tracking-widest text-xs sm:text-sm font-light mt-2 text-center">
        {label}
      </div>
    </div>
  );
};

const ContactButton = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const isAnchor = href.startsWith('#');
  return (
    <a href={href} target={isAnchor ? "_self" : "_blank"} rel="noreferrer" 
       onClick={(e) => {
         if (isAnchor) {
           e.preventDefault();
           document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
         }
       }}
       className="rounded-full font-medium uppercase tracking-widest px-8 py-3 md:px-10 md:py-4 text-sm md:text-base text-white hover:scale-105 transition-transform"
       style={{
         background: 'linear-gradient(123deg, #B600A8 0%, #7621B0 100%)',
         boxShadow: '0 0 30px 8px rgba(182, 0, 168, 0.6), inset 0px 4px 4px rgba(255, 255, 255, 0.3)',
         outline: '2px solid white',
         outlineOffset: '-3px'
       }}>
      {children}
    </a>
  );
};

const GhostButton = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const isAnchor = href.startsWith('#');
  return (
    <a href={href} target={isAnchor ? "_self" : "_blank"} rel="noreferrer" 
       onClick={(e) => {
         if (isAnchor) {
           e.preventDefault();
           document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
         }
       }}
       className="border-2 border-textMain/40 rounded-full text-textMain font-medium uppercase tracking-widest px-8 py-3 md:px-10 md:py-4 text-sm md:text-base hover:bg-white/5 transition-colors">
      {children}
    </a>
  );
};

// --- SECTIONS ---

const HeroSection = () => {
  const [taglineText, setTaglineText] = useState("");
  const phrases = ["Building Intelligent Systems.", "Grand Finalist @ NASA 2025.", "Turning Ideas Into Products."];
  
  useEffect(() => {
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const fullText = phrases[currentPhrase];
      setTaglineText(fullText.substring(0, currentChar));

      if (!isDeleting && currentChar < fullText.length) {
        currentChar++;
        timeout = setTimeout(type, 100);
      } else if (isDeleting && currentChar > 0) {
        currentChar--;
        timeout = setTimeout(type, 50);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) currentPhrase = (currentPhrase + 1) % phrases.length;
        timeout = setTimeout(type, isDeleting ? 2000 : 500);
      }
    };
    timeout = setTimeout(type, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="h-screen flex flex-col justify-center items-center relative px-6 overflow-x-clip" id="home">
      <nav className="fixed top-0 left-0 w-full backdrop-blur-sm bg-dark/80 border-b border-white/[0.06] z-50 flex justify-between items-center px-6 md:px-10 py-4 md:py-5">
        <div className="font-black text-xl md:text-2xl tracking-widest text-white">AN.</div>
        <div className="hidden md:flex gap-6 items-center">
          {['About', 'Journey', 'Projects', 'Certifications', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-textMain/90 font-medium uppercase tracking-wider text-sm hover:opacity-60 transition-opacity">{link}</a>
          ))}
          <a href="/Ankit_Notnani_Resume.pdf" target="_blank" rel="noreferrer" className="border border-textMain/30 rounded-full px-4 py-1.5 text-textMain font-medium uppercase tracking-wider text-sm hover:bg-white/5 transition-colors">Resume ↗</a>
        </div>
      </nav>

      <div className="flex flex-col items-center gap-6 pt-24 z-10 w-full">
        <FadeIn y={-20}>
          <p className="text-textMuted font-light uppercase tracking-[0.3em] text-xs sm:text-sm md:text-base text-center">CS Undergrad · AI & ML Engineer · Full-Stack Developer</p>
        </FadeIn>
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-center text-[clamp(3rem,10vw,10rem)]">ANKIT NOTNANI</h1>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="text-textMain font-light text-center text-[clamp(1rem,2vw,1.5rem)] min-h-[2rem]">
            {taglineText}<span className="animate-pulse">|</span>
          </p>
        </FadeIn>
        <FadeIn delay={0.5} className="flex gap-4 mt-4 flex-col sm:flex-row">
          <ContactButton href="#contact">Get In Touch</ContactButton>
          <GhostButton href="#projects">View Projects →</GhostButton>
        </FadeIn>
      </div>

      <FadeIn delay={1} className="absolute bottom-10 flex flex-col items-center">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown color="#646973" size={20} />
        </motion.div>
        <span className="text-textMuted uppercase tracking-widest text-[10px] mt-1">Scroll to explore</span>
      </FadeIn>
    </section>
  );
};

const TextMarqueeSection = () => {
  const { scrollY } = useScroll();
  const x1 = useTransform(scrollY, [0, 3000], [0, 1000]);
  const x2 = useTransform(scrollY, [0, 3000], [0, -1000]);

  const row1 = ["NASA Grand Finalist 2025", "Smart India Hackathon 2025", "Computer Vision", "MobileNetV2", "FastAPI", "React.js", "Spring Boot", "Python", "NLP · 94.12% F1", "ESP8266 IoT", "Alpha Batch @ UPES"];
  const row2 = ["Full-Stack Developer", "Transfer Learning", "TypeScript", "Microservices", "Raspberry Pi", "TensorFlow / Keras", "MongoDB", "Docker", "Coral Edge TPU", "JWT Auth", "Scikit-learn"];

  return (
    <section className="py-10 bg-dark overflow-hidden flex flex-col gap-6">
      <motion.div style={{ x: x1 }} className="flex gap-3 whitespace-nowrap will-change-transform ml-[-50vw]">
        {[...row1, ...row1, ...row1].map((text, i) => (
          <React.Fragment key={`r1-${i}`}>
            <div className="inline-flex items-center px-6 py-3 border border-textMain/15 rounded-full text-textMain/70 font-medium uppercase tracking-wider text-sm md:text-base bg-white/[0.02]">
              {text}
            </div>
            {i % 2 === 0 && <span className="text-primary self-center">✦</span>}
          </React.Fragment>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className="flex gap-3 whitespace-nowrap will-change-transform">
        {[...row2, ...row2, ...row2].map((text, i) => (
          <React.Fragment key={`r2-${i}`}>
            <div className="inline-flex items-center px-6 py-3 border border-textMain/15 rounded-full text-textMain/70 font-medium uppercase tracking-wider text-sm md:text-base bg-white/[0.02]">
              {text}
            </div>
            {i % 2 === 0 && <span className="text-primary self-center">✦</span>}
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  );
};

const AboutSection = () => (
  <section className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-16 py-20" id="about">
    <FadeIn className="w-full flex justify-center">
      <span className="text-textMuted font-light uppercase tracking-[0.3em] text-xs md:text-sm">01 — About</span>
    </FadeIn>
    <FadeIn delay={0.1} y={40} className="w-full flex justify-center">
      <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,10vw,120px)] mt-2 text-center">About Me</h2>
    </FadeIn>
    
    <div className="max-w-3xl mx-auto mt-10">
      <AnimatedText 
        text="With hands-on experience in AI, machine learning, and full-stack development, i build intelligent systems, computer vision models, and scalable web applications. Currently interning at Empyrean Consultancy Services, developing crop readiness detection models using drone imagery."
        className="text-textMain font-medium leading-relaxed text-[clamp(1rem,1.8vw,1.3rem)] mb-6 text-center" 
      />
      <AnimatedText 
        text="Grand Finalist at NASA Space Apps Challenge 2025 and Smart India Hackathon 2025. Alpha Batch at UPES — selected via AMCAT for top DSA tier. Associate Secretary at Avishkarnam Literary Club, and a regular event host at UURJA, Spandan, and Ukti."
        className="text-textMain/80 font-medium leading-relaxed text-[clamp(1rem,1.8vw,1.3rem)] text-center" 
      />
    </div>

    <div className="flex justify-center flex-wrap mt-16 gap-8 sm:gap-16 w-full">
      <FadeIn delay={0.3}><AnimatedCounter target="2" label="Grand Finalist Titles" /></FadeIn>
      <div className="hidden md:block w-px bg-white/10" />
      <FadeIn delay={0.4}><AnimatedCounter target="6" label="Major Projects" /></FadeIn>
      <div className="hidden md:block w-px bg-white/10" />
      <FadeIn delay={0.5}><AnimatedCounter target="8.0" label="CGPA / 10" /></FadeIn>
      <div className="hidden md:block w-px bg-white/10" />
      <FadeIn delay={0.6}><AnimatedCounter target="50" label="Engagement Uplift" suffix="%" /></FadeIn>
    </div>
  </section>
);

const JourneySection = () => {
  const journey = [
    { year: "2021", title: "The Beginning", desc: "Class X ICSE — 91%. First encounter with structured learning and problem-solving at St. George's College, Agra." },
    { year: "2023", title: "Class XII & Transition", desc: "Class XII ICSE — 81%. Moved to UPES Dehradun, B.Tech CSE (AI & ML). Python, data structures, and the realization that code is a thinking tool." },
    { year: "2024", title: "First Projects & Social Impact", desc: "Built ExamHub online exam platform with Spring Boot microservices. Completed a Social Internship at Chhanv Foundation, digitizing records and supporting campaigns at Sheroes Hangout Cafe, Agra." },
    { year: "2025", title: "Full-Stack AI & Media Strategy", desc: "Developed BananaSense AI and IDEACT platforms. Served as Tech & Social Media Intern at Binary Keeda, scaling audience engagement by 50% via data-backed content mapping." },
    { year: "E. 2025", title: "National Grand Finals", desc: "Software Lead for Team KASA at Smart India Hackathon Grand Finals (Railway traceability system). Team Lead for ChronoClime at NASA Space Apps Challenge Grand Finals globally." },
    { year: "2026", title: "Industry & Present", desc: "AI & ML Project Intern at Empyrean Consultancy Services. Designing computer vision models and real-time inference software for automated object readiness detection." }
  ];

  return (
    <section className="px-5 sm:px-8 md:px-16 py-20 bg-dark" id="journey">
      <FadeIn><span className="text-textMuted font-light uppercase tracking-[0.3em] text-xs md:text-sm">02 — Journey</span></FadeIn>
      <FadeIn delay={0.1} y={40}><h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,10vw,120px)] mt-2">The Path So Far</h2></FadeIn>
      
      <div className="max-w-3xl mx-auto mt-14 relative">
        <div className="absolute left-4 md:left-[120px] top-0 bottom-0 w-px bg-white/10" />
        <div className="flex flex-col gap-10">
          {journey.map((item, i) => (
            <FadeIn key={i} delay={i * 0.12} x={-40} className="flex flex-row items-start gap-6 md:gap-10 relative z-10">
              <div className="text-textMuted font-black text-sm md:text-base uppercase tracking-widest min-w-[60px] md:min-w-[80px] text-left md:text-right pt-1">{item.year}</div>
              <div className="w-[10px] h-[10px] rounded-full bg-primary flex-shrink-0 mt-2" style={{ boxShadow: '0 0 12px #B600A8' }} />
              <div>
                <h3 className="text-textMain font-medium text-lg md:text-xl">{item.title}</h3>
                <p className="text-textMuted font-light text-sm md:text-base leading-relaxed mt-1">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={0.8} x={-40} className="flex flex-row items-start gap-6 md:gap-10 relative z-10">
            <div className="text-textMuted font-black text-sm md:text-base uppercase tracking-widest min-w-[60px] md:min-w-[80px] text-left md:text-right pt-1">Next →</div>
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-[10px] h-[10px] rounded-full bg-primary/40 flex-shrink-0 mt-2" />
            <div>
              <h3 className="text-textMain font-medium text-lg md:text-xl">What's Ahead</h3>
              <p className="text-textMuted font-light text-sm md:text-base leading-relaxed mt-1">Seeking full-time or high-impact internship roles in AI/ML or backend engineering where advanced intelligence scales products.</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const ExpertiseSection = () => {
  const expertise = [
    { num: "01", title: "AI & Machine Learning", desc: "End-to-end ML pipelines using TensorFlow/Keras, MobileNetV2 transfer learning, Scikit-learn, and OpenCV — from dataset curation and model training to optimised inference deployment." },
    { num: "02", title: "Computer Vision", desc: "Real-time image classification and object detection with fine-tuned CNNs. Applied to crop readiness detection (drone imagery), banana ripeness grading, and railway QR traceability." },
    { num: "03", title: "Full-Stack Development", desc: "React.js + TypeScript frontends with Tailwind CSS, connected to FastAPI or Spring Boot backends with REST APIs, MongoDB/MySQL, and Firebase integration." },
    { num: "04", title: "Backend & Distributed Systems", desc: "Scalable microservice architectures with Spring Boot, Spring Cloud, Eureka, JWT auth, and Docker — supporting concurrent multi-role isolated sessions." },
    { num: "05", title: "DSA & Problem Solving", desc: "Strong foundations in Arrays, Linked Lists, Trees, Graphs, and Dynamic Programming. Alpha Batch at UPES (top DSA tier, selected via AMCAT). Consistent LeetCode practice." }
  ];

  const tags = [
    "Python", "Java", "C++", "C", "JavaScript", "TypeScript", "React.js", "HTML", "CSS", 
    "Tailwind CSS", "Vite", "FastAPI", "Spring Boot", "Spring Cloud", "Flask", 
    "TensorFlow/Keras", "MobileNetV2", "OpenCV", "Scikit-learn", "NLP", "NumPy", "Pandas", 
    "MySQL", "MongoDB", "Docker", "Git", "GitHub", "Linux", "Postman", "Firebase", 
    "Raspberry Pi", "Coral Edge TPU", "ESP8266", "ESP32", "REST APIs", "Microservices", "JWT", 
    "Agile", "Unit Testing", "Sorting & Searching"
  ];

  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-16 py-20 sm:py-24 md:py-32" id="expertise">
      <FadeIn><span className="text-dark/40 font-light uppercase tracking-[0.3em] text-xs md:text-sm">03 — Expertise</span></FadeIn>
      <FadeIn delay={0.1} y={40}><h2 className="text-dark font-black uppercase tracking-tight text-[clamp(3rem,10vw,120px)] mt-2 mb-16 sm:mb-20 md:mb-28 leading-none">What I Do</h2></FadeIn>
      
      <div className="max-w-5xl mx-auto flex flex-col">
        {expertise.map((item, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="group flex flex-col md:flex-row gap-4 md:gap-12 py-8 sm:py-10 md:py-12 border-b border-dark/10 hover:bg-dark/[0.04] transition-colors duration-300 px-4 rounded-xl">
              <div className="text-dark/30 font-black text-2xl md:text-4xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary transition-all duration-300">{item.num}</div>
              <div>
                <h3 className="text-dark font-black uppercase text-xl md:text-2xl mb-2">{item.title}</h3>
                <p className="text-dark/70 font-light leading-relaxed text-sm md:text-base max-w-3xl">{item.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-16 pt-10 border-t border-black/10">
        <h4 className="text-dark font-medium uppercase tracking-widest text-sm mb-6">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <FadeIn key={i} delay={i * 0.02} y={10} className="px-4 py-2 border border-black/15 rounded-full text-dark/70 font-light text-xs md:text-sm uppercase tracking-wide bg-black/[0.02] hover:bg-black/[0.07] transition-colors duration-200">
              {tag}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const projects = [
    { num: "01", cat: "Computer Vision", title: "BananaSense AI", desc: "Multi-class banana ripeness classifier built with MobileNetV2 transfer learning on a custom image dataset covering multiple ripeness stages. Served via FastAPI REST API with a React.js frontend featuring drag-and-drop upload, real-time prediction output, and a per-class confidence score analytics dashboard.", tags: ["Python", "MobileNetV2", "Transfer Learning", "FastAPI", "React.js", "OpenCV", "REST API"], achieve: "End-to-end pipeline from dataset curation to deployed inference.", link: "https://github.com/Ankitnotnani/banana-sense-ai" },
    { num: "02", cat: "NLP · Full-Stack", title: "IDEACT", desc: "AI platform mapping hackathon problem statements to all 17 UN SDGs using NLP. Outputs feasibility-scored project ideas with tech stack recommendations and week-by-week execution roadmaps.", tags: ["Python", "FastAPI", "React.js", "MongoDB", "NLP", "Scikit-learn"], achieve: "94.12% F1-Macro score across all 17 UN SDG categories.", link: "https://github.com/Ankitnotnani/IDEACT" },
    { num: "03", cat: "NASA Space Apps 2025", title: "ChronoClime", desc: "Designed the Adverse Condition Impact Score (ACIS) — a personalised 1–10 activity-centric weather risk metric. Integrated ESP8266 IoT gateway for hardware location input and built an AI weather chatbot.", tags: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "IoT", "ESP8266"], achieve: "Grand Finalist — NASA Space Apps Challenge 2025.", link: "https://github.com/Ankitnotnani/ChronoClime" },
    { num: "04", cat: "Smart India Hackathon 2025", title: "KASA", desc: "AI-powered laser QR marking system for Indian Railways track components. Built QR lifecycle traceability syncing with UDM & TMS portals. Architected the cloud backend and a React analytics dashboard.", tags: ["Raspberry Pi", "Coral Edge TPU", "React", "Firebase", "AWS", "Python"], achieve: "Grand Finalist — Smart India Hackathon 2025.", link: "https://github.com/Ankitnotnani" },
    { num: "05", cat: "IoT · Analytics", title: "Smart Machine Monitoring", desc: "Real-time industrial machine monitoring system leveraging predictive analytics to detect anomalies and forecast maintenance needs. Built to reduce hardware downtime in manufacturing workflows.", tags: ["Python", "IoT", "Data Analytics", "Machine Learning", "Time-Series"], achieve: "Enhanced operational efficiency through predictive maintenance.", link: "https://github.com/Ankitnotnani/Smart-Industrial-Machine-Monitoring" },
    { num: "06", cat: "Distributed Systems", title: "ExamHub", desc: "Distributed online exam system with 5 Spring Boot microservices — Auth, Exam, Result, API Gateway, and Eureka Service Registry. JWT-based authentication with role-based access control for isolated sessions.", tags: ["Spring Boot", "Eureka", "JWT", "MySQL", "React", "Docker"], achieve: "Production-grade microservices architecture.", link: "https://github.com/Ankitnotnani/Examhub" }
  ];

  return (
    <section className="bg-dark rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 pb-32" id="projects">
      <FadeIn><span className="text-textMuted font-light uppercase tracking-[0.3em] text-xs md:text-sm">04 — Projects</span></FadeIn>
      <FadeIn delay={0.1} y={40}><h2 className="hero-heading font-black uppercase tracking-tight text-[clamp(3rem,10vw,120px)] mt-2 mb-20 leading-none">Selected Work</h2></FadeIn>
      
      <div className="flex flex-col gap-0 relative">
        {projects.map((proj, i) => (
          <div key={i} className="h-[90vh] sticky top-24 md:top-28 flex justify-center w-full" style={{ paddingTop: `${i * 24}px` }}>
            <motion.div 
              className="w-full max-w-6xl rounded-[32px] sm:rounded-[40px] border border-textMain/20 bg-[#0f0f0f] p-6 sm:p-8 md:p-10 shadow-2xl hover:border-primary/40 hover:shadow-[0_0_40px_rgba(182,0,168,0.08)] transition-all duration-300 ease-in-out h-fit"
            >
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <div className="hero-heading font-black text-[clamp(2rem,6vw,5rem)] leading-none">{proj.num}</div>
                  <div className="text-textMuted uppercase tracking-widest text-xs mt-2">{proj.cat}</div>
                </div>
                <a href={proj.link} target="_blank" rel="noreferrer" className="border border-textMain/30 rounded-full text-textMain/70 px-6 py-2 text-xs md:text-sm uppercase tracking-widest hover:bg-white/5 transition-colors">View Project ↗</a>
              </div>
              <h3 className="text-textMain font-black uppercase text-[clamp(1.5rem,4vw,3.5rem)] leading-tight mt-4">{proj.title}</h3>
              <div className="w-full h-px bg-white/[0.08] my-6" />
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="md:w-[55%] text-textMain/70 font-light leading-relaxed text-[clamp(0.85rem,1.4vw,1.1rem)]">
                  {proj.desc}
                </div>
                <div className="md:w-[45%]">
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 border border-textMain/20 rounded-full text-textMain/50 font-light text-[10px] md:text-xs uppercase tracking-wide bg-white/[0.02]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-start gap-2">
                    <span className="text-primary mt-1 text-sm">✦</span>
                    <span className="text-textMain/90 font-medium text-sm md:text-base">{proj.achieve}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CertificationsSection = () => {
  const certs = [
    { title: "AWS Foundations of Prompt Engineering", issuer: "Amazon Web Services", date: "Jun 2026", path: "/certs/aws-prompt.pdf" },
    { title: "SQL & Relational Databases 101", issuer: "IBM Skills Network", date: "Jun 2026", path: "/certs/ibm-sql.pdf" },
    { title: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn", date: "Jun 2026", path: "/certs/microsoft-genai.pdf" },
    { title: "Data Analytics Job Simulation", issuer: "Deloitte via Forage", date: "Jun 2026", path: "/certs/deloitte-analytics.pdf" }
  ];

  return (
    <section className="px-5 sm:px-8 md:px-16 py-24 bg-dark border-t border-white/[0.05]" id="certifications">
      <FadeIn><span className="text-textMuted font-light uppercase tracking-[0.3em] text-xs md:text-sm">05 — Verifications</span></FadeIn>
      <FadeIn delay={0.1} y={40}><h2 className="hero-heading font-black uppercase tracking-tight text-[clamp(3rem,10vw,90px)] mt-2 mb-12 leading-none">Certifications</h2></FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {certs.map((cert, i) => (
          <FadeIn key={i} delay={i * 0.08} y={20}>
            <a 
              href={cert.path} 
              target="_blank" 
              rel="noreferrer"
              className="group block rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-6 hover:border-primary/50 hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">{cert.issuer}</span>
                  <h3 className="text-textMain font-bold text-lg md:text-xl uppercase mt-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-textMain/60 transition-all duration-300">{cert.title}</h3>
                </div>
                <span className="text-textMuted font-mono text-xs whitespace-nowrap mt-1 group-hover:text-primary transition-colors">{cert.date}</span>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-textMuted font-medium tracking-wider uppercase">
                <span className="group-hover:text-white transition-colors">Verify Credential</span>
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">↗</span>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section className="bg-dark px-5 sm:px-8 md:px-16 py-28 sm:py-36 md:py-44 flex flex-col items-center" id="contact">
    <FadeIn><span className="text-textMuted font-light uppercase tracking-[0.3em] text-xs md:text-sm">06 — Contact</span></FadeIn>
    <FadeIn delay={0.1} y={40} className="w-full">
      <h2 className="hero-heading font-black uppercase tracking-tight text-[clamp(2.5rem,9vw,10rem)] mt-2 leading-tight text-center">Let's Build Something<br/><span className="md:ml-16 lg:ml-32">That Matters.</span></h2>
    </FadeIn>
    <FadeIn delay={0.25}>
      <p className="text-textMain/60 font-light text-center max-w-md text-[clamp(0.9rem,1.5vw,1.1rem)] mt-8">
        I'm actively looking for AI/ML and backend SDE internship and full-time roles. If something here resonated, just reach out.
      </p>
    </FadeIn>
    <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-12">
      <ContactButton href="mailto:ankitnotnani6497@gmail.com">Email Me ↗</ContactButton>
      <GhostButton href="https://www.linkedin.com/in/ankit-notnani/">LinkedIn ↗</GhostButton>
      <GhostButton href="https://github.com/Ankitnotnani">GitHub ↗</GhostButton>
    </FadeIn>
    
    <FadeIn delay={0.5} className="flex gap-4 sm:gap-8 items-center mt-8 flex-wrap justify-center">
      <a href="https://www.linkedin.com/in/ankit-notnani/" target="_blank" rel="noreferrer" className="text-textMuted font-light uppercase tracking-widest text-xs hover:text-textMain transition-colors">in/ankit-notnani</a>
      <span className="text-textMuted text-xs">•</span>
      <a href="https://github.com/Ankitnotnani" target="_blank" rel="noreferrer" className="text-textMuted font-light uppercase tracking-widest text-xs hover:text-textMain transition-colors">github.com/Ankitnotnani</a>
      <span className="text-textMuted text-xs">•</span>
      <span className="text-textMuted font-light uppercase tracking-widest text-xs">Dehradun, India</span>
    </FadeIn>

    <div className="w-full max-w-7xl mt-24 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-textMuted font-black text-xl">AN.</div>
      <div className="text-textMuted font-light text-xs uppercase tracking-widest">Designed & built by Ankit Notnani · 2026</div>
    </div>
  </section>
);

// --- MAIN LAYOUT & GLOBAL EFFECTS ---

function App() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Custom Cursor
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorDotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const cursorDotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const cursorRingX = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const cursorRingY = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorDotX.set(e.clientX - 6);
      cursorDotY.set(e.clientY - 6);
      cursorRingX.set(e.clientX - 20);
      cursorRingY.set(e.clientY - 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorDotX, cursorDotY, cursorRingX, cursorRingY]);

  return (
    <div className="relative min-h-screen bg-dark overflow-x-clip selection:bg-primary/30 selection:text-white">
      {/* Custom Cursor */}
      <motion.div className="hidden md:block fixed w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999]" style={{ x: cursorDotX, y: cursorDotY, mixBlendMode: 'difference' }} />
      <motion.div className="hidden md:block fixed w-10 h-10 border border-primary/40 rounded-full pointer-events-none z-[9998]" style={{ x: cursorRingX, y: cursorRingY }} />

      {/* Vertical Progress Bar */}
      <div className="hidden md:block fixed right-0 top-0 w-1 h-screen bg-white/5 z-50">
        <motion.div className="w-full origin-top" style={{ scaleY, background: 'linear-gradient(180deg, #B600A8, #7621B0)' }} />
      </div>

      <main className="w-full">
        <HeroSection />
        <TextMarqueeSection />
        <AboutSection />
        <JourneySection />
        <ExpertiseSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;