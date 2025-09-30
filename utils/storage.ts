import AsyncStorage from "@react-native-async-storage/async-storage";

const writeTimers: Record<string, ReturnType<typeof setTimeout> | undefined> =
  {};

export const StorageHelper = {
  setItem: async (key: string, value: any) => {
    const str = JSON.stringify(value);
    if (key === "app-storage") {
      if (writeTimers[key]) clearTimeout(writeTimers[key]);
      writeTimers[key] = setTimeout(() => {
        AsyncStorage.setItem(key, str);
      }, 300);
      return;
    }
    await AsyncStorage.setItem(key, str);
  },
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
  clear: async () => {
    await AsyncStorage.clear();
  },
};
