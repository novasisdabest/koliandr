// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://parkovistenemovitosti.cz',
  output: 'static',
  integrations: [sitemap()],
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  image: {
    // Active24 servíruje jen statické soubory — vše se musí vygenerovat na buildu.
    responsiveStyles: true,
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Hashované assety => .htaccess je smí cachovat na rok jako immutable.
      assetsInlineLimit: 2048,
    },
  },
});
