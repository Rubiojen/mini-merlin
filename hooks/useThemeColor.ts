/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import {Colors} from "@/constants/colors";
import {useAppState} from "@/state/appState";

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const isAppDark = useAppState((s) => s.isDarkMode);

  return Colors[isAppDark ? "dark" : "light"][colorName];
}

export function useThemeColors() {
  const isAppDark = useAppState((s) => s.isDarkMode);

  return Colors[isAppDark ? "dark" : "light"];
}
