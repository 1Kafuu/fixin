"use client";

import { useEffect, useCallback } from "react";
import { useNetworkStatus } from "./useNetworkStatus";

const OFFLINE_QUEUE_KEY = "fixin_offline_status_queue";

interface OfflineAction {
  id: string;
  type: "status_update";
  orderId: string;
  newStatus: string;
  timestamp: number;
}

export function useOfflineSync() {
  const isOnline = useNetworkStatus();

  const saveOfflineAction = useCallback((action: Omit<OfflineAction, "id" | "timestamp">) => {
    const queue = getOfflineQueue();
    const newAction: OfflineAction = {
      ...action,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    queue.push(newAction);
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    return newAction;
  }, []);

  const getOfflineQueue = useCallback((): OfflineAction[] => {
    try {
      const stored = localStorage.getItem(OFFLINE_QUEUE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  const clearOfflineQueue = useCallback((ids: string[]) => {
    const queue = getOfflineQueue().filter((item) => !ids.includes(item.id));
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  }, [getOfflineQueue]);

  const removeFromQueue = useCallback((id: string) => {
    clearOfflineQueue([id]);
  }, [clearOfflineQueue]);

  useEffect(() => {
    if (isOnline) {
      const queue = getOfflineQueue();
      if (queue.length > 0) {
        console.log("Syncing offline actions:", queue);
      }
    }
  }, [isOnline, getOfflineQueue, clearOfflineQueue]);

  return {
    isOnline,
    saveOfflineAction,
    getOfflineQueue,
    clearOfflineQueue,
    removeFromQueue,
    pendingCount: getOfflineQueue().length,
  };
}
