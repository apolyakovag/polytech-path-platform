import type { Color } from "@/types";

export const flatVariants: Record<Color, string> = {
  brand:
    "bg-brand-light hover:bg-brand-light-hover text-brand-text-heavy border-transparent",
  action:
    "bg-action-light hover:bg-action-light-hover text-action-text-heavy border-transparent",
  danger:
    "bg-danger-light hover:bg-danger-light-hover text-danger-text-heavy border-transparent",
  positive:
    "bg-positive-light hover:bg-positive-light-hover text-positive-text-heavy border-transparent",
  warning:
    "bg-warning-light hover:bg-warning-light-hover text-warning-text-heavy border-transparent",
  info: "bg-info-light hover:bg-info-light-hover text-info-text-heavy border-transparent",
  inverse:
    "bg-inverse-light hover:bg-inverse-light-hover text-inverse-text-heavy border-transparent",
  contrastDark:
    "bg-contrast-dark-light hover:bg-contrast-dark-light-hover text-contrast-dark-text-heavy border-transparent",
  contrastLight:
    "bg-contrast-light-light hover:bg-contrast-light-light-hover text-contrast-light-text-heavy border-transparent",
  utility:
    "bg-utility-light hover:bg-utility-light-hover text-utility-text-heavy border-transparent",
};
