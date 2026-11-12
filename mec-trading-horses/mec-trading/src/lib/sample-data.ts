import type { Horse } from "@/types/horse";

/**
 * No demo horses are published.
 * The catalogue is populated exclusively from authorised horses entered
 * through the admin dashboard.
 */
export const horses: Horse[] = [];

export function getHorseBySlug(slug: string) {
  return horses.find((horse) => horse.slug === slug);
}

export function getFeaturedHorses() {
  return horses.filter((horse) => horse.featuredOnHome);
}

export function getFeaturedStoryHorse() {
  return horses.find((horse) => horse.featuredStory);
}
