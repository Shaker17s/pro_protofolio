import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  const main = document.querySelector(".main-body");
  if (main) main.classList.add("content-ready");
  
  gsap.to("body", {
    backgroundColor: "#030303",
    duration: 0.5,
    delay: 1,
  });

  // Simple Entrance Animation instead of SplitText
  gsap.fromTo(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
