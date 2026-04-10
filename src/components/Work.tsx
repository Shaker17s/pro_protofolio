import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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
          {[
            {
              title: "Django BookStore",
              category: "Scalable E-commerce",
              tools: "Django, PostgreSQL, Stripe, Redis",
              link: "https://github.com/Shaker17s/django_store",
              image: "/images/bookstore_final.png" 
            },
            {
              title: "NexusAI Hub",
              category: "Professional AI Social Network",
              tools: "React, Django REST, NLP, AWS",
              link: "https://github.com/Shaker17s/NexusAI",
              image: "/images/nexus_v2.png"
            },
            {
              title: "VisionScribe",
              category: "CV Interaction System",
              tools: "Python, OpenCV, MediaPipe",
              link: "https://github.com/Shaker17s/VisionScribe",
              image: "/images/visionscribe.png"
            },
          ].map((project, index) => (
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
                <p>{project.tools}</p>
                <a href={project.link} target="_blank" className="project-link-btn">View Project</a>
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
