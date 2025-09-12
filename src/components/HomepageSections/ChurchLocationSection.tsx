"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, RotateCcw, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import { useMap, useMapEvent } from "react-leaflet";
import type { LeafletMouseEvent, Map as LeafletMap, DivIcon } from "leaflet";

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

// Helper to set map instance up to parent state
function SetMapInstance({ onReady }: { onReady: (m: LeafletMap) => void }) {
  const map = useMap();
  useEffect(() => {
    onReady(map);
  }, [map, onReady]);
  return null;
}

// Helper to detect clicks and update position
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

export default function ChurchLocationSection() {
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  const [customIcon, setCustomIcon] = useState<DivIcon | null>(null);
  // stateful center
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    8.4606, -13.2897,
  ]);

  // Church coordinates in Freetown, Sierra Leone
  const churchLocation = {
    lat: 8.4606,
    lng: -13.2897,
    address: "CPPG+CMJ, Freetown, Sierra Leone",
    name: "WCI Goderich - Living Faith Church Worldwide",
  };

  // Create the Leaflet icon only on the client after mount
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
      mapInstance.setView([churchLocation.lat, churchLocation.lng], 15);
    }
    setMapPosition([churchLocation.lat, churchLocation.lng]);
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
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${churchLocation.lat},${churchLocation.lng}`;
    window.open(directionsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Our <span className="text-accent">Location</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit us at our church in Freetown, Sierra Leone. We&apos;re located
            in the heart of the community, easily accessible and welcoming to
            all.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Map */}
                  <MapContainer
                    center={mapPosition}
                    zoom={15}
                    scrollWheelZoom={false}
                    className="w-full h-[400px] md:h-[500px] z-0"
                  >
                    <SetMapInstance onReady={(m) => setMapInstance(m)} />
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ChangeCenter position={mapPosition} />
                    <DetectClick onSelect={setMapPosition} />
                    {customIcon && (
                      <Marker
                        position={[churchLocation.lat, churchLocation.lng]}
                        icon={customIcon}
                      >
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-semibold text-lg mb-2">
                              {churchLocation.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                              {churchLocation.address}
                            </p>
                            <Button
                              onClick={handleGetDirections}
                              className="w-full bg-accent hover:bg-accent/90 text-sm"
                            >
                              <Navigation className="h-4 w-4 mr-2" />
                              Get Directions
                            </Button>
                          </div>
                        </Popup>
                      </Marker>
                    )}
                  </MapContainer>

                  {/* Map Controls */}
                  <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white shadow-md"
                      onClick={handleReset}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Extra actions */}
                  <div className="absolute left-4 top-4 z-[1000] flex flex-col gap-2">
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
          </div>

          {/* Church Information */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      Church Address
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {churchLocation.address}
                    </p>
                    <Button
                      onClick={handleGetDirections}
                      className="w-full bg-accent hover:bg-accent/90"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-4">Service Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Sunday Service
                    </span>
                    <span className="font-medium">8:30 AM - 11:30 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Prayer Meeting
                    </span>
                    <span className="font-medium">6:00 PM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bible Study</span>
                    <span className="font-medium">7:00 PM - 8:00 PM</span>
                  </div>
                </div>{" "}
                <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-2 rounded-full">
                      <MapPin className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Freetown, Sierra Leone
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-2 rounded-full">
                      <Navigation className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Easily accessible by public transport
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
