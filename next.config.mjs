/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const isProd = process.env.NODE_ENV === "production";
const baseUrl = isProd
  ? "https://resume-ai-pwa.netlify.app/"
  : "http://localhost:3000";

const nextConfig = {};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: new RegExp(`^${baseUrl}(\/|\/sign-in|\/sign-up)?$`),
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 24 * 60 * 60,
        },
        networkTimeoutSeconds: 3,
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "icon",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /\.(?:js|css)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
  ],
})(nextConfig);
