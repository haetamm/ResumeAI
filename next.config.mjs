/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "icon",
        expiration: {
          maxEntries: 10,
        },
      },
    },
  ],
})(nextConfig);
