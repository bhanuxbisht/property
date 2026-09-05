import { NextResponse } from "next/server";
import { addListing, updateListing, deleteListing, getAllListings } from "@/lib/listings";
import { verifyAdminRequest } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || "Unauthorized access" }, { status: auth.status });
  }

  const listings = await getAllListings();
  return NextResponse.json({ success: true, listings, adminEmail: auth.email });
}

export async function POST(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || "Unauthorized access" }, { status: auth.status });
  }

  try {
    const data = await request.json();
    if (!data.title || !data.locality || !data.price) {
      return NextResponse.json(
        { error: "Title, locality, and price are required." },
        { status: 400 }
      );
    }

    const created = await addListing({
      title: data.title,
      locality: data.locality,
      price: data.price,
      priceValue: Number(data.priceValue) || 0,
      type: data.type || "flat",
      bhk: data.bhk || "3 BHK",
      area: data.area || "1,000 sq.ft",
      status: data.status || "available",
      featured: Boolean(data.featured),
      jdaApproved: Boolean(data.jdaApproved),
      readyToMove: Boolean(data.readyToMove),
      has360: Boolean(data.has360),
      facing: data.facing || "East Facing",
      image: data.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85",
      gallery:
        data.gallery && data.gallery.length > 0
          ? data.gallery
          : [data.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85"],
      panoramaUrl:
        data.panoramaUrl || (data.has360 ? "https://pannellum.org/images/alma.jpg" : undefined),
      description: data.description || "Verified property in Jaipur by RajHomes.",
    });

    return NextResponse.json({ success: true, listing: created });
  } catch (err) {
    console.error("Failed to create listing:", err);
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || "Unauthorized access" }, { status: auth.status });
  }

  try {
    const data = await request.json();
    const { id, ...updates } = data;

    if (!id) {
      return NextResponse.json({ error: "Listing ID is required for update" }, { status: 400 });
    }

    const updated = await updateListing(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, listing: updated });
  } catch (err) {
    console.error("Failed to update listing:", err);
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || "Unauthorized access" }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Listing ID is required" }, { status: 400 });
    }

    const deleted = await deleteListing(id);
    if (!deleted) {
      return NextResponse.json({ error: "Listing not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Listing deleted" });
  } catch (err) {
    console.error("Failed to delete listing:", err);
    return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
  }
}
