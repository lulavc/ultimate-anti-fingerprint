/**
 * Configuration options for the Ultimate Anti-Fingerprint library
 */
export interface AntiFingerprinterConfig {
  /** Enable canvas fingerprinting protection */
  canvasProtection?: boolean;
  /** Enable audio context fingerprinting protection */
  audioProtection?: boolean;
  /** Enable WebGL fingerprinting protection */
  webglProtection?: boolean;
  /** Enable font fingerprinting protection */
  fontProtection?: boolean;
  /** Enable screen resolution protection */
  screenProtection?: boolean;
  /** Enable timezone fingerprinting protection */
  timezoneProtection?: boolean;
  /** Enable language fingerprinting protection */
  languageProtection?: boolean;
  /** Enable user agent fingerprinting protection */
  userAgentProtection?: boolean;
  /** Enable hardware concurrency protection */
  hardwareProtection?: boolean;
  /** Enable device memory protection */
  memoryProtection?: boolean;
  /** Enable battery API protection */
  batteryProtection?: boolean;
  /** Enable connection API protection */
  connectionProtection?: boolean;
  /** Enable permissions API protection */
  permissionsProtection?: boolean;
  /** Enable media devices protection */
  mediaDevicesProtection?: boolean;
  /** Enable storage API protection */
  storageProtection?: boolean;
  /** Enable tracking protection */
  trackingProtection?: boolean;
  /** Enable paranoid mode for maximum protection */
  paranoidMode?: boolean;
  /** Round screen dimensions to nearest 100 */
  roundScreen?: boolean;
  /** Randomize font measurements */
  fontRandomize?: boolean;
  /** Randomize canvas text rendering */
  canvasTextRandomize?: boolean;
  /** Custom user agent profile */
  profile?: UserAgentProfile;
  /** Custom blocked tracker domains */
  blockedDomains?: string[];
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * User agent profile for spoofing browser characteristics
 */
export interface UserAgentProfile {
  /** Profile identifier */
  id: string;
  /** User agent string */
  userAgent: string;
  /** Platform string */
  platform: string;
  /** Primary language */
  language: string;
  /** Screen width */
  screenWidth: number;
  /** Screen height */
  screenHeight: number;
  /** CPU core count */
  cores: number;
  /** Device memory in GB */
  memory: number;
  /** Timezone identifier */
  timezone: string;
  /** WebGL vendor string */
  webglVendor: string;
  /** WebGL renderer string */
  webglRenderer: string;
  /** Color depth */
  colorDepth: number;
  /** Device pixel ratio */
  devicePixelRatio: number;
  /** Browser vendor */
  vendor: string;
  /** Product sub string */
  productSub: string;
  /** App version */
  appVersion: string;
  /** App name */
  appName: string;
  /** Do not track setting */
  doNotTrack: string;
  /** Maximum touch points */
  maxTouchPoints: number;
  /** Browser plugins */
  plugins: PluginInfo[];
}

/**
 * Plugin information for browser spoofing
 */
export interface PluginInfo {
  /** Plugin name */
  name: string;
  /** Plugin filename */
  filename: string;
  /** Plugin description */
  description: string;
}

/**
 * Protection status for each feature
 */
export interface ProtectionStatus {
  /** Canvas protection status */
  canvas: boolean;
  /** Audio protection status */
  audio: boolean;
  /** WebGL protection status */
  webgl: boolean;
  /** Font protection status */
  font: boolean;
  /** Screen protection status */
  screen: boolean;
  /** Timezone protection status */
  timezone: boolean;
  /** Language protection status */
  language: boolean;
  /** User agent protection status */
  userAgent: boolean;
  /** Hardware protection status */
  hardware: boolean;
  /** Memory protection status */
  memory: boolean;
  /** Battery protection status */
  battery: boolean;
  /** Connection protection status */
  connection: boolean;
  /** Permissions protection status */
  permissions: boolean;
  /** Media devices protection status */
  mediaDevices: boolean;
  /** Storage protection status */
  storage: boolean;
  /** Tracking protection status */
  tracking: boolean;
}

/**
 * Event types for the anti-fingerprinter
 */
export type AntiFingerprinterEvent = 
  | 'protection-enabled'
  | 'protection-disabled'
  | 'tracker-blocked'
  | 'fingerprint-attempt'
  | 'config-changed';

/**
 * Event listener function type
 */
export type EventListener = (event: AntiFingerprinterEventData) => void;

/**
 * Event data structure
 */
export interface AntiFingerprinterEventData {
  /** Event type */
  type: AntiFingerprinterEvent;
  /** Event timestamp */
  timestamp: number;
  /** Event data */
  data?: any;
  /** Protection type that triggered the event */
  protection?: keyof ProtectionStatus;
}

/**
 * Logger interface
 */
export interface Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

/**
 * Fingerprinting detection result
 */
export interface FingerprintDetection {
  /** Detection type */
  type: 'canvas' | 'audio' | 'webgl' | 'font' | 'screen' | 'other';
  /** Detection method */
  method: string;
  /** Detection timestamp */
  timestamp: number;
  /** Whether the attempt was blocked */
  blocked: boolean;
  /** Additional details */
  details?: Record<string, any>;
}

/**
 * Browser environment detection
 */
export interface BrowserEnvironment {
  /** Is running in browser */
  isBrowser: boolean;
  /** Is running as userscript */
  isUserscript: boolean;
  /** Is running as extension */
  isExtension: boolean;
  /** Browser name */
  browserName?: string;
  /** Browser version */
  browserVersion?: string;
  /** Operating system */
  os?: string;
}