import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Panel from "./Panel";
import Human from "./Human";

export default function SolarField({ count, panelSpecs }) {
  const panels = [];
  const spacingX = panelSpecs.width + 0.05; 
  const spacingZ = panelSpecs.length + 0.05;

  // Forzamos una distribución en forma de matriz cuadrada (filas ≈ columnas)
  const cols = Math.ceil(Math.sqrt(count));

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

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

  const totalWidth = cols * spacingX;
  const totalDepth = Math.ceil(count / cols) * spacingZ;

  return (
    <Canvas camera={{ position: [10, 15, 25] }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} />
      <OrbitControls />
      
      {/* Referencias de escala: Torre de 20m y humano de 1.7m */}
      <Human />

      {/* Arreglo de paneles centrado con proporción cuadrada */}
      <group position={[-totalWidth / 2, 0, -totalDepth / 2]}>
         {panels}
      </group>
    </Canvas>
  );
}