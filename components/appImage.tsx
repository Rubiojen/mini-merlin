import {normalizeSize} from "@/utils/globalStyles";
import {Image, ImageProps} from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export interface AppImage extends ImageProps {
  uri?: string;
  source?: any;
  usePlaceholder?: boolean;
  transitionDuration?: number;
  size?: number;
  tintColor?: string;
  cachePolicy?: "none" | "memory" | "disk" | "memory-disk" | null;
}

export const AppImage = ({
  uri,
  style,
  onLoad,
  onTouchStart,
  source,
  tintColor,
  usePlaceholder = false,
  transitionDuration = 0,
  size,
  // cachePolicy = "disk",
  ...rest
}: AppImage) => {
  const imageSource = source ? source : uri ? {uri} : undefined;

  return (
    <Image
      style={[
        {
          width: size ? normalizeSize(size) : undefined,
          height: size ? normalizeSize(size) : undefined,
          tintColor,
        },
        style,
      ]}
      source={imageSource}
      placeholder={usePlaceholder ? {blurhash} : undefined}
      contentFit="fill"
      transition={transitionDuration}
      // cachePolicy={cachePolicy}
      {...rest}
    />
  );
};
