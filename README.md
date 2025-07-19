# Ultimate Anti-Fingerprint

A comprehensive anti-fingerprinting solution designed to protect user privacy and prevent browser fingerprinting attacks.

## Chrome Extension

For a complete browser-based solution, check out our Chrome extension: **[Incognito Fingerprint](https://github.com/lulavc/incognito-fingerprint)**

## GreasyFork Userscript

For easy installation as a browser userscript, install from: **[Ultimate Anti-Fingerprint on GreasyFork](https://greasyfork.org/en/scripts/543036-ultimate-anti-fingerprint)**

This JavaScript library provides the core anti-fingerprinting functionality that can be integrated into any web application.

## Features

- **Canvas Fingerprinting Protection**: Prevents canvas-based fingerprinting
- **Audio Fingerprinting Protection**: Blocks audio context fingerprinting
- **WebGL Fingerprinting Protection**: Protects against WebGL-based tracking
- **Font Fingerprinting Protection**: Prevents font enumeration attacks
- **Screen Resolution Protection**: Masks screen resolution and color depth
- **Time Zone Protection**: Prevents timezone-based fingerprinting
- **Language Protection**: Masks language preferences
- **User Agent Protection**: Randomizes user agent strings
- **Hardware Concurrency Protection**: Masks CPU core count
- **Memory Protection**: Masks device memory information

## Installation

### Chrome Extension

For the easiest setup, install our Chrome extension: **[Incognito Fingerprint](https://github.com/lulavc/incognito-fingerprint)**

### GreasyFork Userscript

For automatic installation and updates, install from: **[Ultimate Anti-Fingerprint on GreasyFork](https://greasyfork.org/en/scripts/543036-ultimate-anti-fingerprint)**

### Direct Script Inclusion

1. Download `ultimate-anti-fingerprint.js`
2. Include it in your HTML:
```html
<script src="ultimate-anti-fingerprint.js"></script>
```

### NPM Package

```bash
npm install ultimate-anti-fingerprint
```

## Usage

### Browser Extension

The extension automatically activates when installed and protects against fingerprinting attacks.

### JavaScript Library

```javascript
import { AntiFingerprint } from 'ultimate-anti-fingerprint';

// Initialize protection
const protection = new AntiFingerprint();

// Enable all protections
protection.enable();

// Or enable specific protections
protection.enableCanvasProtection();
protection.enableAudioProtection();
protection.enableWebGLProtection();
```

## Configuration

You can customize the protection level and behavior:

```javascript
const protection = new AntiFingerprint({
  canvasProtection: true,
  audioProtection: true,
  webglProtection: true,
  fontProtection: true,
  screenProtection: true,
  timezoneProtection: true,
  languageProtection: true,
  userAgentProtection: true,
  hardwareProtection: true,
  memoryProtection: true
});
```

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Security

This project is designed to protect user privacy. Please report any security vulnerabilities to the maintainers.

## Acknowledgments

- Inspired by various anti-fingerprinting research and tools
- Built with modern web standards and best practices 