import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, PerspectiveCamera, Float, Stars, Text, MeshDistortMaterial, Image } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS, SKILLS } from '../constants';
import gsap from 'gsap';

// --- Sub-components for clean file (in real app, separate files) ---

const HeroObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2, 0, 0]} scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#06b6d4"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

interface SkillOrbProps {
  position: [number, number, number];
  label: string;
  color: string;
}

const SkillOrb: React.FC<SkillOrbProps> = ({ position, label, color }) => {
    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
            </mesh>
            <Text
                position={[0, -0.5, 0]}
                fontSize={0.25}
                color="white"
                font="https://fonts.gstatic.com/s/orbitron/v25/yMJRMI86Z2pte2oAq4fm.woff"
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>
        </group>
    )
}

const SkillsCloud = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const skillsData = useMemo(() => {
    return SKILLS.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / SKILLS.length);
      const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
      const r = 3.5;
      return {
        ...skill,
        position: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        ] as [number, number, number]
      }
    })
  }, []);

  return (
    <group ref={groupRef} position={[-2, -12, 0]}>
        {skillsData.map((s, i) => (
            <SkillOrb key={i} position={s.position} label={s.name} color={i % 2 === 0 ? "#06b6d4" : "#a855f7"} />
        ))}
    </group>
  );
};

interface ProjectCardProps {
  index: number;
  project: any;
}

const ProjectCard3D: React.FC<ProjectCardProps> = ({ index, project }) => {
    const ref = useRef<THREE.Group>(null);
    const xPos = index % 2 === 0 ? -1.5 : 1.5;
    const zRot = index % 2 === 0 ? 0.1 : -0.1;

    useFrame((state) => {
        if(ref.current) {
            // Subtle floating
            ref.current.position.y = -6 + (index * -3) + Math.sin(state.clock.elapsedTime + index) * 0.1;
        }
    });

    return (
        <group ref={ref} position={[xPos, -6 + (index * -3), 0]} rotation={[0, 0, zRot]}>
             <mesh receiveShadow castShadow>
                <boxGeometry args={[3, 2, 0.2]} />
                <meshPhysicalMaterial 
                    color="#1a1a1a"
                    metalness={0.5}
                    roughness={0.2}
                    clearcoat={1}
                    transparent
                    opacity={0.9}
                />
            </mesh>
            {/* Emissive border glow */}
            <mesh position={[0, 0, 0]} scale={[1.02, 1.02, 1.02]}>
                <boxGeometry args={[3, 2, 0.2]} />
                <meshBasicMaterial color={project.color} wireframe />
            </mesh>
            <Text
                position={[-1.2, 0.5, 0.15]}
                fontSize={0.3}
                color={project.color}
                font="https://fonts.gstatic.com/s/orbitron/v25/yMJRMI86Z2pte2oAq4fm.woff"
                anchorX="left"
            >
                {project.title}
            </Text>
            <Text
                 position={[-1.2, 0, 0.15]}
                 fontSize={0.15}
                 color="#cccccc"
                 maxWidth={2.5}
                 lineHeight={1.5}
                 anchorX="left"
            >
                {project.description}
            </Text>
        </group>
    )
}


export const Experience: React.FC = () => {
  const scroll = useScroll();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const sceneRef = useRef<THREE.Group>(null);

  // Scroll animation logic
  useFrame((state, delta) => {
    // Current scroll offset (0 to 1)
    const r1 = scroll.range(0 / 4, 1 / 4); // Hero to About
    const r2 = scroll.range(1 / 4, 1 / 4); // About to Projects
    const r3 = scroll.range(2 / 4, 1 / 4); // Projects
    const r4 = scroll.range(3 / 4, 1 / 4); // Skills to Contact

    // We can move the camera or the scene. Moving the camera usually feels more "cinematic".
    // Let's create keyframes for camera position based on scroll.
    
    // Total pages = 5.
    // 0: Hero. Camera: [0, 0, 5]
    // 1: About. Camera: [0, -6, 5]
    // 2: Projects. Camera: [0, -12, 8] (Zoom out for overview)
    // 3: Skills. Camera: [0, -18, 5]
    // 4: Contact. Camera: [0, -24, 5]

    // Simple smooth dampening
    if (cameraRef.current) {
        // Calculate target Y based on scroll offset
        // Total height approx 30 units
        const targetY = -scroll.offset * 25; 
        
        // Add some horizontal parallax based on mouse (optional, kept simple for now)
        const targetX = state.mouse.x * 0.5;
        const targetZ = 5 + Math.sin(scroll.offset * Math.PI) * 2; // Zoom in/out effect

        // Smooth camera movement
        // We use damping for "weight"
        cameraRef.current.position.y = THREE.MathUtils.damp(cameraRef.current.position.y, targetY, 5, delta);
        cameraRef.current.position.x = THREE.MathUtils.damp(cameraRef.current.position.x, targetX, 2, delta);
        
        // Look a bit down
        cameraRef.current.lookAt(0, targetY, 0);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} ref={cameraRef} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#d946ef" />
      <spotLight position={[0, 5, 0]} intensity={0.5} angle={0.5} penumbra={1} />

      {/* Background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <group ref={sceneRef}>
        {/* HERO SECTION OBJECTS (Y: 0) */}
        <HeroObject />
        <mesh position={[-4, -2, -5]} rotation={[0, 0.5, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#333" wireframe />
        </mesh>
        
        {/* ABOUT SECTION OBJECTS (Y: -6) */}
        {/* Floating Abstract Shapes */}
        <Float position={[-3, -6, -2]} speed={2} rotationIntensity={1}>
           <mesh>
             <torusGeometry args={[1, 0.4, 16, 100]} />
             <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
           </mesh>
        </Float>
        
        {/* PROJECTS SECTION OBJECTS (Y: -10 to -16 approx) */}
        <group position={[0, -5, 0]}>
             {PROJECTS.map((p, i) => (
                 <ProjectCard3D key={p.id} index={i} project={p} />
             ))}
        </group>

        {/* SKILLS SECTION (Y: -18) */}
        <SkillsCloud />

        {/* CONTACT SECTION (Y: -24) */}
        <group position={[0, -25, 0]}>
             <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                 <planeGeometry args={[50, 50, 32, 32]} />
                 <meshStandardMaterial color="#000" wireframe />
             </mesh>
             {/* Hologram Base */}
             <mesh position={[0, -1.8, 0]}>
                <cylinderGeometry args={[2, 2, 0.2, 32]} />
                <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} transparent opacity={0.5} />
             </mesh>
        </group>

      </group>
    </>
  );
};