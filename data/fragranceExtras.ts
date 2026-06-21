export interface FragranceExtras {
  personality: string[];
  accordIntensities: [string, number][];
}

export const fragranceExtras: Record<string, FragranceExtras> = {
  "imperial-royale": {
    personality: ["Regal", "Commanding", "Intense"],
    accordIntensities: [
      ["Warm Spicy", 88],
      ["Sweet", 72],
      ["Tobacco", 58],
      ["Vanilla", 44],
    ],
  },
  "ocean-allure": {
    personality: ["Mysterious", "Free-Spirited", "Magnetic"],
    accordIntensities: [
      ["Aquatic", 86],
      ["Fresh", 70],
      ["Aromatic", 58],
      ["Woody", 40],
    ],
  },
  "velvet-ember": {
    personality: ["Seductive", "Smoldering", "Timeless"],
    accordIntensities: [
      ["Warm Spicy", 84],
      ["Vanilla", 76],
      ["Sweet", 62],
      ["Aromatic", 50],
    ],
  },
  "sensual-mirage": {
    personality: ["Romantic", "Dreamy", "Feminine"],
    accordIntensities: [
      ["Floral", 82],
      ["Sweet", 74],
      ["Powdery", 62],
      ["Vanilla", 55],
    ],
  },
  "scarlet-bliss": {
    personality: ["Vivid", "Bold", "Playful"],
    accordIntensities: [
      ["Fresh Fruity", 87],
      ["Floral", 76],
      ["Sweet", 60],
      ["Musk", 42],
    ],
  },
  "salient-vacation": {
    personality: ["Carefree", "Sun-Kissed", "Radiant"],
    accordIntensities: [
      ["Fresh", 84],
      ["Citrus", 72],
      ["Aromatic", 56],
      ["Woody", 44],
    ],
  },
  "fresh-pulse": {
    personality: ["Energetic", "Clean", "Effortless"],
    accordIntensities: [
      ["Fresh", 92],
      ["Citrus", 80],
      ["Aromatic", 64],
      ["Woody", 36],
    ],
  },
  "floral-muse": {
    personality: ["Graceful", "Luminous", "Effortless"],
    accordIntensities: [
      ["Floral", 90],
      ["Fresh", 72],
      ["Fruity", 56],
      ["Powdery", 40],
    ],
  },
  "eternal-drive": {
    personality: ["Driven", "Powerful", "Ambitious"],
    accordIntensities: [
      ["Fresh Spicy", 86],
      ["Woody", 70],
      ["Aromatic", 58],
      ["Sweet", 46],
    ],
  },
  "dawn-fever": {
    personality: ["Warm", "Universal", "Golden"],
    accordIntensities: [
      ["Floral", 78],
      ["Amber", 74],
      ["Sweet", 66],
      ["Musk", 58],
    ],
  },
  "bloom-rush": {
    personality: ["Joyful", "Youthful", "Effervescent"],
    accordIntensities: [
      ["Fresh Fruity", 90],
      ["Floral", 82],
      ["Musk", 52],
      ["Sweet", 44],
    ],
  },
};
