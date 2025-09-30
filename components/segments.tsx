import {ThemedText} from "@/components/themedText";
import {ThemedView} from "@/components/themedView";
import {useThemeColor} from "@/hooks/useThemeColor";
import {GS} from "@/utils/globalStyles";
import React from "react";
import {StyleSheet, TouchableOpacity, useWindowDimensions} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
  containerWidth?: number;
};

export const Segments = ({
  options,
  selectedOption,
  onOptionPress,
  containerWidth,
}: SegmentedControlProps) => {
  const primaryColor = useThemeColor("primaryBg");
  const {width: windowWidth} = useWindowDimensions();

  const internalPadding = 12;
  const segmentedControlWidth = containerWidth ?? windowWidth - 24;

  const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(
        itemWidth * options.indexOf(selectedOption) + internalPadding / 2,
        {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }
      ),
    };
  }, [selectedOption, options, itemWidth]);

  return (
    <ThemedView
      bgColor="secondBg"
      style={[
        styles.container,
        GS.alignSelfCenter,
        GS.borderRadius8,
        {
          width: segmentedControlWidth,
          paddingLeft: internalPadding / 2,
        },
      ]}
    >
      <Animated.View
        style={[
          GS.borderRadius8,
          {
            width: itemWidth,
            backgroundColor: primaryColor,
          },
          rStyle,
          styles.activeBox,
        ]}
      />
      {options.map((option) => {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              onOptionPress?.(option);
            }}
            key={option}
            style={[
              {
                width: itemWidth,
              },
              styles.labelContainer,
            ]}
          >
            <ThemedText size={16}>{option}</ThemedText>
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 44,
  },
  activeBox: {
    position: "absolute",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 3,
    height: "80%",
    top: "10%",
  },
  labelContainer: {justifyContent: "center", alignItems: "center"},
});
