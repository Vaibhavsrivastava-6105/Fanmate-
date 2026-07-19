"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Bot } from "lucide-react";
import Link from "next/link";

// Fix for default leaflet icons in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapMarker {
  id: number;
  type: string;
  name: string;
  lat: number;
  lng: number;
  crowd: string;
  queue?: string;
}

export default function StadiumMap() {
  const [markers, setMarkers] = useState<MapMarker[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/stadium/map")
      .then(res => res.json())
      .then(data => setMarkers(data))
      .catch(() => {
        // Mock fallback
        setMarkers([
          { id: 1, type: "Seat", name: "Section 214", lat: 40.7128, lng: -74.0060, crowd: "Low" },
          { id: 2, type: "Food", name: "Food Court C", lat: 40.7130, lng: -74.0055, crowd: "Medium", queue: "5 mins" },
          { id: 3, type: "Gate", name: "Gate B", lat: 40.7125, lng: -74.0065, crowd: "Low" }
        ]);
      });
  }, []);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] shadow-[0_0_40px_rgba(0,0,0,0.3)]">
      <MapContainer 
        center={[40.7128, -74.0060]} 
        zoom={17} 
        style={{ height: "100%", width: "100%", background: "#050816" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map(marker => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]}>
            <Popup className="custom-popup">
              <div className="flex flex-col gap-2 p-1 min-w-[200px]">
                <h3 className="font-bold text-lg">{marker.name}</h3>
                <div className="text-sm">
                  <span className="text-gray-500">Type:</span> {marker.type}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Crowd:</span> {marker.crowd}
                </div>
                {marker.queue && (
                  <div className="text-sm">
                    <span className="text-gray-500">Queue:</span> <span className="text-[var(--color-accent)] font-semibold">{marker.queue}</span>
                  </div>
                )}
                <Link href="/assistant" className="mt-2 flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                  <Bot className="w-4 h-4" /> Ask AI
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
