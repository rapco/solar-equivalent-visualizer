import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import Panel from "./Panel";
import Human from "./Human";

export default function SolarField({ count, panelSpecs }) {
  const panels = [];
  const spacingX = panelSpecs.width + 0.1; 
  const spacingZ = panelSpecs.length + 0.1;

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

  // Tamaño de la grilla que se expande modularmente en bloques de 10m
  const gridSize = Math.max(
    Math.ceil(Math.max(totalWidth, totalDepth) / 10) * 10,
    40
  );

  return (
    <Canvas camera={{ position: [5, 25, 38], fov: 50 }} style={{ background: "#1e293b" }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[25, 45, 25]} intensity={2.0} />
      <directionalLight position={[-25, 25, -25]} intensity={0.8} />
      
      <OrbitControls makeDefault />
      
      {/* Terreno de césped verde dinámico que crece junto con la grilla */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[gridSize / 2, -0.01, gridSize / 2]}>
        <planeGeometry args={[gridSize + 10, gridSize + 10]} />
        <meshStandardMaterial color="#4ade80" roughness={0.7} />
      </mesh>

      {/* Terreno de referencia de la torre (10x10m) ubicado a la izquierda */}
      <group position={[-12, 0, -5]}>
        <Human />
      </group>

      {/* Campo de paneles solares contiguo con grilla expansible de 10m */}
      <group position={[1, 0, -totalDepth / 2]}>
         {panels}
         
         {/* Grilla estándar de 10m x 10m ajustada al volumen de paneles */}
         <gridHelper 
           args={[
             gridSize,
             gridSize / 10,
             "#94a3b8",
             "#cbd5e1"
           ]} 
           position={[gridSize / 2, 0.01, gridSize / 2]} 
         />

         {/* Contorno perimetral */}
         <lineSegments position={[totalWidth / 2, 0, totalDepth / 2]}>
           <edgesGeometry args={[new THREE.BoxGeometry(totalWidth, 0.1, totalDepth)]} />
           <lineBasicMaterial color="#f8fafc" linewidth={2} />
         </lineSegments>

         {/* Etiqueta flotante de dimensiones */}
         <Html position={[totalWidth, 0.5, totalDepth]}>
           <div style={{ background: 'rgba(30, 41, 59, 0.95)', color: '#38bdf8', padding: '6px 10px', borderRadius: '6px', fontSize: '13px', whiteSpace: 'nowrap', border: '1px solid #64748b', fontWeight: 'bold' }}>
             {totalWidth.toFixed(1)}m x {totalDepth.toFixed(1)}m ({ (totalWidth * totalDepth).toFixed(1) } m²)
           </div>
         </Html>
      </group>
    </Canvas>
  );
}