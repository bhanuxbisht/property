import { NextResponse } from "next/server";
import { getAllListings } from "@/lib/listings";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // 'all', 'available', 'sold'
    const locality = searchParams.get("locality");
    const type = searchParams.get("type");

    let listings = await getAllListings();

    if (status && status !== "all") {
      listings = listings.filter((l) => l.status === status);
    }

    if (locality && locality !== "all") {
      listings = listings.filter((l) => l.locality.toLowerCase() === locality.toLowerCase());
    }

    if (type && type !== "all") {
      listings = listings.filter((l) => l.type.toLowerCase() === type.toLowerCase());
    }

    return NextResponse.json({ success: true, count: listings.length, listings });
  } catch (err) {
    console.error("Failed to fetch listings:", err);
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}
