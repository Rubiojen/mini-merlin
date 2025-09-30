import {Post, useIgSiteById} from "@/state/appState";
import {GS, normalizeWidth} from "@/utils/globalStyles";
import {formatFollowers, gridItemSize, LAYOUT_ANIMATION} from "@/utils/helpers";
import {useLocalSearchParams} from "expo-router";
import React, {useMemo} from "react";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  SlideInDown,
  SlideOutUp,
} from "react-native-reanimated";
import {AppImage} from "../appImage";
import {ThemedText} from "../themedText";
import {ThemedView} from "../themedView";
import {
  InlineEditableAbout,
  InlineEditableTitle,
} from "./editables/editableTexts";

const P12 = normalizeWidth(12);
const P16 = normalizeWidth(16);
const P24 = normalizeWidth(24);

export function MerlinTwo() {
  const {username} = useLocalSearchParams<{username?: string}>();
  const site = useIgSiteById(username ?? "");
  const profile = site?.profileData;
  const {width} = useWindowDimensions();
  const cols = 2;
  const totalPadding = P16 * 2;
  const gap = P12;
  const itemSize = useMemo(
    () => gridItemSize(width, totalPadding, gap, cols),
    [width, totalPadding, gap]
  );

  const hero = profile?.posts[0];
  const gridData = useMemo(() => profile?.posts.slice(1), [profile?.posts]);
  const heroHeight = Math.round(width * 0.9);
  const avatarSize = normalizeWidth(100);

  return (
    <ThemedView fadeOnLoad fadeDurationMs={800} style={GS.flexOne}>
      <Animated.FlatList<Post>
        data={gridData}
        keyExtractor={(item) => item.id}
        numColumns={cols}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{gap, paddingHorizontal: P16}}
        contentContainerStyle={{paddingBottom: P24}}
        ListHeaderComponent={
          <Animated.View
            entering={SlideInDown.springify()}
            exiting={SlideOutUp.duration(120)}
          >
            <View style={{width, height: heroHeight}}>
              <AppImage style={StyleSheet.absoluteFill} uri={hero?.mediaUrl} />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  GS.center,
                  {paddingHorizontal: P24},
                ]}
              >
                <InlineEditableTitle color="white" size={32} />
                <ThemedText color="white" size={18} style={GS.marginTop4}>
                  @{profile?.username}
                </ThemedText>
                <ThemedText color="white" size={16} style={GS.marginTop4}>
                  {formatFollowers(profile?.followers ?? 0)} followers
                </ThemedText>
                <InlineEditableAbout color="white" size={18} />
              </View>
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -avatarSize / 2,
                  alignItems: "center",
                }}
              >
                <AppImage
                  uri={profile?.avatar}
                  size={avatarSize}
                  style={{
                    width: avatarSize,
                    height: avatarSize,
                    borderRadius: avatarSize / 2,
                  }}
                />
              </View>
            </View>
            <View style={{height: avatarSize / 2 + P12}} />
          </Animated.View>
        }
        renderItem={({item, index}) => (
          <Animated.View
            entering={FadeInUp.delay(index * 35)
              .springify()
              .damping(48)}
            exiting={FadeOutDown.duration(120)}
            layout={LAYOUT_ANIMATION}
          >
            <AppImage
              uri={item.mediaUrl}
              style={{
                width: itemSize,
                height: Math.round(itemSize * 0.85),
                borderRadius: normalizeWidth(16),
                marginBottom: gap,
              }}
            />
          </Animated.View>
        )}
      />
    </ThemedView>
  );
}
