// This file is a fallback for using MaterialIcons on Android and web.

import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {SymbolWeight} from "expo-symbols";
import React from "react";
import {StyleProp, TextStyle} from "react-native";
// Import the icon name types from the libraries
import {useThemeColor} from "@/hooks/useThemeColor";
import {AppColorsType} from "@/types/types";
import {normalizeSize} from "@/utils/globalStyles";

type IconType =
  | "Material"
  | "Ionicons"
  | "FontAwesome5"
  | "FontAwesome"
  | "MaterialCommunity"
  | "Feather";

type IoniconsGlyphs = keyof typeof Ionicons.glyphMap;
type MaterialGlyphs = keyof typeof MaterialIcons.glyphMap;
type FontAwesome5Glyphs = keyof typeof FontAwesome5.glyphMap;
type MaterialCommunityGlyphs = keyof typeof MaterialCommunityIcons.glyphMap;
type FeatherGlyphs = keyof typeof Feather.glyphMap;
type FontAwesomeGlyphs = keyof typeof FontAwesome.glyphMap;

type IconNameMap = {
  Material: MaterialGlyphs;
  Ionicons: IoniconsGlyphs;
  FontAwesome5: FontAwesome5Glyphs;
  MaterialCommunity: MaterialCommunityGlyphs;
  Feather: FeatherGlyphs;
  FontAwesome: FontAwesomeGlyphs;
};

export type AppIconProps<T extends IconType> = {
  name: IconNameMap[T];
  size?: number;
  color?: AppColorsType;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  type: T;
};

export function IconSymbol<T extends IconType>({
  name,
  size = normalizeSize(24),
  color = "mainText",
  style,
  // weight,
  type,
}: AppIconProps<T>) {
  const iconColor = useThemeColor(color);

  switch (type) {
    case "Ionicons":
      return (
        <Ionicons
          color={iconColor}
          size={normalizeSize(size)}
          name={name as IoniconsGlyphs}
          style={style}
        />
      );
    case "Material":
      return (
        <MaterialIcons
          color={iconColor}
          size={normalizeSize(size)}
          name={name as MaterialGlyphs}
          style={style}
        />
      );
    case "FontAwesome5":
      return (
        <FontAwesome5
          color={iconColor}
          size={normalizeSize(size)}
          name={name as FontAwesome5Glyphs}
          style={style}
        />
      );
    case "FontAwesome":
      return (
        <FontAwesome
          color={iconColor}
          size={normalizeSize(size)}
          name={name as FontAwesomeGlyphs}
          style={style}
        />
      );
    case "MaterialCommunity":
      return (
        <MaterialCommunityIcons
          color={iconColor}
          size={normalizeSize(size)}
          name={name as MaterialCommunityGlyphs}
          style={style}
        />
      );
    case "Feather":
      return (
        <Feather
          color={iconColor}
          size={normalizeSize(size)}
          name={name as FeatherGlyphs}
          style={style}
        />
      );
    default:
      throw new Error(`Unsupported icon type: ${type}`);
  }
}
