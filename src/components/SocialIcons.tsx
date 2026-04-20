import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { useMagnetic } from "../hooks/useMagnetic";
import "./styles/SocialIcons.css";

const MagneticLink = ({ children, href, ariaLabel }: { children: React.ReactNode, href: string, ariaLabel: string }) => {
  const ref = useMagnetic();
  return (
    <div ref={ref as any} className="magnetic-wrap">
      <a href={href} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label={ariaLabel} title={ariaLabel}>
        {children}
      </a>
    </div>
  );
};

const SocialIcons = () => {
  const socials = [
    { icon: <FiGithub />, link: "https://github.com/Shaker17s", label: "GitHub Profile" },
    { icon: <FiLinkedin />, link: "https://www.linkedin.com/in/shaker-abdallah-79b0a1339/", label: "LinkedIn Profile" },
    { icon: <FiInstagram />, link: "https://www.instagram.com/s_h_a_k_err/", label: "Instagram Profile" },
  ];

  return (
    <div className="icons-section">
      <div className="social-icons-wrapper">
        <div className="social-icons">
          {socials.map((social, index) => (
            <MagneticLink key={index} href={social.link} ariaLabel={social.label}>
              {social.icon}
            </MagneticLink>
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
