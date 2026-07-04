// hooks/useGeolocation.ts
"use client";

import { useState, useCallback } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface UseGeolocationReturn {
  coordinates: Coordinates | null;
  error: GeolocationPositionError | null;
  isLoading: boolean;
  isSupported: boolean;
  getCurrentPosition: () => Promise<Coordinates>;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function calculateDistanceBetween(
  from: Coordinates,
  to: Coordinates
): number {
  const R = 6371;
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useGeolocation(): UseGeolocationReturn {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isSupported = typeof window !== "undefined" && "geolocation" in navigator;

  const getCurrentPosition = useCallback((): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (!isSupported) {
        const err = new Error("Geolocation not supported") as GeolocationPositionError;
        err.code = 2;
        reject(err);
        return;
      }

      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(coords);
          setIsLoading(false);
          resolve(coords);
        },
        (err) => {
          setError(err);
          setIsLoading(false);
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }, [isSupported]);

  return {
    coordinates,
    error,
    isLoading,
    isSupported,
    getCurrentPosition,
  };
}
