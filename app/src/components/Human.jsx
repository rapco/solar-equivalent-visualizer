export default function Human() {
  return (
    <group position={[-2, 0, 0]}>
      {/* Cuerpo / Torso (Altura total 1.7m) */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.4, 1.1, 0.2]} />
        <meshStandardMaterial color="#64748B" roughness={0.5} />
      </mesh>
      {/* Cabeza */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.4} />
      </mesh>
    </group>
  );
}