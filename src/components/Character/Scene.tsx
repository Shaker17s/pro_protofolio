import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader, DRACOLoader } from "three-stdlib";
import { useAnimations, Environment, Float, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { useLoading } from "../../context/LoadingProvider";
import { decryptFile } from "./utils/decrypt";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";

// Fallback high-quality model if local encrypted one fails (e.g. Git LFS issues)
const FALLBACK_MODEL = "https://models.readyplayer.me/638515f4972c20d210d7e4d6.glb";

const useEncryptedGLTF = (url: string, password: string) => {
  const [data, setData] = useState<any>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(10);
        let buffer: ArrayBuffer;
        try {
          buffer = await decryptFile(url, password);
        } catch (e) {
          console.warn("Encrypted model failed, loading fallback...", e);
          const response = await fetch(FALLBACK_MODEL);
          buffer = await response.arrayBuffer();
        }
        
        setLoading(50);
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("/draco/");
        loader.setDRACOLoader(dracoLoader);

        loader.parse(buffer, "", (gltf) => {
          if (active) {
            setData(gltf);
            setLoading(100);
          }
        });
      } catch (e) {
        console.error("Failed to load any model", e);
        setLoading(100); // Prevent stuck loader
      }
    };
    load();
    return () => { active = false; };
  }, [url, password]);

  return data;
};

const Model = ({ gltf, camera }: { gltf: any, camera: THREE.PerspectiveCamera }) => {
  const group = useRef<THREE.Group>(null);
  const { actions } = useAnimations(gltf.animations, group);
  const headBone = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!gltf || !group.current || !camera) return;
    headBone.current = gltf.scene.getObjectByName("Head") || gltf.scene.getObjectByName("spine006") || null;

    setCharTimeline(group.current, camera);
    setAllTimeline();

    // Start default actions
    const firstAnim = Object.values(actions)[0];
    if (firstAnim) firstAnim.play().setEffectiveWeight(1);

  }, [gltf, actions, camera]);

  useFrame((state) => {
    if (!headBone.current) return;
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    
    if (window.scrollY < 200) {
      headBone.current.rotation.y = THREE.MathUtils.lerp(headBone.current.rotation.y, mouseX * (Math.PI / 6), 0.1);
      headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, -mouseY * (Math.PI / 8) - 0.2, 0.1);
    }
  });

  return <primitive object={gltf.scene} ref={group} dispose={null} scale={8} position={[0, -8, 0]} />;
};

const Scene = () => {
  const gltf = useEncryptedGLTF("/models/character.enc", import.meta.env.VITE_MODEL_PASSWORD || "");
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (gltf) {
      // Small delay to ensure textures are uploaded
      const timer = setTimeout(() => setIsReady(true), 500);
      return () => clearTimeout(timer);
    }
  }, [gltf]);

  return (
    <div className="character-model">
      {/* Background Glow - Always visible behind high-performance Canvas */}
      <div className="scene-glow" />
      
      <Canvas 
        shadows 
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }} 
        dpr={[1, 2]}
        className={isReady ? "is-ready" : ""}
      >
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 10, 40]} fov={20} />
        <Suspense fallback={null}>
          <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
            {gltf && cameraRef.current && <Model gltf={gltf} camera={cameraRef.current} />}
          </Float>
          <ambientLight intensity={1.5} />
          <Environment preset="city" />
          
          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={1} 
              mipmapBlur 
              intensity={0.5} 
              radius={0.4}
            />
            <ChromaticAberration 
              offset={new THREE.Vector2(0.001, 0.001)} 
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
