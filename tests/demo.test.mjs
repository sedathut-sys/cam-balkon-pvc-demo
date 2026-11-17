import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createDefaultSiteData } from '../src/data/defaults.ts';
import { getVisibleServices, getWhatsAppQuoteHref } from '../src/lib/storefront.ts';

test('Demo örnek işletme bilgileri ve Whatsapp kapalı', () => {
  const demo = createDefaultSiteData();
  assert.equal(demo.business.whatsappNumber, '');
  assert.equal(getWhatsAppQuoteHref(demo.business), null);
  assert.equal(demo.business.heroImageUrl, '');
});
test('Yalnızca görünür hizmet kategorileri listelenir', () => {
  const data = createDefaultSiteData();
  const visible = getVisibleServices(data.categories);
  assert.ok(visible.length > 0);
  assert.ok(visible.every((x) => x.visible));
});
test('Gerçek fiyat motorları henüz aktif değil', () => {
  const data = createDefaultSiteData();
  assert.equal(data.business.calculatorAccess, 'disabled');
  assert.ok(data.categories.every(x => !x.calculatorEnabled));
});
test('Ziyaretçi demo şablonu ve indeksleme korunur', () => {
  const layout = readFileSync(new URL('../src/layouts/Main.astro',import.meta.url),'utf8');
  const index = readFileSync(new URL('../src/pages/index.astro',import.meta.url),'utf8');
  assert.match(layout,/noindex,nofollow/);
  assert.match(layout,/BASE_URL\.endsWith\('\/'\)/);
  assert.match(index,/Örnek site tasarımı/);
  assert.match(index,/WhatsApp numarası henüz eklenmedi/);
});
test('Pages yapılandırması sektör demosuna özel', () => {
  const config = readFileSync(new URL('../astro.config.mjs',import.meta.url),'utf8');
  assert.match(config,/base: '\/cam-balkon-pvc-demo'/);
  assert.match(config,/output: 'static'/);
});
