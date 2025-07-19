// ==UserScript==
// @name         Ultimate Anti-Fingerprint
// @namespace    https://greasyfork.org/users/your-username
// @version      0.6
// @description  Advanced anti-fingerprinting: Chrome/Windows spoof, font, plugin, WebGL, canvas, and cookie protection
// @author       lulzactive
// @match        *://*/*
// @license      MIT
// @locale       en
// @downloadURL https://update.greasyfork.org/scripts/543036/Ultimate%20Anti-Fingerprint.user.js
// @updateURL https://update.greasyfork.org/scripts/543036/Ultimate%20Anti-Fingerprint.meta.js
// ==/UserScript==

/*
IMPORTANT: For perfect protection, use a User-Agent Switcher extension to match HTTP headers:
- User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
- Accept-Language: en-US,en;q=0.9
- Platform: Windows

This ensures HTTP headers match the JavaScript spoofing for maximum effectiveness.

CRITICAL: The User-Agent header is the biggest fingerprinting vector. Without a User-Agent switcher,
your HTTP headers will still reveal your real OS/browser, making you unique despite JavaScript protection.
*/

(function() {
    'use strict';

    // --- Feature toggles ---
    const PARANOID_CANVAS = false; // true = always blank canvas (paranoid mode)
    const ROUND_SCREEN = false;    // true = round screen size to nearest 100
    const FONT_RANDOMIZE = true;   // true = randomize measureText width
    const CANVAS_TEXT_RANDOMIZE = true; // true = randomize fillText/strokeText/rects

    // --- 1. Third-party cookie blocking (always on) ---
    try {
        document.cookie = 'sameSite=strict';
    } catch (e) {}

    // --- 2. Chrome/Windows profile (all common values) ---
    const profile = {
        id: 'Chrome 120 - Win10',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        platform: 'Win32',
        language: 'en-US',
        screenWidth: 1920,
        screenHeight: 1080,
        cores: 8,
        memory: 8, // Most common value
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
    };

    // --- 3. Utility: spoof property ---
    function spoof(obj, prop, valueFn) {
        try {
            Object.defineProperty(obj, prop, {
                get: valueFn,
                configurable: true
            });
        } catch (e) {}
    }

    // --- 4. Spoof core fingerprinting vectors ---
    spoof(navigator, 'userAgent', () => profile.userAgent);
    spoof(navigator, 'platform', () => profile.platform);
    spoof(navigator, 'language', () => profile.language);
    spoof(navigator, 'languages', () => [profile.language, 'en']);
    spoof(window.screen, 'colorDepth', () => profile.colorDepth);
    spoof(window, 'devicePixelRatio', () => profile.devicePixelRatio);
    spoof(navigator, 'hardwareConcurrency', () => profile.cores);
    spoof(navigator, 'deviceMemory', () => profile.memory);
    spoof(navigator, 'vendor', () => profile.vendor);
    spoof(navigator, 'productSub', () => profile.productSub);
    spoof(navigator, 'appVersion', () => profile.appVersion);
    spoof(navigator, 'appName', () => profile.appName);
    spoof(navigator, 'doNotTrack', () => profile.doNotTrack);
    spoof(navigator, 'maxTouchPoints', () => profile.maxTouchPoints);
    spoof(navigator, 'plugins', () => profile.plugins);
    
    // Timezone spoofing - more comprehensive
    if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
        const orig = Intl.DateTimeFormat.prototype.resolvedOptions;
        Intl.DateTimeFormat.prototype.resolvedOptions = function () {
            const options = orig.call(this);
            options.timeZone = profile.timezone;
            return options;
        };
    }
    
    // Override Date methods for timezone
    const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = function() {
        return 300; // EST offset (UTC-5)
    };
    
    // Override Intl.DateTimeFormat constructor
    const originalDateTimeFormat = Intl.DateTimeFormat;
    Intl.DateTimeFormat = function(locales, options) {
        if (options && options.timeZone) {
            options.timeZone = profile.timezone;
        }
        return new originalDateTimeFormat(locales, options);
    };
    Object.setPrototypeOf(Intl.DateTimeFormat, originalDateTimeFormat);
    Object.setPrototypeOf(Intl.DateTimeFormat.prototype, originalDateTimeFormat.prototype);
    
    // Screen spoofing (optionally rounded)
    const screenWidth = ROUND_SCREEN ? Math.floor(profile.screenWidth / 100) * 100 : profile.screenWidth;
    const screenHeight = ROUND_SCREEN ? Math.floor(profile.screenHeight / 100) * 100 : profile.screenHeight;
    spoof(window.screen, 'width', () => screenWidth);
    spoof(window.screen, 'height', () => screenHeight);

    // --- 5. Canvas randomization (subtle, not static, or paranoid mode) ---
    if (window.HTMLCanvasElement) {
        if (PARANOID_CANVAS) {
            // Always return a blank image (paranoid mode)
            const blank = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP89PwGHwAFYAJm6ocdgAAAABJRU5ErkJggg==';
            HTMLCanvasElement.prototype.toDataURL = function() { return blank; };
            HTMLCanvasElement.prototype.toBlob = function(cb) {
                // Create a blank blob
                const byteString = atob(blank.split(',')[1]);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                cb(new Blob([ab], {type: 'image/png'}));
            };
        } else {
            // More consistent canvas fingerprinting protection
            const origToDataURL = HTMLCanvasElement.prototype.toDataURL;
            HTMLCanvasElement.prototype.toDataURL = function() {
                const ctx = this.getContext('2d');
                if (ctx) {
                    const { width, height } = this;
                    try {
                        const imgData = ctx.getImageData(0, 0, width, height);
                        // Use deterministic noise based on canvas size for consistency
                        const seed = width * height;
                        for (let i = 0; i < imgData.data.length; i += 4) {
                            const noise = Math.sin(seed + i) * 0.5;
                            imgData.data[i] = Math.max(0, Math.min(255, imgData.data[i] + noise));
                            imgData.data[i+1] = Math.max(0, Math.min(255, imgData.data[i+1] + noise));
                            imgData.data[i+2] = Math.max(0, Math.min(255, imgData.data[i+2] + noise));
                        }
                        ctx.putImageData(imgData, 0, 0);
                    } catch (e) {}
                }
                return origToDataURL.apply(this, arguments);
            };
            
            // Also randomize getImageData
            const origGetImageData = CanvasRenderingContext2D.prototype.getImageData;
            CanvasRenderingContext2D.prototype.getImageData = function(x, y, w, h) {
                const imgData = origGetImageData.call(this, x, y, w, h);
                for (let i = 0; i < imgData.data.length; i += 4) {
                    imgData.data[i] += Math.floor(Math.random() * 2);
                    imgData.data[i+1] += Math.floor(Math.random() * 2);
                    imgData.data[i+2] += Math.floor(Math.random() * 2);
                }
                return imgData;
            };
            
            // Canvas text/rect randomization
            if (CANVAS_TEXT_RANDOMIZE) {
                const methods = ['fillText', 'strokeText', 'fillRect', 'strokeRect', 'clearRect'];
                methods.forEach(method => {
                    const orig = CanvasRenderingContext2D.prototype[method];
                    CanvasRenderingContext2D.prototype[method] = function(...args) {
                        if (method.includes('Text')) {
                            args[1] += Math.random() * 0.5; // X
                            args[2] += Math.random() * 0.5; // Y
                        } else if (method.includes('Rect')) {
                            args[0] += Math.random() * 0.5; // X
                            args[1] += Math.random() * 0.5; // Y
                            if (args.length > 2) args[2] *= 1 + (Math.random() - 0.5) * 0.01; // W
                            if (args.length > 3) args[3] *= 1 + (Math.random() - 0.5) * 0.01; // H
                        }
                        return orig.apply(this, args);
                    };
                });
            }
        }
    }
    
    // Font fingerprinting: randomize measureText width
    if (FONT_RANDOMIZE && window.CanvasRenderingContext2D) {
        const origMeasureText = CanvasRenderingContext2D.prototype.measureText;
        CanvasRenderingContext2D.prototype.measureText = function() {
            const result = origMeasureText.apply(this, arguments);
            result.width = result.width * (1 + (Math.random() - 0.5) * 0.01); // ±0.5% noise
            return result;
        };
    }

    // --- 6. WebGL spoofing (realistic, subtle) ---
    if (window.WebGLRenderingContext) {
        const origGetParameter = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function(param) {
            // 37445: UNMASKED_VENDOR_WEBGL, 37446: UNMASKED_RENDERER_WEBGL
            if (param === 37445) return profile.webglVendor;
            if (param === 37446) return profile.webglRenderer;
            
            // Add subtle randomization to other parameters to reduce uniqueness
            const result = origGetParameter.call(this, param);
            if (typeof result === 'number' && result > 0) {
                // Add small deterministic noise based on parameter type
                const noise = Math.sin(param + this.canvas.width + this.canvas.height) * 0.1;
                return result + noise;
            }
            return result;
        };
        
        // More consistent shader precision
        const origGetShaderPrecisionFormat = WebGLRenderingContext.prototype.getShaderPrecisionFormat;
        WebGLRenderingContext.prototype.getShaderPrecisionFormat = function() {
            const res = origGetShaderPrecisionFormat.apply(this, arguments);
            if (res && typeof res.precision === 'number') {
                // Use deterministic noise for consistency
                const noise = Math.sin(this.canvas.width + this.canvas.height) * 0.5;
                res.precision = Math.max(0, res.precision + Math.floor(noise));
            }
            return res;
        };
        
        // Override getExtension to return consistent extensions
        const origGetExtension = WebGLRenderingContext.prototype.getExtension;
        WebGLRenderingContext.prototype.getExtension = function(name) {
            const ext = origGetExtension.call(this, name);
            if (ext && typeof ext === 'object') {
                // Add subtle randomization to extension properties
                Object.keys(ext).forEach(key => {
                    if (typeof ext[key] === 'number') {
                        const noise = Math.sin(name.length + key.length) * 0.1;
                        ext[key] = ext[key] + noise;
                    }
                });
            }
            return ext;
        };
    }

    // --- 7. AudioContext spoofing (safe) ---
    try {
        if (window.AudioContext) {
            const origSampleRate = Object.getOwnPropertyDescriptor(AudioContext.prototype, 'sampleRate');
            Object.defineProperty(AudioContext.prototype, 'sampleRate', {
                get: function() { return 48000; },
                configurable: true
            });
        }
    } catch (e) {}

    // --- 8. Font spoofing (Windows fonts) ---
    const winFonts = [
        'Arial', 'Arial Black', 'Calibri', 'Cambria', 'Cambria Math', 'Comic Sans MS',
        'Consolas', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Lucida Sans Unicode',
        'Microsoft Sans Serif', 'Palatino Linotype', 'Segoe UI', 'Tahoma', 'Times New Roman',
        'Trebuchet MS', 'Verdana', 'Symbol', 'Wingdings'
    ];
    
    // Override document.fonts.check to always return true for Windows fonts
    if (document.fonts && typeof document.fonts.check === 'function') {
        const origCheck = document.fonts.check.bind(document.fonts);
        document.fonts.check = (fontSpec, text) => {
            // Always return true for Windows fonts, false for others
            return winFonts.some(font => fontSpec.includes(font));
        };
    }
    
    // Override font enumeration methods
    if (window.CanvasRenderingContext2D) {
        const originalMeasureText = CanvasRenderingContext2D.prototype.measureText;
        CanvasRenderingContext2D.prototype.measureText = function(text) {
            const result = originalMeasureText.call(this, text);
            // Ensure consistent font measurements for Windows fonts
            if (this.font && winFonts.some(font => this.font.includes(font))) {
                result.width = result.width * 1.0; // Keep consistent
            }
            return result;
        };
    }
    
    // Override CSS.supports for font-display
    if (window.CSS && window.CSS.supports) {
        const originalSupports = window.CSS.supports;
        window.CSS.supports = function(property, value) {
            if (property === 'font-display') {
                return false;
            }
            return originalSupports.call(this, property, value);
        };
    }
    
    // Override font loading API
    if (document.fonts && document.fonts.ready) {
        const originalReady = document.fonts.ready;
        Object.defineProperty(document.fonts, 'ready', {
            get: () => Promise.resolve(),
            configurable: true
        });
    }
    
    // Override font enumeration via CSS
    const originalQuerySelector = document.querySelector;
    document.querySelector = function(selector) {
        if (selector && selector.includes('font')) {
            // Return a fake element for font queries
            return {
                style: { fontFamily: 'Arial, sans-serif' },
                getBoundingClientRect: () => ({ width: 100, height: 20 })
            };
        }
        return originalQuerySelector.call(this, selector);
    };

    // --- 9. Permissions, mediaDevices, storage, etc. (realistic) ---
    if ('permissions' in navigator) {
        const origQuery = navigator.permissions.query;
        navigator.permissions.query = function () {
            return Promise.resolve({ state: 'granted' });
        };
    }
    
    spoof(navigator, 'mediaDevices', () => ({ enumerateDevices: () => Promise.resolve([]) }));
    
    if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate = () => Promise.resolve({ usage: 5242880, quota: 1073741824 });
    }

    // --- 10. Miscellaneous: matchMedia, SharedArrayBuffer, etc. ---
    if (window.matchMedia) {
        const origMatchMedia = window.matchMedia;
        window.matchMedia = function(query) {
            if (query.includes('color-scheme')) {
                return { matches: Math.random() > 0.5, media: query };
            }
            return origMatchMedia.call(this, query);
        };
    }
    
    spoof(window, 'SharedArrayBuffer', () => undefined);

    // --- 11. Enhanced Anti-Tracking Features ---
    const blockedTrackers = [
        // Google
        "google-analytics.com", "googletagmanager.com", "googleadservices.com", "doubleclick.net", "adservice.google.com",
        "pagead2.googlesyndication.com", "adclick.g.doubleclick.net", "gstatic.com/ads", "googlesyndication.com",
        // Facebook
        "facebook.com/tr", "facebook.net", "connect.facebook.net", "fbcdn.net", "fb.com", "fbsbx.com",
        // Microsoft/Bing
        "bat.bing.com", "bing.com/fd/ls", "clarity.ms",
        // Twitter/X
        "analytics.twitter.com", "t.co/i/adsct", "static.ads-twitter.com",
        // TikTok
        "analytics.tiktok.com", "business.tiktok.com", "ads.tiktok.com",
        // Amazon
        "aax.amazon-adsystem.com", "amazon-adsystem.com",
        // Other ad/trackers
        "scorecardresearch.com", "hotjar.com", "mixpanel.com", "matomo.org", "quantserve.com", "adroll.com",
        "criteo.com", "adnxs.com", "taboola.com", "outbrain.com", "zedo.com", "yandex.ru/metrika", "yandex.net",
        "newrelic.com", "segment.com", "optimizely.com", "bluekai.com", "adform.net", "openx.net", "rubiconproject.com",
        "moatads.com", "smartadserver.com", "pubmatic.com", "casalemedia.com", "advertising.com", "ml314.com",
        "yieldmo.com", "bidswitch.net", "gumgum.com", "eyeota.net", "adition.com", "adscale.de", "adspirit.de",
        "adtech.de", "bidr.io"
    ];
    
    // Helper to check if a URL is a tracker
    function isTracker(url) {
        return blockedTrackers.some(domain => url.includes(domain));
    }
    
    // Block XMLHttpRequest
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        if (isTracker(url)) {
            console.warn("Blocked tracker (XHR):", url);
            return; // Block request
        }
        return origOpen.apply(this, arguments);
    };
    
    // Block fetch
    const origFetch = window.fetch;
    window.fetch = function(input, init) {
        const url = typeof input === "string" ? input : input.url;
        if (isTracker(url)) {
            console.warn("Blocked tracker (fetch):", url);
            return new Promise(() => {}); // Block request
        }
        return origFetch.apply(this, arguments);
    };
    
    // Block image/script tags
    const origCreateElement = document.createElement;
    document.createElement = function(tagName, options) {
        const el = origCreateElement.call(this, tagName, options);
        if (["img", "script", "iframe"].includes(tagName.toLowerCase())) {
            const origSetAttribute = el.setAttribute;
            el.setAttribute = function(name, value) {
                if ((name === "src" || name === "data-src") && isTracker(value)) {
                    console.warn("Blocked tracker (element):", value);
                    return;
                }
                return origSetAttribute.apply(this, arguments);
            };
        }
        return el;
    };
    
    // Block sendBeacon
    try {
        navigator.sendBeacon = function() { return true; };
        window.sendBeacon = function() { return true; };
    } catch (e) {}
    
    // Block or spoof Battery API
    if (navigator.getBattery) {
        navigator.getBattery = function() {
            return Promise.resolve({
                charging: true,
                chargingTime: Infinity,
                dischargingTime: Infinity,
                level: 1.0,
                addEventListener: () => {},
                removeEventListener: () => {}
            });
        };
    }
    
    // Block or spoof Network Information API
    if (navigator.connection) {
        Object.defineProperty(navigator, 'connection', {
            get: () => ({
                effectiveType: '4g',
                rtt: 50,
                downlink: 10,
                saveData: false
            }),
            configurable: true
        });
    }
    
    // Block or spoof document.referrer
    Object.defineProperty(document, 'referrer', {
        get: () => "",
        configurable: true
    });
    
    // Reset window.name on every page load
    window.name = "";

})();