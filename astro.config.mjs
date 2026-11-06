// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";

const { PUBLIC_INDEXABLE } = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");
const indexable = PUBLIC_INDEXABLE === "true";

export default defineConfig({
  site: "https://mjs.legxcysol.dev",
  output: "static",
  devToolbar: { enabled: false },
  adapter: vercel(),
  integrations: indexable ? [sitemap()] : [],
  vite: { plugins: [tailwindcss()] },
  markdown: { syntaxHighlight: false },
  // Old Wix addresses with a clear new home. /catalog was template filler, so it's gone.
  redirects: {
    "/feedback": "/reviews",
    "/services": "/",
  },
  security: {
    checkOrigin: true,
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "upgrade-insecure-requests",
      ],
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Gloock",
      cssVariable: "--font-gloock",
      weights: [400],
      subsets: ["latin"],
      styles: ["normal"],
      fallbacks: ["serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Hanken Grotesk",
      cssVariable: "--font-hanken",
      weights: ["400 700"],
      subsets: ["latin"],
      styles: ["normal"],
      fallbacks: ["sans-serif"],
    },
  ],
  env: {
    schema: {
      PUBLIC_INDEXABLE: envField.boolean({ context: "client", access: "public", default: false }),
      PUBLIC_PREVIEW: envField.boolean({ context: "client", access: "public", default: true }),
      RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      CONTACT_TO: envField.string({ context: "server", access: "secret", optional: true }),
      CONTACT_FROM: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
});
