import { create } from 'zustand';

interface SettingState {
  isSetting: boolean; // Whether the setting is set
  showSetting: () => void; // Show the setting
  hideSetting: () => void; // Hide the setting
}

export const useSettingStore = create<SettingState>((set) => ({
  isSetting: false,
  showSetting: () => set({ isSetting: true }), // Show the setting
  hideSetting: () => set({ isSetting: false }), // Hide the setting
}));
