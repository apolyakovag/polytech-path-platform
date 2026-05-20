export const focusRingClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand-heavy";

export const scalingClasses =
  "active:scale-95 transition-transform duration-250";

export const buttonBaseClassesWithoutOutline =
  "inline-flex items-center justify-center cursor-pointer";

export const buttonBaseClasses = `${buttonBaseClassesWithoutOutline} ${focusRingClasses}`;

export const formControlBaseClassesWithoutOutline = `${buttonBaseClassesWithoutOutline} transition-all duration-300 ease-in-out appearance-none`;

export const formControlBaseClasses = `${formControlBaseClassesWithoutOutline} ${focusRingClasses}`;

export const formControlDisabledClasses =
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-line-disabled disabled:bg-generic-disabled";

export const formControlCheckedDisabledClasses =
  "disabled:checked:border-transparent disabled:checked:bg-brand-medium";

export const pointerEventsNone = "pointer-events-none";
