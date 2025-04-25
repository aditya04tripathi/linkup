/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{ hostname: "picsum.photos" }],
	},
	reactStrictMode: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	onDemandEntries: {
		maxInactiveAge: 25 * 1000,
		pagesBufferLength: 2,
	},
	pageExtensions: ["js", "jsx"],
	poweredByHeader: false,
	generateEtags: false,
	distDir: ".next",
	compress: true,
	skipMiddlewareUrlNormalize: true,
	skipTrailingSlashRedirect: true,
	assetPrefix: undefined,
	modularizeImports: undefined,
	output: undefined,
	productionBrowserSourceMaps: false,
	typescript: {
		ignoreBuildErrors: false,
	},
	webpack: undefined,
	reactProductionProfiling: false,
	crossOrigin: undefined,
};

export default nextConfig;
