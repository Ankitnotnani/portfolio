import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components ---

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-12">
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">{title}</h2>
    <div className="h-px w-full bg-gradient-to-r from-blue-600 to-transparent opacity-50" />
  </div>
);

// --- Main App Component ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`html { scroll-behavior: smooth; background-color: #000; }`}</style>

      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="text-gray-500 tracking-[0.3em] text-sm font-light mb-4 uppercase">Loading</div>
            <div className="text-6xl md:text-8xl font-bold text-white mb-8 tabular-nums">
              {progress}%
            </div>
            <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-black text-gray-300 font-sans selection:bg-blue-900 selection:text-white">
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-gray-900">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <span className="text-white font-bold tracking-widest text-lg">AN.</span>
            <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide">
              <a href="#about" className="hover:text-blue-400 transition-colors">ABOUT</a>
              <a href="#experience" className="hover:text-blue-400 transition-colors">EXPERIENCE</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">PROJECTS</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">CONTACT</a>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-32">
          
          {/* Hero Section */}
          <section id="about" className="min-h-[70vh] flex flex-col justify-center pt-20">
            <FadeIn>
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                <div className="flex-1 space-y-6">
                  <p className="text-blue-500 font-medium tracking-widest uppercase text-sm">AI & ML Engineer • Full Stack Developer</p>
                  <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter leading-tight">
                    Ankit <br /> Notnani
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed">
                    Building intelligent systems and seamless digital experiences. Turning complex data into scalable solutions.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-6">
                    <a href="/certs/Ankit_Notnani_Resume.pdf" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-blue-50 transition-colors text-sm uppercase tracking-wide flex items-center justify-center">
                      View Resume
                    </a>
                    <a href="#projects" className="px-8 py-4 bg-transparent border border-gray-700 text-white font-semibold rounded-full hover:border-blue-500 hover:text-blue-400 transition-colors text-sm uppercase tracking-wide flex items-center justify-center">
                      See My Work
                    </a>
                  </div>
                </div>

                {/* Profile Picture */}
                <div className="w-56 h-56 md:w-80 md:h-80 shrink-0 rounded-full overflow-hidden border-4 border-gray-900 shadow-[0_0_40px_rgba(37,99,235,0.1)]">
                  <img 
                    src="/profile.jpg" 
                    alt="Ankit Notnani" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400/111111/333333?text=AN";
                    }}
                  />
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Infinite Scroll Skills Marquee */}
          <div className="overflow-hidden whitespace-nowrap w-full py-6 border-y border-gray-900 bg-black/50">
            <motion.div
              className="flex gap-10 items-center w-max"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            >
              {[...Array(2)].map((_, index) => (
                <div key={index} className="flex gap-10 items-center uppercase tracking-widest text-sm text-gray-500 font-semibold">
                  <span className="text-blue-600">✦</span>
                  <span>MOBILENETV2</span>
                  <span className="text-blue-600">✦</span>
                  <span>FASTAPI</span>
                  <span className="text-blue-600">✦</span>
                  <span>REACT.JS</span>
                  <span className="text-blue-600">✦</span>
                  <span>SPRING BOOT</span>
                  <span className="text-blue-600">✦</span>
                  <span>PYTHON</span>
                  <span className="text-blue-600">✦</span>
                  <span>NLP</span>
                  <span className="text-blue-600">✦</span>
                  <span>NASA GRAND FINALIST</span>
                  <span className="text-blue-600">✦</span>
                  <span>SMART INDIA HACKATHON</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Skills / Tech Stack */}
          <section>
            <FadeIn>
              <SectionHeader title="Technical Arsenal" />
              <div className="flex flex-wrap gap-3">
                {['Python', 'Java', 'React.js', 'Next.js', 'Spring Boot', 'FastAPI', 'Node.js', 'TensorFlow', 'PyTorch', 'OpenCV', 'SQL', 'MongoDB', 'Docker', 'AWS'].map((skill, i) => (
                  <span key={i} className="px-5 py-2.5 bg-gray-900/50 border border-gray-800 rounded-md text-gray-300 text-sm font-medium hover:border-blue-500 hover:text-white transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </FadeIn>
          </section>

          {/* The Path So Far (Timeline) */}
          <section id="experience">
            <FadeIn>
              <SectionHeader title="The Path So Far" />
              <div className="relative border-l-2 border-blue-600/50 ml-3 md:ml-4 space-y-16 py-4">
                
                {/* 2021 */}
                <div className="relative pl-10">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <p className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2">2021</p>
                  <h3 className="text-2xl font-bold text-white mb-3">Foundation Set</h3>
                  <p className="text-gray-400 leading-relaxed max-w-2xl">Class X ICSE — 91%. First encounter with structured learning and problem-solving at St. George's College, Agra.</p>
                </div>

                {/* 2023 */}
                <div className="relative pl-10">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <p className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2">2023</p>
                  <h3 className="text-2xl font-bold text-white mb-3">Found My Edge</h3>
                  <p className="text-gray-400 leading-relaxed max-w-2xl">B.Tech CSE (AI & ML) at UPES Dehradun. Python, data structures, and the realization that code is a tool for understanding, not just building.</p>
                </div>

                {/* 2024 */}
                <div className="relative pl-10">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <p className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2">2024</p>
                  <h3 className="text-2xl font-bold text-white mb-3">First Real Impact</h3>
                  <p className="text-gray-400 leading-relaxed max-w-2xl">Built ExamHub online platform. Completed a Social Internship at Chhanv Foundation, digitizing records and supporting campaigns.</p>
                </div>

                {/* 2025 */}
                <div className="relative pl-10">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <p className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2">2025</p>
                  <h3 className="text-2xl font-bold text-white mb-3">Leadership at Scale</h3>
                  <p className="text-gray-400 leading-relaxed max-w-2xl">Chairperson, UPES ACM Student Chapter. Organized ICMLDE 3.0, ICACSDF'25, Lady Ada'25, GGJ'25. Learned that execution is everything.</p>
                </div>

                {/* NOW */}
                <div className="relative pl-10">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <p className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2">NOW</p>
                  <h3 className="text-2xl font-bold text-white mb-3">Building Forward</h3>
                  <p className="text-gray-400 leading-relaxed max-w-2xl">Currently working on AI and Feature based projects including ARIMA and LSTM modelling. Every project sharper than the last.</p>
                </div>

                {/* NEXT */}
                <div className="relative pl-10">
                  <div className="absolute w-3 h-3 border-2 border-blue-500 bg-black rounded-full -left-[7px] top-2" />
                  <p className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-2">NEXT →</p>
                  <h3 className="text-2xl font-bold text-white mb-3">What’s Ahead</h3>
                  <p className="text-gray-400 leading-relaxed max-w-2xl">Seeking roles where data, engineering, and impact intersect. Ready to contribute at scale.</p>
                </div>

              </div>
            </FadeIn>
          </section>

          {/* Internships & Work Experience */}
          <section>
            <FadeIn>
              <SectionHeader title="Internships" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Empyrean */}
                <a href="/certs/empyrean-offer-letter.pdf" target="_blank" rel="noreferrer" className="group flex flex-col justify-between p-8 border border-gray-800 rounded-2xl bg-gray-900/20 hover:bg-gray-900/60 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">AI & ML Intern</h3>
                      <span className="text-xs font-medium px-3 py-1 bg-gray-800 rounded-full text-gray-300">2026</span>
                    </div>
                    <p className="text-blue-500 font-medium text-sm mb-4">Empyrean Consultancy Services</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">Designing computer vision models for automated object readiness detection using drone imagery.</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">View Document →</span>
                </a>

                {/* Binary Keeda */}
                <a href="/certs/binarykeeda-internship-certificate.pdf" target="_blank" rel="noreferrer" className="group flex flex-col justify-between p-8 border border-gray-800 rounded-2xl bg-gray-900/20 hover:bg-gray-900/60 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Tech & Social Media</h3>
                      <span className="text-xs font-medium px-3 py-1 bg-gray-800 rounded-full text-gray-300">2025</span>
                    </div>
                    <p className="text-blue-500 font-medium text-sm mb-4">Binary Keeda</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">Scaled audience engagement via data-backed content mapping strategies.</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">View Certificate →</span>
                </a>

                {/* Chhanv Foundation */}
                <a href="/certs/chhanv-internship-certificate.pdf" target="_blank" rel="noreferrer" className="group flex flex-col justify-between p-8 border border-gray-800 rounded-2xl bg-gray-900/20 hover:bg-gray-900/60 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Social Intern</h3>
                      <span className="text-xs font-medium px-3 py-1 bg-gray-800 rounded-full text-gray-300">2024</span>
                    </div>
                    <p className="text-blue-500 font-medium text-sm mb-4">Chhanv Foundation</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">Digitized critical records, supported organizational campaigns, and developed streamlined data management processes.</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">View Certificate →</span>
                </a>

              </div>
            </FadeIn>
          </section>

          {/* Projects */}
          <section id="projects">
            <FadeIn>
              <SectionHeader title="Selected Projects" />
              <div className="grid grid-cols-1 gap-6">
                
                {/* Project 1 */}
                <a href="https://github.com/Ankitnotnani/banana-sense-ai" target="_blank" rel="noreferrer" className="group block p-8 md:p-10 border border-gray-800 rounded-2xl bg-gray-900/20 hover:bg-gray-900/60 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">BananaSense AI</h3>
                      <p className="text-gray-400 max-w-xl">Multi-class banana ripeness classifier built with MobileNetV2 transfer learning on a custom dataset with real-time FastAPI output.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300">FastAPI</span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300">React</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">View Source Code →</span>
                </a>

                {/* Project 2 */}
                <a href="https://github.com/Ankitnotnani/ChronoClime" target="_blank" rel="noreferrer" className="group block p-8 md:p-10 border border-gray-800 rounded-2xl bg-gray-900/20 hover:bg-gray-900/60 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">ChronoClime</h3>
                      <p className="text-gray-400 max-w-xl">NASA Space Apps Grand Finalist. Designed a personalised activity-centric weather risk metric integrated with IoT gateway and AI chatbot.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300">IoT</span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300">Python</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">View Source Code →</span>
                </a>

                {/* Project 3 */}
                <a href="https://github.com/Ankitnotnani/IDEACT" target="_blank" rel="noreferrer" className="group block p-8 md:p-10 border border-gray-800 rounded-2xl bg-gray-900/20 hover:bg-gray-900/60 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">IDEACT</h3>
                      <p className="text-gray-400 max-w-xl">AI platform mapping hackathon problem statements to UN SDGs using NLP, outputting project ideas and execution roadmaps.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300">NLP</span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300">MongoDB</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">View Source Code →</span>
                </a>

              </div>
            </FadeIn>
          </section>

          {/* Certifications */}
          <section>
            <FadeIn>
              <SectionHeader title="Certifications" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <a href="/certs/aws-prompt.pdf" target="_blank" rel="noreferrer" className="group flex flex-col justify-between p-8 border border-gray-800 rounded-2xl bg-gray-900/20 hover:bg-gray-900/60 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">AWS Foundations of Prompt Engineering</h3>
                    <p className="text-gray-400 text-sm mb-6">Amazon Web Services</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">View Credential →</span>
                </a>
                
                <a href="/certs/deloitte-analytics.pdf" target="_blank" rel="noreferrer" className="group flex flex-col justify-between p-8 border border-gray-800 rounded-2xl bg-gray-900/20 hover:bg-gray-900/60 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">Data Analytics Job Simulation</h3>
                    <p className="text-gray-400 text-sm mb-6">Deloitte via Forage</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">View Credential →</span>
                </a>

                <a href="/certs/ibm-sql.pdf" target="_blank" rel="noreferrer" className="group flex flex-col justify-between p-8 border border-gray-800 rounded-2xl bg-gray-900/20 hover:bg-gray-900/60 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">SQL & Relational Databases 101</h3>
                    <p className="text-gray-400 text-sm mb-6">IBM Skills Network</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">View Credential →</span>
                </a>

                <a href="/certs/microsoft-genai.pdf" target="_blank" rel="noreferrer" className="group flex flex-col justify-between p-8 border border-gray-800 rounded-2xl bg-gray-900/20 hover:bg-gray-900/60 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">Career Essentials in Generative AI</h3>
                    <p className="text-gray-400 text-sm mb-6">Microsoft & LinkedIn</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">View Credential →</span>
                </a>

              </div>
            </FadeIn>
          </section>

          {/* Contact & Links */}
          <section id="contact" className="pb-20">
            <FadeIn>
              <SectionHeader title="Connect" />
              <div className="flex flex-col border-t border-gray-900">
                
                <a href="mailto:ankitnotnani6497@gmail.com" className="group flex flex-col md:flex-row justify-between items-start md:items-center w-full py-8 border-b border-gray-900 hover:bg-gray-900/30 transition-colors px-4 cursor-pointer block">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2 md:mb-0">Email</span>
                  <span className="text-white font-medium text-lg md:text-xl group-hover:text-blue-400 transition-colors">ankitnotnani6497@gmail.com</span>
                </a>

                <a href="https://linkedin.com/in/ankit-notnani" target="_blank" rel="noreferrer" className="group flex flex-col md:flex-row justify-between items-start md:items-center w-full py-8 border-b border-gray-900 hover:bg-gray-900/30 transition-colors px-4 cursor-pointer block">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2 md:mb-0">LinkedIn</span>
                  <span className="text-white font-medium text-lg md:text-xl group-hover:text-blue-400 transition-colors">in/ankit-notnani</span>
                </a>

                <a href="https://github.com/Ankitnotnani" target="_blank" rel="noreferrer" className="group flex flex-col md:flex-row justify-between items-start md:items-center w-full py-8 border-b border-gray-900 hover:bg-gray-900/30 transition-colors px-4 cursor-pointer block">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2 md:mb-0">GitHub</span>
                  <span className="text-white font-medium text-lg md:text-xl group-hover:text-blue-400 transition-colors">Ankitnotnani</span>
                </a>

              </div>
            </FadeIn>
          </section>

        </div>
      </main>
    </>
  );
}