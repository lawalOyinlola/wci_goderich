/**
 * Represents the calculated position properties for a carousel card.
 */
export interface CardPosition {
  zIndex: number;
  transform: string;
  opacity: number;
}

/**
 * Calculates the position, transform, opacity, and z-index for a card
 * in a stacked carousel based on its position relative to the active card.
 *
 * @param index - The index of the current card
 * @param current - The index of the currently active card
 * @param totalCards - The total number of cards in the carousel
 * @param isActive - Whether this card is the active card
 * @param isPrev - Whether this card is the previous card (before active)
 * @param isNext - Whether this card is the next card (after active)
 * @returns An object containing zIndex, transform, and opacity values
 */
export function calculateCardPosition(
  index: number,
  current: number,
  totalCards: number,
  isActive: boolean,
  isPrev: boolean,
  isNext: boolean
): CardPosition {
  let zIndex = 1;
  let transformParts: string[] = [];
  let opacity = 0.3;
  let scaleValue = 0.85;

  if (isActive) {
    zIndex = 10;
    transformParts = ["translateX(0)", "translateY(0)", "rotate(0deg)"];
    opacity = 1;
    scaleValue = 1;
  } else if (isPrev) {
    zIndex = 5;
    transformParts = ["translateX(-25px)", "translateY(15px)", "rotate(-3deg)"];
    opacity = 0.6;
    scaleValue = 0.95;
  } else if (isNext) {
    zIndex = 5;
    transformParts = ["translateX(25px)", "translateY(15px)", "rotate(3deg)"];
    opacity = 0.6;
    scaleValue = 0.95;
  } else {
    // Cards further away
    const distance = Math.min(
      Math.abs(index - current),
      Math.abs(index - current + totalCards),
      Math.abs(index - current - totalCards)
    );
    // Calculate circular distance to determine direction with wraparound
    const circularDistance = (index - current + totalCards) % totalCards;
    const isBackward = circularDistance > totalCards / 2;

    if (distance === 2) {
      zIndex = 2;
      transformParts = isBackward
        ? ["translateX(-50px)", "translateY(25px)", "rotate(-5deg)"]
        : ["translateX(50px)", "translateY(25px)", "rotate(5deg)"];
      opacity = 0.4;
      scaleValue = 0.9;
    } else {
      zIndex = 1;
      transformParts = isBackward
        ? ["translateX(-75px)", "translateY(35px)", "rotate(-7deg)"]
        : ["translateX(75px)", "translateY(35px)", "rotate(7deg)"];
      opacity = 0.2;
      scaleValue = 0.85;
    }
  }

  // Combine all transforms including scale
  const fullTransform = [...transformParts, `scale(${scaleValue})`].join(" ");

  return {
    zIndex,
    transform: fullTransform,
    opacity,
  };
}
