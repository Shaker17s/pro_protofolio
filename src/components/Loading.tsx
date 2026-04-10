import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";

interface LoadingProps {
  percent?: number;
  isOverlay?: boolean;
}

const Loading = ({ percent = 0 }: LoadingProps) => {
  const { isLoading } = useLoading();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Trigger entrance effects if any
      import("./utils/initialFX").then(m => m.initialFX());
      
      // Delay unmounting for animation
      const timer = setTimeout(() => setShouldRender(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div className={`loading-overlay ${!isLoading ? "exit" : ""}`}>
      <div className="loading-header">
        <span className="loader-title">SHAKER ABDALLAH</span>
        <div className="loader-status">
          INITIALIZING_NEURAL_SHELL... [{percent}%]
        </div>
      </div>

      <div className="loading-center">
        <div className="marquee-wrap">
          <Marquee speed={120} gradient={false}>
            <span className="marquee-text">AI PROMPT ENGINEER // SOFTWARE DEVELOPER // AL-AZHAR UNIVERSITY // </span>
          </Marquee>
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="loading-footer">
        <div className="loading-glitch">EST. 2026</div>
        <div className="loading-brand">OS_NEURAL_LINK_V1</div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
