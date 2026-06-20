import { NextRequest, NextResponse } from "next/server";

/**
 * 1x1 fully transparent PNG. Served (with a 200) whenever an upstream tile can't
 * be fetched, so the browser never logs a failed-resource (4xx/5xx) console error
 * — Leaflet simply renders a blank tile and the map stays usable.
 */
const TRANSPARENT_TILE = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64"
);

function transparentTile(): NextResponse {
  return new NextResponse(TRANSPARENT_TILE, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      // Cache the fallback only briefly so a transient upstream failure recovers.
      "Cache-Control": "public, max-age=60",
    },
  });
}

/**
 * Proxy endpoint for OpenStreetMap tiles with optimized cache headers
 * This allows us to control cache lifetime for map tiles, improving performance
 * on repeat visits.
 *
 * Route: /api/map-tiles/[z]/[x]/[y].png
 */
export async function GET(
  _request: NextRequest,
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

    // Fetch the tile from OpenStreetMap. OSM's tile usage policy requires a
    // valid, identifying User-Agent with contact info.
    const response = await fetch(tileUrl, {
      headers: {
        "User-Agent":
          "WCIGoderichWebsite/1.0 (+https://wcigoderich.org; info@wcigoderich.org)",
        Referer: "https://wcigoderich.org",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      // Degrade gracefully instead of surfacing a 4xx/5xx to the browser.
      return transparentTile();
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
    // Network error / timeout fetching the upstream tile — serve a blank tile
    // (200) so the browser console stays clean and the map remains usable.
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching map tile:", error);
    }
    return transparentTile();
  }
}
