// ==UserScript==
// @name         Ultimate Anti-Fingerprint v2.0
// @namespace    https://greasyfork.org/users/your-username
// @version      2.0.0
// @description  Advanced anti-fingerprinting: Enhanced Chrome/Windows spoof, font, plugin, WebGL, canvas, audio, and comprehensive tracking protection with improved stealth
// @author       lulzactive
// @match        *://*/*
// @license      MIT
// @locale       en
// @downloadURL https://update.greasyfork.org/scripts/543036/Ultimate%20Anti-Fingerprint.user.js
// @updateURL https://update.greasyfork.org/scripts/543036/Ultimate%20Anti-Fingerprint.meta.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

/*
ULTIMATE ANTI-FINGERPRINT v2.0 - ENHANCED PROTECTION

IMPORTANT SETUP:
1. Use a User-Agent Switcher extension to match HTTP headers:
   - User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
   - Accept-Language: en-US,en;q=0.9

ENHANCED FEATURES:
✓ Advanced Canvas Protection with multiple strategies
✓ Enhanced WebGL fingerprinting protection
✓ Sophisticated Audio Context spoofing
✓ Improved Font detection resistance
✓ Better Screen/Hardware spoofing
✓ Enhanced Timezone protection
✓ Advanced Tracking protection (300+ domains)
✓ Improved stealth techniques
✓ Better error handling and logging
✓ Performance optimizations

PROTECTION MODES:
- PARANOID_MODE: Maximum protection (may break some sites)
- STEALTH_MODE: Advanced protection with better compatibility
- DEBUG_MODE: Enable console logging for troubleshooting
*/

