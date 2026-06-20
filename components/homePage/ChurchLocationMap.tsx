"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowCounterClockwiseIcon,
  NavigationArrowIcon,
  SignpostIcon,
} from "@phosphor-icons/react";
import { CHURCH_INFO } from "@/lib/constants";
import "leaflet/dist/leaflet.css";

const { NAME } = CHURCH_INFO;
const { address, coordinates } = CHURCH_INFO.CHURCH_LOCATION ?? {};
const { city = "", country = "" } = address ?? {};
const { lat, lng } = coordinates ?? {};

// Turn-by-turn directions — opens the device's map app on mobile.
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

const MARKER_HTML = `
  <div style="
    background:#dc2626;width:40px;height:40px;border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);border:3px solid white;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;
  ">
    <div style="transform:rotate(45deg);color:white;font-size:18px;font-weight:bold;">&#9962;</div>
  </div>
`;

// Distinct blue dot for the visitor's own position (vs the red church pin).
const USER_MARKER_HTML = `
  <div style="
    width:18px;height:18px;border-radius:50%;background:#2563eb;border:3px solid white;
    box-shadow:0 0 0 4px rgba(37,99,235,0.25),0 2px 6px rgba(0,0,0,0.3);
  "></div>
`;

const USER_POPUP_HTML = `
  <div style="display:flex;align-items:center;gap:7px;padding:7px 11px;white-space:nowrap;font-weight:600;font-size:0.85rem;color:#1e293b">
    <span style="width:9px;height:9px;border-radius:50%;background:#2563eb;flex:none"></span>
    You are here
  </div>
`;

const POPUP_HTML = `
  <div style="min-width:208px">
    <div style="padding:13px 16px 12px">
      <h3 style="font-weight:700;font-size:0.95rem;line-height:1.25;margin:0 0 5px;color:#0f172a">${NAME}</h3>
      <p style="display:inline-flex;align-items:center;gap:6px;font-size:0.68rem;text-transform:uppercase;letter-spacing:0.07em;color:#64748b;margin:0">
        <span style="width:6px;height:6px;border-radius:50%;background:#dc2626;flex:none"></span>
        ${city}, ${country}
      </p>
    </div>
    <a href="${DIRECTIONS_URL}" target="_blank" rel="noopener noreferrer"
      style="display:flex;align-items:center;justify-content:center;gap:7px;background:#dc2626;color:#fff;font-weight:600;font-size:0.85rem;padding:11px 12px;text-decoration:none">
      Get Directions &rarr;
    </a>
  </div>
`;

/**
 * Renders the church location on an interactive Leaflet map.
 *
 * Uses vanilla Leaflet (not react-leaflet) so the map's full lifecycle is
 * created and destroyed inside a single effect. This survives client-side
 * navigation and remounts cleanly — react-leaflet's MapContainer instead
 * throws "Map container is being reused" when the page unmounts and remounts.
 */
export default function ChurchLocationMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const userMarkerRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("leaflet").then((L) => {
      // Bail if the component unmounted before the import resolved, or a map
      // already exists for this instance.
      if (cancelled || !containerRef.current || mapRef.current) return;
      if (lat === undefined || lng === undefined) return;

      leafletRef.current = L;

      const map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 15,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      L.tileLayer("/api/map-tiles/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const icon = L.divIcon({
        html: MARKER_HTML,
        className: "custom-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(POPUP_HTML, { closeButton: false });
    });

    // Destroy the map on unmount so its container is released cleanly.
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      leafletRef.current = null;
      userMarkerRef.current = null;
    };
  }, []);

  const handleReset = () => {
    // Drop the visitor's pin and re-center on the church.
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    if (lat !== undefined && lng !== undefined) {
      mapRef.current?.setView([lat, lng], 15);
    }
  };

  const handleViewMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const L = leafletRef.current;
        const map = mapRef.current;
        if (!L || !map) return;

        const userLatLng: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        // Reuse the existing pin on repeat clicks instead of stacking markers.
        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng(userLatLng);
        } else {
          const userIcon = L.divIcon({
            html: USER_MARKER_HTML,
            className: "custom-marker",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12],
          });
          userMarkerRef.current = L.marker(userLatLng, { icon: userIcon })
            .addTo(map)
            .bindPopup(USER_POPUP_HTML, { closeButton: false });
        }

        // Frame both the church and the visitor so the relationship is clear.
        if (lat !== undefined && lng !== undefined) {
          map.fitBounds([[lat, lng], userLatLng], {
            padding: [60, 60],
            maxZoom: 15,
          });
        } else {
          map.setView(userLatLng, 15);
        }
        userMarkerRef.current.openPopup();
      },
      (err) => {
        if (process.env.NODE_ENV === "development") {
          console.error(err);
        }
        toast.error("Unable to get your location");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <Card className="overflow-hidden shadow-lg max-lg:rounded-b-none lg:rounded-r-none border-0 relative group">
      <CardContent className="p-0">
        <div className="relative h-100 md:h-144 w-full isolate">
          <div ref={containerRef} className="z-0 h-full w-full" />

          {/* CONTROL: Bottom Center */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-1000 flex flex-wrap justify-center gap-3 w-max max-w-[90%]">
            <AnimatedButton
              size="sm"
              variant="default"
              href={DIRECTIONS_URL}
              text="Get Directions"
              icon={<SignpostIcon weight="fill" />}
              className="rounded-full shadow-lg bg-primary/90 hover:bg-primary backdrop-blur-sm shrink-0"
            />

            <AnimatedButton
              size="sm"
              variant="outline"
              text="View My Location"
              icon={<NavigationArrowIcon weight="fill" />}
              className="rounded-full shadow-lg bg-white/90 hover:bg-white text-primary hover:text-primary backdrop-blur-sm shrink-0"
              onClick={handleViewMyLocation}
            />

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 shrink-0 rounded-xl bg-white/90 backdrop-blur-sm shadow-md hover:bg-white hover:scale-105 transition-all duration-200 border-border/50"
              onClick={handleReset}
              title="Reset View"
            >
              <ArrowCounterClockwiseIcon
                weight="bold"
                size={20}
                className="text-foreground dark:text-primary-foreground"
              />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}