// hooks/useCountdownTimer.ts
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseCountdownTimerOptions {
  initialSeconds: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

interface UseCountdownTimerReturn {
  seconds: number;
  isRunning: boolean;
  isExpired: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setSeconds: (seconds: number) => void;
}

export function useCountdownTimer({
  initialSeconds,
  onComplete,
  autoStart = false,
}: UseCountdownTimerOptions): UseCountdownTimerReturn {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsExpired(false);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setSeconds(initialSeconds);
    setIsRunning(false);
    setIsExpired(false);
  }, [initialSeconds, clearTimer]);

  const setSecondsHandler = useCallback((newSeconds: number) => {
    setSeconds(newSeconds);
    setIsExpired(false);
  }, []);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsExpired(true);
            clearTimer();
            onCompleteRef.current?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return clearTimer;
  }, [isRunning, seconds, clearTimer]);

  return {
    seconds,
    isRunning,
    isExpired,
    start,
    pause,
    reset,
    setSeconds: setSecondsHandler,
  };
}

export function formatCountdown(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
