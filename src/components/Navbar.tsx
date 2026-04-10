import HoverLinks from "./HoverLinks";
import { useMagnetic } from "../hooks/useMagnetic";
import { scrollTo } from "../utils/scroll";
import "./styles/Navbar.css";

const MagneticNavItem = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const ref = useMagnetic();
  return (
    <div ref={ref as any} className="magnetic-nav-wrap">
      <a 
        href={href} 
        className="nav-item"
        onClick={(e) => {
          e.preventDefault();
          scrollTo(href);
        }}
      >
        {children}
      </a>
    </div>
  );
};

const Navbar = () => {
  return (
    <>
      <div className="header">
        <ul>
          <li>
            <MagneticNavItem href="#about">
              <span className="nav-index">01</span>
              <HoverLinks text="ABOUT" />
            </MagneticNavItem>
          </li>
          <li>
            <MagneticNavItem href="#skills">
              <span className="nav-index">02</span>
              <HoverLinks text="SKILLS" />
            </MagneticNavItem>
          </li>
          <li>
            <MagneticNavItem href="#work">
              <span className="nav-index">03</span>
              <HoverLinks text="PROJECTS" />
            </MagneticNavItem>
          </li>
          <li>
            <MagneticNavItem href="#contact">
              <span className="nav-index">04</span>
              <HoverLinks text="CONTACT" />
            </MagneticNavItem>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
