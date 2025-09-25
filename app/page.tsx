// ================================
// app/page.tsx - Main app (simplified)
// ================================

"use client";

import { useState } from "react";
import { defaultPalettes } from "@/data/palettes";
import { PaletteSelector } from "@/components/PaletteSelector";
import { LivePreview } from "@/components/LivePreview";
import { ColorDetails } from "@/components/ColorDetails";

export default function ColorCraft() {
  const [selectedPalette, setSelectedPalette] = useState(defaultPalettes[0].id);
  const currentPalette =
    defaultPalettes.find((p) => p.id === selectedPalette) || defaultPalettes[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">ColorCraft</h1>
          <p className="text-gray-600 mt-2">
            Professional color palette testing and visualization tool
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-6 h-[800px]">
          <div className="col-span-3 bg-white rounded-xl p-6 shadow-lg overflow-y-auto">
            <PaletteSelector
              palettes={defaultPalettes}
              selectedId={selectedPalette}
              onSelect={setSelectedPalette}
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
    </div>
  );
}
