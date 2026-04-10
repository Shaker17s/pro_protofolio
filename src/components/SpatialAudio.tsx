import { useEffect, useRef } from "react";
import { PositionalAudio } from "@react-three/drei";
import * as THREE from "three";

interface SpatialAudioProps {
  url: string;
  position: [number, number, number];
  play: boolean;
  loop?: boolean;
}

export default function SpatialAudio({ url, position, play, loop = false }: SpatialAudioProps) {
  const audioRef = useRef<THREE.PositionalAudio>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    
    // Check if the source buffer is loaded before trying to play
    if (play && audioRef.current.buffer) {
      if (!audioRef.current.isPlaying) {
        audioRef.current.play();
      }
    } else {
      if (audioRef.current.isPlaying) {
        audioRef.current.stop();
      }
    }
  }, [play, url]);

  return (
    <PositionalAudio
      ref={audioRef}
      url={url}
      distanceModel="exponential"
      rolloffFactor={1}
      refDistance={2}
      position={position}
      loop={loop}
    />
  );
}
