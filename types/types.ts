import {Colors} from "@/constants/colors";

export type AppColorsType = keyof typeof Colors.light &
  keyof typeof Colors.dark;
