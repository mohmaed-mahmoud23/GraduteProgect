import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  transpilePackages: ["@splinetool/react-spline"],
};

export default nextConfig;