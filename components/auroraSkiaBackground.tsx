import {useAppState} from "@/state/appState";
import {
  Blur,
  Canvas,
  Group,
  Paint,
  RadialGradient,
  Rect,
  useClock,
  vec,
} from "@shopify/react-native-skia";
import React, {useCallback, useState} from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import {useDerivedValue} from "react-native-reanimated";

export type SingleAuroraSkiaBackgroundProps = {
  /** Single glow color (ARGB or RGBA hex). Example: "#64D2FFFF" */
  color?: string;
  /** How soft the glow looks */
  blur?: number;
  /** Toggle animation */
  animate?: boolean;
  /** 0..0.3 recommended — movement radius as a fraction of size */
  amplitude?: number;
  /** Optional slow "breathing" of the radius */
  breathe?: boolean;
  /** Animation speed multiplier (0.5..3 recommended). 1 = default */
  speed?: number;
  /** Breathing amplitude as a fraction of size (0..0.2 recommended) */
  breathAmplitude?: number;
  style?: ViewStyle;
};

const transparentize = (hex: string) =>
  hex.length === 9 ? hex.slice(0, 7) + "00" : hex + "00";

export default function SingleAuroraSkiaBackground({
  blur = 72,
  animate = true,
  amplitude = 0.08,
  breathe = true,
  speed = 4,
  breathAmplitude = 0.1,
  style,
}: SingleAuroraSkiaBackgroundProps) {
  const isDark = useAppState((s) => s.isDarkMode);
  const color = isDark ? "#3052B3" : "#FFFFFF";
  // Measure the actual container so centers are correct in flex layouts
  const win = useWindowDimensions();
  const [box, setBox] = useState({width: 0, height: 0});
  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const {width, height} = e.nativeEvent.layout;
      if (width !== box.width || height !== box.height) setBox({width, height});
    },
    [box.width, box.height]
  );

  const width = box.width || win.width;
  const height = box.height || win.height;

  const rBase = Math.max(width, height);
  const t = useClock();
  const twoPi = Math.PI * 2;

  // Clamp amplitude to avoid drifting out of view
  const amp = Math.min(Math.max(amplitude, 0), 0.3);
  const spd = Math.max(speed, 0.01);

  // Center moves in a slow Lissajous path
  const c = useDerivedValue(() => {
    if (!animate) return vec(width * 0.5, height * 0.55);
    const p = ((t.value * spd) % 10000) / 10000; // 10s loop scaled by speed
    const q = ((t.value * spd) % 14000) / 14000; // 14s loop (desync) scaled by speed
    return vec(
      width * (0.5 + Math.sin(p * twoPi) * amp),
      height * (0.55 + Math.cos(q * twoPi) * amp * 0.7)
    );
  }, [t, animate, width, height, amp, spd]);

  const r = useDerivedValue(() => {
    if (!animate || !breathe) return rBase * 0.58;
    const p = ((t.value * spd) % 12000) / 12000; // 12s loop scaled by speed
    return rBase * (0.54 + breathAmplitude * (0.5 + 0.5 * Math.sin(p * twoPi)));
  }, [t, animate, breathe, rBase, breathAmplitude, spd]);

  return (
    <View onLayout={onLayout} style={[StyleSheet.absoluteFill, style]}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Group
          layer={
            <Paint>
              <Blur blur={blur} />
            </Paint>
          }
        >
          <Rect x={0} y={0} width={width} height={height}>
            <RadialGradient
              c={c}
              r={r}
              colors={[color, transparentize(color)]}
            />
          </Rect>
        </Group>
      </Canvas>
    </View>
  );
}
