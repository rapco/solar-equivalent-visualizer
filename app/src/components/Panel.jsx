export default function Panel({ x, z, width, length }) {
  return (
    <mesh position={[x, 0.5, z]} rotation={[-Math.PI / 12, 0, 0]}> 
      {/* Inclinamos el panel un poco (15 grados) para mayor realismo y usamos sus dimensiones reales */}
      <boxGeometry args={[width, 0.05, length]} />
      <meshStandardMaterial color="#1a2530" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}