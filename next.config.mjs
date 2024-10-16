/** @type {import('next').NextConfig} */
const PORT = "3000";
let appURL = "localhost:PORT"; // localhost
// Use the Codespace App URL if we're in the Codespace environment
if (process.env.CODESPACE_NAME) {
  appURL = `https://${process.env.CODESPACE_NAME}-${PORT}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`;
}
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [appURL],
    },
  },
  eslint: {
    // ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/folder/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
