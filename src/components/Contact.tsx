import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:shakerabdallah66@gmail.com" data-cursor="disable">
                shakerabdallah66@gmail.com
              </a>
            </p>
            <h4>Academic</h4>
            <p>
              <a href="#" data-cursor="disable">
                AL-AZHAR UNIVERSITY
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Stay Connected</h4>
            <div className="footer-icons">
              <a href="https://github.com/Shaker17s" target="_blank" rel="noreferrer"><FiGithub /></a>
              <a href="https://www.linkedin.com/in/shaker-abdallah-79b0a1339/" target="_blank" rel="noreferrer"><FiLinkedin /></a>
              <a href="https://www.instagram.com/s_h_a_k_err/" target="_blank" rel="noreferrer"><FiInstagram /></a>
            </div>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Shaker Abdallah</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
