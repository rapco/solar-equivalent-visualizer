export default function Human() {
  return (
    <mesh position={[0, 1, -4]}>
      <boxGeometry args={[0.5, 1.8, 0.5]} />
      <meshStandardMaterial />
    </mesh>
  );
}