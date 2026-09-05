import { JAIPUR_LOCALITIES } from "./jaipur-areas";
import { siteConfig } from "./site-config";

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function unslugify(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export type PSEOIntent = "buy" | "rent" | "flats" | "plots";

export interface PSEOSlugData {
  slug: string;
  locality: string;
  intent: PSEOIntent;
  title: string;
  metaDescription: string;
  headline: string;
}

export interface LocalityProfile {
  name: string;
  zone: string;
  pricePerSqYard: string;
  flatPriceRange: string;
  landmarks: string[];
  keyHighlights: string[];
  connectivity: string;
}

export const LOCALITY_PROFILES: Record<string, Partial<LocalityProfile>> = {
  "Murlipura": {
    name: "Murlipura",
    zone: "North-West Jaipur",
    pricePerSqYard: "₹45,000 – ₹85,000 / sq.yard",
    flatPriceRange: "₹35 Lakh – ₹90 Lakh (2 & 3 BHK)",
    landmarks: ["Dadi Ka Phatak", "Bajrang Vihar", "Vikas Nagar", "Kedia Palace", "Road No. 1 Link"],
    keyHighlights: [
      "100% established residential colony with mature markets and schools",
      "Direct 5-minute access to Sikar Road Highway & VKI industrial hub",
      "High rental yields for 2 BHK and 3 BHK builder floors",
      "Clean JDA Pattas with seamless registry and home loan availability",
    ],
    connectivity: "12 mins to Jaipur Railway Station, 5 mins to Sikar Road express corridor.",
  },
  "Sikar Road": {
    name: "Sikar Road",
    zone: "North Highway Corridor",
    pricePerSqYard: "₹35,000 – ₹75,000 / sq.yard",
    flatPriceRange: "₹28 Lakh – ₹80 Lakh",
    landmarks: ["VKI Industrial Area", "Harmada", "Sun City", "Road No. 1 to 14", "Dadi Ka Phatak Flyover"],
    keyHighlights: [
      "Fastest appreciating commercial & industrial corridor in North Jaipur",
      "Wide 160-200 ft highway frontage with immense warehousing & retail potential",
      "Extensive townships with modern gated amenities and green parks",
      "Substantial capital appreciation driven by Ring Road and highway upgrades",
    ],
    connectivity: "Instant connectivity to Delhi-Ajmer Expressway bypass, Chomu, and Ring Road.",
  },
  "Vidhyadhar Nagar": {
    name: "Vidhyadhar Nagar",
    zone: "North-Central Planned City",
    pricePerSqYard: "₹65,000 – ₹1,25,000 / sq.yard",
    flatPriceRange: "₹50 Lakh – ₹1.8 Crore",
    landmarks: ["Central Spine", "Alka Cinema", "National Handloom", "Sector 1 to 9", "Cinestar"],
    keyHighlights: [
      "One of Jaipur's premier planned sectors with wide sector roads and underground drainage",
      "Buzzing Central Spine commercial high-street with leading retail brands & dining",
      "Exceptional schooling and multi-specialty healthcare facilities within walking distance",
      "High demand for premium 3 BHK, 4 BHK multi-storey apartments and duplex villas",
    ],
    connectivity: "10 mins to Jaipur Junction, 15 mins to MI Road & C-Scheme.",
  },
  "Jhotwara": {
    name: "Jhotwara",
    zone: "West Jaipur",
    pricePerSqYard: "₹38,000 – ₹70,000 / sq.yard",
    flatPriceRange: "₹25 Lakh – ₹75 Lakh",
    landmarks: ["Lata Circle", "Kalwar Road", "Niwaru Road", "Pankaj Singhvi Marg", "Khatipura"],
    keyHighlights: [
      "Densely populated, self-sufficient residential hub with affordable housing options",
      "Thriving retail markets, garment hubs, and hyper-local shopping streets",
      "Rapid expansion along Kalwar Road and Niwaru Road for affordable plots & duplexes",
      "Proximity to Khatipura Railway Station (Jaipur's satellite railway junction)",
    ],
    connectivity: "10 mins to Vaishali Nagar via Khatipura Flyover, 15 mins to Jaipur Junction.",
  },
  "Vaishali Nagar": {
    name: "Vaishali Nagar",
    zone: "West Jaipur Prime",
    pricePerSqYard: "₹85,000 – ₹1,80,000 / sq.yard",
    flatPriceRange: "₹65 Lakh – ₹3.5 Crore",
    landmarks: ["Amrapali Circle", "National Handloom", "Inox Mall", "Gandhi Path", "Queens Road"],
    keyHighlights: [
      "Jaipur's most affluent western residential and commercial landmark",
      "Top-tier international schools, fine dining restaurants, and retail malls",
      "High demand for luxury penthouses, 3/4 BHK flats, and independent kothis",
    ],
    connectivity: "Direct connectivity to Ajmer Highway, 12 mins to Civil Lines & C-Scheme.",
  },
  "Mansarovar": {
    name: "Mansarovar",
    zone: "South-West Jaipur",
    pricePerSqYard: "₹55,000 – ₹1,20,000 / sq.yard",
    flatPriceRange: "₹40 Lakh – ₹1.5 Crore",
    landmarks: ["Mansarovar Metro Station", "City Park", "Madhyam Marg", "VT Road", "Kaveri Path"],
    keyHighlights: [
      "One of Asia's largest residential colonies with direct Metro line connectivity",
      "World-class City Park attraction, major colleges, and medical universities",
      "Steady year-on-year capital appreciation and booming rental demand",
    ],
    connectivity: "Direct Jaipur Metro Pink Line terminus, 15 mins to Jaipur International Airport.",
  },
  "Jagatpura": {
    name: "Jagatpura",
    zone: "East-South Jaipur",
    pricePerSqYard: "₹45,000 – ₹90,000 / sq.yard",
    flatPriceRange: "₹38 Lakh – ₹1.4 Crore",
    landmarks: ["SKIT College", "Mahal Road", "Bombay Hospital", "Akshaya Patra", "CBI Colony"],
    keyHighlights: [
      "Education and IT corridor with immense youth and professional population",
      "Modern high-rise residential towers with clubhouse and pool facilities",
      "Proximity to Sitapura Industrial Area, JECC, and international schools",
    ],
    connectivity: "10 mins to Jaipur International Airport, 5 mins to Jagatpura Railway Station.",
  },
};

export const INTENT_DETAILS: Record<
  PSEOIntent,
  {
    prefix: string;
    verb: string;
    titleTemplate: (loc: string) => string;
    descTemplate: (loc: string) => string;
  }
> = {
  buy: {
    prefix: "buy-in",
    verb: "Buy Property",
    titleTemplate: (loc) => `Properties for Sale in ${loc}, Jaipur | Verified JDA Approved Listings`,
    descTemplate: (loc) =>
      `Explore verified residential & commercial properties for sale in ${loc}, Jaipur. Clear JDA Patta, registry ready, bank loan pre-approved with Property Boutique. Call 9001539001.`,
  },
  rent: {
    prefix: "rent-in",
    verb: "Rent Property",
    titleTemplate: (loc) => `Houses, Flats & Commercial Spaces for Rent in ${loc}, Jaipur`,
    descTemplate: (loc) =>
      `Find inspected 1, 2, 3 BHK flats and commercial properties for rent in ${loc}, Jaipur. Family & bachelor friendly options, direct owner verification.`,
  },
  flats: {
    prefix: "flats-in",
    verb: "Flats for Sale",
    titleTemplate: (loc) => `2 & 3 BHK Flats for Sale in ${loc}, Jaipur | Ready to Move & JDA Approved`,
    descTemplate: (loc) =>
      `Looking to buy a flat in ${loc}, Jaipur? Browse luxury builder floors and apartments with lift, covered car parking, and 100% clear legal titles.`,
  },
  plots: {
    prefix: "plots-in",
    verb: "Plots for Sale",
    titleTemplate: (loc) => `JDA Approved Residential & Commercial Plots in ${loc}, Jaipur`,
    descTemplate: (loc) =>
      `Verified residential plots and land for sale in ${loc}, Jaipur. 100 to 500 sq.yards, 30-60 ft road facing, immediate registry with loan facility.`,
  },
};

/**
 * Generate programmatic slugs for all major localities across key intents.
 */
export function generateAllPSEOSlugs(): PSEOSlugData[] {
  const result: PSEOSlugData[] = [];
  const intents: PSEOIntent[] = ["buy", "rent", "flats", "plots"];

  // Use top 20 active localities for SSG to keep build lightning fast while providing comprehensive coverage
  const targetLocalities = JAIPUR_LOCALITIES.filter((l) => l !== "Other").slice(0, 20);

  for (const locality of targetLocalities) {
    const locSlug = slugify(locality);
    for (const intent of intents) {
      const intentInfo = INTENT_DETAILS[intent];
      const slug = `${intentInfo.prefix}-${locSlug}`;
      result.push({
        slug,
        locality,
        intent,
        title: intentInfo.titleTemplate(locality),
        metaDescription: intentInfo.descTemplate(locality),
        headline: `${intentInfo.verb} in ${locality}, Jaipur`,
      });
    }
  }

  return result;
}

export function getPSEODataBySlug(slug: string): PSEOSlugData | null {
  const intents: PSEOIntent[] = ["buy", "rent", "flats", "plots"];

  for (const intent of intents) {
    const prefix = `${INTENT_DETAILS[intent].prefix}-`;
    if (slug.startsWith(prefix)) {
      const locSlug = slug.slice(prefix.length);
      const matchedLoc = JAIPUR_LOCALITIES.find((l) => slugify(l) === locSlug);
      if (matchedLoc) {
        const intentInfo = INTENT_DETAILS[intent];
        return {
          slug,
          locality: matchedLoc,
          intent,
          title: intentInfo.titleTemplate(matchedLoc),
          metaDescription: intentInfo.descTemplate(matchedLoc),
          headline: `${intentInfo.verb} in ${matchedLoc}, Jaipur`,
        };
      }
    }
  }

  return null;
}

export function generateLocalityFAQ(locality: string, intent: PSEOIntent) {
  const profile = LOCALITY_PROFILES[locality];
  const priceInfo = profile?.pricePerSqYard || "₹35,000 – ₹75,000 / sq.yard depending on road width and sector";
  const flatInfo = profile?.flatPriceRange || "₹30 Lakh – ₹85 Lakh for 2 & 3 BHK flats";

  return [
    {
      question: `What is the prevailing property price range in ${locality}, Jaipur?`,
      answer: `In ${locality}, residential plot prices typically range around ${priceInfo}, while 2 & 3 BHK apartments and builder floors trade between ${flatInfo}. Rates vary depending on road width (30ft vs 60ft), proximity to main roads, and whether the land has an original JDA Patta or society conversion.`,
    },
    {
      question: `Are properties in ${locality} approved by JDA (Jaipur Development Authority)?`,
      answer: `Most established colonies in ${locality} have authentic JDA approved Pattas under 90A conversion or JDA residential schemes. However, buyers should always verify the original Patta, lease deed status, and revenue chain. Property Boutique verifies every title deed with the Jaipur Development Authority and Sub-Registrar records before listing.`,
    },
    {
      question: `Can I get a home loan from nationalized banks (SBI, HDFC, ICICI) in ${locality}?`,
      answer: `Yes, for all clear-title, JDA-approved properties in ${locality}, leading banks including State Bank of India (SBI), HDFC Bank, ICICI Bank, and Bank of Baroda provide home loans up to 80-90% of property value with competitive interest rates.`,
    },
    {
      question: `How does Property Boutique assist buyers and sellers in ${locality}?`,
      answer: `Headed by RERA-registered consultant Mr. Lalit Singh Bisht (RERA: ${siteConfig.reraNumber}), Property Boutique provides end-to-end guidance including on-ground site inspection, title deed verification, transparent negotiation directly with the owner, bank loan sanctioning, and registry execution at the Sub-Registrar office.`,
    },
    {
      question: `What makes ${locality} an attractive residential and investment choice in Jaipur?`,
      answer: `${locality} offers excellent physical infrastructure, strong connectivity, reputed schools, hospitals, and established commercial markets. ${profile?.keyHighlights ? profile.keyHighlights.join(". ") + "." : "Continuous infrastructure development and rental demand ensure solid capital appreciation."}`,
    },
  ];
}

export const TARGET_KEYWORDS = [
  // High Intent Core
  "Property Boutique Jaipur",
  "property dealer in Jaipur",
  "property dealer Murlipura",
  "property dealer Sikar Road",
  "property dealer Vidhyadhar Nagar",
  "real estate consultant Jhotwara",
  "flats for sale in Murlipura Jaipur",
  "3 BHK flat in Vidhyadhar Nagar",
  "plots for sale Sikar Road Jaipur",
  "luxury villas in Jaipur",
  "JDA approved plots Jaipur",
  "Lalit Singh Bisht Property Boutique",
  "RERA registered property consultant Jaipur",
  "stamp duty and registration charges Jaipur",
  "property valuation in Jaipur",
] as const;
