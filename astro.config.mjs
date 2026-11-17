import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Yalnızca herkese açık, örnek verili GitHub Pages ziyaretçi demosudur.
// Özel yönetim paneli ve gerçek API bu depoya dahil edilmez.
export default defineConfig({
  output: 'static',
  site: 'https://sedathut-sys.github.io',
  base: '/cam-balkon-pvc-demo',
  integrations: [react()],
});
