import { Canvas } from "@react-three/fiber";
import Panel from "./Panel";
import Human from "./Human";

export default function SolarField({ count }) {

  const panels = [];

  for (let i = 0; i < count; i++) {

    const row = Math.floor(i / 10);
    const col = i % 10;

    panels.push(
      <Panel
        key={i}
        x={col * 2.5}
        z={row * 1.5}
      />
    );
  }

  return (
    <Canvas camera={{ position: [15, 15, 15] }}>
      <ambientLight />
      <Human />
      {panels}
    </Canvas>
  );
}