import AuroraSkiaBackground from "@/components/auroraSkiaBackground";
import {ScrapingProgress} from "@/components/scrapingProgress";
import {
  GradientText,
  ThemedText,
  ThemedTextInput,
} from "@/components/themedText";
import {ThemedView} from "@/components/themedView";
import {mockProfile} from "@/data/profile";
import {useShake} from "@/hooks/useShake";
import {useThemeColor} from "@/hooks/useThemeColor";
import {useAppState} from "@/state/appState";
import {GS, normalizeHeight} from "@/utils/globalStyles";
import {router} from "expo-router";
import React, {useEffect, useMemo, useState} from "react";
import {View} from "react-native";
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import {AppThemeSwitch} from "../components/switch";
import {GenerateButton} from "@/components/generateButton";

const TEXT_REGEX = /^[a-z0-9._]{1,30}$/i;

export default function OnboardingScreen() {
  const isAppDark = useAppState((s) => s.isDarkMode);
  const switchDark = useAppState((s) => s.switchDarkMode);
  const inputText = useAppState((s) => s.inputText);
  const setInputText = useAppState((s) => s.setInputText);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const addIgSite = useAppState((s) => s.addIgSites);

  const textColor = useThemeColor("mainText");
  const error = useThemeColor("error");
  const border = useThemeColor("border");

  const valid = useMemo(() => TEXT_REGEX.test(inputText), [inputText]);
  const showError = touched && !valid;

  const onGenerate = async (wait = true) => {
    setTouched(true);
    if (!valid || loading) return;
    setLoading(true);
    addIgSite([
      {
        id: inputText,
        templateId: "merlin-1",
        profileData: mockProfile,
      },
    ]);
    setTimeout(
      () => {
        setLoading(false);
        router.push(`/preview?username=${inputText}`);
      },
      wait ? 1000 : 0
    );
  };

  useEffect(() => {
    if (inputText) {
      onGenerate(false);
    }
  }, []);

  const shakeStyle = useShake(showError);

  return (
    <ThemedView
      bgColor={"primaryBg"}
      bgColorDark={"mainBg"}
      topInset
      dismissKeyboard
      style={[GS.flexOne]}
    >
      <AuroraSkiaBackground amplitude={0.12} blur={56} />
      <AppThemeSwitch
        style={[GS.marginRight16, GS.alignSelfEnd]}
        value={isAppDark}
        onSwitch={switchDark}
      />
      <View
        style={[
          GS.flexOne,
          GS.padding16,
          GS.justifyCenter,
          {gap: 16, marginBottom: normalizeHeight(120)},
        ]}
      >
        <GradientText size={28}>Create your Merlin preview</GradientText>

        <View style={{gap: 8}}>
          <ThemedText
            style={{color: textColor, fontSize: 14, fontWeight: "600"}}
          >
            Instagram username
          </ThemedText>

          {/* Animated wrapper owns the border; input itself stays borderless */}
          <Animated.View
            layout={LinearTransition.springify().damping(18).stiffness(200)}
            style={[
              {
                borderWidth: 1,
                borderRadius: 12,
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderColor: showError ? error : border,
              },
              shakeStyle,
            ]}
          >
            <ThemedTextInput
              value={inputText}
              onChangeText={setInputText}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="e.g. johndoe"
              placeholderTextColor={"secondText"}
              onBlur={() => setTouched(true)}
              size={16}
              style={{borderWidth: 0, padding: 0}} // border handled by wrapper
            />
          </Animated.View>

          {/* Feedback row: show progress while loading, otherwise show validation error if any */}
          {loading ? (
            <ScrapingProgress durationMs={1600} height={normalizeHeight(12)} />
          ) : (
            showError && (
              <Animated.View
                entering={FadeInDown.duration(140)}
                exiting={FadeOutUp.duration(120)}
                style={{overflow: "hidden"}}
                pointerEvents="none"
              >
                <ThemedText color="error" size={12}>
                  Use letters, numbers, “.” or “_”, max 30 chars.
                </ThemedText>
              </Animated.View>
            )
          )}
        </View>

        <GenerateButton onPress={onGenerate} disabled={!valid || loading} />
      </View>
    </ThemedView>
  );
}
