import {useThemeColor} from "@/hooks/useThemeColor";
import {useAppState} from "@/state/appState";
import {AppColorsType} from "@/types/types";
import {GS, normalizeSize} from "@/utils/globalStyles";
import MaskedView from "@react-native-masked-view/masked-view";
import {LinearGradient} from "expo-linear-gradient";
import React, {RefObject} from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  type TextProps,
} from "react-native";

export interface ThemedTextProps extends Omit<TextProps, "fontFamily"> {
  color?: AppColorsType;
  bgColor?: AppColorsType | "transparent";
  size?: number;
}

export function ThemedText({
  style,
  size = 18,
  color = "mainText",
  bgColor = "transparent",
  ...rest
}: ThemedTextProps) {
  const textColor = useThemeColor(color);
  const bgColorTheme = useThemeColor(bgColor);

  return (
    <Text
      style={[
        {
          color: textColor,
          fontSize: normalizeSize(size),
          backgroundColor: bgColorTheme,
          textAlign: "left",
        },
        style,
      ]}
      {...rest}
    />
  );
}

interface AppInputProps extends TextInputProps {
  inputRef?: RefObject<TextInput | null>;
  value: string;
  setValue?: (input: string) => void;
  style?: StyleProp<TextStyle>;
  errorMess?: string;
  withError?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  withBorder?: boolean;
  placeholderTextColor?: AppColorsType;
  label?: string;
  disabled?: boolean;
  size?: number;
}

export const ThemedTextInput = ({
  inputRef,
  value,
  setValue,
  style,
  autoFocus,
  withBorder = true,
  onEndEditing,
  onSubmitEditing,
  editable,
  inputContainerStyle,
  placeholder = "",
  placeholderTextColor = "secondText",
  size = 18,
  ...props
}: AppInputProps) => {
  const textColor = useThemeColor("mainText");
  const placeholderColor = useThemeColor(placeholderTextColor);
  return (
    <TextInput
      onTouchStart={(e) => {
        e.stopPropagation();
      }}
      onStartShouldSetResponder={(_event: any) => true}
      style={[
        GS.fullWidth,
        {color: textColor, fontSize: normalizeSize(size)},
        style,
      ]}
      placeholderTextColor={placeholderColor}
      autoFocus={autoFocus}
      ref={inputRef}
      value={value}
      onEndEditing={onEndEditing}
      onSubmitEditing={onSubmitEditing}
      onChangeText={setValue}
      placeholder={placeholder}
      editable={editable}
      {...props}
    />
  );
};

export interface GradientTextProps extends Omit<TextProps, "fontFamily"> {
  gradientStart?: {x: number; y: number};
  gradientEnd?: {x: number; y: number};
  height?: number;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export function GradientText({
  style,
  gradientStart = {x: 0.4, y: 0},
  gradientEnd = {x: 1, y: 1},
  height = 120,
  size = 60,
  containerStyle,
  children,
  ...rest
}: GradientTextProps) {
  const isDark = useAppState((s) => s.isDarkMode);
  const colors = isDark
    ? ["#feda75", "#fa7e1e", "#d62976", "#962fbf", "#4f5bd5"]
    : ["#4f5bd5", "#962fbf", "#d62976", "#e1306c"];
  return (
    <MaskedView
      style={[{height, flexDirection: "row"}, containerStyle]}
      maskElement={
        <View
          style={{
            backgroundColor: "transparent",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              {
                fontSize: normalizeSize(size),
                fontWeight: "bold",
              },
              style,
            ]}
            {...rest}
          >
            {children}
          </Text>
        </View>
      }
    >
      <LinearGradient
        colors={colors as any}
        start={gradientStart}
        end={gradientEnd}
        style={{
          flex: 1,
        }}
      />
    </MaskedView>
  );
}
