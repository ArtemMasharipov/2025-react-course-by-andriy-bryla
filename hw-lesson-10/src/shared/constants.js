// All application constants in one place
export const THEMES = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
})

export const DEFAULT_THEME = THEMES.LIGHT

export const BUSES = [
  { id: 'bus-kyiv-lviv', name: 'Kyiv → Lviv', durationH: 8, price: 25 },
  { id: 'bus-lviv-kyiv', name: 'Lviv → Kyiv', durationH: 8, price: 25 },
  { id: 'bus-kyiv-warsaw', name: 'Kyiv → Warsaw', durationH: 14, price: 45 },
  { id: 'bus-warsaw-krakow', name: 'Warsaw → Krakow', durationH: 4, price: 18 },
  { id: 'bus-krakow-prague', name: 'Krakow → Prague', durationH: 7, price: 32 },
]

export const HOTELS = [
  {
    id: 'hotel-prague-center',
    name: 'Prague Center Inn',
    city: 'Prague',
    stars: 3,
    price: 60,
  },
  {
    id: 'hotel-prague-grand',
    name: 'Grand Castle Prague',
    city: 'Prague',
    stars: 5,
    price: 180,
  },
  {
    id: 'hotel-warsaw-river',
    name: 'Warsaw Riverside',
    city: 'Warsaw',
    stars: 4,
    price: 120,
  },
  {
    id: 'hotel-krakow-market',
    name: 'Krakow Market Stay',
    city: 'Krakow',
    stars: 3,
    price: 70,
  },
  {
    id: 'hotel-lviv-boutique',
    name: 'Lviv Boutique',
    city: 'Lviv',
    stars: 4,
    price: 85,
  },
]
