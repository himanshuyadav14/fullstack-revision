export function Skeleton({ height = 200 }) {
  return (
    <div
      style={{
        height,
        background: "#eee",
        borderRadius: 8,
        margin: "10px 0",
        animation: "pulse 1.5s infinite",
      }}
    />
  );
}
