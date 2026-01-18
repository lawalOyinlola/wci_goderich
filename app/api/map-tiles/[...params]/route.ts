import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy endpoint for OpenStreetMap tiles with optimized cache headers
 * This allows us to control cache lifetime for map tiles, improving performance
 * on repeat visits.
 * 
 * Route: /api/map-tiles/[z]/[x]/[y].png
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  try {
    const { params: pathParams } = await params;
    
    // Extract z, x, y from the path params
    // Expected format: [z, x, y.png] or [z, x, y]
    if (pathParams.length < 3) {
      return NextResponse.json(
        { error: "Invalid tile path. Expected format: z/x/y.png" },
        { status: 400 }
      );
    }

    const z = pathParams[0];
    const x = pathParams[1];
    // Remove .png extension if present
    const y = pathParams[2].replace(/\.png$/, "");

    // Validate tile coordinates
    if (!z || !x || !y) {
      return NextResponse.json(
        { error: "Missing tile coordinates" },
        { status: 400 }
      );
    }

    // Validate that coordinates are valid numbers and within reasonable bounds
    const zNum = parseInt(z, 10);
    const xNum = parseInt(x, 10);
    const yNum = parseInt(y, 10);

    if (
      isNaN(zNum) ||
      isNaN(xNum) ||
      isNaN(yNum) ||
      zNum < 0 ||
      zNum > 19 ||
      xNum < 0 ||
      yNum < 0
    ) {
      return NextResponse.json(
        { error: "Invalid tile coordinates" },
        { status: 400 }
      );
    }

    // OpenStreetMap tile servers (round-robin for load balancing)
    const servers = ["a", "b", "c"];
    const server = servers[(xNum + yNum) % servers.length];
    
    const tileUrl = `https://${server}.tile.openstreetmap.org/${zNum}/${xNum}/${yNum}.png`;

    // Fetch the tile from OpenStreetMap
    const response = await fetch(tileUrl, {
      headers: {
        "User-Agent": "WCI Goderich Church Website/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch tile" },
        { status: response.status }
      );
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();

    // Return the image with optimized cache headers
    // Map tiles don't change frequently, so we can cache them for 30 days
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=2592000, immutable", // 30 days
        "CDN-Cache-Control": "public, max-age=2592000",
        "Vary": "Accept-Encoding",
        // Add CORS headers if needed
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (error) {
    console.error("Error fetching map tile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
