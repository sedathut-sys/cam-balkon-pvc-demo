import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../dist/', import.meta.url);
const file = new URL('index.html', root);
const fail = (reason) => {
  console.error('Demo kalite hatası: ' + reason);
  process.exitCode = 1;
};
if (!existsSync(file)) {
  fail('dist/index.html bulunamadı');
} else {
  const html = readFileSync(file, 'utf8');
  if (!html.includes('<html lang="tr"')) fail('Türkçe HTML etiketi eksik');
  if (!html.includes('noindex,nofollow')) fail('Demo noindex işareti eksik');
  if (!html.includes('/cam-balkon-pvc-demo/_astro/')) fail('GitHub Pages alt yoluna bağlı CSS/JS yok');
  if (!html.includes('/cam-balkon-pvc-demo/favicon.svg')) fail('Favicon alt yolu hatalı');
  if (!html.includes('Gerçek proje fotoğrafı eklenecek')) fail('Temsili görsel açıklaması eksik');
  if (!html.includes('WhatsApp numarası henüz eklenmedi')) fail('WhatsApp demo uyarısı eksik');
  if (html.includes('https://wa.me/')) fail('Demo dosyasında gerçek WhatsApp bağlantısı var');
  if (/ADMIN_PASSWORD_HASH|D1_DATABASE_ID|CLOUDFLARE_API_TOKEN|R2_SECRET_ACCESS_KEY/.test(html)) fail('Özel altyapı bilgisi içeriyor');
}
if (!existsSync(new URL('favicon.svg',root))) fail('Favicon bulunamadı');
if (!process.exitCode) console.log('Demo güvenliği, alt yol, Türkçe, noindex ve statik çıktı: PASS');
