import {LinearTransition} from "react-native-reanimated";

export const LAYOUT_ANIMATION = LinearTransition.springify()
  .damping(18)
  .stiffness(180);

export const formatFollowers = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}m`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(1)}k`
    : `${n}`;

export const gridItemSize = (
  width: number,
  totalPadding: number,
  gap: number,
  cols: number
) => Math.floor((width - totalPadding - gap * (cols - 1)) / cols);

// Helper function to convert hex to rgba
export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
