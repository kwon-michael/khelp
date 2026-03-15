'use client';

import { useState, useCallback, useEffect } from 'react';

/**
 * Persistent storage hook using localStorage.
 * Falls back gracefully if localStorage is unavailable.
 * Avoids hydration mismatch by initializing with defaultValue,
 * then syncing from localStorage after mount.
 *
 * Usage:
 *   const [value, setValue] = useStorage('my-key', defaultValue);
 */
export function useStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);

  // Sync from localStorage after hydration
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      try {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
      return valueToStore;
    });
  }, [key]);

  return [storedValue, setValue];
}
