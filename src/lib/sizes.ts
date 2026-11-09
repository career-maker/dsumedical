/**
 * `sizes` value for an image whose box is `px` wide on the 1920px design canvas.
 * The layout scales with the viewport (never above 1920, floor at 1140 wide), so a fixed "547px"
 * makes the browser fetch a larger file than it displays. This follows the real rendered width.
 */
export const fluid = (px: number) => `max(${Math.round((px * 1140) / 1920)}px, min(${px}px, ${(px / 19.2).toFixed(2)}vw))`;
