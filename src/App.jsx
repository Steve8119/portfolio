import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import profileImage from './assets/profile.jpg'; // Import the image
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [typedSkills, setTypedSkills] = useState("");
  const skills = ["Graphic Designer", "Web Developer", "Social Media Manager", "Live Streaming Expert"];

  // Typing animation effect
  useEffect(() => {
    let i = 0;
    let skillIndex = 0;
    const typing = setInterval(() => {
      if (i < skills[skillIndex].length) {
        setTypedSkills(skills[skillIndex].substring(0, i + 1));
        i++;
      } else {
        setTimeout(() => {
          skillIndex = (skillIndex + 1) % skills.length;
          i = 0;
        }, 2000);
      }
    }, 150);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="app">
      {/* Enhanced 3D Background */}
      <div className="canvas-container">
        <Canvas>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={2}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
        </Canvas>
      </div>

      {/* Navigation Bar */}
      <nav>
        <ul>
          <li><button onClick={() => setActiveSection('about')}>About</button></li>
          <li><button onClick={() => setActiveSection('skills')}>Skills</button></li>
          <li><button onClick={() => setActiveSection('experience')}>Experience</button></li>
          <li><button onClick={() => setActiveSection('contact')}>Contact</button></li>
        </ul>
      </nav>

      {/* Main Content with Profile Image */}
      <main className="centered-content">
        <motion.div 
          className="profile-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="profile-image">
            <img 
              src={profileImage} 
              alt="Stephen Waithaka" 
              className="profile-img"
            />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Stephen Waithaka
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {typedSkills}<span className="cursor">|</span>
        </motion.h2>
        
        <motion.div 
          className="about-short"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p>Creative professional with a degree in [Your Field] graduated December 2024. Currently serving as Graphic Designer and Social Media Manager at Ridgeways Pentecostal Church with expertise in live streaming.</p>
          <button onClick={() => setShowAboutPopup(true)}>Read More</button>
        </motion.div>
      </main>

      {/* Popup Sections */}
      <AnimatePresence>
        {activeSection && (
          <motion.div 
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSection(null)}
          >
            <motion.div 
              className="popup-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setActiveSection(null)}>
                &times;
              </button>
              {activeSection === 'about' && (
                <div className="section-content">
                  <h2>About Me</h2>
                  <p>I'm a creative professional with expertise in graphic design, web development, and social media management. Graduated in December 2024 with a degree in [Your Field].</p>
                  <p>Currently working at Ridgeways Pentecostal Church where I handle all visual design, social media strategy, and live streaming of church events.</p>
                </div>
              )}
              {activeSection === 'skills' && (
                <div className="section-content">
                  <h2>My Skills</h2>
                  <ul>
                    <li><strong>Graphic Design:</strong> Adobe Photoshop, Illustrator, InDesign</li>
                    <li><strong>Web Development:</strong> HTML, CSS, JavaScript, React</li>
                    <li><strong>Social Media:</strong> Content strategy, analytics, community management</li>
                    <li><strong>Live Streaming:</strong> OBS Studio, live production, technical setup</li>
                  </ul>
                </div>
              )}
              {activeSection === 'experience' && (
                <div className="section-content">
                  <h2>Work Experience</h2>
                  <div className="experience-item">
                    <h3>Ridgeways Pentecostal Church</h3>
                    <p className="position">Graphic Designer & Social Media Manager</p>
                    <p className="duration">2024 - Present</p>
                    <ul>
                      <li>Design all church publications and digital assets</li>
                      <li>Manage all social media platforms and engagement</li>
                      <li>Coordinate live streaming of weekly services and events</li>
                    </ul>
                  </div>
                </div>
              )}
              {activeSection === 'contact' && (
                <div className="section-content">
                  <h2>Contact Me</h2>
                  <div className="contact-info">
                    <p><strong>Email:</strong> stephen@example.com</p>
                    <p><strong>Phone:</strong> +254 7XX XXX XXX</p>
                    <p><strong>Social Media:</strong> @stephendesigns</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Popup */}
      <AnimatePresence>
        {showAboutPopup && (
          <motion.div 
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAboutPopup(false)}
          >
            <motion.div 
              className="popup-content about-popup"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setShowAboutPopup(false)}>
                &times;
              </button>
              <h2>About Stephen</h2>
              <div className="about-content">
                <div className="about-image">
                  <img src={profileImage} alt="Stephen Waithaka" className="profile-img" />
                </div>
                <div className="about-text">
                  <p>I graduated in December 2024 with a degree in [Your Field] and have since been working at Ridgeways Pentecostal Church where I handle graphic design, social media management, and live streaming of events.</p>
                  <p>My passion lies in creating visually appealing designs while also building functional websites and managing online presence for organizations.</p>
                  <p>When I'm not working, I enjoy photography, videography, and exploring new technologies in the digital space.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;