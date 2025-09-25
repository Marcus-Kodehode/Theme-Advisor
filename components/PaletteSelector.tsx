"use client";

import { useState } from "react";
import { ExtendedColorPalette } from "@/data/palettes";
import { cn } from "@/lib/utils";

interface PaginatedPaletteSelectorProps {
  palettes: ExtendedColorPalette[];
  selectedId: string;
  onSelect: (id: string) => void;
  isDarkMode: boolean;
  onDarkModeToggle: (isDark: boolean) => void;
}

export function PaginatedPaletteSelector({
  palettes,
  selectedId,
  onSelect,
  isDarkMode,
  onDarkModeToggle,
}: PaginatedPaletteSelectorProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const palettesPerPage = 6;

  const totalPages = Math.ceil(palettes.length / palettesPerPage);
  const startIndex = currentPage * palettesPerPage;
  const visiblePalettes = palettes.slice(
    startIndex,
    startIndex + palettesPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header with Dark Mode Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Choose Palette</h2>

        {/* Dark Mode Toggle */}
        <div className="flex items-center space-x-3">
          <span
            className={cn(
              "text-sm",
              !isDarkMode ? "font-medium text-gray-800" : "text-gray-500"
            )}
          >
            Light
          </span>
          <button
            onClick={() => onDarkModeToggle(!isDarkMode)}
            className={cn(
              "relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              isDarkMode ? "bg-blue-600" : "bg-gray-300"
            )}
          >
            <div
              className={cn(
                "absolute w-5 h-5 bg-white rounded-full transition-transform duration-300 top-0.5",
                isDarkMode ? "translate-x-6" : "translate-x-0.5"
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm",
              isDarkMode ? "font-medium text-gray-800" : "text-gray-500"
            )}
          >
            Dark
          </span>
        </div>
      </div>

      {/* Current Mode Indicator */}
      <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800 font-medium">
          Viewing:{" "}
          <span className="font-bold">{isDarkMode ? "Dark" : "Light"}</span>{" "}
          Mode Variants
        </p>
      </div>

      {/* Palette Grid */}
      <div className="space-y-3">
        {visiblePalettes.map((palette) => {
          const activePalette =
            isDarkMode && palette.darkVariant ? palette.darkVariant : palette;
          const isSelected = selectedId === activePalette.id;

          return (
            <div
              key={activePalette.id}
              className={cn(
                "p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-300 hover:border-gray-400 bg-white"
              )}
              onClick={() => onSelect(activePalette.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {activePalette.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {activePalette.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>

              {/* Color Preview Grid */}
              <div className="grid grid-cols-6 gap-2">
                <div
                  className="w-full h-8 rounded-md border border-gray-200"
                  style={{ backgroundColor: activePalette.colors.primary }}
                  title="Primary"
                />
                <div
                  className="w-full h-8 rounded-md border border-gray-200"
                  style={{ backgroundColor: activePalette.colors.accent }}
                  title="Accent"
                />
                <div
                  className="w-full h-8 rounded-md border border-gray-200"
                  style={{ backgroundColor: activePalette.colors.warm }}
                  title="Warm"
                />
                <div
                  className="w-full h-8 rounded-md border border-gray-200"
                  style={{ backgroundColor: activePalette.colors.cool }}
                  title="Cool"
                />
                <div
                  className="w-full h-8 rounded-md border border-gray-200"
                  style={{ backgroundColor: activePalette.colors.surface }}
                  title="Surface"
                />
                <div
                  className="w-full h-8 rounded-md border border-gray-200"
                  style={{ backgroundColor: activePalette.colors.background }}
                  title="Background"
                />
              </div>

              {/* Dark Variant Indicator */}
              {palette.darkVariant && (
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-gray-400 mr-2" />
                  Dark variant available
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
              currentPage === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 hover:scale-105"
            )}
          >
            <span>←</span>
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={cn(
                  "w-8 h-8 rounded-full font-medium transition-all duration-200",
                  currentPage === i
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
            }
            disabled={currentPage === totalPages - 1}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
              currentPage === totalPages - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 hover:scale-105"
            )}
          >
            <span>Next</span>
            <span>→</span>
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center text-sm text-gray-500">
        Showing {visiblePalettes.length} of {palettes.length} palettes
        {palettes.filter((p) => p.darkVariant).length > 0 && (
          <span className="block mt-1">
            {palettes.filter((p) => p.darkVariant).length} palettes have dark
            variants
          </span>
        )}
      </div>
    </div>
  );
}
