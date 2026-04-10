import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLAnchorElement;
        const href = target.getAttribute("data-href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          lenis.scrollTo(href);
        }
      });
    });

    // Magnetic Effect for Navbar Items
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      const el = item as HTMLElement;
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="header">
        <ul>
          <li>
            <a data-href="#about" href="#about" className="nav-item">
              <span className="nav-index">01</span>
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#skills" href="#skills" className="nav-item">
              <span className="nav-index">02</span>
              <HoverLinks text="SKILLS" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work" className="nav-item">
              <span className="nav-index">03</span>
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact" className="nav-item">
              <span className="nav-index">04</span>
              <HoverLinks text="CONTACT" />
            </a>
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
