/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tells Next.js to compile the application into pure static HTML/CSS/JS assets
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;