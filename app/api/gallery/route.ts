import { NextRequest, NextResponse } from "next/server";
import { getGalleryImagesServer } from "@/lib/data/gallery.server";
import type { GalleryFilters } from "@/lib/types/gallery";

// GET - Fetch gallery images with pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters: GalleryFilters = {
      page: parseInt(searchParams.get("page") || "1", 10),
      limit: parseInt(searchParams.get("limit") || "15", 10),
    };

    // Optional filters
    const category = searchParams.get("category");
    if (category) {
      filters.category = category;
    }

    const orientation = searchParams.get("orientation");
    if (
      orientation &&
      ["portrait", "landscape", "square"].includes(orientation)
    ) {
      filters.orientation = orientation as "portrait" | "landscape" | "square";
    }

    const featured = searchParams.get("featured");
    if (featured === "true") {
      filters.featured = true;
    }

    const month = searchParams.get("month");
    if (month) {
      const monthNum = parseInt(month, 10);
      if (monthNum >= 1 && monthNum <= 12) {
        filters.month = monthNum;
      }
    }

    // Validate pagination
    if (filters.page! < 1) {
      return NextResponse.json(
        { error: "Page must be greater than 0" },
        { status: 400 }
      );
    }

    if (filters.limit! < 1 || filters.limit! > 100) {
      return NextResponse.json(
        { error: "Limit must be between 1 and 100" },
        { status: 400 }
      );
    }

    const result = await getGalleryImagesServer(filters);

    return NextResponse.json(
      { data: result.images, pagination: result.pagination, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/gallery:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
