import {ThemedText} from "@/components/themedText";
import {ShimmerGradientBackground} from "@/components/themedView";
import {useThemeColor} from "@/hooks/useThemeColor";
import {GS, normalizeHeight, normalizeWidth} from "@/utils/globalStyles";
import {Pressable, View} from "react-native";

type GenerateButtonProps = {
  onPress: () => void;
  disabled: boolean;
};

export const GenerateButton = ({onPress, disabled}: GenerateButtonProps) => {
  const primaryColor = useThemeColor("primaryBg");
  const disabledColor = useThemeColor("disabled");

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        GS.center,
        GS.borderRadius64,
        GS.marginBottom24,
        {
          width: normalizeWidth(380),
          height: normalizeHeight(80),
          backgroundColor: disabled ? disabledColor : primaryColor,
        },
      ]}
    >
      <ShimmerGradientBackground
        speedMS={3200}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0.5}}
        disabled={disabled}
        backgroundColor={"primaryBg"}
        highlightColor={"white"}
      >
        <View
          style={[
            {height: normalizeHeight(80), width: normalizeWidth(380)},
            GS.justifyCenter,
            GS.alignCenter,
          ]}
        >
          <ThemedText
            size={24}
            color="mainText"
            style={[GS.textAlignCenter, GS.bold]}
          >
            Generate Preview
          </ThemedText>
        </View>
      </ShimmerGradientBackground>
    </Pressable>
  );
};
