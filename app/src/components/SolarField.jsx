import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import Panel from "./Panel";
import Human from "./Human";

export default function SolarField({ count, panelSpecs }) {
  const panels = [];
  const spacingX = panelSpecs.width + 0.08; 
  const spacingZ = panelSpecs.length + 0.08;

  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

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
  const totalDepth = rows * spacingZ;

  return (
    <Canvas 
      camera={{ position: [15, 20, 25], fov: 50 }}
      style={{ background: "#0f172a" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[20, 40, 20]} intensity={1.8} />
      <directionalLight position={[-20, 20, -20]} intensity={0.5} />
      
      <OrbitControls makeDefault />
      
      {/* Referencia humana y torre */}
      <Human />

      {/* Terreno de césped verde */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>

      {/* Arreglo de paneles y guías visuales de área */}
      <group position={[-totalWidth / 2, 0, -totalDepth / 2]}>
         {panels}
         
         {/* Guía visual perimetral de la huella en m² */}
         <lineSegments>
           <edgesGeometry args={[new THREE.BoxGeometry(totalWidth, 0.1, totalDepth)]} />
           <lineBasicMaterial color="#ffffff" linewidth={2} />
         </lineSegments>

         {/* Etiquetas flotantes con las medidas de Ancho y Profundidad */}
         <Html position={[totalWidth / 2, 0.5, totalDepth / 2]}>
           <div style={{ background: 'rgba(15, 23, 42, 0.85)', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', whiteSpace: 'nowrap', border: '1px solid #334155' }}>
             {totalWidth.toFixed(1)}m x {totalDepth.toFixed(1)}m ({ (totalWidth * totalDepth).toFixed(1) } m²)
           </div>
         </Html>
      </group>
    </Canvas>
  );
}