// ================================
// components/PaletteSelector.tsx
// ================================

import { ColorPalette } from "@/types/palette";
import { cn } from "@/lib/utils";

interface PaletteSelectorProps {
  palettes: ColorPalette[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PaletteSelector({
  palettes,
  selectedId,
  onSelect,
}: PaletteSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Choose Palette</h2>
      <div className="space-y-3">
        {palettes.map((palette) => (
          <div
            key={palette.id}
            className={cn(
              "p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105",
              selectedId === palette.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            )}
            onClick={() => onSelect(palette.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{palette.name}</h3>
              {selectedId === palette.id && (
                <span className="text-blue-500 font-bold">✓</span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{palette.description}</p>
            <div className="flex space-x-2">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: palette.colors.primary }}
              ></div>
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: palette.colors.accent }}
              ></div>
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: palette.colors.warm }}
              ></div>
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: palette.colors.cool }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
