import React from "react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import "./styles/SocialIcons.css";

const SocialIcons = () => {
  const socials = [
    { icon: <FiGithub />, link: "https://github.com/Shaker17s" },
    { icon: <FiLinkedin />, link: "https://www.linkedin.com/in/shaker-abdallah-79b0a1339/" },
    { icon: <FiInstagram />, link: "https://www.instagram.com/s_h_a_k_err/" },
  ];

  return (
    <div className="icons-section">
      <div className="social-icons-wrapper">
        <div className="social-icons">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="icons-line"></div>
      <div className="resume-button">
        <span>RESUME</span>
      </div>
    </div>
  );
};

export default SocialIcons;
