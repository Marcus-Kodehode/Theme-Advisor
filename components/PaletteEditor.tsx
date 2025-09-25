"use client";

import { useState, useEffect } from "react";
import { ColorPalette } from "@/types/palette";
import { ExtendedColorPalette } from "@/data/palettes";

interface PaletteEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (palette: ColorPalette, darkVariant?: ColorPalette) => void;
  editingPalette?: ExtendedColorPalette | null;
}

export function PaletteEditor({
  isOpen,
  onClose,
  onSave,
  editingPalette,
}: PaletteEditorProps) {
  const [palette, setPalette] = useState<ColorPalette>({
    name: "Custom Palette",
    id: `custom-${Date.now()}`,
    description: "My custom color palette",
    colors: {
      primary: "#3B82F6",
      secondary: "#E5E7EB",
      accent: "#10B981",
      warm: "#F59E0B",
      cool: "#06B6D4",
      background: "#FFFFFF",
      surface: "#F9FAFB",
      foreground: "#111827",
      muted: "#6B7280",
      border: "#D1D5DB",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
    },
  });

  const [createDarkVariant, setCreateDarkVariant] = useState(false);
  const [darkPalette, setDarkPalette] = useState<ColorPalette>({
    name: "Custom Palette Dark",
    id: `custom-${Date.now()}-dark`,
    description: "My custom color palette - Dark mode",
    colors: {
      primary: "#60A5FA",
      secondary: "#374151",
      accent: "#34D399",
      warm: "#FBBF24",
      cool: "#22D3EE",
      background: "#111827",
      surface: "#1F2937",
      foreground: "#F9FAFB",
      muted: "#9CA3AF",
      border: "#374151",
      success: "#34D399",
      warning: "#FBBF24",
      error: "#F87171",
      info: "#60A5FA",
    },
  });

  // Update form when editingPalette changes
  useEffect(() => {
    if (editingPalette) {
      setPalette(editingPalette);
      setCreateDarkVariant(!!editingPalette.darkVariant);

      if (editingPalette.darkVariant) {
        setDarkPalette(editingPalette.darkVariant);
      }
    } else {
      // Reset to default values for new palette
      const timestamp = Date.now();
      setPalette({
        name: "Custom Palette",
        id: `custom-${timestamp}`,
        description: "My custom color palette",
        colors: {
          primary: "#3B82F6",
          secondary: "#E5E7EB",
          accent: "#10B981",
          warm: "#F59E0B",
          cool: "#06B6D4",
          background: "#FFFFFF",
          surface: "#F9FAFB",
          foreground: "#111827",
          muted: "#6B7280",
          border: "#D1D5DB",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
        },
      });
      setCreateDarkVariant(false);
      setDarkPalette({
        name: "Custom Palette Dark",
        id: `custom-${timestamp}-dark`,
        description: "My custom color palette - Dark mode",
        colors: {
          primary: "#60A5FA",
          secondary: "#374151",
          accent: "#34D399",
          warm: "#FBBF24",
          cool: "#22D3EE",
          background: "#111827",
          surface: "#1F2937",
          foreground: "#F9FAFB",
          muted: "#9CA3AF",
          border: "#374151",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
          info: "#60A5FA",
        },
      });
    }
  }, [editingPalette, isOpen]);

  // Update dark palette name and id when light palette changes
  useEffect(() => {
    if (createDarkVariant) {
      setDarkPalette((prev) => ({
        ...prev,
        name: `${palette.name} Dark`,
        id: `${palette.id}-dark`,
        description: `${palette.description} - Dark mode`,
      }));
    }
  }, [palette.name, palette.id, palette.description, createDarkVariant]);

  const handleSave = () => {
    onSave(palette, createDarkVariant ? darkPalette : undefined);
  };

  const handleColorChange = (
    colorKey: string,
    value: string,
    isDark = false
  ) => {
    if (isDark) {
      setDarkPalette((prev) => ({
        ...prev,
        colors: { ...prev.colors, [colorKey]: value },
      }));
    } else {
      setPalette((prev) => ({
        ...prev,
        colors: { ...prev.colors, [colorKey]: value },
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {editingPalette ? "Edit Palette" : "Create New Palette"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-gray-50">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Palette Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Palette Name
              </label>
              <input
                type="text"
                value={palette.name}
                onChange={(e) =>
                  setPalette({ ...palette, name: e.target.value })
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-base"
                placeholder="Enter palette name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Description
              </label>
              <input
                type="text"
                value={palette.description}
                onChange={(e) =>
                  setPalette({ ...palette, description: e.target.value })
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-base"
                placeholder="Describe your palette"
              />
            </div>
          </div>

          {/* Color Grid */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Light Mode Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(palette.colors).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-12 h-10 rounded border-2 border-gray-300 cursor-pointer hover:border-blue-400 transition-colors"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="flex-1 p-2 border-2 border-gray-300 rounded text-sm font-mono bg-white text-gray-900 focus:border-blue-500 focus:outline-none"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dark Variant Toggle */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="checkbox"
                checked={createDarkVariant}
                onChange={(e) => setCreateDarkVariant(e.target.checked)}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-2 border-gray-300 rounded"
              />
              <label className="text-lg font-semibold text-gray-900">
                Create Dark Mode Variant
              </label>
            </div>

            {createDarkVariant && (
              <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-600">
                <h4 className="text-white font-medium mb-4 text-base">
                  Dark Mode Colors
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(darkPalette.colors).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-200 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) =>
                            handleColorChange(key, e.target.value, true)
                          }
                          className="w-12 h-10 rounded border-2 border-gray-500 cursor-pointer hover:border-gray-400 transition-colors"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleColorChange(key, e.target.value, true)
                          }
                          className="flex-1 p-2 bg-gray-700 border-2 border-gray-600 rounded text-sm font-mono text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 border-t-2 border-t-gray-300">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm"
              >
                {editingPalette ? "Update Palette" : "Create Palette"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
