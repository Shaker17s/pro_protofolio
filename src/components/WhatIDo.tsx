import { useState } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          M<span className="hat-h2">Y</span>
          <div>
            S<span className="do-h2">KILLS</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>
          
          <div
            className={`what-content ${activeIndex === 0 ? "what-content-active" : ""} ${activeIndex !== null && activeIndex !== 0 ? "what-sibling" : ""}`}
            onClick={() => toggleItem(0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AI PROMPTING</h3>
              <h4>Description</h4>
              <p>
                Optimizing the intersection of human language and machine logic. 
                I specialize in RLHF, prompt chaining, and behavior tuning for LLMs 
                to ensure maximum reliability and creative output.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                {["Prompt Engineering", "RLHF", "LLM Tuning", "OpenAI API", "LangChain", "Prompt Chaining"].map(tag => (
                  <div key={tag} className="what-tags">{tag}</div>
                ))}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          <div
            className={`what-content ${activeIndex === 1 ? "what-content-active" : ""} ${activeIndex !== null && activeIndex !== 1 ? "what-sibling" : ""}`}
            onClick={() => toggleItem(1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>SOFTWARE DEV</h3>
              <h4>Description</h4>
              <p>
                Building robust AI-driven applications and automation ecosystems. 
                From real-time computer vision tools to sophisticated 
                LinkedIn automation suites, I write performant, future-proof code.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                {["Python", "JavaScript", "OpenCV", "MediaPipe", "React.js", "TypeScript", "Node.js", "Selenium"].map(tag => (
                  <div key={tag} className="what-tags">{tag}</div>
                ))}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
