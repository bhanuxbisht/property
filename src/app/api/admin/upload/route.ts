import { NextResponse } from "next/server";
import path from "path";
import { verifyAdminRequest } from "@/lib/server-auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * PRODUCTION MEDIA UPLOAD ENDPOINT
 * Uploads directly to Supabase Storage bucket ('property-media').
 * All photos and 360° panoramas are stored securely on Supabase CDN.
 */
export async function POST(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: auth.status });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase Storage is not configured. Please set environment variables in .env.local" },
      { status: 503 }
    );
  }

  const adminClient = getSupabaseAdmin();
  if (!adminClient) {
    return NextResponse.json(
      { error: "Supabase storage client is unavailable" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const isPanorama = formData.get("isPanorama") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file was selected for upload." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean unique filename
    const ext = path.extname(file.name).toLowerCase() || ".jpg";
    const prefix = isPanorama ? "360-pano" : "prop";
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const filename = `${prefix}-${timestamp}-${randomSuffix}${ext}`;

    const bucket = "property-media";
    const folder = isPanorama ? "panoramas" : "photos";
    const storagePath = `${folder}/${filename}`;

    const mimeType = file.type || (ext === ".png" ? "image/png" : "image/jpeg");

    // Upload to Supabase Storage
    const { error: uploadError } = await adminClient.storage
      .from(bucket)
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase Storage upload error:", uploadError);
      return NextResponse.json(
        { error: `Storage upload failed: ${uploadError.message}. Make sure the 'property-media' bucket exists in your Supabase project.` },
        { status: 500 }
      );
    }

    // Get public CDN URL
    const { data: publicUrlData } = adminClient.storage
      .from(bucket)
      .getPublicUrl(storagePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      filename,
      isPanorama,
      storage: "supabase",
    });
  } catch (err) {
    console.error("Upload exception:", err);
    return NextResponse.json({ error: "File upload failed due to an unexpected error" }, { status: 500 });
  }
}
