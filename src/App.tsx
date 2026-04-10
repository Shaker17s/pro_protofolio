import { useEffect } from "react";
import MainContainer from "./components/MainContainer";
import CharacterModel from "./components/Character";
import { useLoading } from "./context/LoadingProvider";
import Loading from "./components/Loading";
import { initSmoothScroll, destroySmoothScroll } from "./utils/scroll";
import "./App.css";

export default function App() {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    initSmoothScroll();

    // Fixed time transition: Site opens regardless of 3D state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 
    
    return () => {
      clearTimeout(timer);
      destroySmoothScroll();
    };
  }, [setIsLoading]);

  return (
    <div className="app-shell">
      {/* Loading becomes an Overlay (not blocking React tree) */}
      <Loading percent={100} isOverlay={true} />
      
      <main className={`main-body ${!isLoading ? "content-ready" : ""}`}>
        <MainContainer>
          <CharacterModel />
        </MainContainer>
      </main>

      <div className="site-background">
        <div className="background-glow background-glow--left" />
        <div className="background-glow background-glow--right" />
      </div>
    </div>
  );
}
