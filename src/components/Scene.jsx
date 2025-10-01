"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const RotatingLogo = () => {
  const { scene } = useGLTF("/assets/models/gdg_logo_updated.glb");
  const logoRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [logoScale, setLogoScale] = useState(1.5); // Default scale

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    const handleResize = () => {
      // Dynamically adjust scale based on window width
      const windowWidth = window.innerWidth;

      // Scale logo based on the window width
      if (windowWidth < 768) {
        setLogoScale(0.5); // Smaller size for mobile
      } else if (windowWidth < 1024) {
        setLogoScale(1); // Medium size for tablets
      } else {
        setLogoScale(2); // Larger size for desktops
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    handleResize(); // Call resize once on mount

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useFrame((state) => {
    if (logoRef.current) {
      const t = state.clock.getElapsedTime();

      // Subtle jiggle and mouse-driven rotation
      logoRef.current.rotation.x = Math.sin(t * 1.5) * 0.03 + mouse.y * 0.1;
      logoRef.current.rotation.y = Math.cos(t * 1.5) * 0.03 + mouse.x * 0.1;
      logoRef.current.rotation.z = mouse.x * 0.05; // Subtle twist based on X mouse movement
    }
  });

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <primitive ref={logoRef} object={scene} scale={logoScale} position={[0, 0, 0]} />
    </group>
  );
};

const RotatingLogoCanvas = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} />
    <RotatingLogo />
  </Canvas>
);

export default RotatingLogoCanvas;
