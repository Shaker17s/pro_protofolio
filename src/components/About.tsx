import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-flex-container">
        <div className="about-avatar-wrapper">
          <img src="/images/avatar.png" alt="Programmer Avatar" className="about-avatar-img" />
        </div>
        <div className="about-me">
          <h3 className="title">About Me</h3>
          <p className="para">
            I am an Engineering Student at Al-Azhar University specializing in 
            AI Prompt Engineering & Software Development. 
            My work focuses on optimizing the friction between human intent and machine execution, 
            specifically through RLHF and advanced LLM behavior tuning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
