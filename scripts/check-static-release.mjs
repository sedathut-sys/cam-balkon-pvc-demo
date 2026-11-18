import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { resolve, join, sep, relative } from 'node:path';

// Yalnız GitHub Actions'ta yayımlanacak derlenmiş örnek site denetlenir.
// Gerçek yönetici API'si, müşteri verisi veya özel kaynak kodu içermez.
const root = resolve('site');
const pages = [
  'index.html', 'panel/index.html', 'teklif/index.html', 'projeler/index.html',
  'hizmetler/cam-balkon/index.html', 'hizmetler/pvc/index.html',
  'projeler/katlanir-balkon-konsepti/index.html',
  'projeler/surgulu-balkon-konsepti/index.html',
  'projeler/pvc-pencere-konsepti/index.html',
  'projeler/pvc-surgu-konsepti/index.html',
];
const prefix = '/cam-balkon-pvc-demo/';
assert.ok(existsSync(root), 'Derlenmiş site/ klasörü yok');
const assets = [
  'images/demo/hero-cam-balkon.webp', 'images/demo/cam-balkon-dis-cephe.webp',
  'images/demo/cam-balkon-kis-bahcesi.webp', 'images/demo/pvc-pencere.webp',
  'images/demo/logo-cam-balkon-pvc.png', 'images/demo/logo-isaret.png',
];
for (const asset of assets) {
  const path = join(root, asset);
  assert.ok(existsSync(path), `Görsel eksik: ${asset}`);
  assert.ok(statSync(path).size > 10_000, `Görsel boş: ${asset}`);
}
for (const filename of pages) {
  const path = join(root, filename);
  assert.ok(existsSync(path), `Demo sayfası eksik: ${filename}`);
  const html = readFileSync(path, 'utf8');
  assert.match(html, /noindex,nofollow/, `Arama motoru engeli eksik: ${filename}`);
  assert.match(html, /<html[^>]+lang="tr"/, `TR dili eksik: ${filename}`);
  assert.doesNotMatch(html, /href="https:\/\/wa\.me\//i, `Canlı WhatsApp bağlantısı olmamalı: ${filename}`);
  assert.doesNotMatch(html, /ghp_[a-zA-Z0-9]+|github_pat_[a-zA-Z0-9]+|BEGIN PRIVATE KEY/i, `Gizli anahtar riski: ${filename}`);
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!href.startsWith(prefix)) continue;
    const remainder = decodeURIComponent(href.slice(prefix.length).split(/[?#]/)[0]);
    if (remainder.includes('..')) throw new Error(`Güvensiz yol: ${href}`);
    let target = join(root, remainder);
    if (href.endsWith('/') || remainder === '') target = join(target, 'index.html');
    if (!existsSync(target) && existsSync(join(target, 'index.html'))) target = join(target, 'index.html');
    assert.ok(existsSync(target), `Kırık yerel bağlantı: ${filename} => ${href}`);
  }
}
function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => {
  const p = join(dir, e.name);
  return e.isDirectory() ? files(p) : [relative(root, p)];
}); }
for (const name of files(root)) {
  assert.doesNotMatch(name, /(^|\/)(?:src|node_modules|\.git|\.env)(?:\/|$)|\.map$/, `Özel kaynak ya da harita yayınlanamaz: ${name}`);
}
assert.ok(files(join(root, '_astro')).some(n => n.endsWith('.js')), 'React/JS dosyaları yok');
console.log(`PASS: ${pages.length} sayfa, ${assets.length} fotoğraf/logo ve statik URL'ler doğrulandı.`);
