// ================================
// components/ColorDetails.tsx
// ================================

import { ColorPalette } from "@/types/palette";
import { ColorSwatch } from "./ColorSwatch";

interface ColorDetailsProps {
  palette: ColorPalette;
}

export function ColorDetails({ palette }: ColorDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Color Swatches
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <ColorSwatch label="Primary" color={palette.colors.primary} />
          <ColorSwatch label="Secondary" color={palette.colors.secondary} />
          <ColorSwatch label="Accent" color={palette.colors.accent} />
          <ColorSwatch label="Warm" color={palette.colors.warm} />
          <ColorSwatch label="Cool" color={palette.colors.cool} />
          <ColorSwatch label="Surface" color={palette.colors.surface} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibent text-gray-900 mb-3">
          Semantic Colors
        </h3>
        <div className="grid grid-cols-4 gap-3">
          <ColorSwatch
            label="Success"
            color={palette.colors.success}
            size="sm"
          />
          <ColorSwatch
            label="Warning"
            color={palette.colors.warning}
            size="sm"
          />
          <ColorSwatch label="Error" color={palette.colors.error} size="sm" />
          <ColorSwatch label="Info" color={palette.colors.info} size="sm" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">CSS Export</h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
          <div>:root &#123;</div>
          {Object.entries(palette.colors).map(([key, value]) => (
            <div key={key} className="pl-4">
              --color-{key}: {value};
            </div>
          ))}
          <div>&#125;</div>
        </div>
      </div>
    </div>
  );
}
