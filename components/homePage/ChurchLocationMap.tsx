"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useMap, useMapEvent } from "react-leaflet";
import type { LeafletMouseEvent, Map as LeafletMap, DivIcon } from "leaflet";
import { CHURCH_LOCATION } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowCounterClockwiseIcon,
  NavigationArrowIcon,
} from "@phosphor-icons/react";

// Dynamically import the map components to avoid SSR issues
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

function ChangeCenter({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [map, position]);
  return null;
}

function SetMapInstance({ onReady }: { onReady: (m: LeafletMap) => void }) {
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

export default function ChurchLocationMap() {
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  const [customIcon, setCustomIcon] = useState<DivIcon | null>(null);
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    CHURCH_LOCATION.coordinates.lat,
    CHURCH_LOCATION.coordinates.lng,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let L: typeof import("leaflet") | undefined = (
      window as Window & { L?: typeof import("leaflet") }
    ).L;
    const ensureIcon = async () => {
      if (!L) {
        const mod = await import("leaflet");
        L = mod;
      }
      const icon = L!.divIcon({
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
    };
    void ensureIcon();
  }, []);

  const handleReset = () => {
    if (mapInstance) {
      mapInstance.setView(
        [CHURCH_LOCATION.coordinates.lat, CHURCH_LOCATION.coordinates.lng],
        15
      );
    }
    setMapPosition([
      CHURCH_LOCATION.coordinates.lat,
      CHURCH_LOCATION.coordinates.lng,
    ]);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setMapPosition(coords);
        if (mapInstance) {
          mapInstance.setView(coords, 15);
        }
      },
      () => {
        // silently ignore for now
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleGetDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${CHURCH_LOCATION.coordinates.lat},${CHURCH_LOCATION.coordinates.lng}`;
    window.open(directionsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="relative h-100 md:h-144">
          <MapContainer center={mapPosition} zoom={15} scrollWheelZoom={false}>
            <SetMapInstance onReady={(m) => setMapInstance(m)} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ChangeCenter position={mapPosition} />
            <DetectClick onSelect={setMapPosition} />
            {customIcon && (
              <Marker
                position={[
                  CHURCH_LOCATION.coordinates.lat,
                  CHURCH_LOCATION.coordinates.lng,
                ]}
                icon={customIcon}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-lg mb-2">
                      {CHURCH_LOCATION.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {CHURCH_LOCATION.address}
                    </p>
                    <Button
                      onClick={handleGetDirections}
                      className="w-full bg-accent hover:bg-accent/90 text-sm"
                    >
                      Get Directions
                      <NavigationArrowIcon
                        weight="bold"
                        size={16}
                        className="rotate-90 ml-2"
                      />
                    </Button>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>

          <div className="absolute left-16 top-4 z-50 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/90 hover:bg-white shadow-md h-10 w-10"
              onClick={handleReset}
              aria-label="Reset map view"
            >
              <ArrowCounterClockwiseIcon weight="bold" size={20} />
            </Button>
          </div>

          <div className="absolute left-4 bottom-4 z-50 flex flex-col gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white shadow"
              onClick={handleUseMyLocation}
            >
              Use My Location
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
