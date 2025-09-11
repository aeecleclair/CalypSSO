/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/calypsso",
  distDir: "out",
  images: {
    unoptimized: true,
  },
  // We use `trailingSlash` to ask Next to create `index.html` pages for all routes
  // We need them to be able to access files without their .html extension (ex: /calypsso/register instead of needing /calypsso/register.html)
  trailingSlash: true,
};

export default nextConfig;
