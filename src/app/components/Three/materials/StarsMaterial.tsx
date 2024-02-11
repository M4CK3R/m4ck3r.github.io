import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, MathUtils, Vector2 } from "three";
import fragmentShader from "../shaders/StarsShader.glsl";

const vertexShader = `
varying vec2 texture_uv;

void main() {
  texture_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`;

const StarsMaterial = () => {
  const time = useMemo(() => ({ value: 0 }), []);
  const mouse = useMemo(() => ({ value: new Vector2(0, 0) }), []);
  const resolution = useMemo(() => ({ value: new Vector2(0, 0) }), []);
  const bc = useMemo(() => ({ value: new Color() }), []);
  const sc = useMemo(() => ({ value: new Color() }), []);
  const uniforms = {
    u_time: time,
    u_mouse: mouse,
    u_resolution: resolution,
    u_line_width: { value: 2 },
    u_background_color: bc,
    u_stars_color: sc,
  };

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const diff = {
        x: (window.innerWidth - resolution.value.x) / 2,
        y: (window.innerHeight - resolution.value.y) / 2,
      };
      const pos_x = e.clientX - diff.x;
      const pos_y = e.clientY - diff.y;
      const mouse_position_x = (pos_x / resolution.value.x) * 2 - 1;
      const mouse_position_y = -(pos_y / resolution.value.y) * 2 + 1;
      mouse.value = new Vector2(mouse_position_x, mouse_position_y);
    };
    window.addEventListener("pointermove", onPointerMove);
    const styles = getComputedStyle(document.documentElement);
    const starsColorString = styles.getPropertyValue("--stars-background");
    const backgroundColorString = styles.getPropertyValue("--stars-color");
    sc.value = new Color(backgroundColorString);
    bc.value = new Color(starsColorString);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [mouse, resolution,bc,sc]);
  useFrame(({ clock }) => {
    time.value = clock.getElapsedTime();
  });
  useThree(({ size }) => {
    resolution.value = new Vector2(size.width, size.height);
  });
  return (
    <shaderMaterial
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  );
};

export default StarsMaterial;
