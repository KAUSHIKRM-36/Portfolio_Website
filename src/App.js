import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram , FaEnvelope } from 'react-icons/fa';
import { FiSun, FiMoon, FiMenu, FiExternalLink } from 'react-icons/fi';
import { SiC, SiHtml5, SiCss3, SiJavascript, SiReact, SiGit, SiNodedotjs } from 'react-icons/si';
import { FaCode, FaCodeBranch } from 'react-icons/fa'; // Generic icons for Java, APIs, and Open Source
import { MdLanguage } from 'react-icons/md'; // Generic icon for Java
import ThreeBackground from './components/ThreeBackground';

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home'); // New state

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const skills = [
    { name: 'C', icon: SiC },
    { name: 'Java', icon: MdLanguage }, // Generic icon for Java
    { name: 'HTML', icon: SiHtml5 },
    { name: 'CSS', icon: SiCss3 },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'React.js', icon: SiReact },
    { name: 'APIs', icon: FaCode }, // Using a generic code icon for APIs
    { name: 'Open Source', icon: FaCodeBranch }, // Using a generic code branch icon for Open Source
    { name: 'Git', icon: SiGit },
    { name: 'Node.js', icon: SiNodedotjs }
  ];
  
  
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  const handleNavClick = (id) => {
  setIsMenuOpen(false);
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  setActiveSection(id); // Update active section
};

  

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Scroll event to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;

          if (scrollPosition >= sectionTop - sectionHeight / 3 && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={scrollRef} className={`relative overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-transparent to-black' : 'bg-gradient-to-b from-transparent to-white '}`} />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-opacity-50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <motion.a
            href="#home"
            className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            KAUSHIK
          </motion.a>
          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={isDarkMode ? 'text-white' : 'text-black'}>
                <FiMenu size={24} />
              </button>
            </div>
            <ul className={`md:flex space-x-6 ${isMenuOpen ? 'block absolute top-full left-0 right-0 bg-opacity-50 backdrop-blur-md p-4' : 'hidden md:block'}`}>
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <motion.li key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * ['home', 'about', 'skills', 'projects', 'contact'].indexOf(item) }}
                >
                  <a
                    href={`#${item}`}
                    className={`hover:opacity-70 transition-opacity capitalize ${isDarkMode ? 'text-white' : 'text-black'} ${activeSection === item ? 'font-bold' : ''}`} // Highlight active link
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              {isDarkMode ? '' : ''}
            </button>
          </div>
        </div>
      </nav>

  {/* Home Section */}
  <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
    <ThreeBackground isDarkMode={isDarkMode} />
    <motion.h1 
      className="text-6xl sm:text-8xl font-bold tracking-tighter z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ y: textY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      KAUSHIK
    </motion.h1>
    <motion.p 
      className="mt-4 text-xl text-center max-w-md z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      style={{ y: textY }}
    >
      Crafting digital experiences through code and creativity.
    </motion.p>
    <motion.div
      className="mt-8 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <a 
        href="#contact" 
        className={`px-6 py-3 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-full font-semibold hover:opacity-80 transition-opacity`}
        onClick={(e) => {
          e.preventDefault();
          handleNavClick('contact');
        }}
      >
        Get in touch
      </a>
    </motion.div>

    {/* Flashing "Click and Move" Message at the bottom center */}
    <motion.div
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-2xl sm:text-2xl font-semibold text-center z-20"
      style={{ fontFamily: "'Courier New', monospace" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      Click anywhere and Move
    </motion.div>
  </section>


      {/* About Section */}
      <section id="about" className={`min-h-screen flex flex-col items-center justify-center p-0 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <motion.h2 
          className="text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <motion.div 
          className="max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="mb-4">
            Hello! I'm Kaushik, a student developer with a keen interest in creating intuitive and efficient web applications, familiar with the fundamentals of C, Java, JavaScript and front-end technologies, like React.js.
          </p>
          <p className="mb-4">
            My journey in software development began with a fascination for problem-solving and has evolved into a career focused on building scalable solutions that make a difference. I'm always eager to learn new technologies and methodologies to stay at the forefront of web development.
          </p>
          <p>
            When I'm not coding, you can find me exploring new hiking trails, spending time with my friends, or contributing to open-source projects. I believe in the power of technology to transform lives and am committed to creating accessible and user-friendly digital experiences.
          </p>
        </motion.div>
      </section>

      {/* Education Section */}
      <section id="education" className={`min-h-screen flex flex-col items-center justify-center p-0 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <motion.h2 
          className="text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>
        <motion.div 
          className="max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="mb-4">
            Sri Jayachamarajendra College of Engineering, Mysuru – 570006 <br />
            2022-2026 <br />
            Computer Science Engineering | CGPA: 9.32
          </p>
          <p className="mb-4">
            KLE Prerana Residential Science PU College, Hubballi <br />
            2020-2022 <br />
            PCMB (Board Percentage – 97.33%)
          </p>
          <p>
            Peoples High School, Mala - Panaji, GOA <br />
            2020 <br />
            (Board Percentage – 95.16%)
          </p>
        </motion.div>
      </section>
 
      {/* Skills Section */}
      <section id="skills" className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <motion.h2 
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <skill.icon size={64} className={isDarkMode ? 'text-white' : 'text-black'} />
              <span className="mt-2 text-lg">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <motion.h2 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {[ 
            {
              title: "Spotify Clone",
              description: " A music player clone built with HTML, CSS, and JavaScript, mimicking Spotify's interface and functionality.",
              link: "YOUR_GITHUB_LINK_FOR_SPOTIFY_CLONE" // Add your GitHub link here
            },
            {
              title: "E-commerce Website",
              description: " A simple e-commerce site created using HTML, CSS, and JavaScript, featuring product listings and a shopping cart",
              link: "YOUR_GITHUB_LINK_FOR_ECOMMERCE_WEBSITE" // Add your GitHub link here
            },
            {
              title: "Text Summarizer",
              description: "An application that utilizes APIs to summarize text inputs effectively and efficiently",
              link: "YOUR_GITHUB_LINK_FOR_TEXT_SUMMARIZER" // Add your GitHub link here
            }
          ].map((project, index) => (
            <motion.div 
              key={index}
              className={`p-6 rounded-lg ${isDarkMode ? 'bg-white bg-opacity-10' : 'bg-black bg-opacity-10'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="mb-4">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center">
                View Project <FiExternalLink size={16} className="ml-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Source Contributions Section */}
      <section id="open-source-contributions" className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <motion.h2 
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Participations
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <motion.div 
            className={`p-6 rounded-lg ${isDarkMode ? 'bg-white bg-opacity-10' : 'bg-black bg-opacity-10'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-2">Hacktoberfest 2024</h3>
            <p className="mb-4">Earned 4 badges for contributing to various open source projects.</p>
          </motion.div>

          <motion.div 
            className={`p-6 rounded-lg ${isDarkMode ? 'bg-white bg-opacity-10' : 'bg-black bg-opacity-10'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-2">GirlScript Summer of Code 2024</h3>
            <p className="mb-4">Successfully earned a GSSoC badge for contributions to open source.</p>
          </motion.div>

          <motion.div 
            className={`p-6 rounded-lg ${isDarkMode ? 'bg-white bg-opacity-10' : 'bg-black bg-opacity-10'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-2">Postman API Challenge</h3>
            <p className="mb-4">Earned a badge for successfully completing the Postman API Challenge.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <motion.h2 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>
        <motion.div 
          className="mt-8 flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a href="https://github.com/KAUSHIKRM-36" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label="GitHub">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/kaushik-rajesh-mahajan-a277aa264/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href="https://www.instagram.com/_.kaushik._06" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label="Instagram"> {/* Replace 'yourusername' with your actual Instagram username */}
            <FaInstagram size={24} />
          </a>
          <a href="mailto:belikekaushik@gmail.com" className="hover:opacity-70 transition-opacity" aria-label="Email">
            <FaEnvelope size={24} />
          </a>
        </motion.div>
      </section>

      {/* Hover Effect */}
      {isHovered && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight 
              }}
              animate={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default App;
