export interface FragranceSize {
  ml: number;
  price: number;
}

export interface Fragrance {
  id: string;
  slug: string;
  name: string;
  collection: "signature" | "mens" | "womens" | "oud";
  collectionLabel: string;
  sizes: FragranceSize[];
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  longevity: string;
  occasion: string;
  gender: "Men" | "Women" | "Unisex";
  featured: boolean;
  bestseller: boolean;
}

const SIZES: FragranceSize[] = [
  { ml: 15, price: 1200 },
  { ml: 30, price: 2000 },
  { ml: 50, price: 3000 },
];

export const fragrances: Fragrance[] = [
  {
    id: "1",
    slug: "imperial-royale",
    name: "Imperial Royale",
    collection: "signature",
    collectionLabel: "Signature Collection",
    sizes: SIZES,
    description:
      "A sovereign composition born of the ancient spice routes. Saffron and pink pepper ignite the senses, while a regal heart of oud and rose commands reverence. The dry-down of golden amber and precious woods leaves an indelible trail of distinction.",
    shortDescription: "Saffron and oud — the scent of royalty.",
    image: "/images/imperial-royale.jpg",
    gallery: [
      "/images/imperial-royale-1.jpg",
      "/images/imperial-royale-2.jpg",
      "/images/imperial-royale-3.jpg",
      "/images/imperial-royale-4.jpg",
    ],
    notes: {
      top: ["Saffron", "Pink Pepper", "Bergamot"],
      heart: ["Oud", "Rose", "Jasmine"],
      base: ["Golden Amber", "Sandalwood", "White Musk"],
    },
    longevity: "10-12 hours",
    occasion: "Evening, Special occasions",
    gender: "Unisex",
    featured: true,
    bestseller: true,
  },
  {
    id: "2",
    slug: "ocean-allure",
    name: "Ocean Allure",
    collection: "oud",
    collectionLabel: "Oud Collection",
    sizes: SIZES,
    description:
      "Where the open ocean meets ancient oud — a rare and hypnotic pairing. Fresh sea salt and bergamot open wide before surrendering to a mysterious heart of driftwood and dark oud. A base of white amber and cedar grounds the composition with extraordinary depth.",
    shortDescription: "Sea salt and dark oud — mysterious oceanic depth.",
    image: "/images/ocean-allure.jpg",
    gallery: [
      "/images/ocean-allure-1.jpg",
      "/images/ocean-allure-2.jpg",
      "/images/ocean-allure-3.jpg",
      "/images/ocean-allure-4.jpg",
    ],
    notes: {
      top: ["Sea Salt", "Bergamot", "Green Tea"],
      heart: ["Driftwood", "Oud", "Aquatic Notes"],
      base: ["White Amber", "Cedar", "White Musk"],
    },
    longevity: "8-10 hours",
    occasion: "Evening, Casual, Travel",
    gender: "Unisex",
    featured: true,
    bestseller: false,
  },
  {
    id: "3",
    slug: "velvet-ember",
    name: "Velvet Ember",
    collection: "oud",
    collectionLabel: "Oud Collection",
    sizes: SIZES,
    description:
      "Dark, smoldering warmth wrapped in silk. Cinnamon and cardamom cast a spell from the first breath, while oud and labdanum burn slow and deep at the heart. A luxurious base of benzoin and vanilla embers glows long after the night is over.",
    shortDescription: "Oud and cinnamon — dark, smoldering luxury.",
    image: "/images/velvet-ember.jpg",
    gallery: [
      "/images/velvet-ember-1.jpg",
      "/images/velvet-ember-2.jpg",
      "/images/velvet-ember-3.jpg",
    ],
    notes: {
      top: ["Cinnamon", "Cardamom", "Saffron"],
      heart: ["Oud", "Labdanum", "Rose"],
      base: ["Benzoin", "Vanilla", "Amber"],
    },
    longevity: "12+ hours",
    occasion: "Evening, Winter, Intimate",
    gender: "Unisex",
    featured: true,
    bestseller: true,
  },
  {
    id: "4",
    slug: "sensual-mirage",
    name: "Sensual Mirage",
    collection: "womens",
    collectionLabel: "Women's Collection",
    sizes: SIZES,
    description:
      "An intoxicating illusion of silk and warmth. Ripe peach and saffron shimmer in the opening, giving way to a seductive heart of rose, oud, and jasmine. The trail — soft vanilla and white musk — lingers like a whisper you can't quite place.",
    shortDescription: "Rose and vanilla — seductive, silken warmth.",
    image: "/images/sensual-mirage.jpg",
    gallery: [
      "/images/sensual-mirage-1.jpg",
      "/images/sensual-mirage-2.jpg",
      "/images/sensual-mirage-3.jpg",
      "/images/sensual-mirage-4.jpg",
    ],
    notes: {
      top: ["Peach", "Saffron", "Bergamot"],
      heart: ["Rose", "Oud", "Jasmine"],
      base: ["Vanilla", "White Musk", "Amber"],
    },
    longevity: "10-12 hours",
    occasion: "Evening, Romantic, Date night",
    gender: "Women",
    featured: true,
    bestseller: true,
  },
  {
    id: "5",
    slug: "scarlet-bliss",
    name: "Scarlet Bliss",
    collection: "womens",
    collectionLabel: "Women's Collection",
    sizes: SIZES,
    description:
      "Bold, beautiful, and unapologetically feminine. Tart raspberry and pomegranate burst open with vivid energy before settling into a lush floral heart of rose, peony, and iris. A base of soft patchouli and sandalwood adds quiet sophistication.",
    shortDescription: "Raspberry and rose — vivid, feminine confidence.",
    image: "/images/scarlet-bliss.jpg",
    gallery: [
      "/images/scarlet-bliss-1.jpg",
      "/images/scarlet-bliss-2.jpg",
      "/images/scarlet-bliss-3.jpg",
      "/images/scarlet-bliss-4.jpg",
    ],
    notes: {
      top: ["Raspberry", "Pomegranate", "Citrus"],
      heart: ["Rose", "Peony", "Iris"],
      base: ["Patchouli", "Sandalwood", "White Musk"],
    },
    longevity: "8-10 hours",
    occasion: "Day, Evening, Celebrations",
    gender: "Women",
    featured: false,
    bestseller: true,
  },
  {
    id: "6",
    slug: "salient-vacation",
    name: "Salient Vacation",
    collection: "signature",
    collectionLabel: "Signature Collection",
    sizes: SIZES,
    description:
      "Close your eyes and let the tropics come to you. Coconut and pineapple paint the opening in golden light, while tiare flower and jasmine bloom at the heart. A silky base of sandalwood and vanilla preserves the memory of a perfect afternoon.",
    shortDescription: "Coconut and tiare flower — tropical bliss, bottled.",
    image: "/images/salient-vacation.jpg",
    gallery: [
      "/images/salient-vacation-1.jpg",
      "/images/salient-vacation-2.jpg",
      "/images/salient-vacation-3.jpg",
    ],
    notes: {
      top: ["Coconut", "Pineapple", "Bergamot"],
      heart: ["Tiare Flower", "Jasmine", "Ylang-Ylang"],
      base: ["Sandalwood", "Vanilla", "White Musk"],
    },
    longevity: "8-10 hours",
    occasion: "Day, Casual, Travel, Summer",
    gender: "Unisex",
    featured: false,
    bestseller: false,
  },
  {
    id: "7",
    slug: "fresh-pulse",
    name: "Fresh Pulse",
    collection: "mens",
    collectionLabel: "Men's Collection",
    sizes: SIZES,
    description:
      "Clean energy, bottled. Cool mint and citrus charge the senses from the first spray, while green tea and lavender settle into a refreshing, aromatic heart. A light finish of white musk and driftwood keeps it grounded and effortlessly wearable all day.",
    shortDescription: "Mint and green tea — crisp, clean, confident.",
    image: "/images/fresh-pulse.jpg",
    gallery: [
      "/images/fresh-pulse-1.jpg",
      "/images/fresh-pulse-2.jpg",
      "/images/fresh-pulse-3.jpg",
      "/images/fresh-pulse-4.jpg",
    ],
    notes: {
      top: ["Mint", "Grapefruit", "Lemon"],
      heart: ["Green Tea", "Lavender", "Jasmine"],
      base: ["White Musk", "Driftwood", "Cedar"],
    },
    longevity: "6-8 hours",
    occasion: "Day, Office, Gym, Casual",
    gender: "Men",
    featured: false,
    bestseller: true,
  },
  {
    id: "8",
    slug: "floral-muse",
    name: "Floral Muse",
    collection: "womens",
    collectionLabel: "Women's Collection",
    sizes: SIZES,
    description:
      "A living garden captured in crystal. Lychee and bergamot open with a light, juicy clarity before giving way to a lush heart of gardenia, jasmine, and lily. Cedarwood and ambrette in the base lend a gentle, lasting elegance.",
    shortDescription: "Gardenia and jasmine — effortlessly feminine.",
    image: "/images/floral-muse.jpg",
    gallery: [
      "/images/floral-muse-1.jpg",
      "/images/floral-muse-2.jpg",
      "/images/floral-muse-3.jpg",
      "/images/floral-muse-4.jpg",
    ],
    notes: {
      top: ["Lychee", "Bergamot", "Pink Pepper"],
      heart: ["Gardenia", "Jasmine", "Lily"],
      base: ["Cedarwood", "White Musk", "Ambrette"],
    },
    longevity: "8-10 hours",
    occasion: "Day, Spring, Work, Casual",
    gender: "Women",
    featured: false,
    bestseller: false,
  },
  {
    id: "9",
    slug: "eternal-drive",
    name: "Eternal Drive",
    collection: "mens",
    collectionLabel: "Men's Collection",
    sizes: SIZES,
    description:
      "For the man who never stops moving. A commanding opening of citrus and black pepper ignites ambition, while a refined heart of cedarwood, vetiver, and leather speaks of substance. Tonka bean and amber in the base ensure the trail never fades.",
    shortDescription: "Black pepper and cedar — unstoppable masculine force.",
    image: "/images/eternal-drive.jpg",
    gallery: [
      "/images/eternal-drive-1.jpg",
      "/images/eternal-drive-2.jpg",
      "/images/eternal-drive-3.jpg",
    ],
    notes: {
      top: ["Citrus", "Black Pepper", "Cardamom"],
      heart: ["Cedar", "Vetiver", "Leather"],
      base: ["Tonka Bean", "Amber", "Musk"],
    },
    longevity: "10-12 hours",
    occasion: "Office, Evening, Formal",
    gender: "Men",
    featured: false,
    bestseller: false,
  },
  {
    id: "10",
    slug: "dawn-fever",
    name: "Dawn Fever",
    collection: "womens",
    collectionLabel: "Women's Collection",
    sizes: SIZES,
    description:
      "The golden warmth of first light, translated into fragrance. Mandarin and ginger open with radiant energy, while a blooming heart of magnolia, rose, and freesia unfolds like dawn itself. Tonka bean and sandalwood bring a warm, comforting close.",
    shortDescription: "Magnolia and mandarin — radiant morning warmth.",
    image: "/images/dawn-fever.jpg",
    gallery: [
      "/images/dawn-fever-1.jpg",
      "/images/dawn-fever-2.jpg",
      "/images/dawn-fever-3.jpg",
      "/images/dawn-fever-4.jpg",
    ],
    notes: {
      top: ["Mandarin", "Ginger", "Pink Pepper"],
      heart: ["Magnolia", "Rose", "Freesia"],
      base: ["Tonka Bean", "Sandalwood", "Musk"],
    },
    longevity: "8-10 hours",
    occasion: "Day, Morning, Casual, Work",
    gender: "Women",
    featured: false,
    bestseller: false,
  },
  {
    id: "11",
    slug: "bloom-rush",
    name: "Bloom Rush",
    collection: "womens",
    collectionLabel: "Women's Collection",
    sizes: SIZES,
    description:
      "Life in full bloom — joyful, radiant, unstoppable. Green apple and pear burst open with crisp, youthful energy before giving way to a tender floral heart of peony, cherry blossom, and rose. White musk and amber close with a clean, lasting softness.",
    shortDescription: "Peony and cherry blossom — fresh florals in full bloom.",
    image: "/images/bloom-rush.jpg",
    gallery: [
      "/images/bloom-rush-1.jpg",
      "/images/bloom-rush-2.jpg",
      "/images/bloom-rush-3.jpg",
      "/images/bloom-rush-4.jpg",
    ],
    notes: {
      top: ["Green Apple", "Pear", "Melon"],
      heart: ["Peony", "Cherry Blossom", "Rose"],
      base: ["White Musk", "Amber", "Cedarwood"],
    },
    longevity: "6-8 hours",
    occasion: "Day, Spring, Summer, Casual",
    gender: "Women",
    featured: false,
    bestseller: false,
  },
];

export const collections = [
  {
    id: "signature",
    label: "Signature Collection",
    description: "Timeless masterpieces that define the Hasara identity.",
    image: "/images/imperial-royale-1.jpg",
  },
  {
    id: "mens",
    label: "Men's Collection",
    description: "Bold, commanding fragrances for the modern man.",
    image: "/images/eternal-drive-1.jpg",
  },
  {
    id: "womens",
    label: "Women's Collection",
    description: "Elegant floral and oriental compositions for her.",
    image: "/images/floral-muse-1.jpg",
  },
  {
    id: "oud",
    label: "Oud Collection",
    description: "The finest agarwood from across the ancient world.",
    image: "/images/ocean-allure-1.jpg",
  },
];

export const WHATSAPP_NUMBER = "8801767067130";

export function getWhatsAppLink(productName?: string, size?: string): string {
  if (productName && size) {
    const message = `Hello Hasara Parfums,\n\nI am interested in ${productName}.\n\nSize: ${size}\n\nPlease provide more information.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
  if (productName) {
    const message = `Hello Hasara Parfums,\n\nI am interested in ${productName}.\n\nPlease provide more information.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Hasara Parfums, I would like to learn more about your fragrances."
  )}`;
}
