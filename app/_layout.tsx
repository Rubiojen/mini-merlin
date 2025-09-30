// app/_layout.tsx
import {useThemeColor} from "@/hooks/useThemeColor";
import {useAppState} from "@/state/appState";
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useEffect} from "react";
import {useSharedValue} from "react-native-reanimated";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

export default function RootLayout() {
  const setThemeProgress = useAppState((s) => s.setThemeProgress);
  const isAppDark = useAppState((s) => s.isDarkMode);
  const progress = useSharedValue(isAppDark ? 1 : 0);
  const mainBg = useThemeColor("mainBg");

  useEffect(() => {
    setThemeProgress(progress);
  }, [isAppDark, progress, setThemeProgress]);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={["right", "left"]}
        style={{
          flex: 1,
          backgroundColor: mainBg,
        }}
      >
        <Stack initialRouteName="index" screenOptions={{headerShown: false}}>
          <Stack.Screen name="index" options={{headerShown: false}} />
          <Stack.Screen name="preview" options={{title: "Preview & Edit"}} />
        </Stack>
        <StatusBar translucent style={isAppDark ? "light" : "dark"} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
