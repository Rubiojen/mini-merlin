// appStore.ts
import {StorageHelper} from "@/utils/storage";
import {Appearance} from "react-native";
import type {SharedValue} from "react-native-reanimated";
import {withTiming} from "react-native-reanimated";
import {createStore, useStore} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export type ColorScheme = "light" | "dark";
export const colorScheme: ColorScheme = (Appearance.getColorScheme() ??
  "light") as ColorScheme;

export interface ProfileData {
  username: string;
  displayName: string;
  bio_ai: string;
  avatar: string;
  followers: number;
  posts: Post[];
}

export interface Post {
  id: string;
  mediaUrl: string;
  type: "image" | "video";
}

interface Site {
  id: string;
  templateId: "merlin-1" | "merlin-2";
  profileData: ProfileData;
}

interface AppState {
  isDarkMode: boolean;
  themeProgress: SharedValue<number>;
  inputText: string;
  igSites: Site[];
  setInputText: (text: string) => void;
  setIgSites: (sites: Site[]) => void;
  addIgSites: (sites: Site[]) => void;
  deleteIgSite: (id: string) => void;
  updateIgSite: (id: string, updates: Partial<Site>) => void;
  setDarkMode: (isDark: boolean) => void;
  switchDarkMode: () => void;
  setThemeProgress: (value: SharedValue<number>) => void;
  setThemeAnimation: (
    isDark: boolean,
    opts?: {immediate?: boolean; duration?: number}
  ) => void;
}

export const appStore = createStore<AppState>()(
  persist<AppState>(
    (set, get) => ({
      isDarkMode: colorScheme === "dark",
      igSites: [],
      inputText: "",
      themeProgress: {
        value: colorScheme === "dark" ? 1 : 0,
      } as SharedValue<number>,
      setInputText: (text: string) => set({inputText: text}),
      setIgSites: (sites: Site[]) => set({igSites: sites}),
      addIgSites: (sites: Site[]) => {
        set((state) => {
          const map = new Map<string, Site>();
          state.igSites.forEach((site) => map.set(site.id, site));
          sites.forEach((site) => map.set(site.id, site));

          const merged = Array.from(map.values());
          return {igSites: merged};
        });
      },
      deleteIgSite: (id: string) => {
        set((state) => ({
          igSites: state.igSites.filter((ex) => ex.id !== id),
        }));
      },

      updateIgSite: (id: string, updates: Partial<Site>) => {
        const {igSites} = get();
        const index = igSites.findIndex((ex) => ex.id === id);

        if (index === -1) return;

        const existing = igSites[index];
        const mergedProfile = updates.profileData
          ? {...existing.profileData, ...updates.profileData}
          : existing.profileData;

        const updatedSite: Site = {
          ...existing,
          ...updates,
          profileData: mergedProfile,
        };

        const updatedSites = [...igSites];
        updatedSites[index] = updatedSite;

        set({igSites: updatedSites});
      },
      setDarkMode: (isDark) => set({isDarkMode: isDark}),
      switchDarkMode: () => set((s) => ({isDarkMode: !s.isDarkMode})),
      setThemeProgress: (value) => set({themeProgress: value}),
      setThemeAnimation: (isDark, opts) => {
        const sv = get().themeProgress;
        const to = isDark ? 1 : 0;
        if (opts?.immediate) {
          sv.value = to;
        } else {
          sv.value = withTiming(to, {duration: opts?.duration ?? 250});
        }
      },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => StorageHelper),
      partialize: (state) =>
        ({
          isDarkMode: state.isDarkMode,
          igSites: state.igSites,
          inputText: state.inputText,
        } as AppState),
    }
  )
);

export const useAppState = <T>(selector: (state: AppState) => T) =>
  useStore(appStore, selector);

export const useIgSiteById = (id: string) =>
  useStore(appStore, (s) => s.igSites.find((s) => s.id === id));
