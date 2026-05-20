import type { Color } from "@/types";

export const fillVariants: Record<Color, string> = {
  brand: "bg-brand-heavy hover:bg-brand-heavy-hover text-on-brand",
  action: "bg-action-heavy hover:bg-action-heavy-hover text-on-brand",
  danger: "bg-danger-heavy hover:bg-danger-heavy-hover text-on-brand",
  positive: "bg-positive-heavy hover:bg-positive-heavy-hover text-on-brand",
  warning: "bg-warning-heavy hover:bg-warning-heavy-hover text-on-brand",
  info: "bg-info-heavy hover:bg-info-heavy-hover text-on-brand",
  inverse:
    "bg-inverse-heavy hover:bg-inverse-heavy-hover text-inverse-additional-heavy",
  contrastDark:
    "bg-contrast-dark-heavy hover:bg-contrast-dark-heavy-hover text-on-brand",
  contrastLight:
    "bg-contrast-light-heavy hover:bg-contrast-light-heavy-hover text-contrast-dark-heavy",
  utility: "bg-utility-heavy hover:bg-utility-heavy-hover text-on-brand",
};
