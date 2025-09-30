import {Post, useIgSiteById} from "@/state/appState";
import {GS, normalizeWidth} from "@/utils/globalStyles";
import {formatFollowers, gridItemSize, LAYOUT_ANIMATION} from "@/utils/helpers";
import {useLocalSearchParams} from "expo-router";
import React, {useMemo} from "react";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import Animated, {FadeInUp, FadeOutDown} from "react-native-reanimated";
import {AppImage} from "../appImage";
import {ThemedText} from "../themedText";
import {ThemedView} from "../themedView";
import {
  InlineEditableAbout,
  InlineEditableTitle,
} from "./editables/editableTexts";

const P8 = normalizeWidth(8);
const P16 = normalizeWidth(16);

export function MerlinOne() {
  const {username} = useLocalSearchParams<{username?: string}>();
  const site = useIgSiteById(username ?? "");
  const profile = site?.profileData;
  const {width} = useWindowDimensions();
  const cols = 3;
  const totalPadding = P16 * 4;
  const gap = P8;
  const itemSize = useMemo(
    () => gridItemSize(width, totalPadding, gap, cols),
    [width, totalPadding, gap]
  );

  return (
    <ThemedView
      fadeOnLoad
      fadeDurationMs={800}
      dismissKeyboard
      style={[GS.flexOne, GS.paddingHorizontal16, GS.paddingTop24]}
    >
      <ThemedView bgColor="secondBg" style={[styles.card, GS.borderContineous]}>
        <View style={[GS.row, GS.gap12]}>
          <AppImage
            uri={profile?.avatar}
            size={normalizeWidth(56)}
            style={{
              width: normalizeWidth(56),
              height: normalizeWidth(56),
              borderRadius: normalizeWidth(28),
            }}
          />
          <View style={GS.flexOne}>
            <InlineEditableTitle />
            <ThemedText size={14} color="secondText" style={GS.marginTop4}>
              @{profile?.username} • {formatFollowers(profile?.followers ?? 0)}{" "}
              followers
            </ThemedText>
          </View>
        </View>

        <InlineEditableAbout />

        <Animated.FlatList<Post>
          data={profile?.posts}
          keyExtractor={(item) => item.id}
          numColumns={cols}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{gap}}
          contentContainerStyle={{paddingTop: P16}}
          style={GS.marginTop16}
          renderItem={({item, index}) => (
            <Animated.View
              entering={FadeInUp.delay(index * 25)
                .springify()
                .damping(48)}
              exiting={FadeOutDown.duration(120)}
              layout={LAYOUT_ANIMATION}
            >
              <AppImage
                uri={item.mediaUrl}
                style={{
                  width: itemSize,
                  height: itemSize,
                  borderRadius: normalizeWidth(12),
                  marginBottom: gap,
                }}
              />
            </Animated.View>
          )}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: normalizeWidth(16),
    padding: P16,
  },
});
