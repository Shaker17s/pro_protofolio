import "./styles/Landing.css";
import GlitchText from "./GlitchText";

const Landing = () => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <div className="name-wrapper">
              <h1>
                <span className="name-glitch decorative"><GlitchText text="SHAKER" /></span>
                <br />
                <span className="name-glitch decorative"><GlitchText text="ABDALLAH" delay={500} /></span>
              </h1>
            </div>
            
            <div className="info-wrapper-right">
              <div className="student-tag">
                <span>STUDENT @</span>
                <h4>AL-AZHAR UNIVERSITY</h4>
              </div>
              <div className="landing-roles">
                <span>SOFTWARE ENGINEER</span>
                <span>AI PROMPT ENGINEER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
