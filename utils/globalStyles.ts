import {
  Dimensions,
  LayoutAnimation,
  PixelRatio,
  StyleSheet,
} from "react-native";

export const animateLayout = () =>
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

const baseScreenWidth = 414; // iPhone 11 - 414x896
const baseScreenHeight = 896;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export const normalizeWidth = (width: number) => {
  return PixelRatio.roundToNearestPixel(
    width * (windowWidth / baseScreenWidth)
  );
};

export const normalizeSize = (size: number) => {
  "worklet";
  const widthRatio = windowWidth / baseScreenWidth;
  const heightRatio = windowHeight / baseScreenHeight;
  const averageRatio = (widthRatio + heightRatio) / 2;

  return PixelRatio.roundToNearestPixel(size * averageRatio);
};

/**
   * const baseScreenWidth = 414; // iPhone 11 - 414x896
  const baseScreenHeight = 896;
   */

export const normalizeHeight = (height: number) => {
  return PixelRatio.roundToNearestPixel(
    height * (windowHeight / baseScreenHeight)
  );
};

export const GS = StyleSheet.create({
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  authWidth: {
    width: "auto",
  },
  screenWidth: {
    width: screenWidth,
  },
  screenHeight: {
    height: screenHeight,
  },
  noBorder: {
    borderWidth: 0,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  displayNone: {
    display: "none",
  },
  displayFlex: {
    display: "flex",
  },
  overFlowHide: {
    overflow: "hidden",
  },
  flexZero: {
    flex: 0,
  },
  flexOne: {
    flex: 1,
  },
  flexTwo: {
    flex: 2,
  },
  flexThee: {
    flex: 3,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  flexShrink: {
    flexShrink: 1,
  },
  noWrap: {
    flexWrap: "nowrap",
  },
  absolute: {
    position: "absolute",
  },
  widthAuto: {
    width: "auto",
  },
  width32: {
    width: normalizeWidth(32),
  },
  right4: {
    right: normalizeWidth(4),
  },
  right8: {
    right: normalizeWidth(8),
  },
  left8: {
    left: normalizeWidth(8),
  },
  right16: {
    right: normalizeWidth(16),
  },
  left16: {
    left: normalizeWidth(16),
  },
  bottomZero: {
    bottom: 0,
  },
  leftZero: {
    left: 0,
  },
  rightZero: {
    right: 0,
  },
  topZero: {
    top: 0,
  },
  opacityZero: {
    opacity: 0,
  },
  opacity05: {
    opacity: 0.5,
  },
  sheetOpacity: {
    opacity: 1,
  },
  // borders
  borderContineous: {
    borderCurve: "continuous",
  },
  borderRadius4: {
    borderRadius: 4,
  },
  borderRadius8: {
    borderRadius: 8,
  },
  borderRadius12: {
    borderRadius: 12,
  },
  borderRadius16: {
    borderRadius: 16,
  },
  borderRadius24: {
    borderRadius: 24,
  },
  borderRadius32: {
    borderRadius: 32,
  },
  borderRadius64: {
    borderRadius: 64,
  },
  borderRadiusMax: {
    borderRadius: 999,
  },
  borderHairWidth: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  // justify/align
  justifyEnd: {
    justifyContent: "flex-end",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifySpaceBetween: {
    justifyContent: "space-between",
  },
  justifySpaceAround: {
    justifyContent: "space-around",
  },
  justifySpaceEvenly: {
    justifyContent: "space-evenly",
  },
  alignSelfStart: {
    alignSelf: "flex-start",
  },
  alignSelfEnd: {
    alignSelf: "flex-end",
  },
  alignSelfCenter: {
    alignSelf: "center",
  },
  alignCenter: {
    alignItems: "center",
  },
  alignStart: {
    alignItems: "flex-start",
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  // gap
  gap4: {gap: normalizeSize(4)},
  gap8: {gap: normalizeSize(8)},
  gap12: {gap: normalizeSize(12)},
  // paddings
  padding16: {padding: 16},
  paddingHorizontal16: {paddingHorizontal: normalizeWidth(16)},
  paddingTop8: {paddingTop: normalizeHeight(8)},
  paddingTop16: {paddingTop: normalizeHeight(16)},
  paddingTop24: {paddingTop: normalizeHeight(24)},
  paddingTop32: {paddingTop: normalizeHeight(32)},
  paddingTop40: {paddingTop: normalizeHeight(40)},
  paddingTop48: {paddingTop: normalizeHeight(48)},
  paddingTop60: {paddingTop: normalizeHeight(60)},
  paddingTop64: {paddingTop: normalizeHeight(64)},
  paddingBottom4: {paddingBottom: normalizeHeight(4)},
  paddingBottom6: {paddingBottom: normalizeHeight(6)},
  paddingBottom8: {paddingBottom: normalizeHeight(8)},
  paddingBottom12: {paddingBottom: normalizeHeight(12)},
  paddingBottom16: {paddingBottom: normalizeHeight(16)},
  paddingBottom24: {paddingBottom: normalizeHeight(24)},
  paddingBottom32: {paddingBottom: normalizeHeight(32)},
  paddingBottom64: {paddingBottom: normalizeHeight(64)},
  paddingBottom128: {paddingBottom: normalizeHeight(128)},
  marginLeft8: {
    marginLeft: normalizeWidth(8),
  },
  marginLeft12: {
    marginLeft: normalizeWidth(12),
  },
  marginLeft16: {
    marginLeft: normalizeWidth(16),
  },
  marginRight4: {
    marginRight: normalizeWidth(4),
  },
  marginRight8: {
    marginRight: normalizeWidth(8),
  },
  marginRight12: {
    marginRight: normalizeWidth(12),
  },
  marginRight16: {
    marginRight: normalizeHeight(16),
  },
  marginBottom2: {
    marginBottom: normalizeHeight(2),
  },
  marginBottom4: {
    marginBottom: normalizeHeight(4),
  },
  marginBottom8: {
    marginBottom: normalizeHeight(8),
  },
  marginBottom12: {
    marginBottom: normalizeHeight(12),
  },
  marginBottom16: {
    marginBottom: normalizeHeight(16),
  },
  marginBottom24: {
    marginBottom: normalizeHeight(24),
  },
  marginBottom32: {
    marginBottom: normalizeHeight(32),
  },
  marginTop4: {
    marginTop: normalizeHeight(4),
  },
  marginTop8: {
    marginTop: normalizeHeight(8),
  },
  marginTop12: {
    marginTop: normalizeHeight(12),
  },
  marginTop16: {
    marginTop: normalizeHeight(16),
  },
  textAlignRight: {
    textAlign: "right",
  },
  textAlignLeft: {
    textAlign: "left",
  },
  textAlignCenter: {
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
});
