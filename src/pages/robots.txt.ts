import type { APIRoute } from "astro";
import { PUBLIC_INDEXABLE } from "astro:env/client";

// Crawling stays allowed while unlisted, so search engines can read the noindex directive.
export const GET: APIRoute = ({ site }) =>
  new Response(
    PUBLIC_INDEXABLE ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n` : `User-agent: *\nAllow: /\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
