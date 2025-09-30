import {
  Keyboard,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  View,
  type ViewProps,
} from "react-native";
import Animated, {
  FadeIn,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {Colors} from "@/constants/colors";
import {useThemeColors} from "@/hooks/useThemeColor";
import {useAppState} from "@/state/appState";
import {AppColorsType} from "@/types/types";
import {GS} from "@/utils/globalStyles";
import {hexToRgba} from "@/utils/helpers";
import {LinearGradient} from "expo-linear-gradient";
import {ReactNode, useEffect, useState} from "react";

export type ThemedViewProps = ViewProps & {
  bgColor?: AppColorsType;
  bgColorDark?: AppColorsType;
  transparent?: boolean;
  bgOpacity?: number;
  bottomInset?: boolean;
  topInset?: boolean;
  dismissKeyboard?: boolean;
  gradientColors?: AppColorsType;
  onTouch?: () => void;
  fadeOnLoad?: boolean;
  fadeDurationMs?: number;
};

export function ThemedView({
  style,
  bgColor = "mainBg",
  bgColorDark = "mainBg",
  bgOpacity,
  bottomInset,
  topInset,
  transparent,
  dismissKeyboard,
  onTouch,
  fadeOnLoad,
  fadeDurationMs = 220,
  ...otherProps
}: ThemedViewProps) {
  const {bottom, top} = useSafeAreaInsets();
  const progress = useAppState((s) => s.themeProgress);

  const onTouchStart = () => {
    onTouch?.();
    if (dismissKeyboard) Keyboard.dismiss();
  };

  const animated = useAnimatedStyle(() => {
    const light = Colors.light[bgColor];
    const dark = Colors.dark[bgColorDark];
    const color = interpolateColor(progress.value, [0, 1], [light, dark]);
    return transparent ? {} : {backgroundColor: color};
  }, [bgColor, transparent, progress.value]);

  return (
    <Animated.View
      entering={fadeOnLoad ? FadeIn.duration(fadeDurationMs) : undefined}
      onTouchStart={onTouchStart}
      style={[
        animated,
        {paddingBottom: bottomInset ? bottom : undefined},
        {paddingTop: topInset ? top : undefined},
        style,
      ]}
      {...otherProps}
    />
  );
}

type ShimmerGradientBackgroundProps = {
  children: ReactNode;
  backgroundColor: AppColorsType;
  highlightColor: AppColorsType;
  speedMS?: number;
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  disabled?: boolean;
};

export const ShimmerGradientBackground = ({
  children,
  backgroundColor,
  highlightColor,
  speedMS = 3000,
  start = {x: 0, y: 0},
  end = {x: 1, y: 0},
  disabled,
}: ShimmerGradientBackgroundProps) => {
  const appColors = useThemeColors();
  const [layout, setLayout] = useState<LayoutRectangle>();
  const shared = useSharedValue(0);

  useEffect(() => {
    if (disabled) {
      shared.value = 0;
    }
  }, [disabled, shared]);

  useEffect(() => {
    if (layout?.width && layout?.height && !disabled) {
      shared.value = withRepeat(withTiming(1, {duration: speedMS}), Infinity);
    }
  }, [speedMS, layout?.width, layout?.height, shared, disabled]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shared.value,
          [0, 1],
          [layout ? -layout.width * 1.5 : 0, layout ? layout.width * 1.5 : 0]
        ),
      },
    ],
  }));

  if (!layout?.width && !layout?.height) {
    return (
      <View
        onLayout={(event: LayoutChangeEvent) =>
          setLayout(event.nativeEvent.layout)
        }
      >
        {children}
      </View>
    );
  }

  const highlightColorValue = appColors[highlightColor];
  const baseColorValue = appColors[backgroundColor];

  return (
    <View
      style={[
        {height: layout.height, width: layout.width},
        GS.borderRadius16,
        {overflow: "hidden"},
      ]}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: disabled ? appColors.disabled : baseColorValue,
          },
        ]}
      />
      {
        <Animated.View
          style={[
            animatedStyles,
            StyleSheet.absoluteFill,
            {overflow: "hidden"},
          ]}
        >
          <LinearGradient
            start={start}
            end={end}
            style={[
              StyleSheet.absoluteFill,
              {width: layout.width, height: layout.height},
            ]}
            colors={[
              hexToRgba(baseColorValue, 0),
              highlightColorValue,
              hexToRgba(baseColorValue, 0),
            ]}
          />
        </Animated.View>
      }
      <View style={[StyleSheet.absoluteFill, {zIndex: 10}]}>{children}</View>
    </View>
  );
};
