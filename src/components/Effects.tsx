import { EffectComposer, Bloom, ChromaticAberration, Scanline } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

export default function Effects() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={4}>
      <Bloom 
        intensity={1.5} 
        luminanceThreshold={0.2} 
        luminanceSmoothing={0.9} 
        mipmapBlur 
      />
      <ChromaticAberration 
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.002, 0.002)}
      />
      <Scanline 
        blendFunction={BlendFunction.OVERLAY} 
        density={2.5} 
        opacity={0.3}
      />
    </EffectComposer>
  );
}
