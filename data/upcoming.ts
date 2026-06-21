export interface UpcomingFragrance {
  slug: string;
  name: string;
  inspiredBy: string;
  gender: "men" | "women";
  description: string;
  accords: string[];
  season: string;
  occasion: string;
  style: string;
}

export const upcomingFragrances: UpcomingFragrance[] = [
  // ── Men's ──────────────────────────────────────────────────────────────────
  {
    slug: "golden-elixir",
    name: "Golden Elixir",
    inspiredBy: "JPG Le Male Elixir",
    gender: "men",
    description:
      "An upcoming creation forged in warmth and seduction. Designed for those who command every room they enter, this elixir of gold and desire promises an intoxicating presence that lingers long after you leave. Arriving soon.",
    accords: ["Warm Spice", "Vanilla", "Amber", "Tonka Bean"],
    season: "Autumn / Winter",
    occasion: "Evening & Special Events",
    style: "Sensual & Magnetic",
  },
  {
    slug: "noir-prestige",
    name: "Noir Prestige",
    inspiredBy: "Tom Ford Noir",
    gender: "men",
    description:
      "A shadowed masterpiece of depth and sophistication. Where darkness meets desire, Noir Prestige emerges as the ultimate statement of masculine luxury. For those who understand that the most powerful statement is silent. Coming soon.",
    accords: ["Smoky", "Oriental", "Spice", "Oud", "Vetiver"],
    season: "All Seasons",
    occasion: "Evening & Night Out",
    style: "Dark & Sophisticated",
  },
  {
    slug: "azure-surge",
    name: "Azure Surge",
    inspiredBy: "Prada Luna Rossa Ocean",
    gender: "men",
    description:
      "A wave of fresh aquatic energy bottled into pure elegance. Azure Surge captures the power of the open ocean — endless, free, and effortlessly refined. An upcoming creation for those who move through life with momentum. Launching soon.",
    accords: ["Aquatic", "Citrus", "Sea Salt", "Woody"],
    season: "Spring / Summer",
    occasion: "Daytime & Sport",
    style: "Fresh & Energetic",
  },
  {
    slug: "night-oracle",
    name: "Night Oracle",
    inspiredBy: "Viktor & Rolf Night Vision",
    gender: "men",
    description:
      "See beyond the ordinary. Night Oracle is an upcoming composition that blends crystalline freshness with mysterious woody depth — crafted for those who move through the night with clarity, confidence, and purpose.",
    accords: ["Fresh", "Woody", "Aromatic", "Green"],
    season: "Autumn / Winter",
    occasion: "Evening",
    style: "Mysterious & Sharp",
  },
  {
    slug: "midnight-gentleman",
    name: "Midnight Gentleman",
    inspiredBy: "Dior Homme Intense",
    gender: "men",
    description:
      "The scent of quiet power. Midnight Gentleman is an upcoming tribute to understated masculine elegance — built on rare iris and deep woods, designed for the man who needs no introduction. A fragrance for those who lead.",
    accords: ["Iris", "Woody", "Amber", "Powdery"],
    season: "Autumn / Winter",
    occasion: "Formal & Evening",
    style: "Refined & Intense",
  },
  {
    slug: "dark-accord",
    name: "Dark Accord",
    inspiredBy: "YSL La Nuit De L'Homme",
    gender: "men",
    description:
      "When spice meets sophistication, Dark Accord is born. An upcoming evening fragrance crafted for men who understand that the night belongs to those who dress it in the finest scent. Allure in every drop.",
    accords: ["Cardamom", "Woody", "Cedar", "Lavender"],
    season: "Autumn / Winter",
    occasion: "Evening & Romantic",
    style: "Elegant & Seductive",
  },
  {
    slug: "spice-empire",
    name: "Spice Empire",
    inspiredBy: "Viktor & Rolf Spicebomb",
    gender: "men",
    description:
      "An explosion of spice, power, and masculine energy. Spice Empire is an upcoming fragrance that detonates on the skin — bold, uncompromising, and completely impossible to ignore. The empire begins soon.",
    accords: ["Tobacco", "Spice", "Leather", "Chilli"],
    season: "Autumn / Winter",
    occasion: "Evening & Night Out",
    style: "Bold & Explosive",
  },
  {
    slug: "the-signature",
    name: "The Signature",
    inspiredBy: "YSL Y",
    gender: "men",
    description:
      "The definitive modern masculine. The Signature is an upcoming fresh-woody composition that captures ambition, drive, and the relentless pursuit of excellence — in every single note. Leave your mark.",
    accords: ["Fresh", "Woody", "Aromatic", "Ginger"],
    season: "All Seasons",
    occasion: "Daytime & Professional",
    style: "Modern & Confident",
  },
  {
    slug: "leather-noir",
    name: "Leather Noir",
    inspiredBy: "Tom Ford Tuscan Leather",
    gender: "men",
    description:
      "Raw. Luxurious. Unapologetic. Leather Noir is an upcoming creation that wraps you in the finest dark leather accord with a streak of saffron and raspberry — a fragrance for those who know that true luxury never apologizes.",
    accords: ["Leather", "Raspberry", "Saffron", "Thyme"],
    season: "Autumn / Winter",
    occasion: "Evening & Formal",
    style: "Raw & Luxurious",
  },
  {
    slug: "eden-luxe",
    name: "Eden Luxe",
    inspiredBy: "Louis Vuitton Paradise Garden",
    gender: "men",
    description:
      "A paradise reimagined in fragrance form. Eden Luxe is an upcoming creation that blooms with exotic botanicals and rare florals — a living garden of absolute luxury transported directly to the skin. A sensory escape.",
    accords: ["Floral", "Exotic", "Green", "Woody"],
    season: "Spring / Summer",
    occasion: "Daytime & Leisure",
    style: "Exotic & Lush",
  },
  {
    slug: "pacific-reverie",
    name: "Pacific Reverie",
    inspiredBy: "Louis Vuitton Pacific Chill",
    gender: "men",
    description:
      "A dream suspended between ocean and sky. Pacific Reverie captures the weightless calm of the Pacific horizon — an upcoming escape bottled in pure, crystalline freshness that clears the mind and frees the soul.",
    accords: ["Aquatic", "Citrus", "Clean", "Musk"],
    season: "Spring / Summer",
    occasion: "Daytime & Casual",
    style: "Relaxed & Free",
  },
  {
    slug: "cote-d-or",
    name: "Côte d'Or",
    inspiredBy: "Louis Vuitton On The Beach",
    gender: "men",
    description:
      "The golden coast, captured. Côte d'Or is an upcoming sun-drenched composition that recalls endless summer days on the world's most beautiful shores — effortlessly chic, eternally warm, and irresistibly yours.",
    accords: ["Coconut", "Citrus", "Woody", "Warm Musk"],
    season: "Summer",
    occasion: "Leisure & Casual",
    style: "Sun-Kissed & Effortless",
  },
  {
    slug: "aqua-sejour",
    name: "Aqua Séjour",
    inspiredBy: "Louis Vuitton Afternoon Swim",
    gender: "men",
    description:
      "A private afternoon. Aqua Séjour is an upcoming fragrance of clean skin, warm water, and the golden silence of a perfect summer day — a luxury retreat you can wear everywhere you go.",
    accords: ["Aquatic", "Clean", "Solar", "White Musk"],
    season: "Spring / Summer",
    occasion: "Leisure",
    style: "Clean & Luminous",
  },

  // ── Women's ────────────────────────────────────────────────────────────────
  {
    slug: "black-reverie",
    name: "Black Reverie",
    inspiredBy: "YSL Black Opium",
    gender: "women",
    description:
      "Intoxicating. Addictive. Unforgettable. Black Reverie is an upcoming feminine masterpiece built on coffee, dark jasmine, and deep vanilla — a scent that refuses to be forgotten and demands to be remembered. Coming soon.",
    accords: ["Coffee", "Vanilla", "Jasmine", "Dark Musk"],
    season: "Autumn / Winter",
    occasion: "Evening & Night Out",
    style: "Sensual & Addictive",
  },
  {
    slug: "belle-noire",
    name: "Belle Noire",
    inspiredBy: "Carolina Herrera Good Girl",
    gender: "women",
    description:
      "The duality of modern femininity. Belle Noire plays between jasmine brightness and tonka bean depth — crafted for the woman who is light and shadow, strength and grace, all at once. A fragrance of extraordinary character.",
    accords: ["Jasmine", "Tonka Bean", "Cocoa", "Tuberose"],
    season: "All Seasons",
    occasion: "Evening & Formal",
    style: "Bold & Feminine",
  },
  {
    slug: "velvet-doux",
    name: "Velvet Doux",
    inspiredBy: "Kayali Vanilla Marshmallow",
    gender: "women",
    description:
      "Pure comfort. Pure indulgence. Velvet Doux is an upcoming gourmand creation that wraps you in the softest vanilla and marshmallow warmth — sweet luxury for the soul, arriving just in time to make every day feel like a celebration.",
    accords: ["Vanilla", "Marshmallow", "Musk", "Sandalwood"],
    season: "Autumn / Winter",
    occasion: "Casual & Everyday",
    style: "Soft & Comforting",
  },
  {
    slug: "la-classique",
    name: "La Classique",
    inspiredBy: "Coco Chanel",
    gender: "women",
    description:
      "Timeless. Iconic. Eternal. La Classique is an upcoming tribute to the greatest feminine creation ever conceived — a powdery aldehyde floral that transcends eras and defines generation after generation of quiet, radiant grace.",
    accords: ["Aldehydic", "Floral", "Powdery", "Sandalwood"],
    season: "All Seasons",
    occasion: "Formal & Special Occasions",
    style: "Timeless & Iconic",
  },
];

export const upcomingMens = upcomingFragrances.filter((f) => f.gender === "men");
export const upcomingWomens = upcomingFragrances.filter((f) => f.gender === "women");
