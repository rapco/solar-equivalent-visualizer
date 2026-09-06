export default function Human() {
  return (
    <group position={[-6, 0, 0]}>
      {/* Torre de antena de celular (20 metros) estilo maqueta */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 10, 0]}>
          <cylinderGeometry args={[0.2, 0.6, 20, 6]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 20.5, 0]}>
          <boxGeometry args={[1.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Humano de referencia (1.7m) */}
      <group position={[2.5, 0, 0]}>
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[0.35, 1.1, 0.2]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.55, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#fde68a" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}