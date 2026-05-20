import type { Color } from "@/types";

export const ghostVariants: Record<Color, string> = {
  brand: "bg-transparent text-brand-text-heavy hover:bg-brand-light",
  action: "bg-transparent text-action-text-heavy hover:bg-action-light",
  danger: "bg-transparent text-danger-text-heavy hover:bg-danger-light",
  positive: "bg-transparent text-positive-text-heavy hover:bg-positive-light",
  warning: "bg-transparent text-warning-text-heavy hover:bg-warning-light",
  info: "bg-transparent text-info-text-heavy hover:bg-info-light",
  inverse:
    "bg-transparent text-inverse-text-heavy hover:bg-inverse-light hover:border-transparent disabled:border-transparent",
  contrastDark:
    "bg-transparent text-contrast-dark-text-heavy hover:bg-contrast-dark-light",
  contrastLight:
    "bg-transparent text-contrast-light-text-heavy hover:bg-contrast-light-light",
  utility: "bg-transparent text-utility-text-heavy hover:bg-utility-light",
};
