import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {},
  webpack(config) {
    config.resolve ||= {};
    config.resolve.alias ||= {};

    config.resolve.alias.recoil = path.resolve(
      __dirname,
      "node_modules/recoil/cjs/index.js",
    );

    return config;
  },
};

export default nextConfig;
