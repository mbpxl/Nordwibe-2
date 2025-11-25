// hooks/useImageCache.ts
import { useState, useEffect } from "react";

interface CacheEntry {
  src: string;
  timestamp: number;
}

const CACHE_KEY = "image-cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 часа

export const useImageCache = () => {
  const [cache, setCache] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    // Загружаем кэш из localStorage
    try {
      const stored = localStorage.getItem(CACHE_KEY);
      if (stored) {
        const entries: CacheEntry[] = JSON.parse(stored);
        const validEntries = entries.filter(
          (entry) => Date.now() - entry.timestamp < CACHE_DURATION
        );

        const newCache = new Map();
        validEntries.forEach((entry) => {
          newCache.set(entry.src, entry.src);
        });

        setCache(newCache);

        // Сохраняем очищенный кэш
        localStorage.setItem(CACHE_KEY, JSON.stringify(validEntries));
      }
    } catch (error) {
      console.warn("Failed to load image cache:", error);
    }
  }, []);

  const addToCache = (src: string) => {
    try {
      const cached = cache.get(src);
      if (!cached) {
        const newCache = new Map(cache);
        newCache.set(src, src);
        setCache(newCache);

        // Сохраняем в localStorage
        const entries: CacheEntry[] = Array.from(newCache.entries()).map(
          ([key]) => ({ src: key, timestamp: Date.now() })
        );
        localStorage.setItem(CACHE_KEY, JSON.stringify(entries));
      }
    } catch (error) {
      console.warn("Failed to save to image cache:", error);
    }
  };

  const getFromCache = (src: string): string | null => {
    return cache.get(src) || null;
  };

  return { addToCache, getFromCache };
};
