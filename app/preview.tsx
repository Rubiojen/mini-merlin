import {useLocalSearchParams} from "expo-router";
import React, {useCallback, useMemo} from "react";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";

import {AppHeader} from "@/components/appHeader";
import {Segments} from "@/components/segments";
import {MerlinOne} from "@/components/templates/merlinOne";
import {MerlinTwo} from "@/components/templates/merlinTwo";
import {ThemedView} from "@/components/themedView";
import {useAppState, useIgSiteById} from "@/state/appState";
import {GS, normalizeWidth} from "@/utils/globalStyles";
import {LAYOUT_ANIMATION} from "@/utils/helpers";

type TemplateId = "merlin-1" | "merlin-2";
type TemplateLabel = "Merlin 1" | "Merlin 2";

const TEMPLATE_OPTIONS: TemplateLabel[] = ["Merlin 1", "Merlin 2"];
const LABEL_TO_ID: Record<TemplateLabel, TemplateId> = {
  "Merlin 1": "merlin-1",
  "Merlin 2": "merlin-2",
};
const ID_TO_LABEL: Record<TemplateId, TemplateLabel> = {
  "merlin-1": "Merlin 1",
  "merlin-2": "Merlin 2",
};

export default function PreviewScreen() {
  const {username} = useLocalSearchParams<{username?: string}>();
  const igSite = useIgSiteById(username ?? "");
  const updateIgSite = useAppState((s) => s.updateIgSite);

  const templateId: TemplateId =
    (igSite?.templateId as TemplateId) ?? "merlin-1";
  const SelectedTemplate = useMemo(() => {
    switch (templateId) {
      case "merlin-1":
        return MerlinOne;
      case "merlin-2":
        return MerlinTwo;
      default:
        return MerlinOne;
    }
  }, [templateId]);

  const onTemplateSelect = useCallback(
    (label: string) => {
      if (!username) return;
      updateIgSite(username, {templateId: LABEL_TO_ID[label as TemplateLabel]});
    },
    [username, updateIgSite]
  );

  return (
    <ThemedView topInset bottomInset style={{flex: 1}}>
      <AppHeader
        centerComponent={
          <Segments
            options={TEMPLATE_OPTIONS}
            containerWidth={normalizeWidth(300)}
            selectedOption={ID_TO_LABEL[templateId]}
            onOptionPress={onTemplateSelect}
          />
        }
      />
      <Animated.View
        key={templateId}
        entering={FadeIn.duration(180)}
        exiting={FadeOut.duration(150)}
        layout={LAYOUT_ANIMATION}
        style={GS.flexOne}
      >
        <SelectedTemplate />
      </Animated.View>
    </ThemedView>
  );
}
