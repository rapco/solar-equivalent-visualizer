import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Panel from "./Panel";
import Human from "./Human";

export default function SolarField({ count, panelSpecs }) {
  const panels = [];
  const spacingX = panelSpecs.width + 0.05; 
  const spacingZ = panelSpecs.length + 0.05;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / 5);
    const col = i % 5;

    panels.push(
      <Panel
        key={i}
        x={col * spacingX}
        z={row * spacingZ}
        width={panelSpecs.width}
        length={panelSpecs.length}
      />
    );
  }

  return (
    <Canvas camera={{ position: [5, 8, 12] }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} />
      <OrbitControls />
      
      {/* Referencia humana de 1.7m al lado del arreglo */}
      <Human />

      {/* Arreglo de paneles centrado */}
      <group position={[-((5 * spacingX) / 2), 0, -((Math.ceil(count/5) * spacingZ) / 2)]}>
         {panels}
      </group>
    </Canvas>
  );
}