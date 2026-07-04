"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseApiTimeoutOptions<T> {
  fetchFn: () => Promise<T>;
  timeoutMs?: number;
  onTimeout?: () => void;
}

interface UseApiTimeoutResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isTimedOut: boolean;
  refetch: () => void;
}

export function useApiTimeout<T>({
  fetchFn,
  timeoutMs = 10000,
  onTimeout,
}: UseApiTimeoutOptions<T>): UseApiTimeoutResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const executeFetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsTimedOut(false);

    timeoutRef.current = setTimeout(() => {
      setIsTimedOut(true);
      setIsLoading(false);
      onTimeout?.();
    }, timeoutMs);

    try {
      const result = await fetchFn();
      clearTimeout(timeoutRef.current);
      setData(result);
    } catch (err) {
      clearTimeout(timeoutRef.current);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, timeoutMs, onTimeout]);

  useEffect(() => {
    executeFetch();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [executeFetch]);

  return {
    data,
    isLoading,
    error,
    isTimedOut,
    refetch: executeFetch,
  };
}
