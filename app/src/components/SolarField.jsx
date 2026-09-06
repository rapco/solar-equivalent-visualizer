import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Panel from "./Panel";
import Human from "./Human";

export default function SolarField({ count, panelSpecs }) {
  const panels = [];
  const spacingX = panelSpecs.width + 0.08; 
  const spacingZ = panelSpecs.length + 0.08;

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
    <Canvas 
      camera={{ position: [15, 20, 25], fov: 50 }}
      style={{ background: "#1e293b" }} // Fondo azul grisáceo suave estilo SimCity
    >
      {/* Iluminación brillante estilo diurno */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[20, 40, 20]} intensity={1.8} castShadow />
      <directionalLight position={[-20, 20, -20]} intensity={0.5} />
      
      <OrbitControls makeDefault />
      
      {/* Referencias */}
      <Human />

      {/* Arreglo de paneles */}
      <group position={[-totalWidth / 2, 0, -totalDepth / 2]}>
         {panels}
      </group>
    </Canvas>
  );
}