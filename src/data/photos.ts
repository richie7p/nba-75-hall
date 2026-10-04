// No portrait is published until its file URL, author, license, and attribution
// have been reviewed. See docs/portrait-audit.json for the retired inventory.
export const PHOTOS: Record<string, string> = {};
export function photoOf(id: string): string | undefined { return PHOTOS[id]; }