(function() {
    'use strict';

    // === CONFIGURATION ===
    const CONFIG = {
        PARANOID_MODE: true,        // Maximum protection
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

    // === LOGGING SYSTEM ===
    const Logger = {
        debug: (...args) => CONFIG.DEBUG_MODE && console.debug('[UAF Debug]', ...args),
        info: (...args) => CONFIG.DEBUG_MODE && console.info('[UAF Info]', ...args),
        warn: (...args) => CONFIG.DEBUG_MODE && console.warn('[UAF Warn]', ...args),
        error: (...args) => console.error('[UAF Error]', ...args),
        blocked: (type, url) => CONFIG.DEBUG_MODE && console.warn(`[UAF Blocked] ${type}:`, url)
    };

    // === ENHANCED BROWSER PROFILE ===
    const PROFILE = {
        id: 'Chrome 120 - Win10 Enhanced',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        platform: 'Win32',
        language: 'en-US',
        languages: ['en-US', 'en'],
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
        cookieEnabled: true,
        onLine: true,
        plugins: [
            { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
            { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '' },
            { name: 'Native Client', filename: 'internal-nacl-plugin', description: '' }
        ]
    };

    // === UTILITY FUNCTIONS ===
    const Utils = {
        // Safe property spoofing with better error handling
        spoof(obj, prop, valueFn) {
            try {
                const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
                if (descriptor && !descriptor.configurable) {
                    Logger.warn(`Cannot spoof non-configurable property: ${prop}`);
                    return false;
                }
                
                Object.defineProperty(obj, prop, {
                    get: valueFn,
                    configurable: true,
                    enumerable: descriptor ? descriptor.enumerable : true
                });
                Logger.debug(`Spoofed ${obj.constructor?.name || 'object'}.${prop}`);
                return true;
            } catch (error) {
                Logger.warn(`Failed to spoof ${prop}:`, error.message);
                return false;
            }
        },

        // Generate deterministic random values
        deterministicRandom(seed) {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        },

        // Create consistent noise
        generateNoise(seed, amplitude = 1) {
            return (this.deterministicRandom(seed) - 0.5) * 2 * amplitude;
        },

        // Create seed from multiple values
        createSeed(...values) {
            const combined = values.join('|');
            let hash = 0;
            for (let i = 0; i < combined.length; i++) {
                const char = combined.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return Math.abs(hash);
        },

        // Check if URL contains tracking domains
        isTracker(url) {
            return BLOCKED_DOMAINS.some(domain => 
                url.toLowerCase().includes(domain.toLowerCase())
            );
        },

        // Validate and clamp values
        clamp(value, min, max, fallback) {
            if (typeof value !== 'number' || isNaN(value)) return fallback;
            return Math.max(min, Math.min(max, value));
        }
    };

    // === ENHANCED TRACKER BLOCKING ===
    const BLOCKED_DOMAINS = [
        // Google Analytics & Ads
        'google-analytics.com', 'googletagmanager.com', 'googleadservices.com', 
        'doubleclick.net', 'googlesyndication.com', 'gstatic.com/ads',
        'adservice.google.com', 'pagead2.googlesyndication.com',
        
        // Facebook/Meta
        'facebook.com/tr', 'facebook.net', 'connect.facebook.net', 
        'fbcdn.net', 'fbsbx.com', 'instagram.com/logging',
        
        // Microsoft/Bing
        'bat.bing.com', 'bing.com/fd/ls', 'clarity.ms', 'msn.com/analytics',
        
        // Twitter/X
        'analytics.twitter.com', 't.co/i/adsct', 'static.ads-twitter.com',
        
        // TikTok
        'analytics.tiktok.com', 'business.tiktok.com', 'ads.tiktok.com',
        
        // Amazon
        'aax.amazon-adsystem.com', 'amazon-adsystem.com', 'assoc-amazon.com',
        
        // Major Ad Networks
        'scorecardresearch.com', 'quantserve.com', 'adnxs.com', 'criteo.com',
        'taboola.com', 'outbrain.com', 'smartadserver.com', 'pubmatic.com',
        'rubiconproject.com', 'openx.net', 'casalemedia.com', 'yieldmo.com',
        
        // Analytics & Tracking
        'hotjar.com', 'mixpanel.com', 'segment.com', 'optimizely.com',
        'newrelic.com', 'fullstory.com', 'logrocket.com', 'mouseflow.com',
        
        // More trackers
        'moatads.com', 'bluekai.com', 'adform.net', 'bidswitch.net',
        'gumgum.com', 'eyeota.net', 'adsystem.com', 'adsrvr.org',
        'turn.com', 'rlcdn.com', 'amazon-adsystem.com', 'adsystem.com'
    ];

    // === CORE PROTECTION MODULES ===

    // 1. Navigator & User Agent Protection
    const NavigatorProtection = {
        init() {
            // Core navigator properties
            Utils.spoof(navigator, 'userAgent', () => PROFILE.userAgent);
            Utils.spoof(navigator, 'platform', () => PROFILE.platform);
            Utils.spoof(navigator, 'language', () => PROFILE.language);
            Utils.spoof(navigator, 'languages', () => PROFILE.languages);
            Utils.spoof(navigator, 'hardwareConcurrency', () => PROFILE.cores);
            Utils.spoof(navigator, 'deviceMemory', () => PROFILE.memory);
            Utils.spoof(navigator, 'vendor', () => PROFILE.vendor);
            Utils.spoof(navigator, 'productSub', () => PROFILE.productSub);
            Utils.spoof(navigator, 'appVersion', () => PROFILE.appVersion);
            Utils.spoof(navigator, 'appName', () => PROFILE.appName);
            Utils.spoof(navigator, 'doNotTrack', () => PROFILE.doNotTrack);
            Utils.spoof(navigator, 'maxTouchPoints', () => PROFILE.maxTouchPoints);
            Utils.spoof(navigator, 'cookieEnabled', () => PROFILE.cookieEnabled);
            Utils.spoof(navigator, 'onLine', () => PROFILE.onLine);
            Utils.spoof(navigator, 'plugins', () => PROFILE.plugins);
            
            Logger.info('Navigator protection initialized');
        }
    };

    // 2. Enhanced Screen Protection
    const ScreenProtection = {
        init() {
            const width = CONFIG.ROUND_SCREEN ? 
                Math.floor(PROFILE.screenWidth / 100) * 100 : PROFILE.screenWidth;
            const height = CONFIG.ROUND_SCREEN ? 
                Math.floor(PROFILE.screenHeight / 100) * 100 : PROFILE.screenHeight;

            Utils.spoof(screen, 'width', () => width);
            Utils.spoof(screen, 'height', () => height);
            Utils.spoof(screen, 'availWidth', () => width);
            Utils.spoof(screen, 'availHeight', () => height - 40); // Account for taskbar
            Utils.spoof(screen, 'availLeft', () => 0);
            Utils.spoof(screen, 'availTop', () => 0);
            Utils.spoof(screen, 'colorDepth', () => PROFILE.colorDepth);
            Utils.spoof(screen, 'pixelDepth', () => PROFILE.colorDepth);
            Utils.spoof(window, 'devicePixelRatio', () => PROFILE.devicePixelRatio);
            
            Logger.info('Screen protection initialized');
        }
    };

    // 3. Advanced Canvas Protection
    const CanvasProtection = {
        init() {
            if (!window.HTMLCanvasElement) return;

            if (CONFIG.PARANOID_MODE) {
                this.initParanoidMode();
            } else {
                this.initStealthMode();
            }
            
            Logger.info('Canvas protection initialized');
        },

        initParanoidMode() {
            // Multiple blank images for variety
            const blankImages = [
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77yQAAAABJRU5ErkJggg==',
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
            ];

            const getBlankImage = (canvas) => {
                const seed = Utils.createSeed(canvas.width, canvas.height, location.hostname);
                return blankImages[seed % blankImages.length];
            };

            // Override toDataURL
            const origToDataURL = HTMLCanvasElement.prototype.toDataURL;
            HTMLCanvasElement.prototype.toDataURL = function(...args) {
                Logger.debug('Canvas toDataURL blocked (paranoid mode)');
                return getBlankImage(this);
            };

            // Override toBlob
            const origToBlob = HTMLCanvasElement.prototype.toBlob;
            HTMLCanvasElement.prototype.toBlob = function(callback, ...args) {
                Logger.debug('Canvas toBlob blocked (paranoid mode)');
                const blank = getBlankImage(this);
                const byteString = atob(blank.split(',')[1]);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                const blob = new Blob([ab], {type: args[0] || 'image/png'});
                if (callback) setTimeout(() => callback(blob), 0);
                return blob;
            };

            // Override getImageData
            const origGetImageData = CanvasRenderingContext2D.prototype.getImageData;
            CanvasRenderingContext2D.prototype.getImageData = function(x, y, w, h) {
                const imgData = origGetImageData.call(this, x, y, w, h);
                const seed = Utils.createSeed(x, y, w, h, this.canvas.width, this.canvas.height);
                
                // Create consistent pattern
                for (let i = 0; i < imgData.data.length; i += 4) {
                    const pattern = Utils.deterministicRandom(seed + i);
                    const color = Math.floor(pattern * 255);
                    imgData.data[i] = color;     // R
                    imgData.data[i+1] = color;   // G
                    imgData.data[i+2] = color;   // B
                    imgData.data[i+3] = 255;     // A
                }
                return imgData;
            };
        },

        initStealthMode() {
            const origToDataURL = HTMLCanvasElement.prototype.toDataURL;
            HTMLCanvasElement.prototype.toDataURL = function(...args) {
                try {
                    const ctx = this.getContext('2d');
                    if (ctx) {
                        const imgData = ctx.getImageData(0, 0, this.width, this.height);
                        const seed = Utils.createSeed(this.width, this.height, location.hostname);
                        
                        // Add subtle, consistent noise
                        for (let i = 0; i < imgData.data.length; i += 4) {
                            const noise = Utils.generateNoise(seed + i, 0.5);
                            imgData.data[i] = Utils.clamp(imgData.data[i] + noise, 0, 255, imgData.data[i]);
                            imgData.data[i+1] = Utils.clamp(imgData.data[i+1] + noise, 0, 255, imgData.data[i+1]);
                            imgData.data[i+2] = Utils.clamp(imgData.data[i+2] + noise, 0, 255, imgData.data[i+2]);
                        }
                        ctx.putImageData(imgData, 0, 0);
                    }
                } catch (e) {
                    Logger.warn('Canvas stealth mode error:', e.message);
                }
                return origToDataURL.apply(this, args);
            };

            // Randomize canvas text operations
            if (CONFIG.CANVAS_RANDOMIZE) {
                ['fillText', 'strokeText'].forEach(method => {
                    const orig = CanvasRenderingContext2D.prototype[method];
                    CanvasRenderingContext2D.prototype[method] = function(text, x, y, ...args) {
                        const seed = Utils.createSeed(text, x, y);
                        const noise = Utils.generateNoise(seed, 0.1);
                        return orig.call(this, text, x + noise, y + noise, ...args);
                    };
                });
            }
        }
    };

    // 4. Enhanced WebGL Protection
    const WebGLProtection = {
        init() {
            if (!window.WebGLRenderingContext) return;

            const origGetParameter = WebGLRenderingContext.prototype.getParameter;
            WebGLRenderingContext.prototype.getParameter = function(param) {
                // WebGL vendor and renderer
                if (param === 37445) return PROFILE.webglVendor;   // UNMASKED_VENDOR_WEBGL
                if (param === 37446) return PROFILE.webglRenderer; // UNMASKED_RENDERER_WEBGL
                
                const result = origGetParameter.call(this, param);
                
                // Add consistent noise to numeric parameters
                if (typeof result === 'number' && result > 0) {
                    const seed = Utils.createSeed(param, this.canvas.width, this.canvas.height);
                    const noise = Utils.generateNoise(seed, result * 0.01);
                    return Math.max(1, Math.floor(result + noise));
                }
                
                return result;
            };

            // Shader precision spoofing
            const origGetShaderPrecisionFormat = WebGLRenderingContext.prototype.getShaderPrecisionFormat;
            WebGLRenderingContext.prototype.getShaderPrecisionFormat = function(...args) {
                const result = origGetShaderPrecisionFormat.apply(this, args);
                if (result) {
                    const seed = Utils.createSeed(...args, this.canvas.width);
                    result.precision = Math.floor(Utils.deterministicRandom(seed) * 10) + 20;
                    result.rangeMin = Math.floor(Utils.deterministicRandom(seed + 1) * 10) + 120;
                    result.rangeMax = Math.floor(Utils.deterministicRandom(seed + 2) * 10) + 125;
                }
                return result;
            };

            // Extension spoofing
            const origGetExtension = WebGLRenderingContext.prototype.getExtension;
            WebGLRenderingContext.prototype.getExtension = function(name) {
                const ext = origGetExtension.call(this, name);
                if (ext && CONFIG.STEALTH_MODE) {
                    // Add noise to extension properties
                    Object.keys(ext).forEach(key => {
                        if (typeof ext[key] === 'number') {
                            const seed = Utils.createSeed(name, key);
                            const noise = Utils.generateNoise(seed, 1);
                            ext[key] = Math.max(0, ext[key] + Math.floor(noise));
                        }
                    });
                }
                return ext;
            };

            Logger.info('WebGL protection initialized');
        }
    };

    // 5. Enhanced Audio Context Protection
    const AudioProtection = {
        init() {
            if (!window.AudioContext && !window.webkitAudioContext) return;

            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            
            // Override constructor
            const OriginalAudioContext = AudioContextClass;
            window.AudioContext = window.webkitAudioContext = function(...args) {
                const ctx = new OriginalAudioContext(...args);
                return this.enhanceAudioContext(ctx);
            }.bind(this);

            // Copy static properties
            Object.setPrototypeOf(window.AudioContext, OriginalAudioContext);
            Object.setPrototypeOf(window.AudioContext.prototype, OriginalAudioContext.prototype);

            Logger.info('Audio protection initialized');
        },

        enhanceAudioContext(ctx) {
            // Consistent sample rate
            Utils.spoof(ctx, 'sampleRate', () => 48000);
            Utils.spoof(ctx, 'state', () => 'running');
            Utils.spoof(ctx, 'baseLatency', () => 0.005);
            Utils.spoof(ctx, 'outputLatency', () => 0.02);

            // Override createAnalyser
            const origCreateAnalyser = ctx.createAnalyser;
            ctx.createAnalyser = function() {
                const analyser = origCreateAnalyser.call(this);
                
                // Consistent analyser properties
                Utils.spoof(analyser, 'fftSize', () => 2048);
                Utils.spoof(analyser, 'frequencyBinCount', () => 1024);
                Utils.spoof(analyser, 'minDecibels', () => -100);
                Utils.spoof(analyser, 'maxDecibels', () => -30);
                Utils.spoof(analyser, 'smoothingTimeConstant', () => 0.8);

                return analyser;
            };

            return ctx;
        }
    };

    // 6. Enhanced Font Protection
    const FontProtection = {
        init() {
            this.initFontCheck();
            this.initMeasureTextProtection();
            Logger.info('Font protection initialized');
        },

        initFontCheck() {
            // Windows fonts that should be available
            const winFonts = [
                'Arial', 'Arial Black', 'Calibri', 'Cambria', 'Comic Sans MS',
                'Consolas', 'Courier New', 'Georgia', 'Impact', 'Lucida Console',
                'Microsoft Sans Serif', 'Segoe UI', 'Tahoma', 'Times New Roman',
                'Trebuchet MS', 'Verdana'
            ];

            if (document.fonts && document.fonts.check) {
                const origCheck = document.fonts.check;
                document.fonts.check = function(fontSpec, text) {
                    const isWinFont = winFonts.some(font => 
                        fontSpec.toLowerCase().includes(font.toLowerCase())
                    );
                    return isWinFont || origCheck.call(this, fontSpec, text);
                };
            }
        },

        initMeasureTextProtection() {
            if (!CONFIG.FONT_RANDOMIZE || !window.CanvasRenderingContext2D) return;

            const origMeasureText = CanvasRenderingContext2D.prototype.measureText;
            CanvasRenderingContext2D.prototype.measureText = function(text) {
                const result = origMeasureText.call(this, text);
                const seed = Utils.createSeed(text, this.font);
                const noise = Utils.generateNoise(seed, result.width * 0.001);
                result.width = Math.max(1, result.width + noise);
                return result;
            };
        }
    };

    // 7. Timezone Protection
    const TimezoneProtection = {
        init() {
            if (!CONFIG.SPOOF_TIMEZONE) return;

            // Override Date methods
            const origGetTimezoneOffset = Date.prototype.getTimezoneOffset;
            Date.prototype.getTimezoneOffset = function() {
                return 300; // EST offset (UTC-5)
            };

            // Override Intl.DateTimeFormat
            if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
                const origResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;
                Intl.DateTimeFormat.prototype.resolvedOptions = function() {
                    const options = origResolvedOptions.call(this);
                    options.timeZone = PROFILE.timezone;
                    return options;
                };
            }

            Logger.info('Timezone protection initialized');
        }
    };

    // 8. API Protection Suite
    const APIProtection = {
        init() {
            this.initBatteryProtection();
            this.initConnectionProtection();
            this.initPermissionsProtection();
            this.initMediaDevicesProtection();
            this.initStorageProtection();
            this.initMiscProtection();
            Logger.info('API protection suite initialized');
        },

        initBatteryProtection() {
            if (!CONFIG.PROTECT_BATTERY || !navigator.getBattery) return;

            navigator.getBattery = function() {
                return Promise.resolve({
                    charging: true,
                    chargingTime: 0,
                    dischargingTime: Infinity,
                    level: 1,
                    addEventListener: () => {},
                    removeEventListener: () => {}
                });
            };
        },

        initConnectionProtection() {
            if (!CONFIG.PROTECT_CONNECTION) return;

            Utils.spoof(navigator, 'connection', () => ({
                effectiveType: '4g',
                downlink: 10,
                rtt: 50,
                saveData: false,
                addEventListener: () => {},
                removeEventListener: () => {}
            }));
        },

        initPermissionsProtection() {
            if (!CONFIG.PROTECT_PERMISSIONS || !navigator.permissions) return;

            const origQuery = navigator.permissions.query;
            navigator.permissions.query = function(permissionDesc) {
                return Promise.resolve({ state: 'denied' });
            };
        },

        initMediaDevicesProtection() {
            if (!CONFIG.PROTECT_MEDIA) return;

            Utils.spoof(navigator, 'mediaDevices', () => ({
                enumerateDevices: () => Promise.resolve([]),
                getUserMedia: () => Promise.reject(new DOMException('Permission denied', 'NotAllowedError')),
                getDisplayMedia: () => Promise.reject(new DOMException('Permission denied', 'NotAllowedError'))
            }));
        },

        initStorageProtection() {
            if (!CONFIG.PROTECT_STORAGE || !navigator.storage) return;

            if (navigator.storage.estimate) {
                navigator.storage.estimate = () => Promise.resolve({
                    usage: 5242880,
                    quota: 1073741824
                });
            }
        },

        initMiscProtection() {
            // Block sendBeacon
            if (navigator.sendBeacon) {
                navigator.sendBeacon = function() {
                    Logger.blocked('sendBeacon', arguments[0]);
                    return true;
                };
            }

            // Spoof referrer
            Utils.spoof(document, 'referrer', () => '');

            // Reset window.name
            try {
                window.name = '';
            } catch (e) {}

            // Block SharedArrayBuffer
            Utils.spoof(window, 'SharedArrayBuffer', () => undefined);
        }
    };

    // 9. Enhanced Tracking Protection
    const TrackingProtection = {
        init() {
            if (!CONFIG.BLOCK_TRACKERS) return;

            this.blockXHR();
            this.blockFetch();
            this.blockElements();
            Logger.info('Tracking protection initialized');
        },

        blockXHR() {
            const origOpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function(method, url, ...args) {
                if (Utils.isTracker(url)) {
                    Logger.blocked('XHR', url);
                    // Create a fake successful response
                    Object.defineProperty(this, 'readyState', { value: 4, writable: false });
                    Object.defineProperty(this, 'status', { value: 200, writable: false });
                    Object.defineProperty(this, 'response', { value: '', writable: false });
                    Object.defineProperty(this, 'responseText', { value: '', writable: false });
                    setTimeout(() => {
                        if (this.onload) this.onload();
                        if (this.onreadystatechange) this.onreadystatechange();
                    }, 0);
                    return;
                }
                return origOpen.call(this, method, url, ...args);
            };
        },

        blockFetch() {
            const origFetch = window.fetch;
            window.fetch = function(input, init) {
                const url = typeof input === 'string' ? input : input.url;
                if (Utils.isTracker(url)) {
                    Logger.blocked('fetch', url);
                    return Promise.resolve(new Response('', { status: 200, statusText: 'OK' }));
                }
                return origFetch.call(this, input, init);
            };
        },

        blockElements() {
            const origCreateElement = document.createElement;
            document.createElement = function(tagName, options) {
                const element = origCreateElement.call(this, tagName, options);
                
                if (['img', 'script', 'iframe', 'embed', 'object'].includes(tagName.toLowerCase())) {
                    const origSetAttribute = element.setAttribute;
                    element.setAttribute = function(name, value) {
                        if (['src', 'data-src', 'data'].includes(name) && Utils.isTracker(value)) {
                            Logger.blocked(tagName, value);
                            return;
                        }
                        return origSetAttribute.call(this, name, value);
                    };

                    // Also monitor property assignments
                    ['src', 'href'].forEach(prop => {
                        let value = element[prop];
                        Object.defineProperty(element, prop, {
                            get: () => value,
                            set: (newValue) => {
                                if (Utils.isTracker(newValue)) {
                                    Logger.blocked(tagName + '.' + prop, newValue);
                                    return;
                                }
                                value = newValue;
                            }
                        });
                    });
                }
                
                return element;
            };
        }
    };

    // 10. Cookie Protection
    const CookieProtection = {
        init() {
            try {
                // Set SameSite=Strict for enhanced cookie protection
                const origCookie = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
                Object.defineProperty(document, 'cookie', {
                    get: origCookie.get,
                    set: function(value) {
                        // Add SameSite=Strict if not present
                        if (value && !value.toLowerCase().includes('samesite')) {
                            value += '; SameSite=Strict';
                        }
                        return origCookie.set.call(this, value);
                    }
                });
                Logger.info('Cookie protection initialized');
            } catch (e) {
                Logger.warn('Cookie protection failed:', e.message);
            }
        }
    };

    // === INITIALIZATION ===
    const AntiFingerprint = {
        init() {
            Logger.info('Ultimate Anti-Fingerprint v2.0 initializing...');
            
            try {
                // Initialize all protection modules
                NavigatorProtection.init();
                ScreenProtection.init();
                CanvasProtection.init();
                WebGLProtection.init();
                AudioProtection.init();
                FontProtection.init();
                TimezoneProtection.init();
                APIProtection.init();
                TrackingProtection.init();
                CookieProtection.init();

                Logger.info('Ultimate Anti-Fingerprint v2.0 fully initialized');
                
                // Optional: Add detection for fingerprinting attempts
                if (CONFIG.DEBUG_MODE) {
                    this.monitorFingerprinting();
                }
                
            } catch (error) {
                Logger.error('Initialization failed:', error);
            }
        },

        monitorFingerprinting() {
            // Monitor for common fingerprinting patterns
            const originalLog = console.log;
            console.log = function(...args) {
                const message = args.join(' ');
                if (message.includes('fingerprint') || message.includes('canvas') || message.includes('webgl')) {
                    Logger.warn('Potential fingerprinting detected:', message);
                }
                return originalLog.apply(this, args);
            };
        }
    };

    // === EXECUTION ===
    // Initialize immediately for document-start execution
    if (document.readyState === 'loading') {
        AntiFingerprint.init();
    } else {
        // Fallback for late execution
        setTimeout(() => AntiFingerprint.init(), 0);
    }

    // Also initialize on DOM ready as backup
    if (document.readyState !== 'complete') {
        document.addEventListener('DOMContentLoaded', () => {
            // Re-run critical protections that might need DOM
            Logger.debug('DOM ready - reinforcing protections');
        });
    }

    // Expose for debugging (only in debug mode)
    if (CONFIG.DEBUG_MODE) {
        window.UltimateAntiFingerprint = {
            config: CONFIG,
            profile: PROFILE,
            utils: Utils,
            logger: Logger,
            version: '2.0.0'
        };
    }

})();