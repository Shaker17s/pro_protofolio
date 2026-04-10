import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CyberCameraRigProps {
  targetSection: "home" | "about" | "projects";
}

const SECTION_CAMERAS = {
  home: {
    position: new THREE.Vector3(0, 0, 20),
    lookAt: new THREE.Vector3(0, 0, 0),
  },
  about: {
    position: new THREE.Vector3(-10, 5, 15),
    lookAt: new THREE.Vector3(-5, 0, 0),
  },
  projects: {
    position: new THREE.Vector3(10, -5, 10),
    lookAt: new THREE.Vector3(0, 2, 0),
  },
};

export default function CyberCameraRig({ targetSection }: CyberCameraRigProps) {
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Determine target based on state
    const target = SECTION_CAMERAS[targetSection] || SECTION_CAMERAS.home;

    // Add slight mouse sway to target position
    const mouseSwayX = state.pointer.x * 2;
    const mouseSwayY = state.pointer.y * 2;
    
    const finalTargetPos = new THREE.Vector3().copy(target.position);
    finalTargetPos.x += mouseSwayX;
    finalTargetPos.y += mouseSwayY;

    // Smoothly interpolate camera position
    state.camera.position.lerp(finalTargetPos, delta * 2);
    
    // Smoothly interpolate lookAt target
    lookAtRef.current.lerp(target.lookAt, delta * 3);
    state.camera.lookAt(lookAtRef.current);
  });

  return null; // This is a logic-only component
}
