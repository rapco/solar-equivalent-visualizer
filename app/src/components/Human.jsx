export default function Human() {
  return (
    <group position={[0, 0, 0]}>
      {/* Terreno de referencia de 10m x 10m */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#bae6fd" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Torre de antena de celular (30 metros de altura) */}
      <group position={[-2, 0, 0]}>
        <mesh position={[0, 15, 0]}>
          <cylinderGeometry args={[0.25, 0.7, 30, 6]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, 30.5, 0]}>
          <boxGeometry args={[1.5, 0.3, 0.3]} />
          <meshStandardMaterial color="#f87171" />
        </mesh>
      </group>

      {/* Humano a escala (1.7 metros) */}
      <group position={[2.5, 0, 0]}>
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[0.35, 1.1, 0.2]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.55, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#fef08a" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}