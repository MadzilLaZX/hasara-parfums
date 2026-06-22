const COLORS: Record<string, { hex: string; r: number; g: number; b: number }> = {
  dark:       { hex: "#0F0F0F", r: 15,  g: 15,  b: 15  },
  "dark-warm":{ hex: "#080705", r: 8,   g: 7,   b: 5   },
  light:      { hex: "#F7F3EE", r: 247, g: 243, b: 238 },
  cream:      { hex: "#F0EBE3", r: 240, g: 235, b: 227 },
};

interface Props {
  from: keyof typeof COLORS;
  to: keyof typeof COLORS;
  size?: "sm" | "md" | "lg"; // kept for backwards-compat, ignored internally
}

export default function SectionDivider({ from, to }: Props) {
  const f = COLORS[from];
  const t = COLORS[to];
  // Transparent version of "from" color — avoids the gray-cast issue with bare "transparent"
  const fromAlpha = `rgba(${f.r},${f.g},${f.b},0)`;

  return (
    <div
      aria-hidden
      className="pointer-events-none select-none"
      style={{
        position: "relative",
        zIndex: 10,
        // Tall enough for a very gradual cinematic fade
        height: "320px",
        // Pull up INTO the previous section so the transparent top blends invisibly
        marginTop: "-200px",
        // S-curve stops: lingers transparent longer, transitions in the middle, locks solid at end
        background: `linear-gradient(
          to bottom,
          ${fromAlpha}   0%,
          ${fromAlpha}  18%,
          ${t.hex}      72%,
          ${t.hex}     100%
        )`,
      }}
    />
  );
}
