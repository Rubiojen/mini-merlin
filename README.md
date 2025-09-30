


https://github.com/user-attachments/assets/7de3b433-da2f-4ea3-adb7-a0a4fd4144dd


# Merlin Assignment 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Run on iOS (dev build)

   ```bash
   npx expo run:ios
   ```

   Requires Xcode installed.

4. Run on Android (dev build)

   ```bash
   npx expo run:android
   ```

   Requires Android Studio with an emulator or a connected device.

## Architecture decisions

- State: Zustand store (`state/appState.ts`) with persisted partial state (`isDarkMode`, `igSites`, `inputText`). Edits via `updateIgSite`, merging `profileData` patches.
- Persistence: `createJSONStorage(StorageHelper)` using AsyncStorage in `utils/storage.ts` with debounced writes for the main key.
- Routing: `expo-router` Stack with `index` (onboarding) and `preview` (templates). Username is passed in the route and selects the site.
- Theming: Central palette in `constants/colors.ts`. `useThemeColor` resolves theme; `ThemedView` animates theme via a shared progress value.
- Components:
  - Primitives: `ThemedText`, `ThemedTextInput`, `ThemedView`, `AppImage`
  - UI: `Segments` (template switch), `AppHeader` (back/publish)
  - Editables: Inline title/about editors
- Templates: `MerlinOne` (classic, 3‑col grid) and `MerlinTwo` (hero + 2‑col grid), reading from persisted `site.profileData`.
- Animations: Reanimated for template transitions, list item entrances, theme interpolation, and onboarding “Scraping” progress.
- Validation: Username validated with `/^[a-z0-9._]{1,30}$/i`, error shown inline under input.
- Trade-offs: Local mock data only; minimal footprint; tests omitted due to timebox.
