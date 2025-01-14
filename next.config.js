/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portal.abogadosparatusdeudas.es",
      },
      {
        protocol: "https",
        hostname: "dobnvodjkxztnnwdvxsr.supabase.co",
      },
      {
        protocol: "https",
        hostname: "yzhlydajhihhdpzlygvv.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
