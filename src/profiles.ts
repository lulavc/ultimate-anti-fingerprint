import type { UserAgentProfile } from './types.js';

/**
 * Predefined user agent profiles for different browsers and operating systems
 */
export const profiles: Record<string, UserAgentProfile> = {
  chrome_win10: {
    id: 'Chrome 120 - Windows 10',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    platform: 'Win32',
    language: 'en-US',
    screenWidth: 1920,
    screenHeight: 1080,
    cores: 8,
    memory: 8,
    timezone: 'America/New_York',
    webglVendor: 'Google Inc.',
    webglRenderer: 'ANGLE (NVIDIA GeForce GTX 1660 Ti Direct3D11 vs_5_0 ps_5_0)',
    colorDepth: 24,
    devicePixelRatio: 1,
    vendor: 'Google Inc.',
    productSub: '20030107',
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    appName: 'Netscape',
    doNotTrack: '1',
    maxTouchPoints: 0,
    plugins: [
      { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
      { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '' },
      { name: 'Native Client', filename: 'internal-nacl-plugin', description: '' }
    ]
  },

  chrome_win11: {
    id: 'Chrome 121 - Windows 11',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    platform: 'Win32',
    language: 'en-US',
    screenWidth: 1920,
    screenHeight: 1080,
    cores: 12,
    memory: 16,
    timezone: 'America/New_York',
    webglVendor: 'Google Inc.',
    webglRenderer: 'ANGLE (NVIDIA GeForce RTX 3070 Direct3D11 vs_5_0 ps_5_0)',
    colorDepth: 24,
    devicePixelRatio: 1,
    vendor: 'Google Inc.',
    productSub: '20030107',
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    appName: 'Netscape',
    doNotTrack: '1',
    maxTouchPoints: 0,
    plugins: [
      { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
      { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '' },
      { name: 'Native Client', filename: 'internal-nacl-plugin', description: '' }
    ]
  },

  firefox_win10: {
    id: 'Firefox 122 - Windows 10',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
    platform: 'Win32',
    language: 'en-US',
    screenWidth: 1920,
    screenHeight: 1080,
    cores: 8,
    memory: 8,
    timezone: 'America/New_York',
    webglVendor: 'Mozilla',
    webglRenderer: 'Mozilla -- ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 Ti Direct3D11 vs_5_0 ps_5_0, D3D11)',
    colorDepth: 24,
    devicePixelRatio: 1,
    vendor: '',
    productSub: '20100101',
    appVersion: '5.0 (Windows)',
    appName: 'Netscape',
    doNotTrack: 'unspecified',
    maxTouchPoints: 0,
    plugins: []
  },

  safari_macos: {
    id: 'Safari 17 - macOS Sonoma',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15',
    platform: 'MacIntel',
    language: 'en-US',
    screenWidth: 2560,
    screenHeight: 1440,
    cores: 8,
    memory: 16,
    timezone: 'America/Los_Angeles',
    webglVendor: 'Apple Inc.',
    webglRenderer: 'Apple GPU',
    colorDepth: 24,
    devicePixelRatio: 2,
    vendor: 'Apple Computer, Inc.',
    productSub: '20030107',
    appVersion: '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15',
    appName: 'Netscape',
    doNotTrack: 'unspecified',
    maxTouchPoints: 0,
    plugins: [
      { name: 'PDF', filename: 'internal-pdf-viewer', description: 'Portable Document Format' }
    ]
  },

  edge_win10: {
    id: 'Edge 120 - Windows 10',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    platform: 'Win32',
    language: 'en-US',
    screenWidth: 1920,
    screenHeight: 1080,
    cores: 8,
    memory: 8,
    timezone: 'America/New_York',
    webglVendor: 'Google Inc.',
    webglRenderer: 'ANGLE (NVIDIA GeForce GTX 1660 Ti Direct3D11 vs_5_0 ps_5_0)',
    colorDepth: 24,
    devicePixelRatio: 1,
    vendor: 'Google Inc.',
    productSub: '20030107',
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    appName: 'Netscape',
    doNotTrack: '1',
    maxTouchPoints: 0,
    plugins: [
      { name: 'Microsoft Edge PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
      { name: 'Microsoft Edge PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '' }
    ]
  },

  chrome_linux: {
    id: 'Chrome 120 - Ubuntu Linux',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    platform: 'Linux x86_64',
    language: 'en-US',
    screenWidth: 1920,
    screenHeight: 1080,
    cores: 8,
    memory: 8,
    timezone: 'America/New_York',
    webglVendor: 'Google Inc.',
    webglRenderer: 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 Ti OpenGL 4.6.0, OpenGL)',
    colorDepth: 24,
    devicePixelRatio: 1,
    vendor: 'Google Inc.',
    productSub: '20030107',
    appVersion: '5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    appName: 'Netscape',
    doNotTrack: '1',
    maxTouchPoints: 0,
    plugins: [
      { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
      { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '' }
    ]
  },

  firefox_linux: {
    id: 'Firefox 122 - Ubuntu Linux',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0',
    platform: 'Linux x86_64',
    language: 'en-US',
    screenWidth: 1920,
    screenHeight: 1080,
    cores: 8,
    memory: 8,
    timezone: 'America/New_York',
    webglVendor: 'Mozilla',
    webglRenderer: 'Mozilla -- NVIDIA GeForce GTX 1660 Ti/PCIe/SSE2',
    colorDepth: 24,
    devicePixelRatio: 1,
    vendor: '',
    productSub: '20100101',
    appVersion: '5.0 (X11)',
    appName: 'Netscape',
    doNotTrack: 'unspecified',
    maxTouchPoints: 0,
    plugins: []
  }
};

/**
 * Common screen resolutions with their usage statistics
 */
export const commonResolutions = [
  { width: 1920, height: 1080, usage: 23.8 }, // Full HD
  { width: 1366, height: 768, usage: 15.6 },  // HD
  { width: 1536, height: 864, usage: 7.3 },   // HD+
  { width: 1440, height: 900, usage: 6.8 },   // WXGA+
  { width: 1280, height: 720, usage: 5.2 },   // HD
  { width: 2560, height: 1440, usage: 4.9 },  // QHD
  { width: 1600, height: 900, usage: 3.8 },   // HD+
  { width: 1280, height: 1024, usage: 3.2 },  // SXGA
  { width: 1024, height: 768, usage: 2.1 },   // XGA
  { width: 3840, height: 2160, usage: 1.8 }   // 4K UHD
];

/**
 * Common Windows fonts that should be available
 */
export const windowsFonts = [
  'Arial', 'Arial Black', 'Calibri', 'Cambria', 'Cambria Math', 
  'Comic Sans MS', 'Consolas', 'Courier New', 'Georgia', 'Impact', 
  'Lucida Console', 'Lucida Sans Unicode', 'Microsoft Sans Serif', 
  'Palatino Linotype', 'Segoe UI', 'Tahoma', 'Times New Roman', 
  'Trebuchet MS', 'Verdana', 'Symbol', 'Wingdings'
];

/**
 * Common macOS fonts
 */
export const macOSFonts = [
  'Arial', 'Arial Black', 'Helvetica', 'Helvetica Neue', 'Times', 
  'Times New Roman', 'Courier', 'Courier New', 'Verdana', 'Georgia', 
  'Palatino', 'Menlo', 'Monaco', 'San Francisco', 'Avenir', 
  'Futura', 'Gill Sans', 'Optima', 'Trebuchet MS'
];

/**
 * Common Linux fonts
 */
export const linuxFonts = [
  'Arial', 'Helvetica', 'Times', 'Times New Roman', 'Courier', 
  'Courier New', 'Verdana', 'Georgia', 'DejaVu Sans', 'DejaVu Serif', 
  'DejaVu Sans Mono', 'Liberation Sans', 'Liberation Serif', 
  'Liberation Mono', 'Ubuntu', 'Noto Sans', 'Roboto'
];

/**
 * Get a profile by ID
 */
export function getProfile(id: string): UserAgentProfile | undefined {
  return profiles[id];
}

/**
 * Get all available profile IDs
 */
export function getProfileIds(): string[] {
  return Object.keys(profiles);
}

/**
 * Get a random profile
 */
export function getRandomProfile(): UserAgentProfile {
  const ids = getProfileIds();
  const randomId = ids[Math.floor(Math.random() * ids.length)];
  return profiles[randomId];
}

/**
 * Get profiles for a specific platform
 */
export function getProfilesForPlatform(platform: 'windows' | 'macos' | 'linux'): UserAgentProfile[] {
  return Object.values(profiles).filter(profile => {
    switch (platform) {
      case 'windows':
        return profile.platform === 'Win32';
      case 'macos':
        return profile.platform === 'MacIntel';
      case 'linux':
        return profile.platform === 'Linux x86_64';
      default:
        return false;
    }
  });
}

/**
 * Get fonts for a specific platform
 */
export function getFontsForPlatform(platform: 'windows' | 'macos' | 'linux'): string[] {
  switch (platform) {
    case 'windows':
      return windowsFonts;
    case 'macos':
      return macOSFonts;
    case 'linux':
      return linuxFonts;
    default:
      return windowsFonts; // Default to Windows fonts
  }
}

/**
 * Get a weighted random screen resolution
 */
export function getRandomResolution(): { width: number; height: number } {
  // Create weighted array based on usage statistics
  const weightedResolutions: { width: number; height: number }[] = [];
  
  for (const resolution of commonResolutions) {
    const weight = Math.ceil(resolution.usage);
    for (let i = 0; i < weight; i++) {
      weightedResolutions.push({ width: resolution.width, height: resolution.height });
    }
  }
  
  const randomIndex = Math.floor(Math.random() * weightedResolutions.length);
  return weightedResolutions[randomIndex];
}

/**
 * Create a custom profile based on detected environment
 */
export function createCustomProfile(
  baseProfile: UserAgentProfile,
  overrides: Partial<UserAgentProfile>
): UserAgentProfile {
  return {
    ...baseProfile,
    ...overrides,
    plugins: overrides.plugins || baseProfile.plugins
  };
}

/**
 * Default profile (most common configuration)
 */
export const defaultProfile = profiles.chrome_win10;