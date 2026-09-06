export default function Human() {
  return (
    <group position={[-5, 0, 0]}>
      {/* Torre de antena de celular (20 metros de altura) */}
      <group position={[0, 0, 0]}>
        {/* Estructura central de la torre */}
        <mesh position={[0, 10, 0]}>
          <cylinderGeometry args={[0.3, 0.8, 20, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Antenas en la cúspide */}
        <mesh position={[0, 20.5, 0]}>
          <boxGeometry args={[1.5, 0.3, 0.3]} />
          <meshStandardMaterial color="#94A3B8" />
        </mesh>
      </group>

      {/* Humano a escala (1.7 metros) al lado de la torre */}
      <group position={[2.5, 0, 0]}>
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[0.4, 1.1, 0.2]} />
          <meshStandardMaterial color="#64748B" roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.55, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}