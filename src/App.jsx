import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import profileImage from './assets/profile.jpg';
import './App.css';

// Sample gallery images (replace with your actual work images)
import project1 from './assets/projects/project1.jpg';
import project2 from './assets/projects/project2.jpg';
import project3 from './assets/projects/project3.jpg';
import project4 from './assets/projects/project4.jpg';
import project5 from './assets/projects/project5.jpg';
import project6 from './assets/projects/project6.jpg';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [typedSkills, setTypedSkills] = useState("");
  const skills = ["Graphic Designer", "Web Developer", "Social Media Manager", "Live Streaming Expert"];
  
  // Gallery images data
  const galleryImages = [
    { id: 1, src: project1, title: "Stylish Fashion Promo" },
    { id: 2, src: project2, title: "Modern Elegant Furniture" },
    { id: 3, src: project3, title: "Outdoor Design Experts" },
    { id: 4, src: project4, title: "Three hybrid cars" },
    { id: 5, src: project5, title: "Electrical sockets advertised" },
    { id: 6, src: project6, title: "Hair salon promotion" }
  ];

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
          <li><button onClick={() => setActiveSection('gallery')}>Gallery</button></li>
          <li><button onClick={() => setActiveSection('contact')}>Contact</button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="centered-content">
        <motion.div 
          className="profile-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="profile-image">
            <img src={profileImage} alt="Stephen Waithaka" className="profile-img" />
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
          <p>ICT graduate with expertise in graphic design, web development and social media management. Founder of Kaatech, a creative studio specializing in digital solutions. Currently serving as Graphic Designer and Social Media Manager at Ridgeways Pentecostal Church.</p>
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
                  <p>I graduated with a degree in Information Communication Technology (ICT) and have since been working at Ridgeways Pentecostal Church where I handle graphic design, social media management, and live streaming of events.</p>
                  <p>During my university years, I founded Kaatech - a creative studio specializing in web development, graphic design, and social media management. We've successfully delivered projects for various clients, helping them establish their digital presence.</p>
                  <p>My passion lies in creating visually appealing designs while also building functional websites and managing online presence for organizations.</p>
                </div>
              )}

              {activeSection === 'skills' && (
                <div className="section-content">
                  <h2>My Skills</h2>
                  <ul>
                    <li><strong>Graphic Design:</strong> Adobe Photoshop, Illustrator, InDesign, Canva</li>
                    <li><strong>Web Development:</strong> HTML, CSS, JavaScript, React, WordPress</li>
                    <li><strong>Social Media:</strong> Content strategy, analytics, community management</li>
                    <li><strong>Live Streaming:</strong> OBS Studio, live production, technical setup</li>
                    <li><strong>UI/UX Design:</strong> Figma, Adobe XD, prototyping</li>
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
                      <li>Develop and maintain church website</li>
                    </ul>
                  </div>
                  <div className="experience-item">
                    <h3>Kaatech Creative Studio</h3>
                    <p className="position">Founder & Creative Director</p>
                    <p className="duration">2021 - Present</p>
                    <ul>
                      <li>Provide web development and graphic design services</li>
                      <li>Manage social media accounts for clients</li>
                      <li>Develop brand identities and marketing materials</li>
                      <li>Train interns in digital design tools</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeSection === 'gallery' && (
                <div className="section-content">
                  <h2>My Work Gallery</h2>
                  <div className="gallery-grid">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="gallery-item">
                        <img src={image.src} alt={image.title} />
                        <p>{image.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'contact' && (
                <div className="section-content">
                  <h2>Contact Me</h2>
                  <div className="contact-info">
                    <p><strong>Email:</strong> stevenwaithaka81192@gmail.com</p>
                    <p><strong>Phone:</strong> +254 794 194 058</p>
                    <p><strong>Social Media:</strong> @stephenwaithaka (All platforms)</p>
                    <p><strong>Kaatech Studio:</strong> @kaatechstudio</p>
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
                  <p>ICT graduate with extensive experience in digital design and development. Founded Kaatech during my university years to provide professional design services to clients while still studying.</p>
                  <p>At Ridgeways Pentecostal Church, I oversee all visual communications including print materials, digital assets, and live streaming productions. My technical skills combined with creative vision help deliver impactful visual solutions.</p>
                  <p>When I'm not working, I enjoy photography, videography, and exploring new technologies in the digital space. I'm passionate about mentoring young designers and sharing knowledge through workshops and tutorials.</p>
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