/**
 * Comprehensive list of all major and minor residential, commercial,
 * and suburban localities across Jaipur City, Rajasthan.
 */
export const JAIPUR_LOCALITIES = [
  // Primary Focus Zones
  "Murlipura",
  "Sikar Road",
  "Vidhyadhar Nagar",
  "Jhotwara",

  // Central & Prime Jaipur
  "C-Scheme",
  "Civil Lines",
  "Bani Park",
  "Raja Park",
  "Bapu Nagar",
  "Tilak Nagar",
  "Jawahar Nagar",
  "Gandhi Nagar",
  "Shastri Nagar",
  "Ambabari",

  // West Jaipur & Ajmer Road Corridor
  "Vaishali Nagar",
  "Chitrakoot",
  "Nirman Nagar",
  "Shyam Nagar",
  "Sodala",
  "Ajmer Road",
  "Sirsi Road",
  "Kalwar Road",
  "Niwaru Road",
  "Khatipura",
  "Bindayaka",
  "Bhankrota",
  "Mahindra SEZ",
  "Bagru",

  // South Jaipur & Tonk Road Corridor
  "Mansarovar",
  "Gopalpura Bypass",
  "Mahesh Nagar",
  "Durgapura",
  "Tonk Road",
  "Malviya Nagar",
  "Pratap Nagar",
  "Sitapura",
  "Muhana Mandi Road",
  "Diggi Malpura Road",

  // East Jaipur & Jagatpura Corridor
  "Jagatpura",
  "Malviya Industrial Area",
  "Agra Road",
  "Kanota",

  // North Jaipur & Highway Corridors
  "Harmada",
  "VKI Area (Vishwakarma)",
  "Delhi Road",
  "Amer",
  "Chomu",

  // Custom
  "Other",
] as const;

export type JaipurLocality = (typeof JAIPUR_LOCALITIES)[number] | string;
