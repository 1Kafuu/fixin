// components/customer/LocationPicker.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MapPin, Navigation, AlertCircle } from "lucide-react";
import { useGeolocation, calculateDistanceBetween } from "@/hooks/useGeolocation";
import { Button } from "@/components/ui/button";

export interface LocationPickerProps {
  label?: string;
  error?: string;
  hint?: string;
  value?: { address: string; coordinates: { lat: number; lng: number } | null };
  onChange?: (location: { address: string; coordinates: { lat: number; lng: number } | null }) => void;
  storeLocation?: { lat: number; lng: number };
  maxRadius?: number;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
}

export function LocationPicker({
  label, error, hint, value, onChange, storeLocation = { lat: -6.2088, lng: 106.8456 }, maxRadius = 25, disabled, required, id, className
}: LocationPickerProps) {
  const pickerId = id ?? React.useId();
  const [address, setAddress] = React.useState(value?.address ?? "");
  const [coordinates, setCoordinates] = React.useState(value?.coordinates ?? null);
  const [distanceError, setDistanceError] = React.useState<string | null>(null);
  const { getCurrentPosition, isLoading, isSupported } = useGeolocation();

  React.useEffect(() => {
    if (coordinates && storeLocation) {
      const distance = calculateDistanceBetween(coordinates, storeLocation);
      if (distance > maxRadius) {
        setDistanceError(`Maaf, alamat Anda di luar jangkauan kurir pickup kami (${maxRadius}km)`);
      } else {
        setDistanceError(null);
      }
    }
  }, [coordinates, storeLocation, maxRadius]);

  const handleUseCurrentLocation = async () => {
    try {
      const coords = await getCurrentPosition();
      setCoordinates(coords);
      setAddress(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
      onChange?.({ address: `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`, coordinates: coords });
    } catch (err) {
      console.error("Failed to get location:", err);
    }
  };

  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    onChange?.({ address: newAddress, coordinates });
  };

  const displayError = error || distanceError;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={pickerId} className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}
      <div className="space-y-2">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><MapPin className="h-4 w-4" /></div>
          <input
            id={pickerId}
            type="text"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder="Masukkan alamat lengkap..."
            disabled={disabled}
            required={required}
            className={cn("flex h-10 w-full rounded-md border bg-background pl-10 pr-3 py-2 text-sm", "placeholder:text-muted-foreground", "focus:outline-none focus:ring-2 focus:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", displayError && "border-destructive", className)}
          />
        </div>
        {isSupported && !disabled && (
          <Button type="button" variant="outline" size="sm" onClick={handleUseCurrentLocation} disabled={isLoading} className="w-full">
            <Navigation className="h-4 w-4 mr-2" />
            {isLoading ? "Mendeteksi lokasi..." : "Gunakan lokasi saat ini"}
          </Button>
        )}
        {coordinates && <p className="text-xs text-muted-foreground">Koordinat: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}</p>}
      </div>
      {displayError && <p className="flex items-center gap-1 text-sm text-destructive"><AlertCircle className="h-3.5 w-3.5" />{displayError}</p>}
      {hint && !displayError && <p className="text-sm text-muted-foreground">{hint}</p>}
    </div>
  );
}
