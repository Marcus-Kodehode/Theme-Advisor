export interface ColorPalette {
  name: string;
  id: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    warm: string;
    cool: string;
    background: string;
    surface: string;
    foreground: string;
    muted: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}
