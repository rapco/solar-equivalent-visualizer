export default function Panel({ x, z }) {
  return (
    <mesh position={[x, 0, z]}>
      <boxGeometry args={[2, 0.15, 1]} />
      <meshStandardMaterial />
    </mesh>
  );
}