import { useRef, useEffect } from "react";
import gsap from "gsap";

export function useMagnetic() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      const distance = Math.sqrt(x * x + y * y);
      const radius = 100;

      if (distance < radius) {
        xTo(x * 0.35);
        yTo(y * 0.35);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", mouseMove);
    element.addEventListener("mouseleave", mouseLeave);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      element.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return ref;
}
