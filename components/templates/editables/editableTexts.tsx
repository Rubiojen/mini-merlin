import {useLocalSearchParams} from "expo-router";
import React, {useState} from "react";
import {Pressable, View} from "react-native";
import Animated, {FadeIn} from "react-native-reanimated";

import {IconSymbol} from "@/components/iconSymbol";
import {ThemedText, ThemedTextInput} from "@/components/themedText";
import {useProfileEdit} from "@/hooks/useProfileEdit";
import {useThemeColor} from "@/hooks/useThemeColor";
import {AppColorsType} from "@/types/types";
import {GS, normalizeWidth} from "@/utils/globalStyles";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type InlineEditableProps = {
  size?: number;
  color?: AppColorsType;
};

export const InlineEditableTitle = ({
  size = 22,
  color = "mainText",
}: InlineEditableProps) => {
  const {username} = useLocalSearchParams<{username?: string}>();
  const {title, setTitle, editingTitle, startEditTitle, endEditTitle} =
    useProfileEdit(username!);
  const textColor = useThemeColor(color);
  const border = useThemeColor("border");

  if (!editingTitle) {
    return (
      <View style={[GS.row, GS.alignCenter, {gap: normalizeWidth(6)}]}>
        <ThemedText size={size} color={color}>
          {title || "Your title"}
        </ThemedText>
        <AnimatedPressable
          entering={FadeIn.duration(150)}
          onPress={startEditTitle}
          accessibilityLabel="Edit title"
          hitSlop={8}
        >
          <IconSymbol
            type="Feather"
            name="edit-2"
            size={16}
            color={"secondText"}
          />
        </AnimatedPressable>
      </View>
    );
  }

  return (
    <ThemedTextInput
      value={title}
      setValue={setTitle}
      autoFocus
      placeholder="Enter title"
      size={size}
      maxLength={40}
      returnKeyType="done"
      onSubmitEditing={endEditTitle}
      onBlur={endEditTitle}
      accessible
      accessibilityLabel="Title input"
      style={{
        borderWidth: 1,
        borderColor: border,
        borderRadius: normalizeWidth(10),
        paddingHorizontal: normalizeWidth(10),
        paddingVertical: normalizeWidth(6),
        color: textColor,
      }}
    />
  );
};

export const InlineEditableAbout = ({
  size = 16,
  color = "secondText",
}: InlineEditableProps) => {
  const {username} = useLocalSearchParams<{username?: string}>();
  const {about, setAbout, editingAbout, startEditAbout, endEditAbout} =
    useProfileEdit(username!);
  const border = useThemeColor("border");
  const textColor = useThemeColor(color);
  const [height, setHeight] = useState<number | undefined>(undefined);

  if (!editingAbout) {
    return (
      <View
        style={[
          GS.row,
          GS.alignCenter,
          GS.marginTop12,
          {gap: normalizeWidth(6)},
        ]}
      >
        <ThemedText size={size} color={color}>
          {about || "Tell people about you"}
        </ThemedText>
        <AnimatedPressable
          entering={FadeIn.duration(150)}
          onPress={startEditAbout}
          accessibilityLabel="Edit about"
          hitSlop={8}
        >
          <IconSymbol type="Feather" name="edit-2" size={16} color={color} />
        </AnimatedPressable>
      </View>
    );
  }

  return (
    <ThemedTextInput
      value={about}
      setValue={setAbout}
      returnKeyType="done"
      autoFocus
      placeholder="About"
      size={size}
      multiline
      maxLength={200}
      onBlur={endEditAbout}
      onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
      accessible
      accessibilityLabel="About input"
      style={{
        borderWidth: 1,
        borderColor: border,
        borderRadius: normalizeWidth(10),
        paddingHorizontal: normalizeWidth(10),
        paddingVertical: normalizeWidth(8),
        height,
        color: textColor,
      }}
    />
  );
};
