import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, animate, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

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
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-[200px]">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-bold text-2xl tracking-widest"
        >
          AN.
        </motion.h1>
        
        <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"
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
        <span className="text-[clamp(1.5rem,3vw,2.5rem)] text-purple-500 mt-2 ml-1">{suffix}</span>
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
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-[#050505]/80 border-b border-white/[0.04] z-50 flex justify-between items-center px-6 md:px-12 py-5">
        <div className="font-bold text-xl tracking-widest text-white">AN.</div>
        <div className="hidden md:flex gap-8 items-center">
          {['About', 'Journey', 'Work', 'Projects', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-white/60 text-xs font-medium uppercase tracking-[0.15em] hover:text-white transition-colors">
              {link}
            </a>
          ))}
          <a href="/Ankit_Notnani_Resume.pdf" target="_blank" rel="noreferrer" className="border border-white/20 rounded-full px-6 py-2 text-white text-xs font-medium uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all flex items-center gap-2">
            Resume <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-16 mt-10">
        <div className="flex flex-col flex-1">
          <FadeIn y={10}>
            <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-8 flex flex-wrap gap-4">
              <span>CS Undergrad</span>
              <span className="text-purple-500">•</span>
              <span>AI & ML Engineer</span>
              <span className="text-purple-500">•</span>
              <span>Full-Stack Developer</span>
            </p>
          </FadeIn>
          
          <FadeIn delay={0.1} y={20} className="flex flex-col">
            <h1 className="font-black uppercase tracking-tighter leading-[0.85] text-[clamp(4rem,12vw,9rem)] text-white">
              ANKIT
            </h1>
            <h1 className="font-black uppercase tracking-tighter leading-[0.85] text-[clamp(4rem,12vw,9rem)] text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}>
              NOTNANI
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2} y={20} className="mt-12 max-w-xl">
            <p className="text-white/60 font-light text-[clamp(1rem,1.5vw,1.1rem)] leading-relaxed">
              I build intelligent systems and scalable web architectures. 
              Grand Finalist at NASA Space Apps 2025 and Smart India Hackathon. 
              Turning raw ideas into deployed, production-ready products.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3} className="flex gap-4 mt-12 flex-wrap">
            <a href="#projects" className="bg-white text-black rounded-full px-8 py-4 text-sm font-medium flex items-center gap-3 hover:bg-gray-200 transition-colors">
              View Projects <ArrowRight size={16} />
            </a>
            <a href="/Ankit_Notnani_Resume.pdf" target="_blank" rel="noreferrer" className="border border-white/20 rounded-full px-8 py-4 text-white text-sm font-medium flex items-center gap-3 hover:bg-white/5 transition-colors">
              Resume <ArrowUpRight size={16} />
            </a>
          </FadeIn>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-4 opacity-40 uppercase tracking-widest text-[10px] text-white">
        <span className="animate-pulse">↓</span> Scroll to explore
      </div>
    </section>
  );
};

