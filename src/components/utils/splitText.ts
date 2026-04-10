import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  if (window.innerWidth < 900) return;
  
  const paras = document.querySelectorAll<HTMLElement>(".para");
  const titles = document.querySelectorAll<HTMLElement>(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para) => {
    if (para.classList.contains("split-ready")) return;
    
    const text = para.innerText;
    para.innerHTML = "";
    text.split(" ").forEach(word => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.innerText = word + " ";
      para.appendChild(span);
    });
    
    para.classList.add("split-ready");
    
    gsap.fromTo(
      para.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: para,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title) => {
    if (title.classList.contains("split-ready")) return;

    const text = title.innerText;
    title.innerHTML = "";
    [...text].forEach(char => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.innerText = char === " " ? "\u00A0" : char;
      title.appendChild(span);
    });

    title.classList.add("split-ready");

    gsap.fromTo(
      title.children,
      { opacity: 0, y: 50, rotate: 5 },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        scrollTrigger: {
          trigger: title,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power4.out",
        stagger: 0.05,
      }
    );
  });
}
