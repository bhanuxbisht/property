import { getSupabaseAdmin, getSupabaseClient, isSupabaseConfigured } from "./supabase";

export interface PropertyListing {
  id: string;
  title: string;
  locality: "Murlipura" | "Sikar Road" | "Vidhyadhar Nagar" | "Jhotwara" | string;
  price: string;
  priceValue: number;
  type: "flat" | "plot" | "villa" | "commercial";
  bhk: string;
  area: string;
  status: "available" | "sold";
  featured: boolean;
  jdaApproved: boolean;
  readyToMove: boolean;
  has360: boolean;
  facing?: string;
  image: string;
  gallery: string[];
  panoramaUrl?: string;
  description: string;
  postedDate: string;
}

// Convert DB snake_case row to TypeScript camelCase object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDbRow(row: any): PropertyListing {
  return {
    id: row.id,
    title: row.title,
    locality: row.locality,
    price: row.price,
    priceValue: Number(row.price_value || 0),
    type: row.type || "flat",
    bhk: row.bhk || "3 BHK",
    area: row.area || "1,000 sq.ft",
    status: row.status || "available",
    featured: Boolean(row.featured),
    jdaApproved: Boolean(row.jda_approved),
    readyToMove: Boolean(row.ready_to_move),
    has360: Boolean(row.has_360),
    facing: row.facing || "East Facing",
    image: row.image,
    gallery: Array.isArray(row.gallery) && row.gallery.length > 0 ? row.gallery : [row.image],
    panoramaUrl: row.panorama_url || undefined,
    description: row.description || "",
    postedDate: row.posted_date || new Date().toISOString().split("T")[0],
  };
}

// Convert TypeScript camelCase object to DB snake_case row
function toDbRow(item: Partial<PropertyListing>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row: any = {};
  if (item.id !== undefined) row.id = item.id;
  if (item.title !== undefined) row.title = item.title;
  if (item.locality !== undefined) row.locality = item.locality;
  if (item.price !== undefined) row.price = item.price;
  if (item.priceValue !== undefined) row.price_value = item.priceValue;
  if (item.type !== undefined) row.type = item.type;
  if (item.bhk !== undefined) row.bhk = item.bhk;
  if (item.area !== undefined) row.area = item.area;
  if (item.status !== undefined) row.status = item.status;
  if (item.featured !== undefined) row.featured = item.featured;
  if (item.jdaApproved !== undefined) row.jda_approved = item.jdaApproved;
  if (item.readyToMove !== undefined) row.ready_to_move = item.readyToMove;
  if (item.has360 !== undefined) row.has_360 = item.has360;
  if (item.facing !== undefined) row.facing = item.facing;
  if (item.image !== undefined) row.image = item.image;
  if (item.gallery !== undefined) row.gallery = item.gallery;
  if (item.panoramaUrl !== undefined) row.panorama_url = item.panoramaUrl;
  if (item.description !== undefined) row.description = item.description;
  return row;
}

/**
 * PRODUCTION SUPABASE DATABASE CLIENT
 * All operations use parameterized Supabase PostgREST queries.
 * Immune to SQL injection (no raw SQL string concatenation).
 * Purely communicates with live Supabase PostgreSQL database.
 */

export async function getAllListings(): Promise<PropertyListing[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase is not configured yet. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.");
    return [];
  }

  try {
    const client = getSupabaseAdmin() || getSupabaseClient();
    if (!client) return [];

    const { data, error } = await client
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase getAllListings query error:", error.message || error);
      return [];
    }

    return (data || []).map(fromDbRow);
  } catch (err) {
    console.error("Supabase getAllListings query exception:", err);
    return [];
  }
}

export async function getListingById(id: string): Promise<PropertyListing | null> {
  if (!id) return null;

  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const client = getSupabaseAdmin() || getSupabaseClient();
    if (!client) return null;

    // Parameterized .eq() filter prevents SQL injection
    const { data, error } = await client
      .from("listings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase getListingById query error:", error.message || error);
      return null;
    }

    return data ? fromDbRow(data) : null;
  } catch (err) {
    console.error("Supabase getListingById query exception:", err);
    return null;
  }
}

export async function addListing(
  item: Omit<PropertyListing, "id" | "postedDate">
): Promise<PropertyListing> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY to .env.local.");
  }

  const adminClient = getSupabaseAdmin();
  if (!adminClient) {
    throw new Error("Supabase admin client not initialized. Please verify SUPABASE_SERVICE_ROLE_KEY.");
  }

  const newId = `prop-${Date.now()}`;
  const postedDate = new Date().toISOString().split("T")[0];

  const fullItem: PropertyListing = {
    ...item,
    id: newId,
    postedDate,
  };

  const dbRow = toDbRow(fullItem);
  dbRow.posted_date = postedDate;

  // Parameterized insert
  const { data, error } = await adminClient
    .from("listings")
    .insert([dbRow])
    .select()
    .single();

  if (error || !data) {
    console.error("Supabase insert error:", error);
    throw new Error(error?.message || "Failed to add listing to Supabase database");
  }

  return fromDbRow(data);
}

export async function updateListing(
  id: string,
  updates: Partial<PropertyListing>
): Promise<PropertyListing | null> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Please add Supabase credentials to .env.local.");
  }

  const adminClient = getSupabaseAdmin();
  if (!adminClient) {
    throw new Error("Supabase admin client not initialized. Please verify SUPABASE_SERVICE_ROLE_KEY.");
  }

  const dbRow = toDbRow(updates);
  dbRow.updated_at = new Date().toISOString();

  // Parameterized update with .eq()
  const { data, error } = await adminClient
    .from("listings")
    .update(dbRow)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase update error:", error);
    return null;
  }

  return data ? fromDbRow(data) : null;
}

export async function deleteListing(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Please add Supabase credentials to .env.local.");
  }

  const adminClient = getSupabaseAdmin();
  if (!adminClient) {
    throw new Error("Supabase admin client not initialized. Please verify SUPABASE_SERVICE_ROLE_KEY.");
  }

  // Parameterized delete with .eq()
  const { error } = await adminClient
    .from("listings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase delete error:", error);
    return false;
  }

  return true;
}
