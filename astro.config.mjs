import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dovheller.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [mdx(), sitemap({
    i18n: { defaultLocale: 'he', locales: { he: 'he-IL', en: 'en' } },
    filter: page => new URL(page).pathname !== '/'
  })]
});
