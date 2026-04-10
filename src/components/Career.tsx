import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Engineering Student</h4>
                <h5>Al-Azhar University</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Started my official engineering journey. Focused on foundations of 
              Computer Science and Mathematics. Completed Harvard's CS50 with honors.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>Computer Vision Focus</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Built "Air Canvas" and several automation tools. Deep dived into 
              Python, OpenCV, and MediaPipe to create gesture-based interaction systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Prompt Engineer</h4>
                <h5>Professional Practice</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Specializing in advanced LLM interactions, RLHF, and AI-driven 
              application architecture. Certified in professional SEO and technical performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
