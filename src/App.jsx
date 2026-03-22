import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from './data';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    let xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
    let yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Expand cursor on interactive elements
    const links = document.querySelectorAll('a, button, .project-card');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(cursorRef.current, { scale: 3, duration: 0.3, backgroundColor: 'white', mixBlendMode: 'difference' });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3, backgroundColor: '#facc15', mixBlendMode: 'normal' });
      });
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div id="custom-cursor" ref={cursorRef}>
      <div className="cursor-dot"></div>
    </div>
  );
};

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { top: 0, duration: 0.8, ease: "power4.inOut" });
      gsap.fromTo(linksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, { top: "-100%", duration: 0.8, ease: "power4.inOut" });
    }
  }, [isOpen]);

  const navLinks = [
    { name: "About", href: "#bio" },
    { name: "Education", href: "#expertise" },
    { name: "Skills", href: "#expertise" },
    { name: "Achievements", href: "#achievements" },
    { name: "Certifications", href: "#certifications" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-[100] flex justify-between items-center px-8 md:px-16 pt-6 pb-4 bg-transparent">
        {/* Logo / Name */}
        <div className="font-black tracking-widest text-xl md:text-2xl uppercase text-black">
          {portfolioData.personalInfo.name}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-widest uppercase text-black">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-gray-600 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="flex md:hidden flex-col gap-[5px] group overflow-hidden z-[101] relative w-8 h-6 justify-center">
          <div className={`w-8 h-[2px] transition-all duration-300 ${isOpen ? 'bg-white rotate-45 translate-y-[3px]' : 'bg-black group-hover:w-6'}`}></div>
          <div className={`w-8 h-[2px] transition-all duration-300 ${isOpen ? 'bg-white -rotate-45 -translate-y-[4px]' : 'bg-black group-hover:w-4'}`}></div>
        </button>
      </nav>

      {/* Full Screen Overlay Menu */}
      <div ref={menuRef} className="fixed top-[-100%] left-0 w-full h-full bg-[#111] z-[90] flex items-center justify-center rounded-b-[3rem] shadow-2xl">
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <li key={link.name} ref={el => linksRef.current[i] = el} className="overflow-hidden">
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-5xl md:text-7xl font-black text-white hover:text-gray-400 transition-colors uppercase tracking-tighter block"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const Hero = () => {
  const container = useRef();
  const { name, greeting, subtitle, avatarUrl, currentStatus } = portfolioData.personalInfo;
  const firstName = name.toLowerCase();

  useGSAP(() => {
    // Timeline for Hero entry
    const tl = gsap.timeline();
    tl.fromTo('.hero-pill', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo('.hero-greeting', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo('.hero-title span', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.6")
      .fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6");
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-4 overflow-hidden -z-0">
      <div className="flex flex-col items-center z-10 w-full bg-cover">
        {/* Profile Image and 'Currently at' text */}
        <div className="hero-pill flex items-center gap-6 mb-16">
          {/* Circular Image Container */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white shadow-md border-4 border-white shrink-0 flex items-center justify-center">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold bg-gray-100 text-gray-400 w-full h-full flex items-center justify-center">SC</span>
            )}
          </div>

          <div className="text-left">
            <span className="text-gray-600 block text-lg font-medium mb-0.5">Currently at</span>
            <span className="font-black text-2xl md:text-[2rem] leading-none flex items-center gap-2">
              {currentStatus}
              <span className="w-2 h-2 rounded-full bg-[#8bc34a] inline-block mt-2"></span>
            </span>
          </div>
        </div>

        {/* Greeting */}
        {greeting && (
          <h3 className="hero-greeting text-xl md:text-3xl font-medium text-gray-600 mb-6 text-center">
            {greeting}
          </h3>
        )}

        {/* Giant Name */}
        <h1 className="hero-title giant-text text-center flex flex-col items-center md:items-start tracking-tighter overflow-hidden mb-16">
          <span className="block origin-bottom">{firstName}</span>
        </h1>

        {/* Subtitle */}
        <h2 className="hero-subtitle text-lg md:text-xl font-medium tracking-wide text-gray-800 uppercase text-center max-w-3xl leading-relaxed">
          {subtitle}
        </h2>
      </div>
    </section>
  );
};

const SectionDivider = ({ text }) => {
  return (
    <div className="w-full flex items-center justify-center py-24 px-6 gap-6 relative z-10">
      <div className="h-[1px] bg-gray-300 flex-1 max-w-[200px]"></div>
      <div className="text-xs tracking-widest uppercase font-bold text-gray-500 whitespace-nowrap">{text}</div>
      <div className="h-[1px] bg-gray-300 flex-1 max-w-[200px]"></div>
    </div>
  );
};

const About = () => {
  const container = useRef();
  const words = portfolioData.personalInfo.bio.split(" ");

  useGSAP(() => {
    gsap.fromTo(".bio-word",
      { color: "#d1d5db" }, // text-gray-300
      {
        color: "#111827", // text-gray-900
        duration: 0.1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        }
      }
    );
  }, { scope: container });

  return (
    <section id="bio" className="px-6 md:px-24 py-12 max-w-5xl mx-auto flex justify-center relative z-10">
      <div ref={container} className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.4] text-center md:text-left tracking-tight max-w-4xl text-gray-900">
        "
        {words.map((word, i) => (
          <span key={i} className="bio-word inline-block mr-2">{word}</span>
        ))}
        "
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef();
  const previewRef = useRef();

  useGSAP(() => {
    // Entrance animation
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: cardRef });

  const handleMouseEnter = () => {
    gsap.to(previewRef.current, { scale: 1.05, duration: 0.5, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(previewRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card group relative bg-white rounded-3xl p-8 md:p-12 mb-12 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col md:flex-row gap-12 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 z-10"
    >
      <div className="flex-1 flex flex-col justify-between z-10 w-full">
        <div>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 group-hover:text-gray-700 transition-colors uppercase leading-none">{project.title}</h3>
          <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <span key={tech} className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-gray-200">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors w-full md:w-auto">
              View Live <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-gray-100 text-black px-6 py-3.5 rounded-full font-medium hover:bg-gray-200 transition-colors border border-gray-200 w-full md:w-auto">
              Source Code
            </a>
          )}
        </div>
      </div>

      <div className="flex-1 bg-[#f9f9f9] rounded-2xl flex items-center justify-center p-4 border border-gray-200 overflow-hidden min-h-[300px] w-full relative">
        {project.liveLink ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            ref={previewRef}
            className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl border border-gray-200 overflow-hidden relative block cursor-none"
          >
            {project.image ? (
              <img src={project.image} alt={`${project.title} Preview`} className="w-full h-full object-cover object-top pointer-events-none" />
            ) : (
              <iframe
                src={project.liveLink}
                title={`${project.title} Live Preview`}
                className="w-[200%] h-[200%] absolute top-0 left-0 border-none scale-50 origin-top-left pointer-events-none"
                tabIndex={-1}
              />
            )}
          </a>
        ) : (
          <div ref={previewRef} className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl border border-gray-200 overflow-hidden relative">
            {project.image ? (
              <img src={project.image} alt={`${project.title} Preview`} className="w-full h-full object-cover object-top" />
            ) : (
              <div className="text-gray-400 font-medium uppercase tracking-widest text-sm text-center px-4">
                Live Preview Not Available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="px-4 md:px-12 max-w-7xl mx-auto z-10 relative" id="projects">
      {portfolioData.projects.map((proj, idx) => (
        <ProjectCard key={proj.title} project={proj} index={idx} />
      ))}
    </section>
  );
};

const CertCard = ({ cert, index }) => {
  const cardRef = useRef();

  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="project-card group relative bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between z-10"
    >
      <div>
        <div className="flex flex-wrap gap-3 justify-between items-start mb-6">
          <span className="bg-[#f3f3f3] text-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border border-gray-200">
            {cert.issuer}
          </span>
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">{cert.date}</span>
        </div>
        <h3 className="text-2xl font-black tracking-tighter mb-4 text-gray-900 group-hover:text-gray-700 transition-colors leading-tight uppercase">
          {cert.title}
        </h3>
      </div>

      {cert.link ? (
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center justify-center gap-2 bg-black text-white px-6 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Verify Certificate <ArrowUpRight className="w-4 h-4" />
        </a>
      ) : (
        <div className="mt-8 inline-flex items-center justify-center gap-2 bg-gray-50 text-gray-400 px-6 py-3.5 rounded-full font-medium border border-gray-200 cursor-not-allowed">
          Link Not Available
        </div>
      )}
    </div>
  );
};

const Certifications = () => {
  return (
    <section className="px-4 md:px-12 max-w-7xl mx-auto z-10 relative mb-12" id="certifications">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData.experienceAndAchievements.certifications.map((cert, idx) => (
          <CertCard key={cert.title} cert={cert} index={idx} />
        ))}
      </div>
    </section>
  );
};

const SkillsExperience = () => {
  const containerRef = useRef();
  const { skills, education, experienceAndAchievements } = portfolioData;

  useGSAP(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="expertise" ref={containerRef} className="px-6 md:px-24 py-24 max-w-7xl mx-auto bg-white rounded-3xl my-12 shadow-sm border border-gray-100 z-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Left Column - Skills */}
        <div>
          <h3 className="text-3xl font-black tracking-tighter mb-10 border-b border-gray-200 pb-4 uppercase">Core Competencies</h3>
          <div className="space-y-12">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-5 font-bold">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <div className="flex flex-wrap gap-2.5">
                  {items.map(skill => (
                    <span key={skill} className="bg-[#f3f3f3] border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-200 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Education & Certs */}
        <div>
          <h3 className="text-3xl font-black tracking-tighter mb-10 border-b border-gray-200 pb-4 uppercase">Background</h3>

          <div className="mb-14">
            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-8 font-bold">Education</h4>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
              {education.map((edu, idx) => (
                <div key={idx} className="relative pl-8 md:pl-0">
                  <div className="md:hidden absolute left-0 w-4 h-4 rounded-full bg-black border-4 border-white top-1"></div>
                  <div className="bg-[#f9f9f9] p-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">{edu.duration}</div>
                    <h5 className="text-xl font-black text-gray-900 mb-2 leading-tight">{edu.degree}</h5>
                    <p className="text-sm font-medium text-gray-600 mb-4">{edu.institution}</p>
                    <span className="inline-block bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Achievements = () => {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.fromTo(".ach-item",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="px-6 md:px-24 py-16 max-w-7xl mx-auto bg-white rounded-3xl my-12 shadow-sm border border-gray-100 z-10 relative" id="achievements">
      <div className="flex flex-col gap-6">
        {portfolioData.experienceAndAchievements.achievements.map((ach, i) => (
          <div key={i} className="ach-item flex items-start md:items-center gap-6 bg-[#f9f9f9] p-6 md:p-8 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg md:text-xl shrink-0">
              {i + 1}
            </div>
            <p className="text-base md:text-lg font-medium text-gray-800 leading-relaxed">
              {ach}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#111] text-white py-24 px-6 md:px-12 rounded-[3rem] shadow-2xl mt-32 flex flex-col items-center text-center mx-4 md:mx-12 mb-12 relative z-10 border border-white/10">
    <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none">Let's Connect</h2>
    <p className="text-gray-400 max-w-lg mx-auto mb-12 text-lg md:text-xl font-medium leading-relaxed">Interested in working together or just want to say hi? I'm always open to discussing new projects and opportunities.</p>

    <div className="flex gap-6 mb-24">
      <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.personalInfo.contact.email}`} target="_blank" rel="noopener noreferrer" className="bg-white text-black p-5 rounded-full hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95" aria-label="Email (Gmail)">
        <Mail className="w-6 h-6" />
      </a>
      <a href={portfolioData.personalInfo.contact.github} className="bg-[#222] text-white p-5 rounded-full hover:bg-[#333] border border-white/10 transition-transform hover:scale-105 active:scale-95" aria-label="GitHub">
        <Github className="w-6 h-6" />
      </a>
      <a href={portfolioData.personalInfo.contact.linkedin} className="bg-[#222] text-white p-5 rounded-full hover:bg-[#333] border border-white/10 transition-transform hover:scale-105 active:scale-95" aria-label="LinkedIn">
        <Linkedin className="w-6 h-6" />
      </a>
    </div>

    <div className="w-full max-w-5xl border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-sm tracking-wide text-gray-500 font-medium">
      <p>© {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.</p>
      <p className="mt-4 md:mt-0 flex items-center gap-2">Designed using <span className="text-white">GSAP & React</span></p>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen p-2 md:p-6 bg-transparent">
      <CustomCursor />
      {/* Outer container matching the 'iPad' look in Aryan's theme */}
      <div className="bg-grid min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-3rem)] rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gray-300 relative flex flex-col bg-[#f3f3f3]">
        <TopNav />
        <main className="flex-1 w-full mx-auto relative z-10 pb-12">
          <Hero />
          <SectionDivider text="Bio" />
          <About />
          <SectionDivider text="Featured Works" />
          <Projects />
          <SectionDivider text="Certifications" />
          <Certifications />
          <SectionDivider text="Expertise & Journey" />
          <SkillsExperience />
          <SectionDivider text="Achievements" />
          <Achievements />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
