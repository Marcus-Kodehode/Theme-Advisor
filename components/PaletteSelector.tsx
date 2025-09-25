"use client";

import { useState } from "react";
import { ExtendedColorPalette } from "@/data/palettes";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const palettesPerPage = 6;

  // Filter palettes based on search
  const filteredPalettes = palettes.filter(
    (palette) =>
      palette.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      palette.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredPalettes.length / palettesPerPage);
  const startIndex = currentPage * palettesPerPage;
  const endIndex = startIndex + palettesPerPage;
  const currentPalettes = filteredPalettes.slice(startIndex, endIndex);

  // Reset to first page when search changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(0);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Choose Palette
        </h2>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search palettes..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
          />
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <span
              className={`text-sm font-medium ${
                !isDarkMode ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Light
            </span>
            <button
              onClick={() => onDarkModeToggle(!isDarkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDarkMode ? "bg-gray-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Dark
            </span>
          </div>
        </div>

        {/* Results info */}
        <div className="mt-3 text-xs text-gray-500">
          Showing {currentPalettes.length} of {filteredPalettes.length} palettes
        </div>
      </div>

      {/* Palette Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-3">
          {currentPalettes.map((palette) => {
            const isSelected =
              selectedId === palette.id ||
              selectedId === palette.darkVariant?.id;
            const hasVariants = !!palette.darkVariant;

            return (
              <div
                key={palette.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
                onClick={() => onSelect(palette.id)}
              >
                {/* Palette Info */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-medium ${
                        isSelected ? "text-blue-900" : "text-gray-900"
                      }`}
                    >
                      {palette.name}
                    </h3>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {palette.description}
                  </p>
                </div>

                {/* Color Swatches - Vertical Stack */}
                <div className="space-y-2">
                  {/* Light mode colors */}
                  <div className="flex space-x-1">
                    <div
                      className="w-6 h-6 rounded border border-gray-200"
                      style={{ backgroundColor: palette.colors.primary }}
                      title={`Primary: ${palette.colors.primary}`}
                    />
                    <div
                      className="w-6 h-6 rounded border border-gray-200"
                      style={{ backgroundColor: palette.colors.accent }}
                      title={`Accent: ${palette.colors.accent}`}
                    />
                    <div
                      className="w-6 h-6 rounded border border-gray-200"
                      style={{ backgroundColor: palette.colors.warm }}
                      title={`Warm: ${palette.colors.warm}`}
                    />
                    <div
                      className="w-6 h-6 rounded border border-gray-200"
                      style={{ backgroundColor: palette.colors.cool }}
                      title={`Cool: ${palette.colors.cool}`}
                    />
                  </div>

                  {/* Dark mode indicator */}
                  {hasVariants && (
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        <div
                          className="w-4 h-4 rounded border border-gray-300"
                          style={{
                            backgroundColor:
                              palette.darkVariant?.colors.primary,
                          }}
                        />
                        <div
                          className="w-4 h-4 rounded border border-gray-300"
                          style={{
                            backgroundColor: palette.darkVariant?.colors.accent,
                          }}
                        />
                        <div
                          className="w-4 h-4 rounded border border-gray-300"
                          style={{
                            backgroundColor: palette.darkVariant?.colors.warm,
                          }}
                        />
                        <div
                          className="w-4 h-4 rounded border border-gray-300"
                          style={{
                            backgroundColor: palette.darkVariant?.colors.cool,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Dark variant available
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-8 h-8 text-xs rounded ${
                    currentPage === i
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
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
              className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>

          <div className="text-center mt-2 text-xs text-gray-500">
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
}
