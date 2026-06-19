"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowCounterClockwiseIcon,
  NavigationArrowIcon,
} from "@phosphor-icons/react";
import { CHURCH_INFO } from "@/lib/constants";
import "leaflet/dist/leaflet.css";

const { NAME } = CHURCH_INFO;
const { address, coordinates } = CHURCH_INFO.CHURCH_LOCATION ?? {};
const { city = "", country = "" } = address ?? {};
const { lat, lng } = coordinates ?? {};

const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

const MARKER_HTML = `
  <div style="
    background:#ef4444;width:40px;height:40px;border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);border:3px solid white;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;
  ">
    <div style="transform:rotate(45deg);color:white;font-size:18px;font-weight:bold;">&#9962;</div>
  </div>
`;

const POPUP_HTML = `
  <div style="min-width:190px;padding:2px">
    <h3 style="font-weight:700;font-size:1.05rem;line-height:1.2;margin:0 0 4px">${NAME}</h3>
    <p style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;margin:0 0 12px">${city}, ${country}</p>
    <a href="${DIRECTIONS_URL}" target="_blank" rel="noopener noreferrer"
      style="display:flex;align-items:center;justify-content:center;gap:6px;background:#ef4444;color:#fff;font-weight:600;font-size:0.85rem;padding:8px 12px;border-radius:8px;text-decoration:none">
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

  useEffect(() => {
    let cancelled = false;

    import("leaflet").then((L) => {
      // Bail if the component unmounted before the import resolved, or a map
      // already exists for this instance.
      if (cancelled || !containerRef.current || mapRef.current) return;
      if (lat === undefined || lng === undefined) return;

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

      L.marker([lat, lng], { icon }).addTo(map).bindPopup(POPUP_HTML);
    });

    // Destroy the map on unmount so its container is released cleanly.
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleReset = () => {
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
        mapRef.current?.setView(
          [pos.coords.latitude, pos.coords.longitude],
          15
        );
      },
      (err) => {
        console.error(err);
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-1000 flex gap-4 w-max max-w-[90%]">
            <AnimatedButton
              size="sm"
              variant="default"
              text="View My Location"
              icon={<NavigationArrowIcon weight="fill" />}
              className="rounded-full shadow-lg bg-primary/90 hover:bg-primary backdrop-blur-sm shrink-0"
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