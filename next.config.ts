/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
    ],
  },
  transpilePackages: ["@splinetool/react-spline"],
};

module.exports = nextConfig;