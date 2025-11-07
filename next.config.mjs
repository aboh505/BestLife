/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration des images pour Vercel
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Optimisations pour la production
  reactStrictMode: true,
  
  // Configuration ESLint pour éviter les erreurs de build
  eslint: {
    // Warning: Cela permet de build même avec des erreurs ESLint
    // Recommandé de les corriger localement avant le déploiement
    ignoreDuringBuilds: false,
  },
  
  // Configuration TypeScript
  typescript: {
    // Ignorer les erreurs TypeScript pendant le build si nécessaire
    ignoreBuildErrors: false,
  },
  
  // Optimisation des performances
  compress: true,
  
  // Configuration des en-têtes de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
