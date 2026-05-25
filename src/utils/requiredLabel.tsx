export function requiredLabel(label: string) {
  return (
    <span>
      {label}
      <span
        style={{
          color: "#ff4d4f",
          marginLeft: 4,
        }}
      >
        *
      </span>
    </span>
  );
}