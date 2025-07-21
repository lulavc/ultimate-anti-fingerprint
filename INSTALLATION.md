# Installation Guide - Ultimate Anti-Fingerprint v2.0

This guide will help you install and configure the Ultimate Anti-Fingerprint userscript for maximum privacy protection.

## 📋 Prerequisites

Before installing the userscript, you'll need:

1. **Chrome Browser** (or Chromium-based browser)
2. **Tampermonkey Extension** - [Install from Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
3. **User-Agent Switcher Extension** (Recommended) - [User-Agent Switcher and Manager](https://chrome.google.com/webstore/detail/user-agent-switcher-and-m/bhchdcejhohfmigjafbampogmaanbfkg)

## 🚀 Step-by-Step Installation

### Step 1: Install Tampermonkey

1. Go to the [Tampermonkey Chrome Web Store page](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Click "Add to Chrome"
3. Confirm the installation
4. You should see the Tampermonkey icon in your browser toolbar

### Step 2: Install the Userscript

**Option A: From GreasyFork (Recommended)**
1. Visit [Ultimate Anti-Fingerprint on GreasyFork](https://greasyfork.org/en/scripts/543036-ultimate-anti-fingerprint)
2. Click "Install this script"
3. Tampermonkey will open with the script - click "Install"

**Option B: Manual Installation**
1. Copy the contents of `ultimate-anti-fingerprint-v2.js`
2. Open Tampermonkey dashboard (click the icon → Dashboard)
3. Click the "+" tab to create a new script
4. Replace the default content with the copied script
5. Press Ctrl+S (or Cmd+S on Mac) to save

### Step 3: Configure User-Agent Switcher (Critical!)

This step is **essential** for complete protection:

1. Install [User-Agent Switcher and Manager](https://chrome.google.com/webstore/detail/user-agent-switcher-and-m/bhchdcejhohfmigjafbampogmaanbfkg)
2. Click the extension icon and select "Options"
3. Add a new user agent with these settings:
   - **Name**: Chrome 120 Windows 10
   - **User-Agent**: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`
   - **Accept-Language**: `en-US,en;q=0.9`
   - **Platform**: `Win32`
4. Save and activate this profile

### Step 4: Configure the Script (Optional)

The script works great with default settings, but you can customize it:

1. Open Tampermonkey dashboard
2. Find "Ultimate Anti-Fingerprint v2.0" and click the edit icon
3. Modify the `CONFIG` object at the top:

```javascript
const CONFIG = {
    PARANOID_MODE: true,        // Set to false if sites break
    STEALTH_MODE: true,         // Keep enabled for better compatibility
    DEBUG_MODE: false,          // Set to true for troubleshooting
    ROUND_SCREEN: false,        // Rounds screen dimensions
    FONT_RANDOMIZE: true,       // Adds noise to font measurements
    CANVAS_RANDOMIZE: true,     // Randomizes canvas operations
    BLOCK_TRACKERS: true,       // Blocks tracking domains
    SPOOF_TIMEZONE: true,       // Spoofs timezone to EST
    PROTECT_BATTERY: true,      // Protects battery API
    PROTECT_CONNECTION: true,   // Protects connection API
    PROTECT_PERMISSIONS: true,  // Protects permissions API
    PROTECT_MEDIA: true,        // Protects media devices API
    PROTECT_STORAGE: true       // Protects storage estimation
};
```

4. Save the changes (Ctrl+S)

## 🧪 Testing Your Setup

After installation, test your protection:

1. Visit [AmIUnique.org](https://amiunique.org/)
2. Run the fingerprinting test
3. You should see:
   - **Browser**: Chrome 120.0.0.0
   - **OS**: Windows 10
   - **Language**: en-US
   - **Timezone**: America/New_York
   - **Screen**: 1920x1080 (or your configured resolution)
   - **Canvas**: Consistent hash across tests
   - **WebGL**: NVIDIA GeForce GTX 1660 Ti

## 🔧 Troubleshooting

### Sites Not Loading or Breaking?

1. **Disable Paranoid Mode**: Set `PARANOID_MODE: false`
2. **Check Specific Protections**: Try disabling individual protections
3. **Enable Debug Mode**: Set `DEBUG_MODE: true` and check browser console
4. **Whitelist Sites**: Add `@exclude` rules for problematic sites

### Still Being Fingerprinted?

1. **Verify User-Agent**: Check that your HTTP headers match the spoofed profile
2. **Clear Browser Data**: Clear cookies, cache, and local storage
3. **Check Other Extensions**: Disable other extensions that might leak info
4. **Test in Incognito**: Try browsing in incognito mode

### Debug Mode Output

When `DEBUG_MODE: true`, you'll see console messages like:
- `[UAF Info] Navigator protection initialized`
- `[UAF Blocked] XHR: https://google-analytics.com/...`
- `[UAF Debug] Canvas toDataURL blocked (paranoid mode)`

## ⚙️ Advanced Configuration

### Custom Browser Profile

You can modify the `PROFILE` object to use different browser characteristics:

```javascript
const PROFILE = {
    userAgent: 'Your custom user agent',
    platform: 'Win32',
    screenWidth: 1366,
    screenHeight: 768,
    cores: 4,
    memory: 4,
    // ... other properties
};
```

### Adding Custom Blocked Domains

Add domains to the `BLOCKED_DOMAINS` array:

```javascript
const BLOCKED_DOMAINS = [
    // ... existing domains
    'your-tracking-domain.com',
    'another-tracker.net'
];
```

### Site-Specific Exclusions

To exclude specific sites from protection:

```javascript
// Add this line after @match *://*/*
// @exclude https://example.com/*
```

## 🔄 Keeping Updated

1. **GreasyFork Users**: Updates are automatic
2. **Manual Installation**: Check this repository for new versions
3. **Follow Changes**: Watch the repository for important updates

## 🆘 Getting Help

If you need help:

1. **Check Issues**: [Browse existing issues](https://github.com/lulavc/ultimate-anti-fingerprint/issues)
2. **Create New Issue**: Provide browser version, error messages, and steps to reproduce
3. **Enable Debug Mode**: Include console output in your issue report

---

**🎉 Congratulations! You're now protected against browser fingerprinting!**

Remember to keep your User-Agent Switcher active and the script updated for maximum protection.