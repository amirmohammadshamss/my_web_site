/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Emit a plain directory of HTML/CSS/JS into out/ - no Node server. */
  output: 'export',

  /* /resume -> /resume/index.html, which is what GitHub Pages can serve. */
  trailingSlash: true,

  /* The next/image optimizer needs a server, so ship the files as they are. */
  images: { unoptimized: true },

  /* No basePath: amirshams.me serves this repo from the domain root.
     If the custom domain is ever removed, the site moves to
     amirmohammadshamss.github.io/my_web_site/ and this becomes:
       basePath: '/my_web_site',
       assetPrefix: '/my_web_site', */
};

export default nextConfig;
