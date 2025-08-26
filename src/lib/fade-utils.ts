export type FadeDirection = "top" | "bottom" | "left" | "right";

export interface FadeOptions {
  directions: FadeDirection[];
  intensity?: "soft" | "medium" | "strong";
  customGradient?: string;
}

/**
 * Creates a custom fade effect by combining multiple directions
 * @param options - Fade configuration options
 * @returns CSS mask styles object
 */
export function createFadeEffect(options: FadeOptions) {
  const { directions, intensity = "medium", customGradient } = options;

  // Intensity settings
  const intensityMap = {
    soft: { start: 5, end: 95 },
    medium: { start: 15, end: 85 },
    strong: { start: 25, end: 75 },
  };

  const { start, end } = intensityMap[intensity];

  // If custom gradient is provided, use it
  if (customGradient) {
    return {
      maskImage: customGradient,
      WebkitMaskImage: customGradient,
    };
  }

  // Create gradients for each direction
  const gradients = directions
    .map((direction) => {
      switch (direction) {
        case "top":
          return `linear-gradient(to bottom, transparent 0%, black ${start}%, black 100%)`;
        case "bottom":
          return `linear-gradient(to bottom, black 0%, black ${end}%, transparent 100%)`;
        case "left":
          return `linear-gradient(to right, transparent 0%, black ${start}%, black 100%)`;
        case "right":
          return `linear-gradient(to left, transparent 0%, black ${start}%, black 100%)`;
        default:
          return "";
      }
    })
    .filter(Boolean);

  // Combine gradients using mask-composite
  const maskImage = gradients.join(", ");

  return {
    maskImage,
    WebkitMaskImage: maskImage,
    WebkitMaskComposite: "source-over",
    maskComposite: "intersect",
  };
}

/**
 * Predefined fade combinations
 */
export const fadePresets = {
  // All sides with medium intensity
  allSides: () =>
    createFadeEffect({
      directions: ["top", "bottom", "left", "right"],
      intensity: "medium",
    }),

  // Top and bottom only
  vertical: () =>
    createFadeEffect({
      directions: ["top", "bottom"],
      intensity: "medium",
    }),

  // Left and right only
  horizontal: () =>
    createFadeEffect({
      directions: ["left", "right"],
      intensity: "medium",
    }),

  // Corners (diagonal fade)
  corners: () => ({
    maskImage: `
      linear-gradient(45deg, transparent 0%, black 20%, black 80%, transparent 100%),
      linear-gradient(-45deg, transparent 0%, black 20%, black 80%, transparent 100%)
    `,
    WebkitMaskImage: `
      linear-gradient(45deg, transparent 0%, black 20%, black 80%, transparent 100%),
      linear-gradient(-45deg, transparent 0%, black 20%, black 80%, transparent 100%)
    `,
    WebkitMaskComposite: "source-over",
    maskComposite: "intersect",
  }),

  // Rectangular fade (more structured than radial)
  rectangular: () =>
    createFadeEffect({
      directions: ["top", "bottom", "left", "right"],
      intensity: "soft",
    }),

  // Custom intensity
  custom: (
    directions: FadeDirection[],
    intensity: "soft" | "medium" | "strong" = "medium"
  ) => createFadeEffect({ directions, intensity }),
};

/**
 * React hook for dynamic fade effects
 */
export function useFadeEffect(options: FadeOptions) {
  return createFadeEffect(options);
}
