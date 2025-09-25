// utils/localStorage.ts
import { ExtendedColorPalette } from "@/data/palettes";

const STORAGE_KEY = "colorcraft-custom-palettes";

export const storageUtils = {
  // Save custom palettes to localStorage
  saveCustomPalettes: (palettes: ExtendedColorPalette[]): void => {
    try {
      // Only save custom palettes (those with IDs starting with 'custom-')
      const customPalettes = palettes.filter((palette) =>
        palette.id.startsWith("custom-")
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customPalettes));
    } catch (error) {
      console.warn("Failed to save palettes to localStorage:", error);
    }
  },

  // Load custom palettes from localStorage
  loadCustomPalettes: (): ExtendedColorPalette[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate that it's an array
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn("Failed to load palettes from localStorage:", error);
    }
    return [];
  },

  // Remove a specific custom palette
  removeCustomPalette: (paletteId: string): void => {
    try {
      const customPalettes = storageUtils.loadCustomPalettes();
      const filtered = customPalettes.filter(
        (palette) => palette.id !== paletteId
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.warn("Failed to remove palette from localStorage:", error);
    }
  },

  // Clear all custom palettes
  clearCustomPalettes: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear palettes from localStorage:", error);
    }
  },

  // Check if localStorage is available
  isStorageAvailable: (): boolean => {
    try {
      const test = "__test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },
};
