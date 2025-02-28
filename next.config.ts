import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
