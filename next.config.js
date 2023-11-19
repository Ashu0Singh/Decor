/** @type {import('next').NextConfig} */

module.exports = {
	plugins: [require("@tailwindcss/line-clamp")],
	experimental: {
		serverComponentsExternalPackages: ["mongoose"],
	},
};
