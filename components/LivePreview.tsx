// ================================
// components/LivePreview.tsx
// ================================

import { ColorPalette } from "@/types/palette";

interface LivePreviewProps {
  palette: ColorPalette;
}

export function LivePreview({ palette }: LivePreviewProps) {
  return (
    <div
      className="h-full rounded-xl p-6 transition-all duration-500"
      style={{
        backgroundColor: palette.colors.background,
        color: palette.colors.foreground,
      }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className="text-4xl font-bold mb-2 transition-all duration-500"
          style={{ color: palette.colors.primary }}
        >
          {palette.name}
        </h1>
        <p style={{ color: palette.colors.muted }}>{palette.description}</p>
      </div>

      {/* Navigation */}
      <nav
        className="flex justify-center space-x-4 mb-8 p-4 rounded-lg transition-all duration-500"
        style={{
          backgroundColor: palette.colors.surface,
          border: `1px solid ${palette.colors.border}`,
        }}
      >
        {["Home", "About", "Services", "Contact"].map((item) => (
          <button
            key={item}
            className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            style={{ color: palette.colors.muted }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette.colors.primary;
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = palette.colors.muted;
            }}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div
          className="p-6 rounded-xl transition-all duration-500 hover:scale-105"
          style={{
            backgroundColor: palette.colors.surface,
            border: `1px solid ${palette.colors.border}`,
          }}
        >
          <h3 className="text-xl font-semibold mb-3">Primary Action</h3>
          <p className="mb-4" style={{ color: palette.colors.muted }}>
            This demonstrates how primary elements look with this color palette.
          </p>
          <button
            className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: palette.colors.primary,
              color: "white",
            }}
          >
            Get Started
          </button>
        </div>

        <div
          className="p-6 rounded-xl transition-all duration-500 hover:scale-105"
          style={{
            backgroundColor: palette.colors.surface,
            border: `1px solid ${palette.colors.border}`,
          }}
        >
          <h3 className="text-xl font-semibold mb-3">Secondary Action</h3>
          <p className="mb-4" style={{ color: palette.colors.muted }}>
            This shows how accent colors work within the overall design system.
          </p>
          <button
            className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: palette.colors.accent,
              color: "white",
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Status Messages */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { type: "Success", color: palette.colors.success, icon: "✓" },
          { type: "Warning", color: palette.colors.warning, icon: "⚠" },
          { type: "Error", color: palette.colors.error, icon: "✗" },
          { type: "Info", color: palette.colors.info, icon: "i" },
        ].map((status) => (
          <div
            key={status.type}
            className="p-4 rounded-lg text-center transition-all duration-500 hover:scale-105"
            style={{
              backgroundColor: status.color + "20",
              border: `1px solid ${status.color}`,
            }}
          >
            <div
              className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: status.color }}
            >
              {status.icon}
            </div>
            <p className="text-sm" style={{ color: status.color }}>
              {status.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
