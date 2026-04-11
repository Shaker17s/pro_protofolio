import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { portfolioData } from "../data/portfolioData";
import { useMagnetic } from "../hooks/useMagnetic";

gsap.registerPlugin(useGSAP);

const MagneticButton = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const ref = useMagnetic();
  return (
    <div ref={ref} className="magnetic-btn-wrap">
      <a href={href} target="_blank" className="project-link-btn">{children}</a>
    </div>
  );
};

const Work = () => {
  useGSAP(() => {
    gsap.from(".work-box", {
      scrollTrigger: {
        trigger: ".work-flex",
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    });
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Projects</span>
        </h2>
        <div className="work-flex">
          {portfolioData.projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Core Stack</h4>
                <p>{project.tools.join(", ")}</p>
                <MagneticButton href={project.link}>View Project</MagneticButton>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
