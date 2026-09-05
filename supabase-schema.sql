-- ====================================================================
-- RajHomes Jaipur — Production Supabase Database & Storage Setup
-- ====================================================================
-- Instructions:
-- 1. Log in to your Supabase Project (https://supabase.com).
-- 2. Go to the "SQL Editor" in the left sidebar.
-- 3. Paste this entire script and click "Run".
--
-- CRITICAL SECURITY SETUP IN SUPABASE DASHBOARD:
-- 1. Go to Authentication -> Providers -> Email.
-- 2. DISABLE "Enable Email Signups" (turn it OFF).
--    This prevents ANY random person or hacker from registering an account!
-- 3. Go to Authentication -> Users -> Click "Add User" -> "Create User".
-- 4. Enter your admin email (e.g. contact@rajhomes.in or your relative's email)
--    and set a strong password.
-- ====================================================================

-- 1. CREATE LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.listings (
  id TEXT PRIMARY KEY DEFAULT ('prop-' || floor(extract(epoch from now()) * 1000)::text),
  title TEXT NOT NULL,
  locality TEXT NOT NULL,
  price TEXT NOT NULL,
  price_value NUMERIC DEFAULT 0,
  type TEXT DEFAULT 'flat',
  bhk TEXT DEFAULT '3 BHK',
  area TEXT DEFAULT '1,000 sq.ft',
  status TEXT DEFAULT 'available',
  featured BOOLEAN DEFAULT false,
  jda_approved BOOLEAN DEFAULT true,
  ready_to_move BOOLEAN DEFAULT true,
  has_360 BOOLEAN DEFAULT false,
  facing TEXT DEFAULT 'East Facing',
  image TEXT NOT NULL,
  gallery TEXT[] DEFAULT ARRAY[]::TEXT[],
  panorama_url TEXT,
  description TEXT,
  posted_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for speedy searching and filtering
CREATE INDEX IF NOT EXISTS idx_listings_locality ON public.listings(locality);
CREATE INDEX IF NOT EXISTS idx_listings_type ON public.listings(type);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_featured ON public.listings(featured);

-- 2. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Anyone can view available or all properties (public catalog)
DROP POLICY IF EXISTS "Public can view listings" ON public.listings;
CREATE POLICY "Public can view listings"
  ON public.listings
  FOR SELECT
  USING (true);

-- Only authenticated users (admins) can insert, update, or delete
DROP POLICY IF EXISTS "Admins can insert listings" ON public.listings;
CREATE POLICY "Admins can insert listings"
  ON public.listings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update listings" ON public.listings;
CREATE POLICY "Admins can update listings"
  ON public.listings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can delete listings" ON public.listings;
CREATE POLICY "Admins can delete listings"
  ON public.listings
  FOR DELETE
  TO authenticated
  USING (true);

-- 3. SETUP STORAGE BUCKET FOR PROPERTY PHOTOS & 360 PANORAMAS
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-media',
  'property-media',
  true,
  52428800, -- 50 MB limit per file (generous for high-res 360 panoramas)
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800;

-- Storage RLS Policies
DROP POLICY IF EXISTS "Public can read property-media" ON storage.objects;
CREATE POLICY "Public can read property-media"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'property-media');

DROP POLICY IF EXISTS "Authenticated admins can upload media" ON storage.objects;
CREATE POLICY "Authenticated admins can upload media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'property-media');

DROP POLICY IF EXISTS "Authenticated admins can update media" ON storage.objects;
CREATE POLICY "Authenticated admins can update media"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'property-media');

DROP POLICY IF EXISTS "Authenticated admins can delete media" ON storage.objects;
CREATE POLICY "Authenticated admins can delete media"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'property-media');

-- 4. SEED INITIAL VERIFIED JAIPUR LISTINGS
INSERT INTO public.listings (
  id, title, locality, price, price_value, type, bhk, area, status, featured, jda_approved, ready_to_move, has_360, facing, image, gallery, panorama_url, description
) VALUES
(
  'prop-1',
  'Luxury 3 BHK JDA Flat with Modular Kitchen',
  'Murlipura',
  '₹48 Lakh',
  4800000,
  'flat',
  '3 BHK',
  '1,350 sq.ft',
  'available',
  true,
  true,
  true,
  true,
  'East Facing',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
  ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
    'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&q=85',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=85'
  ],
  'https://pannellum.org/images/alma.jpg',
  'Spacious 3 BHK luxury apartment located in prime Murlipura near national highway. JDA approved, 100% loanable from SBI and all major banks. Equipped with complete wooden modular kitchen, false ceilings with warm LED lighting, branded Jaguar bath fittings, dedicated covered car parking, and modern lift.'
),
(
  'prop-2',
  'Modern 4 BHK Independent Luxury Villa',
  'Sikar Road',
  '₹1.15 Crore',
  11500000,
  'villa',
  '4 BHK',
  '2,200 sq.ft',
  'available',
  true,
  true,
  true,
  false,
  'North-East Facing',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85',
  ARRAY[
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85'
  ],
  NULL,
  'Exclusive 4 BHK independent duplex villa situated in an upscale gated township on Sikar Road. Features Italian marble flooring, 4 master bedrooms with en-suite luxury bathrooms, a private landscaped terrace garden, 40-foot wide road frontage, and Vastu-compliant architecture.'
),
(
  'prop-3',
  'Premium Commercial Showroom / Office Space',
  'Vidhyadhar Nagar',
  '₹85 Lakh',
  8500000,
  'commercial',
  'Commercial',
  '1,100 sq.ft',
  'available',
  true,
  true,
  true,
  false,
  'Main Road Facing',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85',
  ARRAY[
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85'
  ],
  NULL,
  'High-visibility commercial space on the ground floor of a buzzing commercial complex in Central Spine, Vidhyadhar Nagar. Ideal for clinics, luxury salons, corporate offices, or branded retail outlets. High footfall area with ample parking space.'
),
(
  'prop-4',
  'JDA Approved Residential Plot (East Facing)',
  'Jhotwara',
  '₹38 Lakh',
  3800000,
  'plot',
  'Plot',
  '150 sq.yd',
  'available',
  false,
  true,
  true,
  false,
  'East Facing',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=85',
  ARRAY[
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=85'
  ],
  NULL,
  'Clear title JDA residential plot situated in a peaceful, fully developed colony of Jhotwara. 30 ft road frontage, direct water supply line, underground electricity cable connection, and immediate registry-patta ready.'
)
ON CONFLICT (id) DO NOTHING;
