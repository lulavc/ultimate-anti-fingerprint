# Ultimate Anti-Fingerprint v2.0

A comprehensive and enhanced anti-fingerprinting solution designed to protect user privacy and prevent browser fingerprinting attacks. Now with improved stealth techniques, better compatibility, and advanced protection features.

## 🚀 What's New in v2.0

- **Enhanced Modular Architecture**: Better organized code with dedicated protection modules
- **Improved Stealth Mode**: More sophisticated techniques that are harder to detect
- **Advanced Canvas Protection**: Multiple protection strategies (Paranoid & Stealth modes)
- **Better Error Handling**: Robust protection against edge cases and failures
- **Enhanced Tracking Protection**: Expanded blocklist with 100+ tracking domains
- **Configurable Options**: Easy-to-adjust settings for different protection levels
- **Performance Optimizations**: Faster execution with reduced overhead
- **Better Logging**: Comprehensive debug mode for troubleshooting

## 📦 Installation Options

### Tampermonkey/Greasemonkey Userscript (Recommended)

For easy installation as a browser userscript, install from: **[Ultimate Anti-Fingerprint on GreasyFork](https://greasyfork.org/en/scripts/543036-ultimate-anti-fingerprint)**

Or install the enhanced v2.0 version directly: `ultimate-anti-fingerprint-v2.js`

### Chrome Extension

For a complete browser-based solution, check out our Chrome extension: **[Incognito Fingerprint](https://github.com/lulavc/incognito-fingerprint)**

### Direct Integration

This JavaScript library provides the core anti-fingerprinting functionality that can be integrated into any web application.

## 🛡️ Protection Features

### Core Fingerprinting Protection
- **Advanced Canvas Protection**: Multiple strategies with Paranoid & Stealth modes
- **Enhanced Audio Context Protection**: Sophisticated audio fingerprinting prevention
- **WebGL Fingerprinting Protection**: Comprehensive WebGL parameter spoofing
- **Font Fingerprinting Protection**: Advanced font enumeration resistance
- **Screen Resolution Protection**: Smart screen dimension masking
- **Hardware Fingerprinting Protection**: CPU cores, memory, and device info spoofing

### Identity Protection
- **User Agent Spoofing**: Realistic Chrome/Windows profile simulation
- **Navigator Properties**: Complete navigator object protection
- **Timezone Protection**: Advanced timezone spoofing with Intl API support
- **Language Protection**: Consistent language preference masking
- **Platform Detection**: Operating system and browser spoofing

### Privacy & Tracking Protection
- **Enhanced Tracker Blocking**: 100+ tracking domains blocked (Google, Facebook, etc.)
- **Cookie Protection**: SameSite enforcement and third-party blocking
- **API Protection Suite**: Battery, Connection, Permissions, Media Devices APIs
- **Storage Protection**: Storage estimation and quota spoofing
- **Beacon Blocking**: sendBeacon and similar tracking methods blocked

### Advanced Features
- **Stealth Mode**: Sophisticated techniques harder to detect
- **Paranoid Mode**: Maximum protection for high-security needs  
- **Configurable Settings**: Easy customization of protection levels
- **Debug Mode**: Comprehensive logging for troubleshooting
- **Performance Optimized**: Minimal impact on browsing experience

## ⚙️ Configuration

The v2.0 userscript includes configurable options at the top of the script:

```javascript
const CONFIG = {
    PARANOID_MODE: true,        // Maximum protection (may break some sites)
    STEALTH_MODE: true,         // Enhanced stealth techniques
    DEBUG_MODE: false,          // Enable debug logging
    ROUND_SCREEN: false,        // Round screen dimensions
    FONT_RANDOMIZE: true,       // Randomize font measurements
    CANVAS_RANDOMIZE: true,     // Randomize canvas operations
    BLOCK_TRACKERS: true,       // Block tracking requests
    SPOOF_TIMEZONE: true,       // Spoof timezone
    PROTECT_BATTERY: true,      // Protect battery API
    PROTECT_CONNECTION: true,   // Protect connection API
    PROTECT_PERMISSIONS: true,  // Protect permissions API
    PROTECT_MEDIA: true,        // Protect media devices
    PROTECT_STORAGE: true       // Protect storage estimation
};
```

### Protection Modes

- **Paranoid Mode**: Maximum protection with blank canvas returns (may break some sites)
- **Stealth Mode**: Sophisticated protection with better compatibility
- **Debug Mode**: Enable console logging to monitor protection activity

## 📋 Setup Instructions

### For Tampermonkey Users

1. Install [Tampermonkey](https://tampermonkey.net/) browser extension
2. Install the userscript from GreasyFork or copy `ultimate-anti-fingerprint-v2.js`
3. **Important**: Use a User-Agent Switcher extension to match HTTP headers:
   - User-Agent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`
   - Accept-Language: `en-US,en;q=0.9`

### Why User-Agent Switcher is Important

The script protects JavaScript-based fingerprinting, but HTTP headers are sent by the browser before JavaScript runs. Without matching User-Agent headers, you may still be uniquely identifiable despite JavaScript protection.

## 🔧 Testing Your Protection

After installing, you can test the effectiveness using these fingerprinting test sites:

- [AmIUnique.org](https://amiunique.org/) - Comprehensive fingerprinting test
- [Panopticlick](https://panopticlick.eff.org/) - EFF's fingerprinting test
- [BrowserLeaks](https://browserleaks.com/) - Multiple fingerprinting tests
- [Canvas Fingerprint Test](https://browserleaks.com/canvas) - Canvas-specific test
- [WebGL Fingerprint Test](https://browserleaks.com/webgl) - WebGL-specific test

### What to Expect

With proper configuration, you should see:
- ✅ **Canvas**: Consistent/blocked fingerprint across sessions
- ✅ **WebGL**: Spoofed renderer and vendor information  
- ✅ **Audio**: Consistent audio context properties
- ✅ **Fonts**: Limited to common Windows fonts
- ✅ **Screen**: Consistent resolution and color depth
- ✅ **Navigator**: Chrome 120 on Windows 10 profile
- ✅ **Timezone**: America/New_York (EST)

## 🐛 Troubleshooting

### Sites Not Working Properly?

1. Try disabling `PARANOID_MODE` (set to `false`)
2. Disable specific protections that might interfere
3. Enable `DEBUG_MODE` to see what's being blocked
4. Check browser console for errors

### Still Being Fingerprinted?

1. Ensure User-Agent Switcher is properly configured
2. Check if you have other extensions that might leak info
3. Verify your browser's HTTP headers match the spoofed profile
4. Consider using additional privacy tools (VPN, etc.)

## 🤝 Contributing

We welcome contributions to improve the Ultimate Anti-Fingerprint script! Here's how you can help:

### Ways to Contribute

1. **Report Issues**: Found a bug or compatibility issue? [Open an issue](https://github.com/lulavc/ultimate-anti-fingerprint/issues)
2. **Suggest Features**: Have ideas for new protection techniques? We'd love to hear them!
3. **Improve Code**: Submit pull requests with enhancements or bug fixes
4. **Update Blocklists**: Help expand the tracking domain blocklist
5. **Documentation**: Improve setup guides and troubleshooting docs

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes to the userscript
4. Test thoroughly on multiple sites
5. Update documentation if needed
6. Submit a pull request

### Testing Changes

When modifying the script:
1. Test on fingerprinting test sites (AmIUnique, BrowserLeaks, etc.)
2. Verify compatibility with popular websites
3. Check console for errors when `DEBUG_MODE` is enabled
4. Test both Paranoid and Stealth modes

## ⚠️ Important Notes

- **Browser Updates**: Fingerprinting techniques evolve constantly. Keep the script updated!
- **Perfect Anonymity**: No single tool provides 100% protection. Use multiple privacy tools.
- **Site Compatibility**: Some sites may break with maximum protection. Adjust settings as needed.
- **HTTP Headers**: Always use a User-Agent switcher for complete protection.

## 📚 Resources

- [Browser Fingerprinting Guide](https://github.com/lulavc/ultimate-anti-fingerprint/wiki)
- [Privacy Tools Comparison](https://privacytools.io/)
- [EFF Privacy Badger](https://privacybadger.eff.org/)
- [uBlock Origin](https://github.com/gorhill/uBlock)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by various anti-fingerprinting research and privacy tools
- Thanks to the privacy community for ongoing research and feedback
- Special thanks to contributors and testers who help improve the script

---

**⭐ If this script helps protect your privacy, please star the repository and share it with others!** 