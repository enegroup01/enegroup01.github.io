/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgPage = repoName?.endsWith(".github.io");
const inferredGitHubPagesBasePath = process.env.GITHUB_ACTIONS === "true" && repoName && !isUserOrOrgPage ? `/${repoName}` : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? inferredGitHubPagesBasePath;

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined
};

export default nextConfig;
