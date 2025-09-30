import {useEffect} from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function useShake(trigger: boolean) {
  const tx = useSharedValue(0);
  useEffect(() => {
    if (!trigger) return;
    tx.value = withSequence(
      withTiming(-6, {duration: 40}),
      withTiming(6, {duration: 80}),
      withTiming(-4, {duration: 60}),
      withTiming(4, {duration: 60}),
      withTiming(0, {duration: 60})
    );
  }, [trigger, tx]);
  return useAnimatedStyle(() => ({transform: [{translateX: tx.value}]}));
}
