/**
 * World Markets Atlas. A curated tour of 26 of the world's most famous food
 * markets. Each entry has a verified YouTube video tour from a travel-food
 * channel, the market's founding year, its signature foods, and a short
 * history. Photos come from the YouTube tour thumbnail; the video itself
 * acts as the cinematic walkthrough.
 */

export type MarketRegion = 'middle-east' | 'europe' | 'asia' | 'americas' | 'africa';

export interface FoodMarket {
  id: string;
  name: string;
  nameLocal?: string;
  city: string;
  country: string;
  region: MarketRegion;
  yearFounded?: number;
  marketType: string;
  signatureFoods: string[];
  history: string;
  blurb: string;
  videoId: string;
  channel: string;
  featured?: boolean;
  marketTypeAr?: string;
  signatureFoodsAr?: string[];
  historyAr?: string;
  blurbAr?: string;
}

export const MARKET_REGIONS: { id: MarketRegion; name: string; tagline: string }[] = [
  { id: 'middle-east', name: 'Middle East', tagline: 'Spice routes and old caravan stops.' },
  { id: 'europe', name: 'Europe', tagline: 'Iron-and-glass cathedrals to food.' },
  { id: 'asia', name: 'Asia', tagline: 'Fish before dawn, noodles at midnight.' },
  { id: 'africa', name: 'Africa', tagline: 'Open-air kitchens at the edge of the desert.' },
  { id: 'americas', name: 'Americas', tagline: 'Mountains of corn, tomato, and ice.' },
];

