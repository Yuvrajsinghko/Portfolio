import { Float, OrbitControls } from "@react-three/drei";
import { Astronaut } from "../components/Astronaut";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space">
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile && 0.23}
                position={isMobile && [0, -1.5, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </figure>
    </section>
  );
};
function Rig() {
  return useFrame((state, delta) => {
    // Increased mouse sensitivity from /10 to /2.5 for more reactive movement
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 2.5, 1 + state.mouse.y / 2.5, 3],
      0.25, // Reduced damping for faster response
      delta
    );
    // Add camera rotation based on mouse for more immersive effect
    easing.dampE(
      state.camera.rotation,
      [
        (state.mouse.y * Math.PI) / 8,
        (state.mouse.x * Math.PI) / 8,
        0
      ],
      0.25,
      delta
    );
  });
}

export default Hero;
