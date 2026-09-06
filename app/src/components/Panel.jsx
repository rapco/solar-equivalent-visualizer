export default function Panel({ x, z, width, length }) {
  return (
    <group position={[x, 0, z]}>
      {/* Marco metálico del panel */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 12, 0, 0]}>
        <boxGeometry args={[width, 0.03, length]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Superficie fotovoltaica azul brillante */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 12, 0, 0]}>
        <boxGeometry args={[width * 0.95, 0.02, length * 0.95]} />
        <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.2} metalness={0.5} roughness={0.1} />
      </mesh>
    </group>
  );
}