export const WORLD_MARKETS: FoodMarket[] = [
  // ===================== MIDDLE EAST =====================
  {
    id: 'khan-el-khalili',
    name: 'Khan El-Khalili',
    nameLocal: 'خان الخليلي',
    city: 'Cairo',
    country: 'Egypt',
    region: 'middle-east',
    yearFounded: 1382,
    marketType: 'Bazaar and spice market',
    signatureFoods: ['Egyptian sweets', 'Turkish coffee', 'Spices and incense', 'Koshari', 'Hawawshi'],
    history:
      "Built in the 14th century by the Mamluk emir Jaharkas al-Khalili, the bazaar has been Cairo's commercial heart for over 600 years. Naguib Mahfouz set his Nobel-winning trilogy in its alleys. El Fishawy café inside the bazaar has poured coffee continuously since 1773.",
    blurb:
      "Cairo's grand bazaar, 640 years old and still trading in spices, brass, gold, and the city's best Turkish coffee. Lose an afternoon in the lanes between Al-Hussein Square and Al-Azhar.",
    marketTypeAr: 'Bazaar و spice market',
    signatureFoodsAr: [
      'Egyptian sweets',
      'Turkish coffee',
      'Spices و incense',
      'Koshari',
      'Hawawshi',
    ],
    historyAr: 'Built in 14th century by Mamluk emir Jaharkas al-Khalili, bazaar has been Cairo\'s commercial heart لمدة over 600 years. Naguib Mahfouz set his Nobel-winning trilogy in its alleys. El Fishawy café inside bazaar has poured coffee continuously since 1773.',
    blurbAr: 'Cairo\'s grand bazaar, 640 years old و still trading in spices, brass, gold, و city\'s best Turkish coffee. Lose afternoon in lanes between Al-Hussein Square و Al-Azhar.',
    videoId: 'lAqBn_0lU_E',
    channel: 'GeoTrails',
    featured: true,
  },
  {
    id: 'souk-hamidiya',
    name: 'Souk al-Hamidiya',
    nameLocal: 'سوق الحميدية',
    city: 'Damascus',
    country: 'Syria',
    region: 'middle-east',
    yearFounded: 1780,
    marketType: 'Covered souk and spice market',
    signatureFoods: ['Bakdash ice cream', 'Pistachios', 'Levantine spice blends', 'Rose and orange blossom water', 'Halawat el-jibn'],
    history:
      "Damascus's main covered market runs from the Citadel to the Umayyad Mosque under a corrugated iron roof full of bullet holes from 1925. Bakdash, the ice cream shop at the entrance, has been pounding pistachio mastic ice cream since 1885.",
    blurb:
      "The covered spine of the old city. Walk it once and you cross 12 centuries of trade. The smell of cumin, rose water, and Damascene soap is older than most countries.",
    marketTypeAr: 'Covered souk و spice market',
    signatureFoodsAr: [
      'Bakdash ice كريمة',
      'فستق',
      'Levantine spice blends',
      'Rose و برتقال blossom ماء',
      'Halawat el-jibn',
    ],
    historyAr: 'Damascus\'s main covered market runs from Citadel to Umayyad Mosque under corrugated iron roof full of bullet holes from 1925. Bakdash, ice كريمة shop at entrance, has been pounding فستق mastic ice كريمة since 1885.',
    blurbAr: 'covered spine of old city. Walk it once و you cross 12 centuries of trade. smell of كمّون, ماء ورد, و Damascene soap is older than most countries.',
    videoId: 'Q_Xu_0qMUts',
    channel: 'Arab Diaries',
  },
  {
    id: 'souq-waqif',
    name: 'Souq Waqif',
    nameLocal: 'سوق واقف',
    city: 'Doha',
    country: 'Qatar',
    region: 'middle-east',
    yearFounded: 1800,
    marketType: 'Restored Bedouin market and food hub',
    signatureFoods: ['Gulf machbous', 'Karak chai', 'Saffron desserts', 'Grilled lamb', 'Yemeni mandi'],
    history:
      "Doha's standing market was where Bedouins sold livestock and traders dealt in pearls and gold. Faithfully restored in 2006 using traditional mud and palm-frond techniques, it is now the heart of Qatari night-time culture.",
    blurb:
      "Falconers in robes, Yemeni stews bubbling in copper pots, traditional dhows docked just beyond. Come after sunset when the heat breaks and the souq comes alive.",
    marketTypeAr: 'Restored Bedouin market و food hub',
    signatureFoodsAr: [
      'Gulf machbous',
      'Karak chai',
      'زعفران desserts',
      'Grilled لحم خروف',
      'Yemeni mandi',
    ],
    historyAr: 'Doha\'s standing market was where Bedouins sold livestock و traders dealt in pearls و gold. Faithfully restored in 2006 using traditional mud و palm-frond techniques, it is now heart of Qatari night-time culture.',
    blurbAr: 'Falconers in robes, Yemeni stews bubbling in copper pots, traditional dhows docked just beyond. Come after sunset when سخن breaks و souq comes alive.',
    videoId: 'x_KlO3DQ9VA',
    channel: 'Walking OZ',
  },
  {
    id: 'dubai-spice-souk',
    name: 'Dubai Spice Souk',
    nameLocal: 'سوق التوابل',
    city: 'Dubai',
    country: 'UAE',
    region: 'middle-east',
    yearFounded: 1950,
    marketType: 'Spice market on the Creek',
    signatureFoods: ['Saffron', 'Cardamom', 'Loomi (dried lime)', 'Frankincense', 'Rose petals'],
    history:
      "Tucked into the narrow lanes of Deira beside the Dubai Creek, the spice souk has served abra-ferry shoppers since the 1950s. Step inside and the air is yellow with saffron and turmeric dust.",
    blurb:
      "Walk between burlap sacks of every spice you have ever read about and many you have not. The shopkeepers will brew you cardamom coffee while you bargain.",
    marketTypeAr: 'Spice market on Creek',
    signatureFoodsAr: [
      'زعفران',
      'هيل',
      'لومي (لومي)',
      'Frankincense',
      'Rose petals',
    ],
    historyAr: 'Tucked into narrow lanes of Deira beside Dubai Creek, spice souk has served abra-ferry shoppers since 1950s. Step inside و air is yellow مع زعفران و كركم dust.',
    blurbAr: 'Walk between burlap sacks of every spice you have ever read حوالي و many you have not. shopkeepers will brew you هيل coffee while you bargain.',
    videoId: 'FNxxgIHD65U',
    channel: 'WANDERER',
  },
  {
    id: 'souk-al-balad-amman',
    name: 'Souk al-Balad',
    nameLocal: 'سوق البلد',
    city: 'Amman',
    country: 'Jordan',
    region: 'middle-east',
    yearFounded: 1920,
    marketType: 'Downtown vegetable and street food market',
    signatureFoods: ['Hashem falafel', 'Habibah kunafa', 'Foul medames', 'Mansaf', 'Knafeh Arabieh'],
    history:
      "Spread around Roman amphitheater hill in downtown Amman, the Balad market grew with the city in the 1920s. Hashem, the falafel and foul institution that has fed the royal family since 1956, sits at one end of it.",
    blurb:
      "Amman at street level. Heaps of mountain za'atar, pickled wild cucumber, vine leaves rolled by women who have done it for 50 years.",
    marketTypeAr: 'Downtown vegetable و street food market',
    signatureFoodsAr: [
      'Hashem falafel',
      'Habibah kunafa',
      'Foul medames',
      'Mansaf',
      'Knafeh Arabieh',
    ],
    historyAr: 'افرد around Roman amphitheater hill in downtown Amman, Balad market grew مع city in 1920s. Hashem, falafel و foul institution that has fed royal family since 1956, sits at one end of it.',
    blurbAr: 'Amman at street level. Heaps of mountain زعتر, pickled wild خيار, ورق عنب rolled by women who have done it لمدة 50 years.',
    videoId: 'eQi6WJvAqdc',
    channel: 'QueenPad',
  },
  {
    id: 'istanbul-grand-bazaar',
    name: 'Grand Bazaar',
    nameLocal: 'Kapalıçarşı',
    city: 'Istanbul',
    country: 'Türkiye',
    region: 'middle-east',
    yearFounded: 1461,
    marketType: 'Covered bazaar',
    signatureFoods: ['Turkish delight', 'Baklava', 'Apple tea', 'Köfte', 'Roasted chestnuts'],
    history:
      "Constructed by Mehmed the Conqueror immediately after the fall of Constantinople, the Grand Bazaar is one of the oldest and largest covered markets in the world: 61 streets, 4,000 shops, and 250,000 visitors a day. The structure barely changed in 500 years.",
    blurb:
      "Sixty-one streets of jewelers, carpets, antiques, and food. The kebab joints around the perimeter are some of Istanbul's oldest.",
    marketTypeAr: 'Covered bazaar',
    signatureFoodsAr: [
      'Turkish delight',
      'Baklava',
      'تفاح tea',
      'Köfte',
      'Roasted chestnuts',
    ],
    historyAr: 'Constructed by Mehmed Conqueror immediately after fall of Constantinople, Grand Bazaar is one of oldest و largest covered markets in world: 61 streets, 4,000 shops, و 250,000 visitors يوم. structure barely changed in 500 years.',
    blurbAr: 'Sixty-one streets of jewelers, carpets, antiques, و food. kebab joints around perimeter are some of Istanbul\'s oldest.',
    videoId: 'stQCrJUx6-4',
    channel: 'Mark Wiens Abroad',
  },
  {
    id: 'istanbul-spice-bazaar',
    name: 'Spice Bazaar',
    nameLocal: 'Mısır Çarşısı',
    city: 'Istanbul',
    country: 'Türkiye',
    region: 'middle-east',
    yearFounded: 1664,
    marketType: 'Spice bazaar (Egyptian market)',
    signatureFoods: ['Saffron', 'Sumac', 'Pomegranate molasses', 'Turkish coffee', 'Lokum (Turkish delight)'],
    history:
      "Built in 1664 with revenues from Cairo, the Mısır Çarşısı (Egyptian Bazaar) has been Istanbul's spice trading hub for 360 years. The L-shaped covered hall connects the Yeni Cami mosque to the Golden Horn.",
    blurb:
      "Smaller and more focused than the Grand Bazaar. Come here for the spice you've been reading about but couldn't find at home.",
    marketTypeAr: 'Spice bazaar (Egyptian market)',
    signatureFoodsAr: [
      'زعفران',
      'سمّاق',
      'Pomegranate دبس',
      'Turkish coffee',
      'Lokum (Turkish delight)',
    ],
    historyAr: 'Built in 1664 مع revenues from Cairo, Mısır Çarşısı (Egyptian Bazaar) has been Istanbul\'s spice trading hub لمدة 360 years. L-shaped covered hall connects Yeni Cami mosque to ذهبي Horn.',
    blurbAr: 'Smaller و more focused than Grand Bazaar. Come here لمدة spice you\'ve been reading حوالي but couldn\'t find at home.',
    videoId: 'dF7IHkrt3H0',
    channel: 'Travels With My Friend',
  },
  {
    id: 'isfahan-bazaar',
    name: 'Grand Bazaar of Isfahan',
    nameLocal: 'بازار اصفهان',
    city: 'Isfahan',
    country: 'Iran',
    region: 'middle-east',
    yearFounded: 1611,
    marketType: 'Historic covered bazaar',
    signatureFoods: ['Saffron rice', 'Gaz (Persian nougat)', 'Sohan', 'Faloodeh', 'Beryani'],
    history:
      "Built under Shah Abbas the Great as part of his planned royal capital, the bazaar is a 2 km vaulted brick masterpiece linking the Naqsh-e Jahan square to the Friday mosque. The skylit domes diffuse the desert sun.",
    blurb:
      "One of the oldest and most beautiful covered bazaars on earth. The light through the brick skylights is reason enough to visit.",
    marketTypeAr: 'Historic covered bazaar',
    signatureFoodsAr: [
      'زعفران أرز',
      'Gaz (Persian nougat)',
      'Sohan',
      'Faloodeh',
      'Beryani',
    ],
    historyAr: 'Built under Shah Abbas Great as part of his planned royal capital, bazaar is 2 km vaulted brick masterpiece linking Naqsh-e Jahan square to Friday mosque. skylit domes diffuse desert sun.',
    blurbAr: 'One of oldest و most beautiful covered bazaars on earth. light through brick skylights is reason enough to visit.',
    videoId: 'h2jiDIePCLI',
    channel: 'to.persis',
  },

  // ===================== EUROPE =====================
  {
    id: 'la-boqueria',
    name: 'Mercat de la Boqueria',
    nameLocal: 'La Boquería',
    city: 'Barcelona',
    country: 'Spain',
    region: 'europe',
    yearFounded: 1840,
    marketType: 'Covered fresh market',
    signatureFoods: ['Jamón ibérico', 'Anchoas', 'Fresh fruit juices', 'Tortilla española', 'Mar i muntanya tapas'],
    history:
      "Officially opened in 1840, the Boquería sits halfway down La Rambla and has been Barcelona's central food market for almost two centuries. The iron canopy roof went up in 1914 and the lantern-lit interior is one of the most photographed market spaces in Europe.",
    blurb:
      "The market that defines a Mediterranean food market. Get there before 10 a.m. for the chef shoppers and the freshest seafood.",
    marketTypeAr: 'Covered طازج market',
    signatureFoodsAr: [
      'Jamón ibérico',
      'Anchoas',
      'طازج fruit juices',
      'Tortilla española',
      'Mar i muntanya tapas',
    ],
    historyAr: 'Officially opened in 1840, Boquería sits halfway down La Rambla و has been Barcelona\'s central food market لمدة almost two centuries. iron canopy roof went up in 1914 و lantern-lit interior is one of most photographed market spaces in Europe.',
    blurbAr: 'market that defines Mediterranean food market. Get there before 10 .m. لمدة chef shoppers و freshest seafood.',
    videoId: 'F9XfTMm2CyM',
    channel: 'Mark Wiens',
    featured: true,
  },
  {
    id: 'mercado-san-miguel',
    name: 'Mercado de San Miguel',
    city: 'Madrid',
    country: 'Spain',
    region: 'europe',
    yearFounded: 1916,
    marketType: 'Gastronomic market',
    signatureFoods: ['Iberian ham', 'Manchego cheese', 'Croquetas', 'Vermouth', 'Galician oysters'],
    history:
      "An iron-and-glass beauty in the old town, San Miguel was the last covered market built in Madrid. Restored in 2009 as a gourmet hall, every counter is a small specialty: one for ham, one for oysters, one for Iberian charcuterie.",
    blurb:
      "Less a market, more an indoor food court of the highest order. Order a vermouth and small plates from three or four counters.",
    marketTypeAr: 'Gastronomic market',
    signatureFoodsAr: [
      'Iberian ham',
      'Manchego جبنة',
      'Croquetas',
      'Vermouth',
      'Galician oysters',
    ],
    historyAr: 'iron-و-glass beauty in old town, San Miguel was last covered market built in Madrid. Restored in 2009 as gourmet hall, every counter is صغير specialty: one لمدة ham, one لمدة oysters, one لمدة Iberian charcuterie.',
    blurbAr: 'Less market, more indoor food court of highest order. Order vermouth و صغير plates from three أو four counters.',
    videoId: 'bQIGoYaFbvM',
    channel: 'Spain Revealed',
  },
  {
    id: 'mercado-central-valencia',
    name: 'Mercado Central',
    city: 'Valencia',
    country: 'Spain',
    region: 'europe',
    yearFounded: 1928,
    marketType: 'Modernist covered fresh market',
    signatureFoods: ['Saffron', 'Bomba rice for paella', 'Tiger nuts (chufa) for horchata', 'Anchoas', 'Naranjas valencianas'],
    history:
      "One of the largest fresh food markets in Europe. The Modernista building has 1,200 stalls under a soaring iron and stained-glass dome, finished in 1928 after 14 years of construction.",
    blurb:
      "The shopping basket of Valencia and the source of every authentic paella in the city. Beautiful enough to be a cathedral.",
    marketTypeAr: 'Modernist covered طازج market',
    signatureFoodsAr: [
      'زعفران',
      'Bomba أرز لمدة paella',
      'Tiger nuts (chufa) لمدة horchata',
      'Anchoas',
      'Naranjas valencianas',
    ],
    historyAr: 'One of largest طازج food markets in Europe. Modernista building has 1,200 stalls under soaring iron و stained-glass dome, finished in 1928 after 14 years of construction.',
    blurbAr: 'shopping basket of Valencia و source of every authentic paella in city. Beautiful enough to be cathedral.',
    videoId: '6C-aACB1Gs4',
    channel: 'Simplify Abroad',
  },
  {
    id: 'borough-market',
    name: 'Borough Market',
    city: 'London',
    country: 'UK',
    region: 'europe',
    yearFounded: 1014,
    marketType: 'Wholesale and retail food market',
    signatureFoods: ['Bristol scotch eggs', 'Salt beef bagels', 'Brindisa chorizo', 'Neals Yard cheese', 'Bread Ahead doughnuts'],
    history:
      "One of London's oldest markets, with sales records going back to the 11th century. The current Victorian iron structure dates from 1851. The market sits in the shadow of Southwark Cathedral.",
    blurb:
      "The oldest food market in London, a Saturday institution for serious eaters. Cheese, charcuterie, chocolate, and a sandwich queue every weekend.",
    marketTypeAr: 'Wholesale و retail food market',
    signatureFoodsAr: [
      'Bristol scotch بيض',
      'ملح لحم بقر bagels',
      'Brindisa chorizo',
      'Neals Yard جبنة',
      'خبز Ahead doughnuts',
    ],
    historyAr: 'One of London\'s oldest markets, مع sales records going back to 11th century. current Victorian iron structure تمر from 1851. market sits in shadow of Southwark Cathedral.',
    blurbAr: 'oldest food market in London, Saturday institution لمدة serious eaters. جبنة, charcuterie, chocolate, و sandwich queue every weekend.',
    videoId: 'w3TuFQyaOTA',
    channel: 'Through My Lens',
  },
  {
    id: 'smithfield-market',
    name: 'Smithfield Market',
    city: 'London',
    country: 'UK',
    region: 'europe',
    yearFounded: 1133,
    marketType: 'Historic wholesale meat market',
    signatureFoods: ['Aged British beef', 'Lamb shoulders', 'Pheasant', 'Pies', 'Black pudding'],
    history:
      "The site has been a meat market since 1133. The current Victorian halls were designed by Sir Horace Jones in 1868. Smithfield is moving to Dagenham in 2028, ending nearly 900 years on the same ground.",
    blurb:
      "Britain's oldest meat market, working the same trade for 900 years. Walk past the carcasses at 5 a.m. before it closes its current site forever.",
    marketTypeAr: 'Historic wholesale meat market',
    signatureFoodsAr: [
      'Aged British لحم بقر',
      'لحم خروف shoulders',
      'Pheasant',
      'Pies',
      'Black pudding',
    ],
    historyAr: 'site has been meat market since 1133. current Victorian halls were designed by Sir Horace Jones in 1868. Smithfield is moving to Dagenham in 2028, ending nearly 900 years on same مطحون.',
    blurbAr: 'Britain\'s oldest meat market, working same trade لمدة 900 years. Walk past carcasses at 5 .m. before it closes its current site forever.',
    videoId: '27wZtC5dmHc',
    channel: 'Footways London',
  },
  {
    id: 'naschmarkt',
    name: 'Naschmarkt',
    city: 'Vienna',
    country: 'Austria',
    region: 'europe',
    yearFounded: 1780,
    marketType: 'Open-air food market',
    signatureFoods: ['Sachertorte', 'Sauerkraut', 'Wiener schnitzel', 'Strudel', 'Käsekrainer'],
    history:
      "Vienna's main open-air market for 240 years. The 1.5 km stretch along the Wienzeile started as a milk market and grew into the city's gastronomic spine.",
    blurb:
      "Half traditional Austrian, half international. Eat schnitzel and a bowl of pho at adjacent stalls.",
    marketTypeAr: 'Open-air food market',
    signatureFoodsAr: [
      'Sachertorte',
      'Sauerkraut',
      'Wiener schnitzel',
      'Strudel',
      'Käsekrainer',
    ],
    historyAr: 'Vienna\'s main open-air market لمدة 240 years. 1.5 km stretch along Wienzeile started as حليب market و grew into city\'s gastronomic spine.',
    blurbAr: 'Half traditional Austrian, half international. Eat schnitzel و bowl of pho at adjacent stalls.',
    videoId: '75lFIeLatBU',
    channel: 'Travel Mike',
  },
  {
    id: 'marche-aligre',
    name: "Marché d'Aligre",
    city: 'Paris',
    country: 'France',
    region: 'europe',
    yearFounded: 1779,
    marketType: 'Open-air market and covered hall',
    signatureFoods: ['North African pastries', 'French cheese', 'Olives and tapenade', 'Whole rotisserie chicken', 'Wines from the Beauvau cellar'],
    history:
      "Established by royal decree in 1779 in the Bastille quarter. It is the only Paris market with a flea market in the middle, a long Parisian tradition where you bargain for vegetables and 18th-century silver in the same hour.",
    blurb:
      "The most local-feeling market left in central Paris. Skip the tourist hotspots and shop here on a Sunday morning instead.",
    marketTypeAr: 'Open-air market و covered hall',
    signatureFoodsAr: [
      'North African pastries',
      'French جبنة',
      'Olives و tapenade',
      'كاملة rotisserie دجاج',
      'Wines from Beauvau cellar',
    ],
    historyAr: 'Established by royal decree in 1779 in Bastille quarter. It is only Paris market مع flea market in middle, long Parisian tradition where you bargain لمدة vegetables و 18th-century silver in same ساعة.',
    blurbAr: 'most local-feeling market left in central Paris. Skip tourist hotspots و shop here on Sunday morning instead.',
    videoId: 'O5vIpzIQeuE',
    channel: 'Jared Dillingham',
  },

  // ===================== ASIA =====================
  {
    id: 'tsukiji-outer',
    name: 'Tsukiji Outer Market',
    nameLocal: '築地場外市場',
    city: 'Tokyo',
    country: 'Japan',
    region: 'asia',
    yearFounded: 1935,
    marketType: 'Outer market for street food and retail',
    signatureFoods: ['Tamagoyaki', 'Uni', 'Tuna sushi', 'Grilled scallops', 'Daikon mochi'],
    history:
      "While the famous inner fish market moved to Toyosu in 2018, the outer market of Tsukiji stayed put. It is now a 400-stall food street built around the original 1935 location, with breakfast queues that start at 6 a.m.",
    blurb:
      "Tokyo's morning food temple. Come hungry and walk slowly between the tuna grill, the uni shop, and the sake bar at the corner.",
    marketTypeAr: 'Outer market لمدة street food و retail',
    signatureFoodsAr: [
      'Tamagoyaki',
      'Uni',
      'تونة sushi',
      'Grilled scallops',
      'Daikon mochi',
    ],
    historyAr: 'While famous inner سمك market moved to Toyosu in 2018, outer market of Tsukiji stayed put. It is now 400-stall food street built around original 1935 location, مع breakfast queues that start at 6 .m.',
    blurbAr: 'Tokyo\'s morning food temple. Come hungry و walk slowly between تونة اشوِ, uni shop, و sake bar at corner.',
    videoId: '8M46ylcieeg',
    channel: 'Nick Gray',
  },
  {
    id: 'toyosu-fish-market',
    name: 'Toyosu Fish Market',
    nameLocal: '豊洲市場',
    city: 'Tokyo',
    country: 'Japan',
    region: 'asia',
    yearFounded: 2018,
    marketType: 'Wholesale fish market',
    signatureFoods: ['Bluefin tuna', 'Live shrimp', 'Sea urchin', 'Sashimi breakfast', 'Auction-grade fish'],
    history:
      "The replacement for Tsukiji's iconic tuna auction, now in a vast, modern facility on Tokyo Bay. The 5 a.m. tuna auction is the most famous fish auction on earth and one of the rare wholesale markets that welcomes the public.",
    blurb:
      "Wake up at 4 a.m. to watch the world's most expensive fish change hands. Sushi breakfast on the upper floor is part of the experience.",
    marketTypeAr: 'Wholesale سمك market',
    signatureFoodsAr: [
      'Bluefin تونة',
      'Live روبيان',
      'Sea urchin',
      'Sashimi breakfast',
      'Auction-grade سمك',
    ],
    historyAr: 'replacement لمدة Tsukiji\'s iconic تونة auction, now in vast, modern facility on Tokyo Bay. 5 .m. تونة auction is most famous سمك auction on earth و one of rare wholesale markets that welcomes public.',
    blurbAr: 'Wake up at 4 .m. to watch world\'s most expensive سمك change hands. Sushi breakfast on upper floor is part of experience.',
    videoId: 'zwywpeMlpnc',
    channel: 'World Traveling Couple',
  },
  {
    id: 'chatuchak',
    name: 'Chatuchak Weekend Market',
    nameLocal: 'ตลาดนัดจตุจักร',
    city: 'Bangkok',
    country: 'Thailand',
    region: 'asia',
    yearFounded: 1942,
    marketType: 'Weekend open-air mega-market',
    signatureFoods: ['Khao soi', 'Coconut ice cream', 'Pad thai', 'Mango sticky rice', 'Grilled river prawns'],
    history:
      "The largest weekend market in the world. 200,000 visitors a weekend explore 15,000 stalls across 35 acres. Started as a flea market in the 1940s under Field Marshal Plaek Phibunsongkhram.",
    blurb:
      "Bangkok in concentrated form. Plan a route or get lost on purpose. Either works.",
    marketTypeAr: 'Weekend open-air mega-market',
    signatureFoodsAr: [
      'Khao soi',
      'Coconut ice كريمة',
      'Pad thai',
      'Mango sticky أرز',
      'Grilled river روبيان',
    ],
    historyAr: 'largest weekend market in world. 200,000 visitors weekend explore 15,000 stalls across 35 acres. Started as flea market in 1940s under Field Marshal Plaek Phibunsongkhram.',
    blurbAr: 'Bangkok in concentrated form. Plan route أو get lost on purpose. Either works.',
    videoId: 'bpd6uGHpoYY',
    channel: 'Mark Wiens',
    featured: true,
  },
  {
    id: 'or-tor-kor',
    name: 'Or Tor Kor Market',
    nameLocal: 'ตลาด อ.ต.ก.',
    city: 'Bangkok',
    country: 'Thailand',
    region: 'asia',
    yearFounded: 1981,
    marketType: 'Premium fresh market',
    signatureFoods: ['Durian', 'Pad thai', 'Massaman curry', 'Tropical fruit', 'Grilled river fish'],
    history:
      "CNN named Or Tor Kor one of the best fresh markets in the world. Run by the Marketing Organization for Farmers, it is the upmarket sister to Chatuchak across the road, prized for the cleanest stalls and the rarest fruit.",
    blurb:
      "Chatuchak for cooks. Higher quality, easier to navigate, and the durian counter has a season-long rotation of every variety Thailand grows.",
    marketTypeAr: 'Premium طازج market',
    signatureFoodsAr: [
      'Durian',
      'Pad thai',
      'Massaman curry',
      'Tropical fruit',
      'Grilled river سمك',
    ],
    historyAr: 'CNN named أو Tor Kor one of best طازج markets in world. Run by Marketing Organization لمدة Farmers, it is upmarket sister to Chatuchak across road, prized لمدة cleanest stalls و rarest fruit.',
    blurbAr: 'Chatuchak لمدة cooks. Higher quality, easier to navigate, و durian counter has تبّل-long rotation of every variety Thailand grows.',
    videoId: '22YXnlB5vUY',
    channel: 'Bangkok69',
  },
  {
    id: 'jagalchi',
    name: 'Jagalchi Fish Market',
    nameLocal: '자갈치 시장',
    city: 'Busan',
    country: 'South Korea',
    region: 'asia',
    yearFounded: 1889,
    marketType: 'Wholesale and retail seafood market',
    signatureFoods: ['Live octopus (san-nakji)', 'Hagfish', 'Hoe (sashimi)', 'Spicy fish stews', 'Eel grilled over coals'],
    history:
      "Korea's largest fish market started after the port of Busan opened in 1876. The current seven-story building went up in 2006, but the market women, the jagalchi ajumma, have been the heart of the place for 130 years.",
    blurb:
      "Bring an empty stomach and an open mind. The live tanks here hold creatures most people have never seen, never mind eaten.",
    marketTypeAr: 'Wholesale و retail seafood market',
    signatureFoodsAr: [
      'Live octopus (san-nakji)',
      'Hagfish',
      'Hoe (sashimi)',
      'حار سمك stews',
      'Eel grilled over coals',
    ],
    historyAr: 'Korea\'s largest سمك market started after port of Busan opened in 1876. current seven-story building went up in 2006, but market women, jagalchi ajumma, have been heart of ضع لمدة 130 years.',
    blurbAr: 'Bring empty stomach و open mind. live tanks here hold creatures most people have never seen, never mind eaten.',
    videoId: 'aEZC-Af3bRk',
    channel: 'Tiana Shern',
  },
  {
    id: 'wangfujing',
    name: 'Wangfujing Snack Street',
    nameLocal: '王府井小吃街',
    city: 'Beijing',
    country: 'China',
    region: 'asia',
    yearFounded: 1903,
    marketType: 'Pedestrian snack street',
    signatureFoods: ['Scorpion skewers', 'Jian bing', 'Tang hulu (candied haws)', 'Peking duck', 'Mongolian lamb skewers'],
    history:
      "Centered around a Qing dynasty palace, Wangfujing was a hutong area that became Beijing's main shopping street in the early 20th century. The covered snack alley is the place tourists discover when they search for the famous scorpion skewers.",
    blurb:
      "Beijing in its most over-the-top tourist form. Scorpion on a stick, yes, but also some of the city's best jianbing.",
    marketTypeAr: 'Pedestrian snack street',
    signatureFoodsAr: [
      'Scorpion skewers',
      'Jian bing',
      'Tang hulu (candied haws)',
      'Peking duck',
      'Mongolian لحم خروف skewers',
    ],
    historyAr: 'Centered around Qing dynasty palace, Wangfujing was hutong area that became Beijing\'s main shopping street in early 20th century. covered snack alley is ضع tourists discover when they search لمدة famous scorpion skewers.',
    blurbAr: 'Beijing in its most over--top tourist form. Scorpion on stick, yes, but also some of city\'s best jianbing.',
    videoId: 'KyXo-LGC6z8',
    channel: 'Walk Plus Ride',
  },
  {
    id: 'chorsu-bazaar',
    name: 'Chorsu Bazaar',
    nameLocal: 'Chorsu',
    city: 'Tashkent',
    country: 'Uzbekistan',
    region: 'asia',
    yearFounded: 800,
    marketType: 'Silk Road bazaar under a giant dome',
    signatureFoods: ['Plov', 'Samsa (lamb pastries)', 'Lagman noodles', 'Dried apricots and almonds', 'Non bread'],
    history:
      "Chorsu means four streams. The bazaar marks the crossing of four ancient caravan roads. The current vast turquoise dome went up in the 1980s but the spot has been the meeting place of Silk Road merchants for over a thousand years.",
    blurb:
      "The Silk Road in one building. Heaps of fresh and dried fruit in pyramids, every kind of bread, and the smell of roasting cumin lamb everywhere.",
    marketTypeAr: 'Silk Road bazaar under giant dome',
    signatureFoodsAr: [
      'Plov',
      'Samsa (لحم خروف pastries)',
      'Lagman نودلز',
      'مجفّف apricots و لوز',
      'Non خبز',
    ],
    historyAr: 'Chorsu means four streams. bazaar marks crossing of four ancient caravan roads. current vast turquoise dome went up in 1980s but spot has been meeting ضع of Silk Road merchants لمدة over thousand years.',
    blurbAr: 'Silk Road in one building. Heaps of طازج و مجفّف fruit in pyramids, every kind of خبز, و smell of roasting كمّون لحم خروف everywhere.',
    videoId: 'SMkFwNcSr40',
    channel: 'Advantour Silk Road',
  },

  // ===================== AFRICA =====================
  {
    id: 'jemaa-el-fnaa',
    name: 'Jemaa el-Fnaa',
    nameLocal: 'جامع الفنا',
    city: 'Marrakech',
    country: 'Morocco',
    region: 'africa',
    yearFounded: 1062,
    marketType: 'Open square food market',
    signatureFoods: ['Tangia', 'Lamb mechoui', 'Snail soup (babbouche)', 'Harira', 'Fresh orange juice'],
    history:
      "Founded with the city of Marrakech in 1062. UNESCO declared the square's oral and intangible heritage in 2001 (the storytellers, snake charmers, and food vendors). At sundown the square transforms into a massive open-air food court.",
    blurb:
      "The most theatrical food market on earth. By day, snake charmers and herbalists; by night, 100 food stalls open and the square becomes one giant dinner table.",
    marketTypeAr: 'Open square food market',
    signatureFoodsAr: [
      'Tangia',
      'لحم خروف mechoui',
      'Snail soup (babbouche)',
      'Harira',
      'طازج برتقال juice',
    ],
    historyAr: 'Founded مع city of Marrakech in 1062. UNESCO declared square\'s oral و intangible heritage in 2001 ( storytellers, snake charmers, و food vendors). At sundown square transforms into massive open-air food court.',
    blurbAr: 'most theatrical food market on earth. By يوم, snake charmers و herbalists; by night, 100 food stalls open و square becomes one giant dinner table.',
    videoId: 'sjbL8Sp44nA',
    channel: 'Life through my lens',
    featured: true,
  },

  // ===================== AMERICAS =====================
  {
    id: 'pike-place',
    name: 'Pike Place Market',
    city: 'Seattle',
    country: 'USA',
    region: 'americas',
    yearFounded: 1907,
    marketType: 'Public farmer and craft market',
    signatureFoods: ['Pacific salmon', 'Dungeness crab', 'Clam chowder', 'Piroshky (Russian)', 'Penn Cove mussels'],
    history:
      "Founded in 1907 to cut out middlemen between farmers and shoppers. The original Starbucks is across the street. The flying fish at the main fish counter has been a Pike Place ritual since 1986.",
    blurb:
      "America's most famous public market. Fish thrown over counters, fresh Pacific seafood, and chowder served from a bowl made of bread.",
    marketTypeAr: 'Public farmer و craft market',
    signatureFoodsAr: [
      'Pacific سلمون',
      'Dungeness crab',
      'Clam chowder',
      'Piroshky (Russian)',
      'Penn Cove mussels',
    ],
    historyAr: 'Founded in 1907 to cut out middlemen between farmers و shoppers. original Starbucks is across street. flying سمك at main سمك counter has been Pike ضع ritual since 1986.',
    blurbAr: 'America\'s most famous public market. سمك thrown over counters, طازج Pacific seafood, و chowder served from bowl made of خبز.',
    videoId: 'TvfePq94NUg',
    channel: 'Mark Wiens',
  },
  {
    id: 'la-merced-mexico',
    name: 'Mercado de la Merced',
    city: 'Mexico City',
    country: 'Mexico',
    region: 'americas',
    yearFounded: 1860,
    marketType: 'Wholesale and retail mega-market',
    signatureFoods: ['Tlacoyos', 'Cochinita pibil', 'Mole', 'Quesadillas with flor de calabaza', 'Tropical fruits'],
    history:
      "Built on the site of a 17th-century convent. La Merced is the largest retail food market in Mexico City and supplies most of the rest. Every chili Mexico grows is here, plus a few that have not been classified yet.",
    blurb:
      "Mexico City at maximum volume. The fruit hall alone is half a city block of tropical color and noise.",
    marketTypeAr: 'Wholesale و retail mega-market',
    signatureFoodsAr: [
      'Tlacoyos',
      'Cochinita pibil',
      'Mole',
      'Quesadillas مع flor de calabaza',
      'Tropical fruits',
    ],
    historyAr: 'Built on site of 17th-century convent. La Merced is largest retail food market in Mexico City و supplies most of rest. Every فلفل حار Mexico grows is here, plus few that have not been classified yet.',
    blurbAr: 'Mexico City at maximum volume. fruit hall alone is half city block of tropical color و noise.',
    videoId: '1B_hMrd1dVk',
    channel: 'Chasing a Plate',
  },
];

export const FEATURED_MARKETS: FoodMarket[] = WORLD_MARKETS.filter((m) => m.featured);

export function marketsForRegion(r: MarketRegion): FoodMarket[] {
  return WORLD_MARKETS.filter((m) => m.region === r);
}
