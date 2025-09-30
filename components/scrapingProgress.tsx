import {ThemedText} from "@/components/themedText";
import {useThemeColor} from "@/hooks/useThemeColor";
import {normalizeHeight, normalizeWidth} from "@/utils/globalStyles";
import {useEffect} from "react";
import {View} from "react-native";
import Animated, {
  FadeInDown,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type ScrapingProgressProps = {
  durationMs?: number;
  height?: number;
};

export const ScrapingProgress = ({
  durationMs = 900,
  height,
}: ScrapingProgressProps) => {
  const trackColor = useThemeColor("secondBg");
  const fillColor = useThemeColor("primaryBg");
  const progress = useSharedValue(0);

  const rFill = useAnimatedStyle(() => ({
    width: `${Math.round(progress.value * 100)}%`,
  }));

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {duration: durationMs});
  }, [durationMs, progress]);

  return (
    <Animated.View
      entering={FadeInDown.duration(140)}
      exiting={FadeOutUp.duration(120)}
      accessibilityRole="progressbar"
      accessibilityLabel="Scraping progress"
      style={{gap: 8}}
    >
      <ThemedText size={14} color="secondText">
        Scraping profile…
      </ThemedText>
      <View
        style={{
          height: height ?? normalizeHeight(10),
          borderRadius: normalizeWidth(6),
          backgroundColor: trackColor,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            {
              height: "100%",
              backgroundColor: fillColor,
            },
            rFill,
          ]}
        />
      </View>
    </Animated.View>
  );
};
