import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../dist/', import.meta.url);
const fail = (reason) => {
  console.error('Demo kalite hatası: ' + reason);
  process.exitCode = 1;
};
const requireFile = (path) => {
  const file = new URL(path,root);
  if (!existsSync(file)) { fail(path + ' bulunamadı'); return ''; }
  return readFileSync(file,'utf8');
};

const home=requireFile('index.html');
const admin=requireFile('panel/index.html');
const quote=requireFile('teklif/index.html');
const prefix='/cam-balkon-pvc-demo/';

for(const [name,html] of [['ana sayfa',home],['panel',admin],['teklif',quote]]) {
  if (!html) continue;
  if (!html.includes('<html lang="tr"')) fail(name + ': Türkçe HTML etiketi eksik');
  if (!html.includes('noindex,nofollow')) fail(name + ': noindex eksik');
  if (!html.includes(prefix + '_astro/')) fail(name + ': GitHub Pages CSS/JS alt yolu hatalı');
  if (!html.includes(prefix + 'favicon.svg')) fail(name + ': favicon alt yolu hatalı');
  if (html.includes('https://wa.me/')) fail(name + ': Gerçek WhatsApp bağlantısı var');
  if (/ADMIN_PASSWORD_HASH|D1_DATABASE_ID|CLOUDFLARE_API_TOKEN|R2_SECRET_ACCESS_KEY|BEGIN PRIVATE KEY/i.test(html)) fail(name + ': Gizli bilgi bulundu');
}
if (!home.includes('Gerçek proje fotoğrafı eklenecek')) fail('Ana sayfa: temsilî fotoğraf uyarısı eksik');
if (!home.includes('WhatsApp numarası henüz eklenmedi')) fail('Ana sayfa: WhatsApp demo uyarısı eksik');
if (!admin.includes('DEMO PANEL')) fail('Panel: Herkese açık demo bildirimi eksik');
if (!admin.includes('gerçek yönetim yetkisi sunmaz')) fail('Panel: güvenlik sınırı belirtilmemiş');
for(const name of ['Web Sitem','Hizmetler ve Projeler','Fiyat Hesaplama','Teklif Bağlantıları','Ayarlar']) {
  if (!admin.includes(name)) fail('Panel: bölüm eksik: '+name);
}
if (!quote.includes('Gerçek fiyat, teklif, kayıt veya mesaj gönderimi yapılmaz')) fail('Teklif: fiyat/gönderim güvenlik uyarısı eksik');
if (!quote.includes('Hesaplama kapalı')) fail('Teklif: kapalı hesaplama uyarısı eksik');
if (!existsSync(new URL('favicon.svg',root))) fail('Favicon dosyası eksik');
if (!process.exitCode) console.log('Üç statik sayfa, Pages asset yolu, demo sınırları, güvenlik: PASS');
