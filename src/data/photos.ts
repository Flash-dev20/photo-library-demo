export type Category =
  | 'NATURE'
  | 'TRAVEL'
  | 'ARCHITECTURE'
  | 'CARS'
  | 'PEOPLE';

export interface Photo {
  id: number;
  image: string;
  title: string;
  category: Category;
  description: string;
  photographer: string;
}

// Helper to request larger hero-quality images
const hi = (url: string) => url.replace('h=650&w=940', 'h=1400&w=2000');
const med = (url: string) => url.replace('h=650&w=940', 'h=900&w=1200');

export const photos: Photo[] = [
  {
    id: 1,
    image: hi('https://images.pexels.com/photos/11089921/pexels-photo-11089921.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Ridgeline',
    category: 'NATURE',
    description: 'Serene blue mountain ridges dissolving into fog at first light.',
    photographer: '6th Era Photography',
  },
  {
    id: 2,
    image: med('https://images.pexels.com/photos/18359798/pexels-photo-18359798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Manali Mist',
    category: 'NATURE',
    description: 'Forested mountains wrapped in monsoon fog, Himachal Pradesh.',
    photographer: 'Soubhagya Maharana',
  },
  {
    id: 3,
    image: med('https://images.pexels.com/photos/6078836/pexels-photo-6078836.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Veiled Peaks',
    category: 'NATURE',
    description: 'A mountain range almost swallowed by low cloud and dense forest.',
    photographer: 'Wilson Rodriguez',
  },
  {
    id: 4,
    image: hi('https://images.pexels.com/photos/34514431/pexels-photo-34514431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Morning Light',
    category: 'NATURE',
    description: 'Misty mountains glowing under soft, tranquil morning light.',
    photographer: 'wy photography',
  },
  {
    id: 5,
    image: med('https://images.pexels.com/photos/3890028/pexels-photo-3890028.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Reflected City',
    category: 'ARCHITECTURE',
    description: "Riga's night architecture mirrored in a rain puddle.",
    photographer: 'Vlad Fonsark',
  },
  {
    id: 6,
    image: hi('https://images.pexels.com/photos/921290/pexels-photo-921290.png?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Neon Facade',
    category: 'ARCHITECTURE',
    description: 'A modern building face lit by neon — a futuristic night study.',
    photographer: 'João Jesus',
  },
  {
    id: 7,
    image: med('https://images.pexels.com/photos/164394/pexels-photo-164394.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Erasmus Reflection',
    category: 'ARCHITECTURE',
    description: 'Rotterdam skyline and Erasmus Bridge reflected in still water.',
    photographer: 'Pixabay',
  },
  {
    id: 8,
    image: med('https://images.pexels.com/photos/11899768/pexels-photo-11899768.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Taipei Glow',
    category: 'ARCHITECTURE',
    description: 'Illuminated skyscrapers over a calm, humid urban night.',
    photographer: 'Jimmy Liao',
  },
  {
    id: 9,
    image: med('https://images.pexels.com/photos/37094847/pexels-photo-37094847.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Black Sedan',
    category: 'CARS',
    description: 'A sleek black sedan gliding past historic facades.',
    photographer: 'Thang Nguyen',
  },
  {
    id: 10,
    image: med('https://images.pexels.com/photos/23507111/pexels-photo-23507111.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Abu Dhabi Charger',
    category: 'CARS',
    description: 'A luxury Dodge Charger parked against an urban desert backdrop.',
    photographer: 'Vhon Garcia',
  },
  {
    id: 11,
    image: med('https://images.pexels.com/photos/9670186/pexels-photo-9670186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Continental',
    category: 'CARS',
    description: 'A classic Lincoln Continental Mark V in silver — vintage elegance.',
    photographer: 'Артём Н',
  },
  {
    id: 12,
    image: med('https://images.pexels.com/photos/12695346/pexels-photo-12695346.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Shadow Play',
    category: 'PEOPLE',
    description: 'A woman in dramatic chiaroscuro — light against silence.',
    photographer: 'Milad Mohammadi',
  },
  {
    id: 13,
    image: med('https://images.pexels.com/photos/20198788/pexels-photo-20198788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Low Light',
    category: 'PEOPLE',
    description: 'A moody studio portrait held together by shadow alone.',
    photographer: 'Elisanette Ortiz',
  },
  {
    id: 14,
    image: med('https://images.pexels.com/photos/27698095/pexels-photo-27698095.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Two Tones',
    category: 'PEOPLE',
    description: 'Red and green split lighting on a quiet, searching face.',
    photographer: 'Jonathan Silva',
  },
  {
    id: 15,
    image: med('https://images.pexels.com/photos/20140722/pexels-photo-20140722.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Brown Hair, Soft Light',
    category: 'PEOPLE',
    description: 'A dark, intimate portrait lit by a single soft source.',
    photographer: 'Mokhalad Musavi',
  },
  {
    id: 16,
    image: hi('https://images.pexels.com/photos/17000396/pexels-photo-17000396.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Palm Shadows',
    category: 'TRAVEL',
    description: 'Aerial view of a tropical beach — palm shadows over clear water.',
    photographer: 'Pok Rie',
  },
  {
    id: 17,
    image: med('https://images.pexels.com/photos/29901885/pexels-photo-29901885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Turquoise',
    category: 'TRAVEL',
    description: 'Lush palms meeting vibrant turquoise waters from above.',
    photographer: 'Asad Photo Maldives',
  },
  {
    id: 18,
    image: med('https://images.pexels.com/photos/1369612/pexels-photo-1369612.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Orange Sands',
    category: 'TRAVEL',
    description: 'Turquoise waves colliding with vivid orange sands.',
    photographer: 'Pok Rie',
  },
  {
    id: 19,
    image: med('https://images.pexels.com/photos/37950306/pexels-photo-37950306.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Andaman Road',
    category: 'TRAVEL',
    description: 'A winding road carved through dense tropical forest.',
    photographer: 'Nabil Naidu',
  },
  {
    id: 20,
    image: med('https://images.pexels.com/photos/34258456/pexels-photo-34258456.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Autumn Pavement',
    category: 'TRAVEL',
    description: 'A forest road glowing with wet autumn foliage.',
    photographer: 'Christina & Peter',
  },
  {
    id: 21,
    image: med('https://images.pexels.com/photos/37352100/pexels-photo-37352100.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Snow Deer',
    category: 'NATURE',
    description: 'A black and white close-up of a deer in a silent, snowy field.',
    photographer: 'Jean-Paul Wettstein',
  },
  {
    id: 22,
    image: med('https://images.pexels.com/photos/34525418/pexels-photo-34525418.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'The Watcher',
    category: 'NATURE',
    description: 'A meerkat standing vigil on a sun-warmed rock.',
    photographer: 'Jean-Paul Wettstein',
  },
  {
    id: 23,
    image: med('https://images.pexels.com/photos/14528981/pexels-photo-14528981.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Clean Lines',
    category: 'ARCHITECTURE',
    description: 'Minimalist architecture reduced to a single sharp gesture.',
    photographer: 'Luis Moya',
  },
  {
    id: 24,
    image: med('https://images.pexels.com/photos/38538541/pexels-photo-38538541.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Urban Lines',
    category: 'ARCHITECTURE',
    description: 'Black and white abstraction of urban architectural shadows.',
    photographer: 'Anett Szekeres',
  },
  {
    id: 25,
    image: med('https://images.pexels.com/photos/33551481/pexels-photo-33551481.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Blue Corner',
    category: 'ARCHITECTURE',
    description: 'A concrete corner cutting against a deep blue sky.',
    photographer: 'Gerzon Piñata',
  },
  {
    id: 26,
    image: hi('https://images.pexels.com/photos/35972428/pexels-photo-35972428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Dune Sea',
    category: 'TRAVEL',
    description: 'Golden sand dunes rolling under an empty Namibian sky.',
    photographer: 'Lucy Du Preez',
  },
  {
    id: 27,
    image: med('https://images.pexels.com/photos/16726602/pexels-photo-16726602.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Wave Patterns',
    category: 'TRAVEL',
    description: 'Aerial study of dunes forming natural, wind-written waves.',
    photographer: 'Zetong Li',
  },
  {
    id: 28,
    image: hi('https://images.pexels.com/photos/28237726/pexels-photo-28237726.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Aurora',
    category: 'NATURE',
    description: 'The Aurora Borealis spilling across a Norwegian night sky.',
    photographer: 'Oliver Schröder',
  },
  {
    id: 29,
    image: med('https://images.pexels.com/photos/5046379/pexels-photo-5046379.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Green Cascade',
    category: 'NATURE',
    description: 'A waterfall threading through a dense, wet-green forest.',
    photographer: 'Miroslav Staševskij',
  },
  {
    id: 30,
    image: med('https://images.pexels.com/photos/12348815/pexels-photo-12348815.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    title: 'Rain Walk',
    category: 'PEOPLE',
    description: 'Pedestrians under umbrellas crossing a rain-slicked night street.',
    photographer: 'Mateus Rodrigues',
  },
];

export const categories: ('ALL' | Category)[] = [
  'ALL',
  'NATURE',
  'TRAVEL',
  'ARCHITECTURE',
  'CARS',
  'PEOPLE',
];

// Featured editorial picks (asymmetric layout)
export const featured: { photo: Photo; label: string }[] = [
  { photo: photos[3], label: '01 — MOUNTAINS' },
  { photo: photos[5], label: '02 — CITY LIGHTS' },
  { photo: photos[18], label: '03 — SILENT ROADS' },
  { photo: photos[27], label: '04 — AURORA' },
];

// Horizontal story section
export const stories: { photo: Photo; caption: string }[] = [
  { photo: photos[18], caption: 'Where the road disappears.' },
  { photo: photos[0], caption: 'Between silence and light.' },
  { photo: photos[6], caption: 'Cities never sleep.' },
  { photo: photos[25], caption: 'The desert keeps no names.' },
  { photo: photos[27], caption: 'The sky caught fire and stayed.' },
  { photo: photos[15], caption: 'Where the land meets the tide.' },
];

export const heroImage = photos[3].image;
export const aboutPortrait =
  'https://images.pexels.com/photos/2505377/pexels-photo-2505377.jpeg?auto=compress&cs=tinysrgb&h=900&w=700';
export const quoteBg = photos[0].image;
