import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; // Opcional, pero muy recomendado para mover la cámara
import Panel from "./Panel";
import Human from "./Human";

export default function SolarField({ count, panelSpecs }) {
  const panels = [];
  
  // Usamos el ancho del panel + un margen (ej. 0.05m para los rieles) para calcular el espaciado de las columnas
  const spacingX = panelSpecs.width + 0.05; 
  // Usamos el largo del panel + un margen para las filas
  const spacingZ = panelSpecs.length + 0.05;

  for (let i = 0; i < count; i++) {
    // Calculamos para que queden, por ejemplo, en filas de 5 paneles de ancho
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
    <Canvas camera={{ position: [0, 10, 15] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls />
      <Human />
      {/* Centramos el arreglo restando la mitad de la cuadrícula calculada */}
      <group position={[-((5 * spacingX) / 2), 0, -((Math.ceil(count/5) * spacingZ) / 2)]}>
         {panels}
      </group>
    </Canvas>
  );
}