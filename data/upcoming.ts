export interface UpcomingFragrance {
  slug: string;
  name: string;
  gender: "men" | "women";
}

export const upcomingFragrances: UpcomingFragrance[] = [
  // Men's
  { slug: "jpg-le-male-elixir",       name: "JPG Le Male Elixir",          gender: "men" },
  { slug: "tom-ford-noir",             name: "Tom Ford Noir",               gender: "men" },
  { slug: "prada-luna-rossa-ocean",    name: "Prada Luna Rossa Ocean",      gender: "men" },
  { slug: "viktor-rolf-night-vision",  name: "Viktor & Rolf Night Vision",  gender: "men" },
  { slug: "dior-homme-intense",        name: "Dior Homme Intense",          gender: "men" },
  { slug: "ysl-la-nuit-de-lhomme",    name: "YSL La Nuit De L'Homme",     gender: "men" },
  { slug: "viktor-rolf-spicebomb",     name: "Viktor & Rolf Spicebomb",     gender: "men" },
  { slug: "ysl-y",                     name: "YSL Y",                       gender: "men" },
  { slug: "tom-ford-tuscan-leather",   name: "Tom Ford Tuscan Leather",     gender: "men" },
  { slug: "lv-paradise-garden",        name: "Louis Vuitton Paradise Garden", gender: "men" },
  { slug: "lv-pacific-chill",          name: "Louis Vuitton Pacific Chill", gender: "men" },
  { slug: "lv-on-the-beach",           name: "Louis Vuitton On The Beach",  gender: "men" },
  { slug: "lv-afternoon-swim",         name: "Louis Vuitton Afternoon Swim", gender: "men" },

  // Women's
  { slug: "ysl-black-opium",              name: "YSL Black Opium",                 gender: "women" },
  { slug: "carolina-herrera-good-girl",   name: "Carolina Herrera Good Girl",      gender: "women" },
  { slug: "kayali-vanilla-marshmallow",   name: "Kayali Vanilla Marshmallow",      gender: "women" },
  { slug: "coco-chanel",                  name: "Coco Chanel",                     gender: "women" },
];

export const upcomingMens   = upcomingFragrances.filter((f) => f.gender === "men");
export const upcomingWomens = upcomingFragrances.filter((f) => f.gender === "women");
