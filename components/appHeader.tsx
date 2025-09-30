import {useThemeColor} from "@/hooks/useThemeColor";
import {GS, normalizeWidth} from "@/utils/globalStyles";
import * as Burnt from "burnt";
import {router, useLocalSearchParams} from "expo-router";
import React from "react";
import {
  Share,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {IconSymbol} from "./iconSymbol";
import {ThemedText} from "./themedText";

type AppHeaderProps = {
  hasBack?: boolean;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  titleLeft?: boolean;
  withBottomBorder?: boolean;
  headerStyle?: StyleProp<ViewStyle>;
  centerTitle?: boolean;
  backIcon?: string;
  onBack?: () => void;
  centerComponent?: React.ReactNode;
};

export const AppHeader = ({
  hasBack = true,
  withBottomBorder = false,
  backIcon = "chevron-back",
  headerStyle,
  centerComponent,
}: AppHeaderProps) => {
  const Border = useThemeColor("border");
  const {username} = useLocalSearchParams<{username?: string}>();
  const goBack = () => {
    router.back();
  };

  const publishSite = async () => {
    Burnt.toast({
      title: `Published to https://${username}.merlin-site.com`,
      preset: "done",
    });
    await Share.share({
      message: "Check out my Merlin site",
      url: `https://${username}.merlin-site.com`,
    });
  };

  return (
    <View
      style={[
        GS.row,
        GS.alignCenter,
        withBottomBorder && styles.border,
        {borderColor: Border},
        headerStyle,
      ]}
    >
      <View style={{minWidth: normalizeWidth(40)}}>
        {hasBack && (
          <TouchableOpacity
            hitSlop={20}
            style={[GS.marginLeft12]}
            onPress={goBack}
          >
            <IconSymbol type="Ionicons" name={backIcon as any} size={24} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1}}>{centerComponent}</View>
      <View style={[{minWidth: normalizeWidth(40)}, GS.marginRight8]}>
        {hasBack && (
          <TouchableOpacity hitSlop={20} onPress={publishSite}>
            <IconSymbol
              style={GS.alignSelfCenter}
              type="Ionicons"
              name={"share-outline"}
              size={24}
            />
            <ThemedText style={GS.alignSelfCenter} size={14}>
              Publish
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
