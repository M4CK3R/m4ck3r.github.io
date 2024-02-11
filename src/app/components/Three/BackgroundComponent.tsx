"use client";
import { Canvas, useThree } from "@react-three/fiber";
import StarsMaterial from "./materials/StarsMaterial";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Color } from "three";
import { useEffect, useRef } from "react";

const BackgroundPlane = () => {
  const { width, height } = useThree((state) => ({
    width: state.viewport.width,
    height: state.viewport.height,
  }));
  return (
    <mesh>
      <planeGeometry args={[width, height]} /> <StarsMaterial />
      <EffectComposer>
        <Bloom luminanceThreshold={0.01} luminanceSmoothing={.8} intensity={5}  />
      </EffectComposer>
    </mesh>
  );
};
const BackgroundComponent = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  return (
    <div {...props}>
      <Canvas>
        <BackgroundPlane />
      </Canvas>
    </div>
  );
};

export default BackgroundComponent;
