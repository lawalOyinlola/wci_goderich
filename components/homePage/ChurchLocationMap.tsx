"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useMap, useMapEvent } from "react-leaflet";
import type { LeafletMouseEvent, Map as LeafletMap, DivIcon } from "leaflet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowCounterClockwiseIcon,
  NavigationArrowIcon,
} from "@phosphor-icons/react";
import { CHURCH_INFO } from "@/lib/constants";
import "leaflet/dist/leaflet.css";
import { AnimatedButton } from "../ui/animated-button";

// --- Lazy Load Components ---
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// --- Helpers ---
function MapController({ onReady }: { onReady: (m: LeafletMap) => void }) {
  const map = useMap();
  useEffect(() => {
    onReady(map);
  }, [map, onReady]);
  return null;
}

function DetectClick({
  onSelect,
}: {
  onSelect: (coords: [number, number]) => void;
}) {
  useMapEvent("click", (e: LeafletMouseEvent) => {
    onSelect([e.latlng.lat, e.latlng.lng]);
  });
  return null;
}

function ChangeCenter({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [map, position]);
  return null;
}

const { address, coordinates } = CHURCH_INFO.CHURCH_LOCATION ?? {};
const { street, city, country } = address ?? {}; // Removed unused vars
const { lat, lng } = coordinates ?? {};

export default function ChurchLocationMap() {
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  const [customIcon, setCustomIcon] = useState<DivIcon | null>(null);
  const [mapPosition, setMapPosition] = useState<[number, number]>([lat, lng]);

  // FIXED: Use a state key to force full re-render on mount
  const [mapKey, setMapKey] = useState<string | null>(null);

  // 1. Initialize logic on client mount
  useEffect(() => {
    // This generates a random key. When this runs, it forces the MapContainer
    // to discard any old DOM nodes and create a fresh one.
    setMapKey(`map-${Date.now()}`);

    // Create the icon here
    import("leaflet").then((L) => {
      const icon = L.divIcon({
        html: `
          <div style="
            background: #ef4444;
            width: 40px;
            height: 40px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-size: 18px;
              font-weight: bold;
            ">⛪</div>
          </div>
        `,
        className: "custom-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      setCustomIcon(icon);
    });
  }, []); // Empty dependency array = runs once on mount

  const handleReset = () => {
    if (mapInstance) {
      mapInstance.setView([lat, lng], 15);
      setMapPosition([lat, lng]);
    }
  };

  const handleViewMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setMapPosition(coords);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleGetDirections = () => {
    const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(directionsUrl, "_blank", "noopener,noreferrer");
  };

  // Prevent rendering until the key is generated (Client side only)
  if (!mapKey) {
    return (
      <Card className="overflow-hidden shadow-lg lg:rounded-r-none border-0">
        <CardContent className="p-0">
          <div className="relative h-100 md:h-144 flex items-center justify-center bg-gray-50">
            <div className="text-muted-foreground animate-pulse flex flex-col items-center gap-2">
              Loading Map...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-lg lg:rounded-r-none border-0 relative group">
      <CardContent className="p-0">
        <div className="relative h-100 md:h-144 w-full isolate">
          <MapContainer
            key={mapKey}
            center={mapPosition}
            zoom={15}
            scrollWheelZoom={false}
            className="z-0 h-full w-full"
          >
            <MapController onReady={setMapInstance} />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ChangeCenter position={mapPosition} />
            <DetectClick onSelect={setMapPosition} />

            {customIcon && (
              <Marker position={[lat, lng]} icon={customIcon}>
                <Popup className="custom-popup-clean">
                  <div className="min-w-[200px]">
                    <div className="bg-primary h-2 w-full -mt-px rounded-t"></div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg leading-tight mb-1">
                        {CHURCH_INFO.NAME}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wide font-medium">
                        {city}, {country}
                      </p>

                      <Button
                        onClick={handleGetDirections}
                        size="sm"
                        className="w-full font-semibold shadow-sm"
                      >
                        Get Directions
                        <NavigationArrowIcon
                          weight="bold"
                          className="rotate-90 ml-2"
                        />
                      </Button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>

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
                className="text-foreground"
              />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