const TextMarqueeSection = () => {
  const { scrollY } = useScroll();
  const x1 = useTransform(scrollY, [0, 3000], [0, 1000]);
  
  const tags = [
    "NASA Grand Finalist", "Smart India Hackathon", "Computer Vision", "MobileNetV2", "FastAPI", "React.js", "Spring Boot", "Python", "NLP"
  ];

  return (
    <section className="py-6 border-y border-white/[0.05] bg-[#050505] overflow-hidden">
      <motion.div style={{ x: x1 }} className="flex gap-8 whitespace-nowrap will-change-transform ml-[-50vw]">
        {[...tags, ...tags, ...tags, ...tags].map((text, i) => (
          <div key={i} className="flex items-center gap-8 text-white/30 uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium">
            {text}
            <span className="text-purple-500/50">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

const AboutSection = () => (
  <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#050505]" id="about">
    <div className="max-w-7xl mx-auto">
      <SectionHeader num="01" title="About" />
      
      <div className="max-w-5xl">
        <AnimatedText 
          text="I've always been drawn to the intersection of artificial intelligence and scalable software, the moment when complex algorithms become real-world solutions."
          className="font-medium text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.2] tracking-tight" 
        />
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 text-white/50 font-light leading-relaxed text-sm md:text-base">
          <FadeIn>
            <p>
              Alpha Batch at UPES — selected for top DSA tier. With hands-on experience spanning deep learning to distributed microservices, I design computer vision models, NLP platforms, and real-time inference software.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="border-l border-white/10 pl-6 flex flex-col justify-center">
              <span className="text-blue-500 font-mono text-xs tracking-widest mb-2">01</span>
              <h4 className="text-white font-medium mb-2">Systems Engineering</h4>
              <p className="text-xs">I architect, train, and deploy. No guessing.</p>
            </div>
          </FadeIn>
        </div>
      </div>
      
      <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 border-y border-white/[0.05] py-20">
        <AnimatedCounter target="2" label="National Finals" suffix="+" />
        <AnimatedCounter target="8" label="Major Projects" />
        <AnimatedCounter target="94" label="NLP Model Accuracy" suffix="%" />
        <AnimatedCounter target="50" label="Audience Scale" suffix="%" />
      </div>
    </div>
  </section>
);

const JourneySection = () => {
  const journey = [
    { year: "2021", title: "Foundation Set", desc: "Class X ICSE — 91%. First encounter with structured learning and problem-solving at St. George's College, Agra." },
    { year: "2023", title: "Found My Edge", desc: "B.Tech CSE (AI & ML) at UPES Dehradun. Python, data structures, and the realization that code is a tool for understanding, not just building." },
    { year: "2024", title: "First Real Impact", desc: "Built ExamHub online platform. Completed a Social Internship at Chhanv Foundation, digitizing records and supporting campaigns." },
    { year: "2025", title: "Deep Into ML & Grand Finals", desc: "Developed BananaSense AI. Scaled audience engagement by 50% at Binary Keeda. Team Lead/Software Lead at NASA Space Apps & Smart India Hackathon." },
    { year: "2026", title: "Industry Application", desc: "AI & ML Project Intern at Empyrean Consultancy Services. Designing computer vision models for automated object readiness detection using drone imagery." }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#050505]" id="journey">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="02" title="Journey" />
        
        <FadeIn>
          <h2 className="font-bold text-[clamp(3rem,6vw,5rem)] tracking-tight text-white mb-24">The path so far.</h2>
        </FadeIn>
        
        <div className="max-w-3xl relative">
          <div className="absolute left-1.5 top-2 bottom-2 w-[1px] bg-white/10" />
          
          <div className="flex flex-col gap-16">
            {journey.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} y={20} className="relative pl-12 md:pl-20 group">
                <div className="absolute left-[5px] top-1.5 w-1 h-1 rounded-full bg-white group-hover:scale-[3] group-hover:bg-blue-500 transition-all duration-300" />
                <div className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-3">{item.year}</div>
                <h3 className="text-white font-medium text-xl md:text-2xl mb-3 tracking-tight">{item.title}</h3>
                <p className="text-white/50 font-light text-sm md:text-base leading-relaxed">{item.desc}</p>
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
      ]
    },
    {
      date: "2025", type: "INTERNSHIP",
      title: "Tech & Social Media Intern", company: "Binary Keeda",
      points: [
        "Scaled audience engagement via data-backed content mapping strategies.",
        "Achieved a 50% uplift in core engagement metrics.",
        "Managed cross-platform media distribution and analytics."
      ]
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#050505]" id="work">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="03" title="Work" />
        
        <FadeIn>
          <h2 className="font-bold text-[clamp(3rem,6vw,5rem)] tracking-tight text-white mb-24">Where I've delivered.</h2>
        </FadeIn>
        
        <div className="flex flex-col gap-6">
          {roles.map((role, i) => (
            <FadeIn key={i} delay={i * 0.1} y={20} className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 md:p-12 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-white/40 font-mono text-xs tracking-widest">{role.date}</span>
                <span className="text-blue-500/80 font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-blue-500/20">{role.type}</span>
              </div>
              <h3 className="text-white font-bold text-2xl md:text-3xl tracking-tight mb-2">{role.title}</h3>
              <div className="text-blue-400 font-medium text-sm md:text-base mb-8">{role.company}</div>
              
              <ul className="flex flex-col gap-4">
                {role.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-4 text-white/60 font-light text-sm md:text-base">
                    <span className="text-blue-500/50 mt-1">▸</span> {point}
                  </li>
                ))}
              </ul>
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
      name: "Programming",
      skills: ["Python", "Java", "C++", "C", "JavaScript", "TypeScript", "HTML/CSS"]
    },
    {
      name: "Frameworks & Backend",
      skills: ["React.js", "FastAPI", "Spring Boot", "Spring Cloud", "Flask", "Node.js"]
    },
    {
      name: "ML & AI",
      skills: ["TensorFlow", "Keras", "MobileNetV2", "OpenCV", "Scikit-learn", "NLP", "Pandas", "NumPy"]
    },
    {
      name: "Tools & Platforms",
      skills: ["Git", "Docker", "MySQL", "MongoDB", "Firebase", "Linux", "Postman", "Raspberry Pi", "IoT"]
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto border-t border-white/[0.05] pt-32">
        <FadeIn>
          <h2 className="font-bold text-[clamp(2.5rem,5vw,4rem)] tracking-tight text-white mb-20">Tools of the trade.</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8">
          {categories.map((cat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <h3 className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase mb-8">{cat.name}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, j) => (
                  <span key={j} className="px-5 py-2.5 rounded-full border border-white/10 text-white/60 text-xs tracking-wide bg-white/[0.02] hover:bg-white/10 hover:text-white transition-colors cursor-default">
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
    { num: "01", status: "COMPLETED", tech: "Python · Transfer Learning · FastAPI · React", title: "BananaSense AI", desc: "Multi-class ripeness classifier built with MobileNetV2 on a custom dataset. Real-time prediction output via REST API.", metric: "End-to-end pipeline from dataset to deployment." },
    { num: "02", status: "COMPLETED", tech: "NLP · FastAPI · React · MongoDB", title: "IDEACT", desc: "AI platform mapping problem statements to all 17 UN SDGs. Outputs feasibility-scored project execution roadmaps.", metric: "94.12% F1-Macro score across 17 categories." },
    { num: "03", status: "NASA FINALS", tech: "React · TypeScript · IoT · FastAPI", title: "ChronoClime", desc: "Personalised 1–10 activity-centric weather risk metric (ACIS) integrating hardware location input and an AI chatbot.", metric: "Grand Finalist — NASA Space Apps Challenge 2025." },
    { num: "04", status: "SIH FINALS", tech: "Raspberry Pi · React · Firebase · Python", title: "KASA Track System", desc: "AI-powered laser QR marking system for Indian Railways. Built full lifecycle traceability syncing with UDM & TMS portals.", metric: "Grand Finalist — Smart India Hackathon 2025." }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#050505]" id="projects">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="04" title="Projects" />
        
        <FadeIn>
          <h2 className="font-bold text-[clamp(3rem,6vw,5rem)] tracking-tight text-white mb-20 border-b border-white/10 pb-12">Selected work.</h2>
        </FadeIn>
        
        <div className="flex flex-col">
          {projects.map((proj, i) => (
            <FadeIn key={i} y={20} className="py-16 border-b border-white/10 flex flex-col md:flex-row gap-8 md:gap-24 group hover:bg-white/[0.02] transition-colors -mx-6 px-6 md:-mx-12 md:px-12 rounded-2xl">
              <div className="font-bold text-[clamp(4rem,6vw,5rem)] text-white/20 leading-none group-hover:text-white/40 transition-colors">
                {proj.num}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <span className="text-blue-400 font-mono text-[10px] tracking-widest uppercase bg-blue-500/10 px-3 py-1 rounded">{proj.status}</span>
                  <span className="text-white/30 font-mono text-[10px] tracking-widest uppercase">{proj.tech}</span>
                </div>
                
                <h3 className="text-white font-bold text-2xl md:text-3xl tracking-tight mb-4">{proj.title}</h3>
                <p className="text-white/50 font-light leading-relaxed mb-6 max-w-2xl text-sm md:text-base">
                  {proj.desc}
                </p>
                <p className="text-cyan-400 font-medium text-sm md:text-base">
                  {proj.metric}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#050505]" id="contact">
    <div className="max-w-7xl mx-auto">
      <SectionHeader num="05" title="Contact" />
      
      <div className="flex flex-col md:flex-row justify-between gap-16 mt-12">
        <div className="flex-1 max-w-2xl">
          <FadeIn>
            <h2 className="font-bold text-[clamp(4rem,8vw,7rem)] leading-[1] tracking-tighter text-white mb-10">
              Let's build something<br/>that matters.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-white/50 font-light text-base md:text-lg leading-relaxed mb-16">
              I'm actively seeking AI/ML and backend software engineering opportunities. Whether it's a role, a collaboration, or just a good technical discussion—reach out. The best opportunities start with a simple message.
            </p>
          </FadeIn>
        </div>
        
        <div className="w-full md:w-[400px] flex flex-col gap-0 border-t border-white/10 pt-4">
          <FadeIn delay={0.2} className="flex justify-between items-center py-6 border-b border-white/10 group">
            <span className="text-white/40 font-mono text-xs tracking-widest uppercase">Email</span>
            <a href="mailto:ankitnotnani6497@gmail.com" className="text-white/80 group-hover:text-white transition-colors text-sm font-medium">ankitnotnani6497@gmail.com</a>
          </FadeIn>
          <FadeIn delay={0.3} className="flex justify-between items-center py-6 border-b border-white/10 group">
            <span className="text-white/40 font-mono text-xs tracking-widest uppercase">LinkedIn</span>
            <a href="https://linkedin.com/in/ankit-notnani" target="_blank" rel="noreferrer" className="text-white/80 group-hover:text-white transition-colors text-sm font-medium">in/ankit-notnani</a>
          </FadeIn>
          <FadeIn delay={0.4} className="flex justify-between items-center py-6 border-b border-white/10 group">
            <span className="text-white/40 font-mono text-xs tracking-widest uppercase">Github</span>
            <a href="https://github.com/Ankitnotnani" target="_blank" rel="noreferrer" className="text-white/80 group-hover:text-white transition-colors text-sm font-medium">Ankitnotnani</a>
          </FadeIn>
        </div>
      </div>
      
      <div className="mt-32 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/5">
        <div className="text-white font-bold text-xl tracking-widest">AN.</div>
        <div className="text-white/30 font-mono text-[10px] uppercase tracking-[0.2em]">Designed & Built by Ankit Notnani · 2026</div>
      </div>
    </div>
  </section>
);

// --- MAIN LAYOUT ---

function App() {
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
    <div className="relative min-h-screen bg-[#050505] overflow-x-clip selection:bg-white/20 selection:text-white text-white font-sans">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div className="hidden md:block fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]" style={{ x: cursorDotX, y: cursorDotY, mixBlendMode: 'difference' }} />
      <motion.div className="hidden md:block fixed w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9998]" style={{ x: cursorRingX, y: cursorRingY }} />

      {!loading && (
        <main className="w-full">
          <HeroSection />
          <TextMarqueeSection />
          <AboutSection />
          <JourneySection />
          <WorkSection />
          <ToolsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      )}
    </div>
  );
}

export default App;