import Lenis from "@studio-freight/lenis";

let lenisInstance: Lenis | null = null;

export const initSmoothScroll = (options = {}) => {
  if (lenisInstance) return lenisInstance;
  
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    ...options
  });

  const raf = (time: number) => {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  return lenisInstance;
};

export const getLenis = () => lenisInstance;

export const scrollTo = (target: string | number | HTMLElement, options = {}) => {
  lenisInstance?.scrollTo(target, options);
};

export const destroySmoothScroll = () => {
  lenisInstance?.destroy();
  lenisInstance = null;
};
