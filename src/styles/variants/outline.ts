import type { Color } from "@/types";

export const outlineVariants: Record<Color, string> = {
  brand:
    "border border-brand-line-light bg-transparent text-brand-text-heavy hover:bg-brand-light",
  action:
    "border border-action-line-light bg-transparent text-action-text-heavy hover:bg-action-light",
  danger:
    "border border-danger-line-light bg-transparent text-danger-text-heavy hover:bg-danger-light",
  positive:
    "border border-positive-line-light bg-transparent text-positive-text-heavy hover:bg-positive-light",
  warning:
    "border border-warning-line-light bg-transparent text-warning-text-heavy hover:bg-warning-light",
  info: "border border-info-line-light bg-transparent text-info-text-heavy hover:bg-info-light",
  inverse:
    "border border-inverse-line-light bg-transparent text-inverse-text-heavy hover:bg-inverse-light",
  contrastDark:
    "border border-contrast-dark-line-light bg-transparent text-contrast-dark-text-heavy hover:bg-contrast-dark-light",
  contrastLight:
    "border border-contrast-light-line-light bg-contrast-light-light text-contrast-light-text-heavy hover:bg-contrast-light-light",
  utility:
    "border border-utility-line-light bg-transparent text-utility-text-heavy hover:bg-utility-light",
};
