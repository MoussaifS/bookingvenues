
/** @type {import('next').NextConfig} */

// next.config.js
import type { NextConfig } from "next";

// --- Get Strapi API details from environment variable ---
// Use the correct variable name from your .env file
const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';
let apiHostname = '';
let apiProtocol = 'http'; // Default protocol
let apiPort = '';

try {
    if (strapiApiUrl) {
        const parsedUrl = new URL(strapiApiUrl);
        apiHostname = parsedUrl.hostname; // e.g., 'localhost', 'api.example.com'
        apiProtocol = parsedUrl.protocol.replace(':', ''); // 'http' or 'https'
        apiPort = parsedUrl.port || ''; // e.g., '1337' or '' if no port in URL
    } else {
        // Use the correct variable name in the warning
        console.warn("WARN: NEXT_PUBLIC_STRAPI_API_URL is not set in .env.local. Image optimization for Strapi domains might fail.");
    }
} catch (e) {
     // Use the correct variable name in the error message
     console.error("ERROR: Invalid NEXT_PUBLIC_STRAPI_API_URL provided:", strapiApiUrl, e);
}
// --- End Strapi API details ---


const nextConfig: NextConfig = {
  i18n: { // Keep your i18n config
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      // Add a pattern only if apiHostname was successfully parsed
      ...(apiHostname ? [{
          protocol: apiProtocol as ('http' | 'https'), // Cast to expected type
          hostname: apiHostname,
          port: apiPort, // Will be empty string '' if no port, which is fine
          pathname: '/uploads/**', // Only allow images from the /uploads path
      }] : []), // If no valid API URL, this array will be empty
    ],
  },
  reactStrictMode: true, // Good practice to enable
  output: 'standalone',
};

export default nextConfig;


