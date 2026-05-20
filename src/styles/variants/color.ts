import type { Color } from "@/types";

export const colorVariants: Record<Color, string> = {
  brand: "bg-brand-heavy text-on-brand",
  action: "bg-action-heavy text-on-brand",
  danger: "bg-danger-heavy text-on-brand",
  positive: "bg-positive-heavy text-on-brand",
  warning: "bg-warning-heavy text-on-brand",
  info: "bg-info-heavy text-on-brand",
  inverse: "bg-inverse-heavy text-inverse-additional-heavy",
  contrastDark: "bg-contrast-dark-heavy text-on-brand",
  contrastLight: "bg-contrast-light-heavy text-contrast-dark-heavy",
  utility: "bg-utility-heavy text-on-brand",
};
