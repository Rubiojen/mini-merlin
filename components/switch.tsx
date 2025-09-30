// components/AppSwitch.tsx
import React, {memo, useCallback} from "react";
import {Pressable, StyleProp, ViewStyle} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import {IconSymbol} from "@/components/iconSymbol";
import {Colors} from "@/constants/colors";
import {useAppState} from "@/state/appState";

interface AppSwitchProps {
  value: boolean;
  onSwitch: () => void; // toggles your theme boolean
  style?: StyleProp<ViewStyle>;
}

const TRACK_W = 52;
const TRACK_H = 32;
const PADDING = 3;
const THUMB = TRACK_H - PADDING * 2;

export const AppThemeSwitch = memo(function AppSwitch({
  value,
  onSwitch,
  style,
}: AppSwitchProps) {
  const progress = useAppState((s) => s.themeProgress);
  const setTarget = useAppState((s) => s.setThemeAnimation);

  const onPress = useCallback(() => {
    // animate colors towards the next mode immediately
    setTarget(!value);
    // keep your original toggle
    onSwitch();
  }, [setTarget, onSwitch, value]);

  // Track color: interpolate between the two palettes (theme-wide)
  const trackAnimated = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.themeTrack, Colors.dark.themeTrack]
    ),
  }));

  const thumbAnimated = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(value ? TRACK_W - THUMB - PADDING * 2 : 0, {
          duration: 180,
        }),
      },
    ],
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.themeThumb, Colors.dark.themeThumb]
    ),
  }));

  return (
    <Pressable onPress={onPress} style={[style]}>
      <Animated.View
        style={[
          {
            width: TRACK_W,
            height: TRACK_H,
            borderRadius: TRACK_H / 2,
            padding: PADDING,
          },
          trackAnimated,
        ]}
      >
        <Animated.View
          style={[
            {
              width: THUMB,
              height: THUMB,
              borderRadius: THUMB / 2,
              elevation: 2,
              alignItems: "center",
              justifyContent: "center",
            },
            thumbAnimated,
          ]}
        >
          <IconSymbol
            type="Material"
            name={value ? "dark-mode" : "light-mode"}
            size={16}
            color={value ? "invertText" : "mainText"}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
});
