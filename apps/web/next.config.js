/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
