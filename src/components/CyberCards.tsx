import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, BallCollider, RapierRigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";
import { Text } from "@react-three/drei";

interface CardProps {
  position: [number, number, number];
  title: string;
  color: string;
}

const Card = ({ position, title, color }: CardProps) => {
  const api = useRef<RapierRigidBody>(null);

  // Apply continuous floaty forces
  useFrame((state, delta) => {
    if (!api.current) return;
    const time = state.clock.getElapsedTime();
    const bob = Math.sin(time * 2) * 0.1;
    
    // Apply a slight upward force counteracting gravity and adding bob
    api.current.applyImpulse({ x: 0, y: 0.1 + bob * delta, z: 0 }, true);
    
    // Apply a random torque for slow rotation
    api.current.applyTorqueImpulse({ 
      x: Math.sin(time) * 0.005, 
      y: Math.cos(time) * 0.005, 
      z: 0 
    }, true);
  });

  return (
    <RigidBody
      ref={api}
      position={position}
      linearDamping={4}
      angularDamping={4}
      restitution={1.2}
      friction={0.1}
      colliders="cuboid"
    >
      {/* Visual Mesh */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3, 4, 0.2]} />
        <meshPhysicalMaterial 
          color={color}
          transmission={0.5}
          opacity={0.8}
          transparent
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      <Text position={[0, 0, 0.15]} fontSize={0.5} color="#fff" outlineColor="#000" outlineWidth={0.05}>
        {title}
      </Text>
    </RigidBody>
  );
};

// Pointer repeller
const PointerRepeller = () => {
  const ref = useRef<RapierRigidBody>(null);
  
  useFrame(({ pointer, viewport }) => {
    if (!ref.current) return;
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;
    // Keep repeller at mouse position but slightly in front of cards
    ref.current.setNextKinematicTranslation(new THREE.Vector3(x, y, 2));
  });

  return (
    <RigidBody position={[0, 0, 2]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
};

// Invisible boundaries to keep cards on screen
const Bounds = () => {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <CuboidCollider position={[0, 15, 0]} args={[30, 2, 10]} />
      <CuboidCollider position={[0, -15, 0]} args={[30, 2, 10]} />
      <CuboidCollider position={[-20, 0, 0]} args={[2, 30, 10]} />
      <CuboidCollider position={[20, 0, 0]} args={[2, 30, 10]} />
      <CuboidCollider position={[0, 0, -5]} args={[30, 30, 2]} />
      <CuboidCollider position={[0, 0, 10]} args={[30, 30, 2]} />
    </RigidBody>
  );
};

export default function CyberCards() {
  return (
    <group>
      <PointerRepeller />
      <Bounds />
      <Card position={[-5, 0, 0]} title="About" color="#0ff" />
      <Card position={[0, 2, 0]} title="Projects" color="#f0f" />
      <Card position={[5, -2, 0]} title="Skills" color="#90f" />
    </group>
  );
}
