"use client";

import { useState, useEffect } from "react";
import { colorPalettes, ExtendedColorPalette } from "@/data/palettes";
import { PaginatedPaletteSelector } from "@/components/PaletteSelector";
import { LivePreview } from "@/components/LivePreview";
import { ColorDetails } from "@/components/ColorDetails";
import { PaletteEditor } from "@/components/PaletteEditor";
import { ColorPalette } from "@/types/palette";
import { storageUtils } from "@/utils/localStorage";

export default function ColorCraft() {
  const [palettes, setPalettes] =
    useState<ExtendedColorPalette[]>(colorPalettes);
  const [selectedPaletteId, setSelectedPaletteId] = useState(
    colorPalettes[0].id
  );
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPalette, setEditingPalette] =
    useState<ExtendedColorPalette | null>(null);

  // Load custom palettes from localStorage on component mount
  useEffect(() => {
    if (storageUtils.isStorageAvailable()) {
      const customPalettes = storageUtils.loadCustomPalettes();
      if (customPalettes.length > 0) {
        // Combine default palettes with custom palettes
        setPalettes([...colorPalettes, ...customPalettes]);
      }
    }
  }, []);

  // Save custom palettes to localStorage whenever palettes change
  useEffect(() => {
    if (storageUtils.isStorageAvailable()) {
      storageUtils.saveCustomPalettes(palettes);
    }
  }, [palettes]);

  // Dark mode toggle - maintains dark mode state when switching palettes
  const handleDarkModeToggle = (newDarkMode: boolean) => {
    setIsDarkMode(newDarkMode);

    // Auto-switch palette variant based on current selection
    const currentBasePaletteId = selectedPaletteId.replace("-dark", "");
    const palette = palettes.find((p) => p.id === currentBasePaletteId);

    if (palette) {
      if (newDarkMode && palette.darkVariant) {
        setSelectedPaletteId(palette.darkVariant.id);
      } else {
        setSelectedPaletteId(palette.id);
      }
    }
  };

  // Handle palette selection - respects current dark mode state
  const handlePaletteSelect = (paletteId: string) => {
    const basePaletteId = paletteId.replace("-dark", "");
    const palette = palettes.find((p) => p.id === basePaletteId);

    if (palette) {
      // If dark mode is enabled and palette has dark variant, select dark variant
      if (isDarkMode && palette.darkVariant) {
        setSelectedPaletteId(palette.darkVariant.id);
      } else {
        // Otherwise select the base palette
        setSelectedPaletteId(palette.id);
      }
    }
  };

  const getCurrentPalette = (): ColorPalette => {
    for (const palette of palettes) {
      if (palette.id === selectedPaletteId) return palette;
      if (palette.darkVariant?.id === selectedPaletteId)
        return palette.darkVariant;
    }
    return palettes[0];
  };

  // Handle creating new palette
  const handleCreatePalette = () => {
    setEditingPalette(null);
    setEditorOpen(true);
  };

  // Handle editing existing palette
  const handleEditPalette = () => {
    const currentExtendedPalette = palettes.find(
      (p) =>
        p.id === selectedPaletteId || p.darkVariant?.id === selectedPaletteId
    );
    setEditingPalette(currentExtendedPalette || null);
    setEditorOpen(true);
  };

  // Handle saving palette from editor
  const handleSavePalette = (
    palette: ColorPalette,
    darkVariant?: ColorPalette
  ) => {
    const newExtendedPalette: ExtendedColorPalette = {
      ...palette,
      darkVariant,
    };

    if (editingPalette) {
      // Update existing palette
      setPalettes((prev) =>
        prev.map((p) => (p.id === editingPalette.id ? newExtendedPalette : p))
      );
    } else {
      // Add new palette
      setPalettes((prev) => [...prev, newExtendedPalette]);
    }

    // Select the new/updated palette
    setSelectedPaletteId(palette.id);
    setEditorOpen(false);
    setEditingPalette(null);
  };

  // Handle deleting palette
  const handleDeletePalette = () => {
    if (palettes.length <= 1) return; // Don't delete if it's the last palette

    const paletteToDelete = palettes.find(
      (p) =>
        p.id === selectedPaletteId || p.darkVariant?.id === selectedPaletteId
    );

    if (paletteToDelete) {
      // Remove from localStorage if it's a custom palette
      if (
        paletteToDelete.id.startsWith("custom-") &&
        storageUtils.isStorageAvailable()
      ) {
        storageUtils.removeCustomPalette(paletteToDelete.id);
      }

      setPalettes((prev) => prev.filter((p) => p.id !== paletteToDelete.id));

      // Select first available palette
      const remainingPalettes = palettes.filter(
        (p) => p.id !== paletteToDelete.id
      );
      if (remainingPalettes.length > 0) {
        setSelectedPaletteId(remainingPalettes[0].id);
      }
    }
  };

  const currentPalette = getCurrentPalette();
  const canDelete = palettes.length > 1;
  const currentExtendedPalette = palettes.find(
    (p) => p.id === selectedPaletteId || p.darkVariant?.id === selectedPaletteId
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ColorCraft</h1>
              <p className="text-gray-600 mt-2">
                Professional color palette testing and visualization tool
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Palette Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleCreatePalette}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Add Palette
                </button>
                <button
                  onClick={handleEditPalette}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  Edit Palette
                </button>
                {canDelete && (
                  <button
                    onClick={handleDeletePalette}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>

              <div className="text-right text-sm text-gray-500">
                <p>
                  Currently viewing:{" "}
                  <span className="font-medium text-gray-900">
                    {currentPalette.name}
                  </span>
                </p>
                <p className="text-xs mt-1">
                  Mode:{" "}
                  <span className="font-medium">
                    {isDarkMode ? "Dark" : "Light"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-6 h-[850px]">
          <div className="col-span-3 bg-white rounded-xl p-6 shadow-lg overflow-y-auto">
            <PaginatedPaletteSelector
              palettes={palettes}
              selectedId={selectedPaletteId}
              onSelect={handlePaletteSelect}
              isDarkMode={isDarkMode}
              onDarkModeToggle={handleDarkModeToggle}
            />
          </div>

          <div className="col-span-6 bg-white rounded-xl shadow-lg overflow-hidden">
            <LivePreview palette={currentPalette} />
          </div>

          <div className="col-span-3 bg-white rounded-xl p-6 shadow-lg overflow-y-auto">
            <ColorDetails palette={currentPalette} />
          </div>
        </div>
      </div>

      {/* Palette Editor Modal */}
      <PaletteEditor
        isOpen={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditingPalette(null);
        }}
        onSave={handleSavePalette}
        editingPalette={editingPalette}
      />
    </div>
  );
}
