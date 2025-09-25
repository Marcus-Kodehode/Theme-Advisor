// components/Logo.tsx
"use client";

import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "white" | "dark";
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function Logo({
  size = "md",
  showText = true,
  variant = "default",
  className = "",
}: LogoProps) {
  const textColorClass = {
    default: "text-gray-900",
    white: "text-white",
    dark: "text-gray-800",
  }[variant];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image */}
      <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
        <Image
          src="/images/logo.png"
          alt="ColorCraft Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <div
          className={`font-bold ${textSizeClasses[size]} ${textColorClass} tracking-tight`}
        >
          <span className="text-blue-600">Color</span>
          <span>Craft</span>
        </div>
      )}
    </div>
  );
}
