import type { BrowserEnvironment, Logger } from './types.js';

/**
 * Simple console-based logger implementation
 */
export class ConsoleLogger implements Logger {
  private debugEnabled: boolean;

  constructor(debugEnabled = false) {
    this.debugEnabled = debugEnabled;
  }

  debug(message: string, ...args: any[]): void {
    if (this.debugEnabled) {
      console.debug(`[UAF Debug] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    console.info(`[UAF Info] ${message}`, ...args);
  }

  warn(message: string, ...args: any[]): void {
    console.warn(`[UAF Warn] ${message}`, ...args);
  }

  error(message: string, ...args: any[]): void {
    console.error(`[UAF Error] ${message}`, ...args);
  }

  setDebugEnabled(enabled: boolean): void {
    this.debugEnabled = enabled;
  }
}

/**
 * Detect the current browser environment
 */
export function detectEnvironment(): BrowserEnvironment {
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  
  if (!isBrowser) {
    return {
      isBrowser: false,
      isUserscript: false,
      isExtension: false,
    };
  }

  // Detect if running as userscript
  const isUserscript = typeof GM_info !== 'undefined' || 
                      typeof unsafeWindow !== 'undefined' ||
                      //@ts-ignore
                      typeof window.GM_info !== 'undefined';

  // Detect if running as browser extension
  const isExtension = typeof chrome !== 'undefined' && 
                     typeof chrome.runtime !== 'undefined' &&
                     typeof chrome.runtime.id !== 'undefined';

  // Detect browser and OS
  const userAgent = navigator.userAgent;
  let browserName: string | undefined;
  let browserVersion: string | undefined;
  let os: string | undefined;

  // Browser detection
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browserName = 'Chrome';
    const match = userAgent.match(/Chrome\/([0-9.]+)/);
    browserVersion = match ? match[1] : undefined;
  } else if (userAgent.includes('Firefox')) {
    browserName = 'Firefox';
    const match = userAgent.match(/Firefox\/([0-9.]+)/);
    browserVersion = match ? match[1] : undefined;
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browserName = 'Safari';
    const match = userAgent.match(/Version\/([0-9.]+)/);
    browserVersion = match ? match[1] : undefined;
  } else if (userAgent.includes('Edg')) {
    browserName = 'Edge';
    const match = userAgent.match(/Edg\/([0-9.]+)/);
    browserVersion = match ? match[1] : undefined;
  }

  // OS detection
  if (userAgent.includes('Windows')) {
    os = 'Windows';
  } else if (userAgent.includes('Mac OS X')) {
    os = 'macOS';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
  } else if (userAgent.includes('iOS')) {
    os = 'iOS';
  }

  return {
    isBrowser,
    isUserscript,
    isExtension,
    browserName,
    browserVersion,
    os,
  };
}

/**
 * Safely spoof a property on an object
 */
export function spoofProperty(
  obj: any,
  prop: string,
  valueFn: () => any,
  logger?: Logger
): boolean {
  try {
    Object.defineProperty(obj, prop, {
      get: valueFn,
      configurable: true,
      enumerable: true,
    });
    logger?.debug(`Successfully spoofed ${obj.constructor?.name || 'object'}.${prop}`);
    return true;
  } catch (error) {
    logger?.warn(`Failed to spoof ${obj.constructor?.name || 'object'}.${prop}:`, error);
    return false;
  }
}

/**
 * Generate a deterministic random value based on seed
 */
export function deterministicRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate consistent noise for fingerprinting protection
 */
export function generateNoise(seed: number, amplitude = 1): number {
  return (deterministicRandom(seed) - 0.5) * 2 * amplitude;
}

/**
 * Round a number to the nearest multiple
 */
export function roundToNearest(value: number, multiple: number): number {
  return Math.round(value / multiple) * multiple;
}

/**
 * Check if a URL contains any of the specified domains
 */
export function containsDomain(url: string, domains: string[]): boolean {
  const urlLower = url.toLowerCase();
  return domains.some(domain => urlLower.includes(domain.toLowerCase()));
}

/**
 * Deep merge two objects
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = result[key];
      
      if (
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        !Array.isArray(sourceValue) &&
        typeof targetValue === 'object' &&
        targetValue !== null &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        result[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }
  
  return result;
}

/**
 * Create a debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | undefined;
  
  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = undefined;
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}

/**
 * Create a throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generate a unique identifier
 */
export function generateId(prefix = 'uaf'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if code is running in a secure context
 */
export function isSecureContext(): boolean {
  return typeof window !== 'undefined' && 
         (window.isSecureContext || location.protocol === 'https:');
}

/**
 * Get the current timestamp in milliseconds
 */
export function getTimestamp(): number {
  return Date.now();
}

/**
 * Convert a string to a hash code
 */
export function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
}

/**
 * Create a consistent seed from multiple values
 */
export function createSeed(...values: (string | number)[]): number {
  const combined = values.join('|');
  return Math.abs(hashCode(combined));
}

/**
 * Validate if a value is within expected bounds
 */
export function validateBounds(
  value: number,
  min: number,
  max: number,
  fallback: number
): number {
  if (typeof value !== 'number' || isNaN(value)) {
    return fallback;
  }
  return Math.max(min, Math.min(max, value));
}

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelay = 100
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxAttempts) {
        throw lastError;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
    }
  }
  
  throw lastError!;
}