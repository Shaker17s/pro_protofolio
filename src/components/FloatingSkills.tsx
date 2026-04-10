import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/FloatingSkills.css";

const skills = [
  { 
    name: "Python", 
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    level: "Expert",
    desc: "Advanced logic, automation scripts, and AI integration."
  },
  { 
    name: "Django", 
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg",
    level: "Expert",
    desc: "Building secure, scalable, and complex web ecosystems."
  },
  { 
    name: "React", 
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    level: "Professional",
    desc: "Creating high-fidelity, interactive user interfaces."
  },
  { 
    name: "OpenCV", 
    icon: "https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg",
    level: "Professional",
    desc: "Computer vision and real-time image processing."
  },
  { 
    name: "OpenAI", 
    icon: "https://static.cdnlogo.com/logos/o/38/openai-icon.svg",
    level: "Expert",
    desc: "Prompt engineering and LLM lifecycle management."
  },
  { 
    name: "PostgreSQL", 
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    level: "Advanced",
    desc: "Relational database design and optimization."
  }
];

const FloatingSkills = () => {
  const [activeSkill, setActiveSkill] = useState<typeof skills[0] | null>(null);

  return (
    <div className="skills-floating-container" id="skills">
      <h2 className="skills-title">Technical Expertise</h2>
      <div className="floating-icons-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-icon-wrap"
            whileHover={{ scale: 1.2, rotate: 10 }}
            onMouseEnter={() => setActiveSkill(skill)}
            onMouseLeave={() => setActiveSkill(null)}
          >
            <img src={skill.icon} alt={skill.name} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            className="skill-card-overlay"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="skill-card">
              <div className="skill-card-header">
                <h3>{activeSkill.name}</h3>
                <span className="skill-level">{activeSkill.level}</span>
              </div>
              <p>{activeSkill.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingSkills;
